import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Database, 
  Network, 
  Binary, 
  Cpu, 
  Presentation, 
  Radio, 
  Flame, 
  RotateCcw,
  Zap,
  GraduationCap,
  FileText,
  Sliders,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'soc' | 'graph' | 'dbms' | 'dmgt' | 'adsa' | 'python' | 'presentation';
  setActiveTab: (tab: 'soc' | 'graph' | 'dbms' | 'dmgt' | 'adsa' | 'python' | 'presentation') => void;
  onInjectAttack: (type: 'IMPOSSIBLE_TRAVEL' | 'BRUTE_FORCE' | 'LATERAL_HOP' | 'DATA_EXFIL' | 'PRIVILEGE_ESC') => void;
  onReset: () => void;
  isStreaming: boolean;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  streamSpeed: number; // in ms
  setStreamSpeed: (speed: number) => void;
  onOpenReport: () => void;
  onOpenViva: () => void;
  alertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
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
  alertCount
}) => {
  const [showAttackDropdown, setShowAttackDropdown] = useState(false);

  return (
    <header className="border-b border-[#1E293B] bg-[#050811]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0D1527] border border-[#00F0FF]/60 flex items-center justify-center glow-cyan">
            <ShieldAlert className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-[#FFFFFF] flex items-center gap-2 font-mono">
                CYBERWATCH <span className="text-[#00F0FF] text-xs px-1.5 py-0.5 rounded bg-[#0D1527] border border-[#00F0FF]/40">SOC v2.5</span>
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/70 text-[#00F0FF] font-mono font-bold text-[11px] shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                TEAM-15
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#00FF87] bg-[#00FF87]/10 px-2 py-0.5 rounded-full border border-[#00FF87]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse shadow-[0_0_8px_#00FF87]"></span>
                CAMPUS_NET: ONLINE
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] font-mono">
              Access Log Monitoring • DBMS ER • DMGT Logic • ADSA Graph • Python Detector
            </p>
          </div>
        </div>

        {/* Right: Actions, Attacks & Simulation */}
        <div className="flex items-center flex-wrap gap-2 font-mono text-xs">
          {/* Viva Walkthrough Button */}
          <button
            id="btn-viva-guide"
            onClick={onOpenViva}
            className="px-2.5 py-1.5 rounded-lg bg-[#9D4EDD]/15 hover:bg-[#9D4EDD]/30 border border-[#9D4EDD]/60 text-[#9D4EDD] font-bold flex items-center gap-1.5 transition shadow-sm"
            title="Open Interactive Viva Preparation & Defense Guide"
          >
            <GraduationCap className="w-4 h-4 text-[#9D4EDD]" />
            <span>Viva Guide</span>
            <span className="px-1 py-0.2 rounded text-[9px] bg-[#9D4EDD]/30 text-[#FFFFFF]">EN+TE</span>
          </button>

          {/* Audit Report Generator Button */}
          <button
            id="btn-open-report"
            onClick={onOpenReport}
            className="px-2.5 py-1.5 rounded-lg bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/50 text-[#00F0FF] font-bold flex items-center gap-1.5 transition"
            title="Generate Executive Audit Report"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Audit Report</span>
          </button>

          {/* Attack Injectors Dropdown */}
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

          {/* Speed Selector (1x, 2x, 5x) */}
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
            id="btn-toggle-stream"
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

          {/* Reset Button */}
          <button
            id="btn-reset-data"
            onClick={onReset}
            className="p-1.5 rounded-lg bg-[#0D1527] border border-[#1E293B] text-[#94A3B8] hover:text-[#FFFFFF] hover:border-[#00F0FF]/40 transition"
            title="Reset telemetry & restore defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto border-t border-[#1E293B] pt-1 pb-1 font-mono text-xs">
        <button
          id="nav-tab-soc"
          onClick={() => setActiveTab('soc')}
          className={`flex items-center gap-2 px-3.5 py-2 font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'soc'
              ? 'bg-[#0D1527] border-[#00F0FF] text-[#00F0FF] shadow-sm'
              : 'border-transparent text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-[#0D1527]/50'
          }`}
        >
          <Activity className="w-4 h-4 text-[#00F0FF]" />
          Live SOC & Alerts
          {alertCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#FF0055] text-white font-bold animate-pulse shadow-[0_0_8px_#FF0055]">
              {alertCount}
            </span>
          )}
        </button>

        <button
          id="nav-tab-graph"
          onClick={() => setActiveTab('graph')}
          className={`flex items-center gap-2 px-3.5 py-2 font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'graph'
              ? 'bg-[#0D1527] border-[#9D4EDD] text-[#9D4EDD]'
              : 'border-transparent text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-[#0D1527]/50'
          }`}
        >
          <Network className="w-4 h-4 text-[#9D4EDD]" />
          Access-Pattern Graph
        </button>

        <button
          id="nav-tab-dbms"
          onClick={() => setActiveTab('dbms')}
          className={`flex items-center gap-2 px-3.5 py-2 font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'dbms'
              ? 'bg-[#0D1527] border-[#00FF87] text-[#00FF87]'
              : 'border-transparent text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-[#0D1527]/50'
          }`}
        >
          <Database className="w-4 h-4 text-[#00FF87]" />
          DBMS & ER Model
        </button>

        <button
          id="nav-tab-dmgt"
          onClick={() => setActiveTab('dmgt')}
          className={`flex items-center gap-2 px-3.5 py-2 font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'dmgt'
              ? 'bg-[#0D1527] border-[#9D4EDD] text-[#9D4EDD]'
              : 'border-transparent text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-[#0D1527]/50'
          }`}
        >
          <Binary className="w-4 h-4 text-[#9D4EDD]" />
          DMGT Logic Rules
        </button>

        <button
          id="nav-tab-adsa"
          onClick={() => setActiveTab('adsa')}
          className={`flex items-center gap-2 px-3.5 py-2 font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'adsa'
              ? 'bg-[#0D1527] border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-[#0D1527]/50'
          }`}
        >
          <Cpu className="w-4 h-4 text-[#FF6B00]" />
          ADSA Data Structures
        </button>

        <button
          id="nav-tab-python"
          onClick={() => setActiveTab('python')}
          className={`flex items-center gap-2 px-3.5 py-2 font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'python'
              ? 'bg-[#0D1527] border-[#00F0FF] text-[#00F0FF]'
              : 'border-transparent text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-[#0D1527]/50'
          }`}
        >
          <span className="text-[#00F0FF] font-bold text-xs">Py</span>
          OOPJ & Python Detector
        </button>

        <button
          id="nav-tab-presentation"
          onClick={() => setActiveTab('presentation')}
          className={`flex items-center gap-2 px-3.5 py-2 font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ml-auto ${
            activeTab === 'presentation'
              ? 'bg-[#0D1527] border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-[#FF6B00]/80 hover:text-[#FF6B00] hover:bg-[#0D1527]/50'
          }`}
        >
          <Presentation className="w-4 h-4 text-[#FF6B00]" />
          4-Slide Presentation
          <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 font-bold">
            READY
          </span>
        </button>
      </div>
    </header>
  );
};
