import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldBan, 
  KeyRound, 
  Network, 
  CheckCircle, 
  ChevronRight,
  Flame
} from 'lucide-react';
import { ThreatAlert } from '../types';

interface AlertCardsProps {
  alerts: ThreatAlert[];
  onContainmentAction: (alert: ThreatAlert, actionType: 'BLOCK_IP' | 'REVOKE_SESSION' | 'REQUIRE_MFA') => void;
  onTraceGraph: (alert: ThreatAlert) => void;
}

export const AlertCards: React.FC<AlertCardsProps> = ({ alerts, onContainmentAction, onTraceGraph }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <h2 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            HIGH-SEVERITY SECURITY INCIDENTS ({alerts.length})
          </h2>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Automated Triage: <span className="text-emerald-400 font-semibold">Active</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {alerts.map(alert => {
          const isCritical = alert.severity === 'CRITICAL';
          const isContained = alert.status === 'CONTAINED';

          return (
            <div
              key={alert.id}
              id={`alert-card-${alert.id}`}
              className={`rounded-xl border p-3.5 flex flex-col justify-between transition relative overflow-hidden backdrop-blur-md ${
                isContained
                  ? 'bg-[#0D1527]/90 border-[#00FF87]/60 glow-emerald'
                  : isCritical
                  ? 'bg-[#0D1527]/95 border-[#FF0055]/80 glow-crimson animate-threat-pulse'
                  : 'bg-[#0D1527]/95 border-[#FF6B00]/70 glow-orange'
              }`}
            >
              {/* Background accent badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isContained
                        ? 'bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]'
                        : isCritical
                        ? 'bg-[#FF0055]/25 text-[#FF0055] border border-[#FF0055] animate-pulse'
                        : 'bg-[#FF6B00]/25 text-[#FF6B00] border border-[#FF6B00]'
                    }`}
                  >
                    {isContained ? 'CONTAINED' : alert.severity}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#050811] text-[#E0F2FE] border border-[#1E293B]">
                    Z: +{alert.zScore.toFixed(2)}σ
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#9D4EDD]/20 text-[#9D4EDD] border border-[#9D4EDD]/60">
                    {alert.dmgtRuleId}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#94A3B8]">
                  {alert.timestamp.split(' ')[1] || alert.timestamp}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xs font-bold text-[#FFFFFF] font-mono flex items-center gap-1.5">
                  <Flame className={`w-3.5 h-3.5 ${isCritical ? 'text-[#FF0055]' : 'text-[#FF6B00]'}`} />
                  {alert.title}
                </h3>
                <p className="text-[11px] text-[#E0F2FE] mt-1 leading-relaxed">
                  {alert.description}
                </p>
              </div>

              {/* Metadata Badges */}
              <div className="my-2.5 p-2 rounded-lg bg-[#050811]/90 border border-[#1E293B] space-y-1 text-[11px] font-mono">
                <div className="flex justify-between text-[#E0F2FE]">
                  <span className="text-[#94A3B8]">Identity:</span>
                  <span className="text-[#00F0FF] font-semibold">{alert.affectedUser}</span>
                </div>
                <div className="flex justify-between text-[#E0F2FE]">
                  <span className="text-[#94A3B8]">Origin IP:</span>
                  <span className="text-[#FF6B00]">{alert.affectedIp}</span>
                </div>
                <div className="flex justify-between text-[#E0F2FE]">
                  <span className="text-[#94A3B8]">Target:</span>
                  <span className="text-[#9D4EDD] font-bold">{alert.targetResource}</span>
                </div>
                <div className="flex justify-between text-[#E0F2FE] pt-1 border-t border-[#1E293B]">
                  <span className="text-[#94A3B8]">MITRE:</span>
                  <span className="text-[#FF0055] font-semibold truncate max-w-[180px]">{alert.mitreTechnique}</span>
                </div>
              </div>

              {/* Containment Action Toolbar */}
              <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between gap-1 flex-wrap">
                <button
                  id={`btn-trace-graph-${alert.id}`}
                  onClick={() => onTraceGraph(alert)}
                  className="px-2 py-1 rounded bg-[#0D1527] hover:bg-[#1E293B] border border-[#00F0FF]/50 text-[#E0F2FE] text-[11px] font-mono flex items-center gap-1 transition"
                  title="Trace attack hops on Access-Pattern Graph"
                >
                  <Network className="w-3 h-3 text-[#00F0FF]" />
                  Trace Graph
                </button>

                {!isContained ? (
                  <div className="flex items-center gap-1">
                    <button
                      id={`btn-contain-ip-${alert.id}`}
                      onClick={() => onContainmentAction(alert, 'BLOCK_IP')}
                      className="px-2 py-1 rounded bg-[#FF0055]/20 hover:bg-[#FF0055] border border-[#FF0055]/70 text-[#FF0055] hover:text-[#FFFFFF] text-[11px] font-mono font-bold flex items-center gap-1 transition shadow-sm"
                      title="Quarantine IP from campus border router"
                    >
                      <ShieldBan className="w-3 h-3 text-[#FF0055] hover:text-[#FFFFFF]" />
                      Block IP
                    </button>
                    <button
                      id={`btn-revoke-sess-${alert.id}`}
                      onClick={() => onContainmentAction(alert, 'REVOKE_SESSION')}
                      className="px-2 py-1 rounded bg-[#FF6B00]/20 hover:bg-[#FF6B00] border border-[#FF6B00]/70 text-[#FF6B00] hover:text-[#FFFFFF] text-[11px] font-mono font-bold flex items-center gap-1 transition"
                      title="Invalidate active bearer token"
                    >
                      <KeyRound className="w-3 h-3 text-[#FF6B00] hover:text-[#FFFFFF]" />
                      Revoke
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] font-mono text-[#00FF87] flex items-center gap-1 font-bold">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00FF87]" />
                    Threat Mitigated
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
