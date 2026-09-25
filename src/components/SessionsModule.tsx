import React, { useState } from 'react';
import { 
  KeyRound, 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Filter, 
  Smartphone, 
  Laptop, 
  Globe, 
  ShieldBan,
  Activity,
  Lock
} from 'lucide-react';
import { Session, AccessLog } from '../types';
import { INITIAL_USERS } from '../data/mockCampusData';

interface SessionsModuleProps {
  logs: AccessLog[];
  onRevokeSession?: (sessionId: string) => void;
}

export const SessionsModule: React.FC<SessionsModuleProps> = ({ logs, onRevokeSession }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'active' | 'revoked' | 'hijacked'>('ALL');
  const [revokedSessionIds, setRevokedSessionIds] = useState<Set<string>>(new Set());

  // Generate realistic active session records from logs
  const sessionMap = new Map<string, Session>();

  logs.forEach(log => {
    if (!sessionMap.has(log.sessionId)) {
      const isHijacked = log.anomalyType === 'IMPOSSIBLE_TRAVEL' || log.anomalyType === 'SESSION_HIJACK';
      const isRevoked = revokedSessionIds.has(log.sessionId);
      sessionMap.set(log.sessionId, {
        id: log.sessionId,
        userId: log.userId,
        username: log.username,
        token: `eyJhGciOiJIUzI1Ni...${log.sessionId.slice(-6)}`,
        ipAddress: log.ipAddress,
        subnet: log.subnet,
        building: log.building,
        userAgent: log.ipAddress.startsWith('185.220') 
          ? 'Mozilla/5.0 (TorBrowser; rv:115.0) Gecko/20100101 Firefox/115.0'
          : log.building.includes('Dorm') 
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) Mobile/15E148'
          : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0',
        startedAt: log.timestamp,
        status: isRevoked ? 'revoked' : isHijacked ? 'hijacked' : 'active'
      });
    }
  });

  const sessions = Array.from(sessionMap.values());

  const filteredSessions = sessions.filter(s => {
    if (statusFilter !== 'ALL' && s.status !== statusFilter) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.id.toLowerCase().includes(term) ||
      s.username.toLowerCase().includes(term) ||
      s.ipAddress.toLowerCase().includes(term) ||
      s.building.toLowerCase().includes(term) ||
      s.userAgent.toLowerCase().includes(term)
    );
  });

  const handleRevoke = (id: string) => {
    setRevokedSessionIds(prev => new Set(prev).add(id));
    if (onRevokeSession) onRevokeSession(id);
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Top Banner */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#9D4EDD] text-xs font-bold uppercase tracking-wider">
            <KeyRound className="w-4 h-4" />
            CAMPUS ACTIVE SESSION TOKEN MANAGEMENT & FORENSICS
          </div>
          <h2 className="text-lg font-bold text-[#FFFFFF] mt-1">
            Bearer Token Registry & Multi-Tenancy Tracking
          </h2>
          <p className="text-xs text-[#94A3B8] max-w-3xl mt-0.5">
            Active session tokens, IP allocations, user-agent fingerprints, and real-time hijacking flags. Implements one-click emergency session revocation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#050811] border border-[#9D4EDD]/50 text-[#9D4EDD] text-xs font-bold">
            Total Sessions: {sessions.length}
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#FF0055]/20 border border-[#FF0055]/50 text-[#FF0055] text-xs font-bold">
            Hijacked Tokens: {sessions.filter(s => s.status === 'hijacked').length}
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
              placeholder="Search by session ID, username, IP address, or user agent..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#050811] border border-[#1E293B] focus:border-[#9D4EDD] rounded-lg pl-9 pr-3 py-2 text-[#E0F2FE] placeholder-[#94A3B8] outline-none text-xs transition"
            />
          </div>
        </div>

        <div className="flex items-center bg-[#050811] border border-[#1E293B] rounded-lg p-0.5">
          {(['ALL', 'active', 'hijacked', 'revoked'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded text-[11px] capitalize transition ${
                statusFilter === status
                  ? 'bg-[#9D4EDD]/25 text-[#9D4EDD] font-bold border border-[#9D4EDD]/50'
                  : 'text-[#94A3B8] hover:text-[#FFFFFF]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSessions.map(session => {
          const isHijacked = session.status === 'hijacked';
          const isRevoked = session.status === 'revoked';

          return (
            <div
              key={session.id}
              className={`p-3.5 rounded-xl border flex flex-col justify-between transition relative overflow-hidden backdrop-blur-md ${
                isHijacked
                  ? 'bg-[#0D1527]/95 border-[#FF0055]/80 glow-crimson animate-threat-pulse'
                  : isRevoked
                  ? 'bg-[#0D1527]/60 border-[#1E293B] opacity-60'
                  : 'bg-[#0D1527]/80 border-[#1E293B] hover:border-[#9D4EDD]/60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#FFFFFF]">{session.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      isHijacked
                        ? 'bg-[#FF0055]/25 text-[#FF0055] border border-[#FF0055]'
                        : isRevoked
                        ? 'bg-slate-800 text-slate-400 border border-slate-700'
                        : 'bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#94A3B8]">{session.startedAt.split(' ')[1]}</span>
                </div>

                <div className="text-xs text-[#00F0FF] mt-1 font-semibold">
                  Identity: @{session.username} ({session.userId})
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-[#050811] border border-[#1E293B] space-y-1 text-[11px] text-[#94A3B8]">
                  <div className="flex justify-between">
                    <span>IP Address:</span>
                    <span className={isHijacked ? 'text-[#FF0055] font-bold' : 'text-[#E0F2FE]'}>{session.ipAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="text-[#E0F2FE] truncate max-w-[180px]">{session.building}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subnet CIDR:</span>
                    <span className="text-[#9D4EDD]">{session.subnet}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#1E293B]/60 text-[10px]">
                    <span>Bearer Hash:</span>
                    <span className="text-slate-400 font-mono">{session.token}</span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-[#94A3B8] truncate flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#94A3B8] shrink-0" />
                  <span className="truncate">{session.userAgent}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-2.5 border-t border-[#1E293B] flex items-center justify-between">
                <span className="text-[10px] text-[#94A3B8]">Token Lifecycle</span>
                {isRevoked ? (
                  <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Inactive
                  </span>
                ) : (
                  <button
                    onClick={() => handleRevoke(session.id)}
                    className="px-2.5 py-1 rounded bg-[#FF0055]/15 hover:bg-[#FF0055]/25 border border-[#FF0055]/60 text-[#FF0055] text-xs font-bold flex items-center gap-1 transition"
                  >
                    <ShieldBan className="w-3 h-3" />
                    Revoke Token
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
