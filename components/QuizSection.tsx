
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react';

interface QuizSectionProps {
  questions: QuizQuestion[];
  topologyTitle: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ questions, topologyTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Reset state when topology changes
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  }, [topologyTitle]);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 text-center space-y-6 animate-in zoom-in duration-300">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/20 text-cyan-400 mb-2">
          <Award size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white">Latihan Selesai!</h3>
        <p className="text-slate-400">
          Kamu berhasil menjawab <span className="text-cyan-400 font-bold">{score}</span> dari <span className="text-white font-bold">{questions.length}</span> soal tentang {topologyTitle}.
        </p>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden max-w-xs mx-auto">
          <div 
            className="bg-cyan-500 h-full transition-all duration-1000" 
            style={{ width: `${(score / questions.length) * 100}%` }}
          ></div>
        </div>
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl mx-auto transition-colors font-bold text-sm"
        >
          <RotateCcw size={18} /> Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em]">Uji Pemahaman</h4>
          <h3 className="text-xl font-bold text-white">Latihan Soal: {topologyTitle.split('(')[0]}</h3>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Soal {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-lg text-slate-200 font-medium leading-relaxed">
          {currentQuestion.question}
        </p>

        <div className="grid gap-3">
          {currentQuestion.options.map((option, idx) => {
            let variantClass = "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600";
            
            if (isAnswered) {
              if (idx === currentQuestion.correctAnswerIndex) {
                variantClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
              } else if (idx === selectedOption) {
                variantClass = "bg-rose-500/20 border-rose-500/50 text-rose-300";
              } else {
                variantClass = "bg-slate-800/50 border-slate-700/50 text-slate-500 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left px-6 py-4 rounded-2xl border transition-all flex items-center justify-between group ${variantClass}`}
              >
                <span className="font-semibold">{option}</span>
                {isAnswered && idx === currentQuestion.correctAnswerIndex && <CheckCircle size={20} className="text-emerald-500" />}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswerIndex && <XCircle size={20} className="text-rose-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <CheckCircle size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Penjelasan</span>
              <p className="text-sm text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          </div>

          <button 
            onClick={handleNext}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
          >
            {currentIndex < questions.length - 1 ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil Akhir'}
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
