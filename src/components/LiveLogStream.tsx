import React, { useState } from 'react';
import { 
  Search, 
  Terminal, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  Clock,
  Layers,
  Download,
  Building,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { AccessLog } from '../types';

interface LiveLogStreamProps {
  logs: AccessLog[];
  onSelectLog: (log: AccessLog) => void;
  selectedLogId?: string;
}

export const LiveLogStream: React.FC<LiveLogStreamProps> = ({ logs, onSelectLog, selectedLogId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'ALL' | 'ANOMALY_ONLY' | 'FAILURES'>('ALL');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<'ALL' | 'CRITICAL' | 'MEDIUM' | 'SAFE'>('ALL');

  // Building options from campus topology
  const buildingOptions = [
    { id: 'ALL', label: 'All Campus Buildings & Nodes' },
    { id: 'Dorm', label: 'West Quad Dormitories' },
    { id: 'Library', label: 'Library & Commons WiFi' },
    { id: 'Physics', label: 'Science & Physics Complex' },
    { id: 'Tor', label: 'External Tor Exit (Frankfurt)' },
  ];

  const filteredLogs = logs.filter(log => {
    // Mode filter
    if (filterMode === 'ANOMALY_ONLY' && !log.isAnomaly) return false;
    if (filterMode === 'FAILURES' && log.status !== 'FAILURE' && log.status !== 'BLOCKED') return false;

    // Building filter
    if (selectedBuilding !== 'ALL' && !log.building.toLowerCase().includes(selectedBuilding.toLowerCase())) {
      return false;
    }

    // Severity filter
    if (selectedSeverity === 'CRITICAL' && log.threatScore <= 80) return false;
    if (selectedSeverity === 'MEDIUM' && (log.threatScore <= 40 || log.threatScore > 80)) return false;
    if (selectedSeverity === 'SAFE' && log.threatScore > 40) return false;

    // Text search
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      log.username.toLowerCase().includes(term) ||
      log.ipAddress.toLowerCase().includes(term) ||
      log.targetResource.toLowerCase().includes(term) ||
      log.subnet.toLowerCase().includes(term) ||
      log.building.toLowerCase().includes(term) ||
      (log.anomalyType && log.anomalyType.toLowerCase().includes(term)) ||
      (log.details && log.details.toLowerCase().includes(term))
    );
  });

  // Export filtered logs as CSV
  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Log_ID', 'User', 'IP_Address', 'Subnet', 'Building', 'Resource', 'Action', 'Status', 'Latency_ms', 'Threat_Score', 'Is_Anomaly'];
    const rows = filteredLogs.map(l => [
      `"${l.timestamp}"`,
      `"${l.id}"`,
      `"${l.username}"`,
      `"${l.ipAddress}"`,
      `"${l.subnet}"`,
      `"${l.building}"`,
      `"${l.targetResource}"`,
      `"${l.action}"`,
      `"${l.status}"`,
      l.latencyMs,
      l.threatScore,
      l.isAnomaly
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Campus_Access_Logs_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export filtered logs as JSON
  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Campus_Access_Logs_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0D1527]/95 backdrop-blur-md border border-[#1E293B] rounded-xl flex flex-col h-[580px] overflow-hidden shadow-2xl font-mono">
      {/* Top Filter & Search Controls */}
      <div className="p-3 border-b border-[#1E293B] bg-[#050811]/90 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Section Title & Count */}
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-xs font-bold text-[#FFFFFF] tracking-wider uppercase">
            LIVE CAMPUS INGESTION STREAM
          </span>
          <span className="text-[10px] bg-[#0D1527] text-[#00F0FF] border border-[#00F0FF]/40 px-2 py-0.5 rounded shadow-sm">
            {filteredLogs.length} / {logs.length} events
          </span>
        </div>

        {/* Center: Filter Mode Pills */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            id="filter-all-logs"
            onClick={() => setFilterMode('ALL')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
              filterMode === 'ALL'
                ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/60 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                : 'text-[#94A3B8] hover:text-[#FFFFFF]'
            }`}
          >
            All Logs
          </button>
          <button
            id="filter-anomalies-logs"
            onClick={() => setFilterMode('ANOMALY_ONLY')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition ${
              filterMode === 'ANOMALY_ONLY'
                ? 'bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/60 shadow-[0_0_10px_rgba(255,0,85,0.3)]'
                : 'text-[#94A3B8] hover:text-[#FF0055]'
            }`}
          >
            <ShieldAlert className="w-3 h-3 text-[#FF0055]" />
            Anomalies ({logs.filter(l => l.isAnomaly).length})
          </button>
          <button
            id="filter-failures-logs"
            onClick={() => setFilterMode('FAILURES')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
              filterMode === 'FAILURES'
                ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/60'
                : 'text-[#94A3B8] hover:text-[#FF6B00]'
            }`}
          >
            Blocked / Fails
          </button>
        </div>

        {/* Right: Search & Export actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Building Selector */}
          <select
            value={selectedBuilding}
            onChange={e => setSelectedBuilding(e.target.value)}
            className="bg-[#050811] border border-[#1E293B] text-[#E0F2FE] text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-[#00F0FF]/60"
          >
            {buildingOptions.map(b => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>

          {/* Severity Selector */}
          <select
            value={selectedSeverity}
            onChange={e => setSelectedSeverity(e.target.value as any)}
            className="bg-[#050811] border border-[#1E293B] text-[#E0F2FE] text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-[#00F0FF]/60"
          >
            <option value="ALL">Severity: All</option>
            <option value="CRITICAL">Critical (&gt;80)</option>
            <option value="MEDIUM">Medium (40-80)</option>
            <option value="SAFE">Safe (&lt;40)</option>
          </select>

          {/* Search Box */}
          <div className="relative w-44">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-logs"
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search user, IP, app..."
              className="w-full bg-[#050811] border border-[#1E293B] rounded-lg pl-8 pr-2 py-1 text-xs text-[#E0F2FE] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00F0FF]/60"
            />
          </div>

          {/* Export Buttons */}
          <button
            onClick={handleExportCSV}
            className="px-2 py-1 rounded bg-[#050811] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-[#00F0FF] text-[11px] flex items-center gap-1 transition"
            title="Download CSV"
          >
            <Download className="w-3 h-3" />
            CSV
          </button>
          <button
            onClick={handleExportJSON}
            className="px-2 py-1 rounded bg-[#050811] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-[#00F0FF] text-[11px] flex items-center gap-1 transition"
            title="Download JSON"
          >
            <Download className="w-3 h-3" />
            JSON
          </button>
        </div>
      </div>

      {/* Log Feed Table Header */}
      <div className="grid grid-cols-12 px-3 py-2 bg-[#050811] text-[10px] font-bold text-[#FFFFFF] border-b border-[#1E293B] uppercase tracking-wider">
        <div className="col-span-2 flex items-center gap-1 text-[#94A3B8]">
          <Clock className="w-3 h-3 text-[#00F0FF]" />
          Timestamp
        </div>
        <div className="col-span-2 text-[#FFFFFF]">User / Identity</div>
        <div className="col-span-3 text-[#FFFFFF]">Origin Subnet / IP</div>
        <div className="col-span-2 text-[#FFFFFF]">Target Resource</div>
        <div className="col-span-2 text-[#FFFFFF]">Action / Status</div>
        <div className="col-span-1 text-right text-[#FFFFFF]">Risk Score</div>
      </div>

      {/* Logs Scroll Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#1E293B]">
        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-[#94A3B8] text-xs">
            No matching campus log events found with current filter parameters.
          </div>
        ) : (
          filteredLogs.map(log => {
            const isSelected = selectedLogId === log.id;
            return (
              <div
                key={log.id}
                id={`log-item-${log.id}`}
                onClick={() => onSelectLog(log)}
                className={`grid grid-cols-12 px-3 py-2 text-xs items-center cursor-pointer transition ${
                  isSelected
                    ? 'bg-[#00F0FF]/15 border-l-2 border-[#00F0FF]'
                    : log.isAnomaly
                    ? 'bg-[#FF0055]/10 hover:bg-[#FF0055]/20 border-l-2 border-[#FF0055]'
                    : 'hover:bg-[#1E293B]/40 border-l-2 border-transparent'
                }`}
              >
                {/* Timestamp */}
                <div className="col-span-2 text-[#94A3B8] text-[11px] truncate">
                  {log.timestamp.split(' ')[1] || log.timestamp}
                </div>

                {/* User */}
                <div className="col-span-2 flex items-center gap-1.5 truncate">
                  <span className={`w-2 h-2 rounded-full ${log.isAnomaly ? 'bg-[#FF0055] animate-ping shadow-[0_0_6px_#FF0055]' : 'bg-[#00FF87] shadow-[0_0_6px_#00FF87]'}`}></span>
                  <span className="text-[#E0F2FE] font-semibold truncate">{log.username}</span>
                </div>

                {/* Origin IP & Subnet */}
                <div className="col-span-3 truncate text-[#E0F2FE]">
                  <div className="truncate flex items-center gap-1">
                    <span className="text-[#00F0FF]">{log.ipAddress}</span>
                    <span className="text-[10px] text-[#94A3B8] truncate">({log.building})</span>
                  </div>
                </div>

                {/* Target Resource */}
                <div className="col-span-2 truncate">
                  <span className="px-1.5 py-0.5 rounded bg-[#050811] text-[11px] text-[#9D4EDD] border border-[#9D4EDD]/40 font-bold">
                    {log.targetResource}
                  </span>
                </div>

                {/* Action & Status */}
                <div className="col-span-2 flex items-center gap-1.5 truncate">
                  {log.status === 'SUCCESS' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF87] shrink-0" />
                  ) : log.status === 'BLOCKED' ? (
                    <AlertOctagon className="w-3.5 h-3.5 text-[#FF0055] shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                  )}
                  <span className="text-[11px] text-[#E0F2FE] truncate">{log.action}</span>
                  {log.anomalyType && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/60 font-bold shrink-0">
                      {log.anomalyType === 'IMPOSSIBLE_TRAVEL' ? 'VELOCITY' : log.anomalyType === 'OFF_HOURS_BRUTE_FORCE' ? 'BURST' : 'PIVOT'}
                    </span>
                  )}
                </div>

                {/* Threat Score */}
                <div className="col-span-1 text-right font-bold">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[11px] ${
                      log.threatScore > 80
                        ? 'bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/70 shadow-[0_0_8px_rgba(255,0,85,0.3)]'
                        : log.threatScore > 40
                        ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/70'
                        : 'text-[#94A3B8]'
                    }`}
                  >
                    {log.threatScore}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Footer Details */}
      <div className="p-2.5 border-t border-[#1E293B] bg-[#050811] text-[11px] text-[#94A3B8] flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
          Click any row to open Deep Forensics drawer (token traces, Z-score calculations & raw payloads).
        </span>
        <span className="text-[#00FF87] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse shadow-[0_0_6px_#00FF87]"></span>
          Sliding Queue: 100 Event Buffer
        </span>
      </div>
    </div>
  );
};
