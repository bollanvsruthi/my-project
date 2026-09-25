import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Radio, 
  Sliders, 
  Database, 
  Lock, 
  Key, 
  Terminal, 
  Bell, 
  RefreshCw,
  Check,
  AlertTriangle
} from 'lucide-react';

interface SettingsViewProps {
  isStreaming: boolean;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  streamSpeed: number;
  setStreamSpeed: (speed: number) => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isStreaming,
  setIsStreaming,
  streamSpeed,
  setStreamSpeed,
  onResetData
}) => {
  const [retentionDays, setRetentionDays] = useState<number>(30);
  const [autoContainCritical, setAutoContainCritical] = useState<boolean>(true);
  const [mfaChallengeMode, setMfaChallengeMode] = useState<boolean>(true);
  const [torAutoQuarantine, setTorAutoQuarantine] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-4 font-mono max-w-4xl">
      {/* Top Banner */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#94A3B8] text-xs font-bold uppercase tracking-wider">
            <Settings className="w-4 h-4 text-[#00F0FF]" />
            SOC PLATFORM PREFERENCES & THREAT POLICIES
          </div>
          <h2 className="text-lg font-bold text-[#FFFFFF] mt-1">
            Telemetry Calibration, Ingestion & Remediation Rules
          </h2>
          <p className="text-xs text-[#94A3B8] max-w-3xl mt-0.5">
            Configure streaming velocity, automated border containment policies, log retention, and campus subnet alerting thresholds.
          </p>
        </div>
        <div>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 rounded-lg bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/50 text-[#00F0FF] text-xs font-bold flex items-center gap-1.5 transition glow-cyan"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 text-[#00FF87]" /> : <Check className="w-3.5 h-3.5" />}
            {savedSuccess ? 'Settings Saved' : 'Save Policies'}
          </button>
        </div>
      </div>

      {/* Section 1: Ingestion & Simulation Controls */}
      <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E293B] space-y-4">
        <h3 className="text-xs font-bold text-[#FFFFFF] uppercase border-b border-[#1E293B] pb-2 flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#00F0FF]" />
          Live Log Stream Engine
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-[#E0F2FE]">Synthetic Log Streaming</div>
              <div className="text-[11px] text-[#94A3B8]">Continuously emits realistic campus WiFi and HTTP access events.</div>
            </div>
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                isStreaming
                  ? 'bg-[#00FF87]/20 border-[#00FF87]/50 text-[#00FF87]'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {isStreaming ? 'STREAMING ACTIVE' : 'STREAMING DISABLED'}
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#1E293B]/70">
            <div>
              <div className="font-bold text-[#E0F2FE]">Stream Ingestion Cadence</div>
              <div className="text-[11px] text-[#94A3B8]">Milliseconds between synthetic log events.</div>
            </div>
            <div className="flex items-center gap-1 bg-[#050811] p-1 border border-[#1E293B] rounded-lg">
              {[
                { label: 'Normal (4.5s)', ms: 4500 },
                { label: 'Fast (2.2s)', ms: 2200 },
                { label: 'Turbulent (0.9s)', ms: 900 },
              ].map(s => (
                <button
                  key={s.ms}
                  onClick={() => setStreamSpeed(s.ms)}
                  className={`px-2 py-1 rounded text-[11px] transition ${
                    streamSpeed === s.ms
                      ? 'bg-[#00F0FF]/25 text-[#00F0FF] font-bold border border-[#00F0FF]/40'
                      : 'text-[#94A3B8]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Automated Threat Remediation Policies */}
      <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E293B] space-y-4">
        <h3 className="text-xs font-bold text-[#FFFFFF] uppercase border-b border-[#1E293B] pb-2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#FF0055]" />
          Automated Remediation & Firewall Policies
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-[#E0F2FE]">Tor Exit Node Auto-Quarantine</div>
              <div className="text-[11px] text-[#94A3B8]">Instantly null-route ingress traffic originating from known Tor relays (185.220.0.0/16).</div>
            </div>
            <input
              type="checkbox"
              checked={torAutoQuarantine}
              onChange={e => setTorAutoQuarantine(e.target.checked)}
              className="w-4 h-4 accent-[#00F0FF] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#1E293B]/70">
            <div>
              <div className="font-bold text-[#E0F2FE]">Adaptive Step-Up MFA Challenge</div>
              <div className="text-[11px] text-[#94A3B8]">Require FIDO2 WebAuthn authentication when geographic velocity &gt; 900 km/h.</div>
            </div>
            <input
              type="checkbox"
              checked={mfaChallengeMode}
              onChange={e => setMfaChallengeMode(e.target.checked)}
              className="w-4 h-4 accent-[#00F0FF] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#1E293B]/70">
            <div>
              <div className="font-bold text-[#E0F2FE]">Session Token Blacklisting</div>
              <div className="text-[11px] text-[#94A3B8]">Immediately invalidate bearer tokens upon detecting multi-tenant IP multiplexing.</div>
            </div>
            <input
              type="checkbox"
              checked={autoContainCritical}
              onChange={e => setAutoContainCritical(e.target.checked)}
              className="w-4 h-4 accent-[#00F0FF] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Reset & Defaults */}
      <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E293B] flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-[#FFFFFF]">Telemetry Reset & Cache Clear</div>
          <div className="text-[11px] text-[#94A3B8]">Restore all live stream buffers, graph topologies, and security alerts to baseline.</div>
        </div>
        <button
          onClick={onResetData}
          className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-950/70 border border-red-700/60 text-red-300 text-xs font-bold transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Telemetry Buffer
        </button>
      </div>
    </div>
  );
};
