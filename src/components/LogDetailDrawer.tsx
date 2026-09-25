import React from 'react';
import { X, ShieldAlert, CheckCircle2, Clock, Globe, Laptop, Key, Terminal, ArrowRight } from 'lucide-react';
import { AccessLog } from '../types';

interface LogDetailDrawerProps {
  log: AccessLog | null;
  onClose: () => void;
  onTraceInGraph: () => void;
}

export const LogDetailDrawer: React.FC<LogDetailDrawerProps> = ({ log, onClose, onTraceInGraph }) => {
  if (!log) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0b101e] border-l border-slate-800 shadow-2xl p-5 flex flex-col justify-between overflow-y-auto font-mono text-xs animate-in slide-in-from-right duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white uppercase tracking-wider">EVENT FORENSICS INSPECTOR</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Severity Banner */}
        <div
          className={`p-3 rounded-xl border flex items-center justify-between ${
            log.isAnomaly
              ? 'bg-red-950/40 border-red-800/80 text-red-200'
              : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {log.isAnomaly ? (
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <div>
              <div className="font-bold">
                {log.isAnomaly ? `ANOMALY: ${log.anomalyType || 'SUSPICIOUS'}` : 'STANDARD TELEMETRY EVENT'}
              </div>
              <div className="text-[10px] opacity-80">
                Threat Score: {log.threatScore}/100 • Status: {log.status}
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-bold">
            {log.latencyMs}ms
          </span>
        </div>

        {/* Identity & Network Fields */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex justify-between">
            <span className="text-slate-400">User Identity:</span>
            <span className="text-cyan-300 font-bold">{log.username} ({log.userId})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Origin IP:</span>
            <span className="text-amber-300 font-bold">{log.ipAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Physical Building:</span>
            <span className="text-slate-200">{log.building}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Subnet CIDR:</span>
            <span className="text-purple-300">{log.subnet}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Target Resource:</span>
            <span className="text-emerald-300 font-bold">{log.targetResource}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Action:</span>
            <span className="text-slate-200">{log.action}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Session Token:</span>
            <span className="text-slate-400 font-mono text-[10px] truncate max-w-[200px]">{log.sessionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Timestamp:</span>
            <span className="text-slate-300">{log.timestamp}</span>
          </div>
        </div>

        {/* Forensic Details */}
        {log.details && (
          <div className="p-3 rounded-xl bg-black/40 border border-slate-800 space-y-1 text-slate-300">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Forensic Log Audit Trail:</span>
            <p className="text-[11px] leading-relaxed text-slate-300">{log.details}</p>
          </div>
        )}

        {/* Raw Log Payload */}
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Raw Syslog / JSON Frame:</span>
          <pre className="p-3 rounded-lg bg-[#050811] border border-slate-800 text-[10px] text-emerald-300 overflow-x-auto">
{JSON.stringify({
  log_id: log.id,
  timestamp: log.timestamp,
  user: log.username,
  ip: log.ipAddress,
  subnet: log.subnet,
  resource: log.targetResource,
  action: log.action,
  status: log.status,
  threat_score: log.threatScore,
  anomaly: log.isAnomaly,
  type: log.anomalyType || null
}, null, 2)}
          </pre>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={onTraceInGraph}
          className="w-full py-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center gap-1.5 transition glow-cyan"
        >
          <span>Trace In Access Graph</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
