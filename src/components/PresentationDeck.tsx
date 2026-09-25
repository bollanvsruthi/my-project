import React, { useState } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Mic, 
  Download, 
  Sparkles, 
  Code, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { SLIDE_DECK } from '../data/mockCampusData';
import { PresentationSlide } from '../types';

export const PresentationDeck: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [copiedSlide, setCopiedSlide] = useState<boolean>(false);
  const [copiedFullDeck, setCopiedFullDeck] = useState<boolean>(false);

  const slide: PresentationSlide = SLIDE_DECK[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < SLIDE_DECK.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleCopyCurrentSlide = () => {
    const text = `# ${slide.title}\n## ${slide.subtitle}\n\n` +
      slide.keyPillars.map(p => `### ${p.title}\n` + p.points.map(pt => `- ${pt}`).join('\n') + `\nTechnical Detail: ${p.technicalDetail}\n`).join('\n') +
      `\nSpeaker Notes:\n` + slide.speakerNotes.join('\n') +
      `\nTakeaways: ${slide.takeaways}`;

    navigator.clipboard.writeText(text);
    setCopiedSlide(true);
    setTimeout(() => setCopiedSlide(false), 2000);
  };

  const handleCopyFullDeck = () => {
    const fullText = SLIDE_DECK.map(s => (
      `====================================================\n` +
      `# ${s.title}\n## ${s.subtitle}\n\n` +
      s.keyPillars.map(p => `### ${p.title}\n` + p.points.map(pt => `- ${pt}`).join('\n') + `\nTechnical Detail: ${p.technicalDetail}\n`).join('\n') +
      `\nSPEAKER NOTES / TALKING POINTS:\n` + s.speakerNotes.join('\n\n') +
      `\nTAKEAWAY:\n${s.takeaways}\n`
    )).join('\n\n');

    navigator.clipboard.writeText(fullText);
    setCopiedFullDeck(true);
    setTimeout(() => setCopiedFullDeck(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="bg-[#0b101e]/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Presentation className="w-4 h-4" />
            ACADEMIC & TECHNICAL PRESENTATION DECK • 4-SLIDE EXECUTIVE OVERVIEW
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            Cybersecurity Access Log Monitoring: Architecture, Formal Logic & Forensics
          </h2>
          <p className="text-xs text-slate-400 font-mono max-w-3xl mt-0.5">
            Complete presentation content, slide-by-slide technical breakdowns, formula citations, and verbatim speaker talking points.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
              showSpeakerNotes
                ? 'bg-amber-950/80 border-amber-500/80 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            {showSpeakerNotes ? 'Speaker Notes: ON' : 'Speaker Notes: OFF'}
          </button>

          <button
            onClick={handleCopyCurrentSlide}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1.5 transition"
          >
            {copiedSlide ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSlide ? 'Copied Slide' : 'Copy Slide'}
          </button>

          <button
            onClick={handleCopyFullDeck}
            className="px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 border border-amber-700 text-amber-300 font-bold flex items-center gap-1.5 transition glow-amber"
          >
            {copiedFullDeck ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
            {copiedFullDeck ? 'All 4 Slides Copied!' : 'Copy Full 4-Slide Deck'}
          </button>
        </div>
      </div>

      {/* Slide Navigation Stepper */}
      <div className="flex items-center justify-between bg-[#080d18] border border-slate-800 rounded-xl p-2 font-mono text-xs">
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-800 flex items-center gap-1 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Slide
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          {SLIDE_DECK.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                currentSlideIndex === idx
                  ? 'bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Slide {s.id}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlideIndex === SLIDE_DECK.length - 1}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30 hover:bg-slate-800 flex items-center gap-1 transition"
        >
          Next Slide
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Slide Card Presentation Canvas */}
      <div className="bg-[#0D1527]/95 border-2 border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Cyber Watermark */}
        <div className="absolute top-4 right-6 text-[11px] font-mono text-[#94A3B8] uppercase tracking-widest pointer-events-none">
          CYBERSECURITY ACCESS LOG MONITORING • SLIDE {slide.id} OF 4
        </div>

        {/* Slide Title Section */}
        <div className="mb-6 pb-4 border-b border-[#1E293B]">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-2.5 py-0.5 rounded bg-[#FF6B00]/20 border border-[#FF6B00]/50 text-[#FF6B00] text-xs font-mono font-bold uppercase">
              Slide {slide.id}
            </span>
            {slide.id === 1 && (
              <span className="px-2.5 py-0.5 rounded bg-[#00F0FF]/15 border border-[#00F0FF]/60 text-[#00F0FF] text-xs font-mono font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                TEAM-15 CAPSTONE
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight">
            {slide.title.replace(`Slide ${slide.id}: `, '')}
          </h1>
          <p className="text-sm sm:text-base text-[#00F0FF] font-mono mt-1">
            {slide.subtitle}
          </p>

          {slide.id === 1 && (
            <div className="mt-4 p-3 rounded-xl bg-[#09101f] border border-[#1F2833] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#66FCF1] font-bold">
                <span>TEAM-15 MEMBERS:</span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
                  <strong className="text-[#66FCF1]">25B21A4564</strong> Bolla Naga Venkata Sruthi
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
                  <strong className="text-[#66FCF1]">25B21A4553</strong> Kesavadasu Moulika
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
                  <strong className="text-[#66FCF1]">25B21A4567</strong> Murapaka Pavan Veera Sai Santhosh
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
                  <strong className="text-[#66FCF1]">25B21A4570</strong> Guthula Krishna Suryaprasad
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
                  <strong className="text-[#66FCF1]">25B21A4562</strong> Kota Jaswanth
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Slide Key Content Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {slide.keyPillars.map((pillar, pIdx) => (
            <div
              key={pIdx}
              className="bg-[#0b101c]/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-lg"
            >
              <div>
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  {pillar.title}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pillar.points.map((point, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0 mt-0.5">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Detail / Formula Callout */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 font-mono text-xs">
                {pillar.formulaOrCode && (
                  <div className="p-2 rounded bg-black/60 border border-cyan-900/60 text-cyan-300 overflow-x-auto">
                    <code>{pillar.formulaOrCode}</code>
                  </div>
                )}
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{pillar.technicalDetail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Slide Takeaway Banner */}
        <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-cyan-200">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong className="text-cyan-300">Executive Takeaway:</strong> {slide.takeaways}</span>
          </div>
          <span className="text-slate-500 text-[10px] uppercase tracking-wider shrink-0">
            CONFIDENTIAL SOC BRIEFING
          </span>
        </div>
      </div>

      {/* Speaker Notes / Talking Points Drawer */}
      {showSpeakerNotes && (
        <div className="bg-[#0b101c] border border-amber-900/60 rounded-xl p-5 shadow-xl space-y-3 font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
              <Mic className="w-4 h-4 text-amber-400" />
              Presenter Speaker Talking Points (Slide {slide.id})
            </div>
            <span className="text-[11px] text-slate-400">Verbatim spoken script for presentation</span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {slide.speakerNotes.map((note, nIdx) => (
              <div key={nIdx} className="p-3 rounded-lg bg-black/30 border border-slate-800/80 flex items-start gap-2">
                <span className="text-amber-400 font-bold">[{nIdx + 1}]</span>
                <p className="italic text-slate-200">{note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
