import React from 'react';
import { 
  Radio, 
  Users, 
  KeyRound, 
  AlertTriangle, 
  ShieldAlert, 
  XCircle, 
  TrendingUp, 
  ShieldCheck, 
  ShieldX
} from 'lucide-react';
import { AccessLog, ThreatAlert } from '../types';
import { INITIAL_USERS } from '../data/mockCampusData';

interface MetricsOverviewProps {
  logs: AccessLog[];
  alerts: ThreatAlert[];
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ logs, alerts }) => {
  const totalLogs = logs.length;
  const totalUsers = INITIAL_USERS.length;
  const activeSessions = new Set(logs.map(l => l.sessionId)).size;
  const suspiciousActivities = logs.filter(l => l.isAnomaly || l.threatScore > 50).length;
  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL' && a.status !== 'CONTAINED').length;
  const failedLogins = logs.filter(l => l.status === 'FAILURE' || l.action === 'LOGIN_FAIL').length;
  const anomalyCount = logs.filter(l => l.isAnomaly).length;
  const anomalyRate = totalLogs > 0 ? ((anomalyCount / totalLogs) * 100).toFixed(1) : '0.0';

  // System Security Status determination
  let statusText = 'GUARDED (DEFCON 4)';
  let statusColor = 'text-[#00FF87]';
  let statusBorder = 'border-[#00FF87]/50';
  let statusGlow = 'glow-emerald';
  let statusDot = 'bg-[#00FF87]';

  if (criticalAlerts > 1) {
    statusText = 'CRITICAL (DEFCON 1)';
    statusColor = 'text-[#FF0055]';
    statusBorder = 'border-[#FF0055]/80';
    statusGlow = 'glow-crimson animate-threat-pulse';
    statusDot = 'bg-[#FF0055] animate-ping';
  } else if (criticalAlerts === 1 || suspiciousActivities > 5) {
    statusText = 'ELEVATED (DEFCON 2)';
    statusColor = 'text-[#FF6B00]';
    statusBorder = 'border-[#FF6B00]/70';
    statusGlow = 'glow-orange';
    statusDot = 'bg-[#FF6B00] animate-pulse';
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 font-mono">
      {/* 1. Total Access Logs */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] hover:border-[#00F0FF]/60 rounded-xl p-2.5 flex flex-col justify-between transition group">
        <div className="flex items-center justify-between text-[#94A3B8] text-[10px]">
          <span>TOTAL LOGS</span>
          <Radio className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
        </div>
        <div className="text-lg font-bold text-[#FFFFFF] mt-1 group-hover:text-[#00F0FF] transition">
          {totalLogs.toLocaleString()}
        </div>
        <div className="text-[10px] text-[#00F0FF] mt-1 truncate">
          Ingested In Buffer
        </div>
      </div>

      {/* 2. Total Users */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] hover:border-[#00F0FF]/60 rounded-xl p-2.5 flex flex-col justify-between transition group">
        <div className="flex items-center justify-between text-[#94A3B8] text-[10px]">
          <span>CAMPUS USERS</span>
          <Users className="w-3.5 h-3.5 text-[#00F0FF]" />
        </div>
        <div className="text-lg font-bold text-[#FFFFFF] mt-1 group-hover:text-[#00F0FF] transition">
          {totalUsers}
        </div>
        <div className="text-[10px] text-[#94A3B8] mt-1 truncate">
          Students & Staff
        </div>
      </div>

      {/* 3. Active Sessions */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] hover:border-[#9D4EDD]/60 rounded-xl p-2.5 flex flex-col justify-between transition group">
        <div className="flex items-center justify-between text-[#94A3B8] text-[10px]">
          <span>ACTIVE SESSIONS</span>
          <KeyRound className="w-3.5 h-3.5 text-[#9D4EDD]" />
        </div>
        <div className="text-lg font-bold text-[#9D4EDD] mt-1">
          {activeSessions}
        </div>
        <div className="text-[10px] text-[#94A3B8] mt-1 truncate">
          Bearer Tokens
        </div>
      </div>

      {/* 4. Suspicious Activities */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] hover:border-[#FF6B00]/60 rounded-xl p-2.5 flex flex-col justify-between transition group">
        <div className="flex items-center justify-between text-[#94A3B8] text-[10px]">
          <span>SUSPICIOUS</span>
          <AlertTriangle className="w-3.5 h-3.5 text-[#FF6B00]" />
        </div>
        <div className="text-lg font-bold text-[#FF6B00] mt-1">
          {suspiciousActivities}
        </div>
        <div className="text-[10px] text-[#FF6B00] mt-1 truncate">
          Score &gt; 50
        </div>
      </div>

      {/* 5. Critical Alerts */}
      <div className={`bg-[#0D1527]/95 backdrop-blur-md border ${criticalAlerts > 0 ? 'border-[#FF0055]/80 glow-crimson animate-threat-pulse' : 'border-[#1E293B]'} rounded-xl p-2.5 flex flex-col justify-between transition group`}>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-[#FF0055] font-bold">CRITICAL</span>
          <ShieldAlert className="w-3.5 h-3.5 text-[#FF0055]" />
        </div>
        <div className="text-lg font-bold text-[#FF0055] mt-1">
          {criticalAlerts}
        </div>
        <div className="text-[10px] text-[#FF0055] mt-1 truncate font-bold">
          Active Triage
        </div>
      </div>

      {/* 6. Failed Login Attempts */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] hover:border-[#FF6B00]/60 rounded-xl p-2.5 flex flex-col justify-between transition group">
        <div className="flex items-center justify-between text-[#94A3B8] text-[10px]">
          <span>FAILED LOGINS</span>
          <XCircle className="w-3.5 h-3.5 text-[#FF6B00]" />
        </div>
        <div className="text-lg font-bold text-[#FFFFFF] mt-1 group-hover:text-[#FF6B00] transition">
          {failedLogins}
        </div>
        <div className="text-[10px] text-[#94A3B8] mt-1 truncate">
          Auth Rejections
        </div>
      </div>

      {/* 7. Anomaly Detection Rate */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] hover:border-[#00F0FF]/60 rounded-xl p-2.5 flex flex-col justify-between transition group">
        <div className="flex items-center justify-between text-[#94A3B8] text-[10px]">
          <span>ANOMALY RATE</span>
          <TrendingUp className="w-3.5 h-3.5 text-[#00F0FF]" />
        </div>
        <div className="text-lg font-bold text-[#00F0FF] mt-1">
          {anomalyRate}%
        </div>
        <div className="text-[10px] text-[#00F0FF] mt-1 truncate">
          Gaussian 3σ Model
        </div>
      </div>

      {/* 8. System Security Status */}
      <div className={`bg-[#0D1527]/95 backdrop-blur-md border ${statusBorder} ${statusGlow} rounded-xl p-2.5 flex flex-col justify-between transition`}>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-[#94A3B8]">STATUS</span>
          <span className={`w-2 h-2 rounded-full ${statusDot}`}></span>
        </div>
        <div className={`text-xs font-bold ${statusColor} mt-1 leading-tight`}>
          {statusText}
        </div>
        <div className="text-[10px] text-[#94A3B8] mt-1 truncate">
          RADIUS & Firewall
        </div>
      </div>
    </div>
  );
};
