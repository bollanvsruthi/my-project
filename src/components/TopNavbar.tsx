import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Radio, 
  Flame, 
  RotateCcw,
  Zap,
  GraduationCap,
  FileText,
  ChevronDown,
  Bell,
  Search,
  User,
  Sliders,
  Sparkles
} from 'lucide-react';
import { NavTabId } from './Sidebar';

interface TopNavbarProps {
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
  onInjectAttack: (type: 'IMPOSSIBLE_TRAVEL' | 'BRUTE_FORCE' | 'LATERAL_HOP' | 'DATA_EXFIL' | 'PRIVILEGE_ESC') => void;
  onReset: () => void;
  isStreaming: boolean;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  streamSpeed: number; // in ms
  setStreamSpeed: (speed: number) => void;
  onOpenReport: () => void;
  onOpenViva: () => void;
  alertCount: number;
  globalSearch: string;
  setGlobalSearch: (s: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  setActiveTab,
  onInjectAttack,
  onReset,
  isStreaming,
  setIsStreaming,
  streamSpeed,
  setStreamSpeed,
  onOpenReport,
  onOpenViva,
  alertCount,
  globalSearch,
  setGlobalSearch
}) => {
  const [showAttackDropdown, setShowAttackDropdown] = useState(false);

  return (
    <header className="border-b border-[#1E293B] bg-[#050811]/95 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
      {/* Left: Global Search Box */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full font-mono text-xs">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Global Search (User, IP, Session Token, Subnet, Alert)..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full bg-[#0D1527] border border-[#1E293B] focus:border-[#00F0FF] rounded-lg pl-9 pr-3 py-2 text-[#E0F2FE] placeholder-[#94A3B8] outline-none transition"
          />
        </div>
      </div>

      {/* Right: Controls, Simulator & User Profile */}
      <div className="flex items-center flex-wrap gap-2 font-mono text-xs">
        {/* Viva Guide Button */}
        <button
          id="topbar-btn-viva"
          onClick={onOpenViva}
          className="px-2.5 py-1.5 rounded-lg bg-[#9D4EDD]/15 hover:bg-[#9D4EDD]/30 border border-[#9D4EDD]/60 text-[#9D4EDD] font-bold flex items-center gap-1.5 transition shadow-sm"
          title="Interactive Viva Defense Guide with Telugu + English explanations"
        >
          <GraduationCap className="w-4 h-4 text-[#9D4EDD]" />
          <span>Viva Guide</span>
          <span className="px-1 py-0.2 rounded text-[9px] bg-[#9D4EDD]/30 text-[#FFFFFF]">EN+TE</span>
        </button>

        {/* Audit Report Generator Button */}
        <button
          id="topbar-btn-report"
          onClick={onOpenReport}
          className="px-2.5 py-1.5 rounded-lg bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/50 text-[#00F0FF] font-bold flex items-center gap-1.5 transition"
          title="Generate Executive Audit Report"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Audit Report</span>
        </button>

        {/* Attack Simulator Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAttackDropdown(!showAttackDropdown)}
            className="px-2.5 py-1.5 rounded-lg bg-[#FF0055]/15 hover:bg-[#FF0055]/25 border border-[#FF0055]/60 text-[#FF0055] font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            <Flame className="w-3.5 h-3.5 text-[#FF0055]" />
            <span>Simulate Attack</span>
            <ChevronDown className="w-3 h-3 text-[#FF0055]" />
          </button>

          {showAttackDropdown && (
            <div 
              className="absolute right-0 mt-1 w-64 bg-[#0D1527] border border-[#FF0055]/60 rounded-xl shadow-2xl z-50 p-1.5 space-y-1"
              onMouseLeave={() => setShowAttackDropdown(false)}
            >
              <div className="px-2 py-1 text-[10px] text-[#94A3B8] uppercase font-bold border-b border-[#1E293B]">
                Select Attack Vector
              </div>
              <button
                onClick={() => {
                  onInjectAttack('IMPOSSIBLE_TRAVEL');
                  setShowAttackDropdown(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FF0055]/20 text-[#E0F2FE] hover:text-[#FF0055] transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-[#FF0055]" />
                <div>
                  <div className="font-bold text-xs">Impossible Travel</div>
                  <div className="text-[10px] text-[#94A3B8]">Dorm WiFi ➔ Frankfurt Tor (3,800 km/h)</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onInjectAttack('BRUTE_FORCE');
                  setShowAttackDropdown(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#FF6B00]/20 text-[#E0F2FE] hover:text-[#FF6B00] transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-[#FF6B00]" />
                <div>
                  <div className="font-bold text-xs">SSH Brute Force</div>
                  <div className="text-[10px] text-[#94A3B8]">14 rapid SSH burst failures on Bastion</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onInjectAttack('LATERAL_HOP');
                  setShowAttackDropdown(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#9D4EDD]/20 text-[#E0F2FE] hover:text-[#9D4EDD] transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-[#9D4EDD]" />
                <div>
                  <div className="font-bold text-xs">Lateral Movement</div>
                  <div className="text-[10px] text-[#94A3B8]">Student WiFi bypass to Registrar DB</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onInjectAttack('DATA_EXFIL');
                  setShowAttackDropdown(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#00F0FF]/20 text-[#E0F2FE] hover:text-[#00F0FF] transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
                <div>
                  <div className="font-bold text-xs">Off-Hours Exfiltration</div>
                  <div className="text-[10px] text-[#94A3B8]">03:15 AM Bulk Student Grade dump</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onInjectAttack('PRIVILEGE_ESC');
                  setShowAttackDropdown(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#00FF87]/20 text-[#E0F2FE] hover:text-[#00FF87] transition flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-[#00FF87]" />
                <div>
                  <div className="font-bold text-xs">Privilege Escalation</div>
                  <div className="text-[10px] text-[#94A3B8]">Student token attempting sudo override</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Speed Selector */}
        <div className="flex items-center bg-[#0D1527] border border-[#1E293B] rounded-lg p-0.5">
          <span className="text-[10px] text-[#94A3B8] px-1.5">Speed:</span>
          {[
            { label: '1x', ms: 4500 },
            { label: '2x', ms: 2200 },
            { label: '5x', ms: 900 }
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setStreamSpeed(s.ms)}
              className={`px-1.5 py-0.5 rounded text-[10px] transition ${
                streamSpeed === s.ms 
                  ? 'bg-[#00F0FF]/25 text-[#00F0FF] font-bold border border-[#00F0FF]/50' 
                  : 'text-[#94A3B8] hover:text-[#FFFFFF]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Stream Play/Pause Toggle */}
        <button
          id="topbar-btn-toggle-stream"
          onClick={() => setIsStreaming(!isStreaming)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition ${
            isStreaming 
              ? 'bg-[#0D1527] border-[#00F0FF]/60 text-[#00F0FF] glow-cyan' 
              : 'bg-[#0D1527] border-[#1E293B] text-[#94A3B8]'
          }`}
        >
          <Radio className={`w-3.5 h-3.5 ${isStreaming ? 'text-[#00F0FF] animate-spin' : 'text-[#94A3B8]'}`} />
          {isStreaming ? 'STREAMING' : 'PAUSED'}
        </button>

        {/* Reset Telemetry Button */}
        <button
          id="topbar-btn-reset"
          onClick={onReset}
          className="p-1.5 rounded-lg bg-[#0D1527] border border-[#1E293B] text-[#94A3B8] hover:text-[#FFFFFF] hover:border-[#00F0FF]/40 transition"
          title="Reset telemetry & restore defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* User / Analyst Profile Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#1E293B]">
          <div className="w-8 h-8 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/60 flex items-center justify-center text-[#00F0FF] font-bold text-xs">
            S
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-[11px] font-bold text-[#FFFFFF] leading-tight">Sruthi (Lead)</div>
            <div className="text-[9px] text-[#00F0FF]">TEAM-15 SOC Analyst</div>
          </div>
        </div>
      </div>
    </header>
  );
};
