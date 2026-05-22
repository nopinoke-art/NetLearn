
import React, { useState, useEffect } from 'react';
import { TopologyType } from '../types';
import { Monitor, Server, Cpu, Info, Activity } from 'lucide-react';

interface DiagramProps {
  type: TopologyType;
  simulate: boolean;
}

const Node: React.FC<{ 
  x: number; 
  y: number; 
  label: string; 
  isHub?: boolean;
  onHover: (info: string | null) => void;
  details: string;
}> = ({ x, y, label, isHub, onHover, details }) => (
  <g 
    transform={`translate(${x}, ${y})`} 
    className="cursor-help transition-all duration-300 hover:scale-110"
    onMouseEnter={() => onHover(details)}
    onMouseLeave={() => onHover(null)}
  >
    <rect 
      x="-28" y="-28" width="56" height="56" rx="12" 
      className={isHub ? "fill-cyan-500/10 stroke-cyan-400" : "fill-slate-800/90 stroke-slate-600"} 
      strokeWidth="2.5"
    />
    <foreignObject x="-15" y="-15" width="30" height="30">
      <div className={`flex items-center justify-center h-full ${isHub ? 'text-cyan-400' : 'text-slate-400'}`}>
        {isHub ? <Server size={22} /> : <Monitor size={22} />}
      </div>
    </foreignObject>
    <text y="45" textAnchor="middle" className="text-[9px] fill-slate-500 font-bold uppercase tracking-widest">
      {label}
    </text>
  </g>
);

const Packet: React.FC<{ path: string; delay?: string }> = ({ path, delay = "0s" }) => (
  <circle r="4" fill="#22d3ee" className="filter blur-[1px]">
    <animateMotion 
      path={path} 
      dur="2s" 
      repeatCount="indefinite" 
      begin={delay}
    />
    <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin={delay} />
  </circle>
);

export const Diagram: React.FC<DiagramProps> = ({ type, simulate }) => {
  const [hoverInfo, setHoverInfo] = useState<string | null>(null);
  const width = 600;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;

  const renderTopology = () => {
    switch (type) {
      case TopologyType.STAR:
        return (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const x = centerX + 150 * Math.cos(angle);
              const y = centerY + 150 * Math.sin(angle);
              const path = `M ${centerX} ${centerY} L ${x} ${y}`;
              return (
                <React.Fragment key={i}>
                  <line x1={centerX} y1={centerY} x2={x} y2={y} className="stroke-slate-800" strokeWidth="2" />
                  {simulate && <Packet path={path} delay={`${i * 0.3}s`} />}
                  <Node x={x} y={y} label={`PC-${i + 1}`} onHover={setHoverInfo} details={`Komputer Client #${i+1} terhubung ke Switch melalui kabel UTP.`} />
                </React.Fragment>
              );
            })}
            <Node x={centerX} y={centerY} label="SWITCH" isHub onHover={setHoverInfo} details="Switch Pusat: Mengatur lalu lintas data secara cerdas ke node tujuan." />
          </>
        );

      case TopologyType.BUS:
        return (
          <>
            <line x1="50" y1={centerY} x2="550" y2={centerY} className="stroke-slate-700" strokeWidth="6" strokeLinecap="round" />
            <line x1="50" y1={centerY} x2="550" y2={centerY} className="stroke-cyan-500/20 animate-pulse" strokeWidth="10" />
            {simulate && <Packet path={`M 50 ${centerY} L 550 ${centerY}`} />}
            {[0, 1, 2, 3].map((i) => {
              const x = 120 + i * 120;
              const yOffset = i % 2 === 0 ? -100 : 100;
              return (
                <React.Fragment key={i}>
                  <line x1={x} y1={centerY} x2={x} y2={centerY + yOffset} className="stroke-slate-800" strokeWidth="2" />
                  <Node x={x} y={centerY + yOffset} label={`Node-${i + 1}`} onHover={setHoverInfo} details={`Perangkat terhubung ke kabel backbone menggunakan T-Connector.`} />
                </React.Fragment>
              );
            })}
          </>
        );

      case TopologyType.RING:
        const ringNodes = [0, 1, 2, 3, 4, 5].map(i => {
          const angle = (i * 60) * (Math.PI / 180);
          return {
            x: centerX + 130 * Math.cos(angle),
            y: centerY + 130 * Math.sin(angle),
            angle
          };
        });
        const ringPath = ringNodes.map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x} ${n.y}`).join(' ') + ' Z';
        return (
          <>
            <path d={ringPath} className="fill-none stroke-slate-800" strokeWidth="3" />
            {simulate && <Packet path={ringPath} />}
            {ringNodes.map((n, i) => (
              <Node key={i} x={n.x} y={n.y} label={`PC-${i + 1}`} onHover={setHoverInfo} details="Data berputar searah jarum jam. Setiap node bertindak sebagai repeater." />
            ))}
          </>
        );

      case TopologyType.MESH:
        const meshNodes = [0, 1, 2, 3, 4].map(i => {
          const angle = (i * 72) * (Math.PI / 180);
          return { x: centerX + 140 * Math.cos(angle), y: centerY + 140 * Math.sin(angle) };
        });
        return (
          <>
            {meshNodes.map((n1, i) => meshNodes.map((n2, j) => i < j && (
              <React.Fragment key={`${i}-${j}`}>
                <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} className="stroke-slate-800/40" strokeWidth="1.5" />
                {simulate && i === 0 && <Packet path={`M ${n1.x} ${n1.y} L ${n2.x} ${n2.y}`} delay={`${j * 0.4}s`} />}
              </React.Fragment>
            )))}
            {meshNodes.map((n, i) => <Node key={i} x={n.x} y={n.y} label={`SRV-${i + 1}`} isHub={i === 0} onHover={setHoverInfo} details="Koneksi Point-to-Point antar semua perangkat. Sangat andal namun boros kabel." />)}
          </>
        );

      case TopologyType.TREE:
        return (
          <>
            <line x1={centerX} y1={50} x2={centerX - 150} y2={150} className="stroke-slate-800" strokeWidth="2" />
            <line x1={centerX} y1={50} x2={centerX + 150} y2={150} className="stroke-slate-800" strokeWidth="2" />
            {simulate && <Packet path={`M ${centerX} 50 L ${centerX - 150} 150`} />}
            {simulate && <Packet path={`M ${centerX} 50 L ${centerX + 150} 150`} delay="0.5s" />}
            
            <Node x={centerX} y={50} label="ROOT" isHub onHover={setHoverInfo} details="Root Node: Hirarki tertinggi dalam jaringan, biasanya Switch Utama." />
            <Node x={centerX - 150} y={150} label="DIST-1" isHub onHover={setHoverInfo} details="Distribution Switch: Menghubungkan satu lantai atau departemen." />
            <Node x={centerX + 150} y={150} label="DIST-2" isHub onHover={setHoverInfo} details="Distribution Switch: Menghubungkan satu lantai atau departemen." />
            
            {[centerX - 220, centerX - 80, centerX + 80, centerX + 220].map((x, idx) => (
              <React.Fragment key={idx}>
                <line x1={x < centerX ? centerX - 150 : centerX + 150} y1={150} x2={x} y2={280} className="stroke-slate-800" strokeWidth="2" />
                <Node x={x} y={280} label={`PC-${idx + 1}`} onHover={setHoverInfo} details="Workstation yang tergabung dalam kelompok Star di bawah Switch Distribusi." />
              </React.Fragment>
            ))}
          </>
        );
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-950/20 rounded-3xl border border-slate-800/50 p-4">
      {/* Simulation Toggle Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700 backdrop-blur-sm z-10">
        <div className={`w-2 h-2 rounded-full ${simulate ? 'bg-cyan-500 animate-pulse' : 'bg-slate-600'}`}></div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {simulate ? 'Simulasi Aktif' : 'Simulasi Mati'}
        </span>
      </div>

      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full max-h-[500px]"
      >
        {renderTopology()}
      </svg>

      {/* Tooltip Overlay */}
      <div className={`mt-4 w-full p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3 ${
        hoverInfo ? 'bg-cyan-500/10 border-cyan-500/30 opacity-100 translate-y-0' : 'bg-slate-900/50 border-slate-800 opacity-0 translate-y-2 pointer-events-none'
      }`}>
        <Info size={18} className="text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          {hoverInfo || "Arahkan kursor ke perangkat untuk melihat detail fungsinya."}
        </p>
      </div>

      {!hoverInfo && (
        <div className="mt-4 flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest animate-bounce">
          <Activity size={12} /> Hover Perangkat Untuk Info
        </div>
      )}
    </div>
  );
};
