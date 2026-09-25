import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  Activity, 
  Filter, 
  ShieldBan, 
  KeyRound, 
  Network, 
  CheckCircle2, 
  Clock,
  Layers
} from 'lucide-react';
import { ThreatAlert } from '../types';

interface SecurityAlertsViewProps {
  alerts: ThreatAlert[];
  onContainmentAction: (alert: ThreatAlert, actionType: 'BLOCK_IP' | 'REVOKE_SESSION' | 'REQUIRE_MFA') => void;
  onTraceGraph: (alert: ThreatAlert) => void;
  onTriggerAttack?: (type: 'IMPOSSIBLE_TRAVEL' | 'BRUTE_FORCE' | 'LATERAL_HOP' | 'DATA_EXFIL' | 'PRIVILEGE_ESC') => void;
}

export const SecurityAlertsView: React.FC<SecurityAlertsViewProps> = ({
  alerts,
  onContainmentAction,
  onTraceGraph,
  onTriggerAttack
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNRESOLVED' | 'INVESTIGATING' | 'CONTAINED'>('ALL');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(alerts[0]?.id || null);

  const filteredAlerts = alerts.filter(a => {
    if (severityFilter !== 'ALL' && a.severity !== severityFilter) return false;
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      a.title.toLowerCase().includes(term) ||
      a.description.toLowerCase().includes(term) ||
      a.affectedUser.toLowerCase().includes(term) ||
      a.affectedIp.toLowerCase().includes(term) ||
      a.mitreTechnique.toLowerCase().includes(term) ||
      a.dmgtRuleId.toLowerCase().includes(term)
    );
  });

  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  return (
    <div className="space-y-4 font-mono">
      {/* Top Banner */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#FF0055] text-xs font-bold uppercase tracking-wider">
            <Bell className="w-4 h-4" />
            SECURITY INCIDENT TRIAGE & MITRE ATT&CK ALERTS
          </div>
          <h2 className="text-lg font-bold text-[#FFFFFF] mt-1">
            Incident Response Dispatcher & One-Click Containment
          </h2>
          <p className="text-xs text-[#94A3B8] max-w-3xl mt-0.5">
            Real-time security incident alerts correlated across mathematical DMGT rules, Gaussian Z-scores, and topological network graph paths.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#FF0055]/20 border border-[#FF0055]/50 text-[#FF0055] text-xs font-bold">
            Total Alerts: {alerts.length}
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#00FF87]/20 border border-[#00FF87]/50 text-[#00FF87] text-xs font-bold">
            Contained: {alerts.filter(a => a.status === 'CONTAINED').length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0D1527]/80 border border-[#1E293B] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search alerts by title, identity, IP address, or MITRE code..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#050811] border border-[#1E293B] focus:border-[#FF0055] rounded-lg pl-9 pr-3 py-2 text-[#E0F2FE] placeholder-[#94A3B8] outline-none text-xs transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Severity Filter */}
          <div className="flex items-center bg-[#050811] border border-[#1E293B] rounded-lg p-0.5">
            {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'] as const).map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded text-[11px] transition ${
                  severityFilter === sev
                    ? 'bg-[#FF0055]/25 text-[#FF0055] font-bold border border-[#FF0055]/50'
                    : 'text-[#94A3B8] hover:text-[#FFFFFF]'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center bg-[#050811] border border-[#1E293B] rounded-lg p-0.5">
            {(['ALL', 'UNRESOLVED', 'INVESTIGATING', 'CONTAINED'] as const).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded text-[11px] capitalize transition ${
                  statusFilter === status
                    ? 'bg-[#00F0FF]/25 text-[#00F0FF] font-bold border border-[#00F0FF]/50'
                    : 'text-[#94A3B8] hover:text-[#FFFFFF]'
                }`}
              >
                {status.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split: Alert Cards Column & Detailed Selected Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Columns: Alerts List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center bg-[#0D1527] border border-[#1E293B] rounded-xl text-[#94A3B8] text-xs">
              No alerts match the current filter criteria.
            </div>
          ) : (
            filteredAlerts.map(alert => {
              const isSelected = selectedAlert?.id === alert.id;
              const isCritical = alert.severity === 'CRITICAL';
              const isContained = alert.status === 'CONTAINED';

              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition relative overflow-hidden backdrop-blur-md ${
                    isSelected
                      ? 'bg-[#0D1527] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                      : isContained
                      ? 'bg-[#0D1527]/70 border-[#00FF87]/50'
                      : isCritical
                      ? 'bg-[#0D1527]/80 border-[#FF0055]/70 hover:border-[#FF0055]'
                      : 'bg-[#0D1527]/80 border-[#FF6B00]/60 hover:border-[#FF6B00]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isContained
                            ? 'bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]'
                            : isCritical
                            ? 'bg-[#FF0055]/25 text-[#FF0055] border border-[#FF0055] animate-pulse'
                            : 'bg-[#FF6B00]/25 text-[#FF6B00] border border-[#FF6B00]'
                        }`}>
                          {isContained ? 'CONTAINED' : alert.severity}
                        </span>
                        <span className="text-[10px] text-[#00F0FF] bg-[#050811] px-1.5 py-0.2 rounded border border-[#1E293B]">
                          Rule: {alert.dmgtRuleId}
                        </span>
                        <span className="text-[10px] text-[#9D4EDD] bg-[#050811] px-1.5 py-0.2 rounded border border-[#1E293B]">
                          Z-Score: +{alert.zScore.toFixed(2)}σ
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-[#FFFFFF] mt-1">{alert.title}</h3>
                      <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-2">{alert.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-[#94A3B8]">{alert.timestamp.split(' ')[1] || alert.timestamp}</div>
                      <div className="text-[10px] text-[#00F0FF] mt-1 font-semibold">@{alert.affectedUser}</div>
                    </div>
                  </div>

                  {/* Actions inside list card */}
                  <div className="mt-3 pt-2.5 border-t border-[#1E293B] flex items-center justify-between text-xs">
                    <div className="text-[10px] text-[#94A3B8]">Target: <span className="text-[#E0F2FE]">{alert.targetResource}</span></div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTraceGraph(alert);
                        }}
                        className="px-2 py-1 rounded bg-[#9D4EDD]/15 hover:bg-[#9D4EDD]/25 border border-[#9D4EDD]/50 text-[#9D4EDD] text-[11px] font-bold flex items-center gap-1 transition"
                      >
                        <Network className="w-3 h-3" />
                        Trace Graph
                      </button>
                      {!isContained && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onContainmentAction(alert, 'BLOCK_IP');
                          }}
                          className="px-2 py-1 rounded bg-[#FF0055]/15 hover:bg-[#FF0055]/25 border border-[#FF0055]/50 text-[#FF0055] text-[11px] font-bold flex items-center gap-1 transition"
                        >
                          <ShieldBan className="w-3 h-3" />
                          Block IP
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Alert Detailed Dossier */}
        {selectedAlert && (
          <div className="bg-[#0D1527]/95 border border-[#1E293B] rounded-xl p-4 space-y-4">
            <div className="border-b border-[#1E293B] pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FF0055]" />
                <h3 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
                  Incident Forensics Dossier
                </h3>
              </div>
              <span className="text-[10px] text-[#00F0FF]">{selectedAlert.id}</span>
            </div>

            <div>
              <div className="text-[10px] text-[#FF6B00] font-bold uppercase">{selectedAlert.mitreTactic}</div>
              <h4 className="text-sm font-bold text-[#FFFFFF] mt-0.5">{selectedAlert.title}</h4>
              <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">{selectedAlert.description}</p>
            </div>

            {/* Target Breakdown */}
            <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Target Identity:</span>
                <span className="text-[#00F0FF] font-bold">@{selectedAlert.affectedUser}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Originating IP:</span>
                <span className="text-[#FF0055] font-mono">{selectedAlert.affectedIp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Target System:</span>
                <span className="text-[#E0F2FE]">{selectedAlert.targetResource}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">MITRE Technique:</span>
                <span className="text-[#9D4EDD]">{selectedAlert.mitreTechnique}</span>
              </div>
            </div>

            {/* Forensic Evidence Items */}
            <div>
              <div className="text-[11px] font-bold text-[#FFFFFF] uppercase mb-2">Forensic Evidence Chain</div>
              <div className="space-y-1">
                {selectedAlert.evidence.map((ev, i) => (
                  <div key={i} className="p-2 rounded bg-[#050811] border border-[#1E293B] text-[10px] text-[#E0F2FE]">
                    • {ev}
                  </div>
                ))}
              </div>
            </div>

            {/* Containment Dispatch Actions */}
            <div className="pt-2 border-t border-[#1E293B] space-y-2">
              <div className="text-[10px] font-bold text-[#94A3B8] uppercase">Emergency Containment</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onContainmentAction(selectedAlert, 'BLOCK_IP')}
                  disabled={selectedAlert.status === 'CONTAINED'}
                  className="py-2 px-2.5 rounded-lg bg-[#FF0055]/15 hover:bg-[#FF0055]/25 border border-[#FF0055]/60 text-[#FF0055] text-[11px] font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-40"
                >
                  <ShieldBan className="w-3.5 h-3.5" />
                  Quarantine IP
                </button>
                <button
                  onClick={() => onContainmentAction(selectedAlert, 'REVOKE_SESSION')}
                  disabled={selectedAlert.status === 'CONTAINED'}
                  className="py-2 px-2.5 rounded-lg bg-[#9D4EDD]/15 hover:bg-[#9D4EDD]/25 border border-[#9D4EDD]/60 text-[#9D4EDD] text-[11px] font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-40"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Revoke Token
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
