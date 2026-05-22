
import React, { useState } from 'react';
import { 
  Network, Server, ArrowRight, CheckCircle2, XCircle, ChevronRight, 
  Github, Instagram, GraduationCap, Play, Square, Table, BookOpen, 
  Layout, Smartphone, Monitor as MonitorIcon, Activity, 
  ChevronDown, Book, Zap, Coffee, HelpCircle, Info
} from 'lucide-react';
import { TOPOLOGIES, KEY_TERMS } from './constants';
import { TopologyType } from './types';
import { Diagram } from './components/Diagram';
import { AIConsultant } from './components/AIConsultant';
import { QuizSection } from './components/QuizSection';

const App: React.FC = () => {
  const [selectedTopology, setSelectedTopology] = useState<TopologyType>(TopologyType.STAR);
  const [simulate, setSimulate] = useState(false);
  const [learningMode, setLearningMode] = useState<'quick' | 'relaxed'>('relaxed');
  const [expandedSummary, setExpandedSummary] = useState(false);
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

  const currentInfo = TOPOLOGIES.find(t => t.id === selectedTopology)!;

  // Helper to render text with key term highlighting
  const renderHighlightedText = (text: string) => {
    let highlightedText = text;
    Object.keys(KEY_TERMS).forEach(term => {
      const regex = new RegExp(`\\b(${term})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="term-highlight" data-term="$1">$1</span>`);
    });

    return (
      <p 
        className="text-slate-400 leading-relaxed font-medium"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
        onMouseOver={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('term-highlight')) {
            setHoveredTerm(target.getAttribute('data-term'));
          }
        }}
        onMouseOut={() => setHoveredTerm(null)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 selection:bg-cyan-500/30 selection:text-cyan-200">
      <style>{`
        .term-highlight {
          color: #22d3ee;
          border-bottom: 1px dashed #22d3ee;
          cursor: help;
          font-weight: 600;
        }
      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
              <Network size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">NetLearn</h1>
              <p className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold">Vokasi Digital Edition</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            {/* Learning Mode Switcher */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 mr-4">
              <button 
                onClick={() => setLearningMode('quick')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${learningMode === 'quick' ? 'bg-cyan-500 text-slate-950' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Zap size={14} /> Baca Cepat
              </button>
              <button 
                onClick={() => setLearningMode('relaxed')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${learningMode === 'relaxed' ? 'bg-cyan-500 text-slate-950' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Coffee size={14} /> Santai
              </button>
            </div>
            
            <div className="h-4 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2 text-slate-500 italic">
              <GraduationCap size={16} />
              <span className="text-xs">XI TKJ 3 - SMK KG 2</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 md:pt-24 pb-12 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            <Book size={12} /> Materi Jaringan Komputer
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Pahami <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Topologi Jaringan</span> Secara Visual
          </h1>
          
          {/* Expandable Summary */}
          <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden max-w-2xl mx-auto text-left shadow-xl">
            <button 
              onClick={() => setExpandedSummary(!expandedSummary)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Layout size={18} />
                </div>
                <span className="font-bold text-white text-sm">Apa itu Topologi Jaringan? (Ringkasan)</span>
              </div>
              <ChevronDown size={20} className={`text-slate-500 transition-transform ${expandedSummary ? 'rotate-180' : ''}`} />
            </button>
            {expandedSummary && (
              <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed space-y-3 animate-in fade-in slide-in-from-top-2">
                <p>Topologi jaringan adalah pengaturan fisik atau logis di mana perangkat dalam jaringan (seperti komputer, printer, dan server) saling terhubung.</p>
                <p>Pemilihan topologi sangat penting karena mempengaruhi: <strong>Biaya instalasi</strong>, <strong>Kemudahan manajemen</strong>, dan <strong>Ketahanan terhadap kegagalan</strong>.</p>
                <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-xs flex items-start gap-3">
                  <Info size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>Tip: Arahkan kursor pada istilah yang bergaris bawah di materi untuk melihat penjelasannya.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section id="visualizer" className="py-12 bg-slate-900/30 border-y border-slate-800/50 relative">
        {/* Floating Dictionary Tooltip */}
        {hoveredTerm && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-4 bg-slate-900 border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-500/20 max-w-xs animate-in zoom-in duration-200">
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle size={14} className="text-cyan-400" />
              <span className="text-xs font-bold text-cyan-100 uppercase tracking-widest">{hoveredTerm}</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">{KEY_TERMS[hoveredTerm]}</p>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">Visualisasi & Detail</h2>
              <p className="text-slate-500 text-sm">Pilih topologi di sebelah kiri untuk mulai mengeksplorasi.</p>
            </div>
            
            <button 
              onClick={() => setSimulate(!simulate)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all border ${
                simulate 
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {simulate ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              {simulate ? 'Hentikan Aliran Data' : 'Simulasi Aliran Data'}
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-3 flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {TOPOLOGIES.map((topo) => (
                <button
                  key={topo.id}
                  onClick={() => setSelectedTopology(topo.id)}
                  className={`flex-shrink-0 md:w-full flex items-center justify-between px-6 py-4 rounded-2xl text-left transition-all border group ${
                    selectedTopology === topo.id 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-transparent border-cyan-500/50 text-cyan-100 ring-1 ring-cyan-500/20 shadow-lg shadow-cyan-500/5' 
                      : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <span className="font-bold text-sm tracking-wide">{topo.title.split('(')[0]}</span>
                  <ChevronRight size={18} className={`transition-transform duration-300 ${selectedTopology === topo.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-9 space-y-12">
              <div className={`grid ${learningMode === 'quick' ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-8 lg:gap-12 transition-all duration-500`}>
                {/* Visual Section */}
                <div className={`h-[400px] lg:h-full ${learningMode === 'quick' ? 'hidden' : 'block'}`}>
                  <Diagram type={selectedTopology} simulate={simulate} />
                </div>

                {/* Text Section */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white tracking-tight">{currentInfo.title}</h3>
                    {renderHighlightedText(currentInfo.description)}
                  </div>

                  {learningMode === 'relaxed' && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-emerald-400 font-bold flex items-center gap-2 text-[10px] uppercase tracking-widest">
                          <CheckCircle2 size={14} /> Kelebihan Utama
                        </h4>
                        <ul className="space-y-2">
                          {currentInfo.pros.map((pro, i) => (
                            <li key={i} className="text-slate-300 text-xs flex items-start gap-2 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-rose-400 font-bold flex items-center gap-2 text-[10px] uppercase tracking-widest">
                          <XCircle size={14} /> Kekurangan Utama
                        </h4>
                        <ul className="space-y-2">
                          {currentInfo.cons.map((con, i) => (
                            <li key={i} className="text-slate-300 text-xs flex items-start gap-2 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {learningMode === 'quick' && (
                    <div className="p-6 bg-slate-900/80 rounded-3xl border border-slate-700 shadow-xl space-y-6">
                       <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">Poin Penting (Baca Cepat)</h4>
                       <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                             <span className="text-[10px] text-slate-500 uppercase font-bold">Kapan Digunakan?</span>
                             <p className="text-sm text-slate-200">{currentInfo.implementation}</p>
                          </div>
                          <div className="space-y-1">
                             <span className="text-[10px] text-slate-500 uppercase font-bold">Fitur Utama</span>
                             <p className="text-sm text-slate-200">{currentInfo.comparisonTable[0].advantage}</p>
                          </div>
                       </div>
                       <div className="pt-4 border-t border-slate-800">
                          <Diagram type={selectedTopology} simulate={simulate} />
                       </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quiz Section - Displayed after the material */}
              <div className="pt-8 border-t border-slate-800/50">
                <QuizSection 
                  questions={currentInfo.questions} 
                  topologyTitle={currentInfo.title} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Cards Section */}
      <section id="comparison" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
             <Table size={12} /> Perbandingan Singkat
           </div>
           <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Pilih Topologi yang Tepat</h2>
           <p className="text-slate-400 max-w-2xl mx-auto">Setiap arsitektur memiliki keunggulan spesifik tergantung kebutuhan infrastruktur Anda.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TOPOLOGIES.map((topo) => (
            <div 
              key={topo.id}
              onClick={() => {
                setSelectedTopology(topo.id);
                document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-6 rounded-2xl border transition-all cursor-pointer group hover:scale-[1.02] ${
                selectedTopology === topo.id 
                  ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/10' 
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-4 group-hover:bg-slate-800 transition-colors">
                <Network size={20} className={selectedTopology === topo.id ? 'text-cyan-400' : 'text-slate-500'} />
              </div>
              <h4 className="text-white font-bold text-sm mb-2">{topo.title.split('(')[0]}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{topo.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-900 flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Lihat Detail</span>
                <ChevronRight size={14} className="text-slate-700 group-hover:text-cyan-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-16 px-6 border-t border-slate-900 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-cyan-500 border border-slate-800">
                  <Network size={22} />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">NetLearn <span className="text-cyan-500 text-sm">PRO</span></span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                Platform pembelajaran vokasi modern untuk siswa TKJ Indonesia. Membantu transisi dari teori ke pemahaman visual yang nyata.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/trxzvn?igsh=aTFzc2YzMng1aTcw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                >
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                  <Github size={20} />
                </a>
              </div>
            </div>
            
            <div className="space-y-6">
              <h5 className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">Eksplorasi</h5>
              <ul className="space-y-3 text-sm text-slate-500 font-medium">
                <li><button onClick={() => setExpandedSummary(true)} className="hover:text-cyan-400 transition-colors">Ringkasan Materi</button></li>
                <li><a href="#visualizer" className="hover:text-cyan-400 transition-colors">Visualizer Lab</a></li>
                <li><a href="#comparison" className="hover:text-cyan-400 transition-colors">Quick Compare</a></li>
                <li><button onClick={() => setLearningMode(learningMode === 'quick' ? 'relaxed' : 'quick')} className="hover:text-cyan-400 transition-colors">
                  Ubah Mode: {learningMode === 'quick' ? 'Santai' : 'Cepat'}
                </button></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">Author</h5>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <GraduationCap size={16} className="text-slate-500" />
                  </div>
                  <div className="text-xs">
                    <span className="block text-white font-bold">Ananda Putra Ramadhan</span>
                    <span className="text-slate-500 italic">Network Engineering Student</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="block text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Institusi</span>
                  <span className="text-slate-300 text-xs font-bold">SMK Karya Guna 2 Bekasi</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-900 text-center text-slate-600 text-[10px] uppercase tracking-[0.3em] font-bold">
            &copy; 2026 Project Edukasi Vokasi - TKJ Indonesia Jaya
          </div>
        </div>
      </footer>

      <AIConsultant />
    </div>
  );
};

export default App;