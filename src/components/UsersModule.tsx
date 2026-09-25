import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Shield, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Key, 
  Activity, 
  Filter,
  UserCheck,
  UserX,
  ExternalLink
} from 'lucide-react';
import { User, AccessLog } from '../types';
import { INITIAL_USERS, CAMPUS_SUBNETS } from '../data/mockCampusData';

interface UsersModuleProps {
  logs: AccessLog[];
  onTraceUserInGraph?: (username: string) => void;
  onFilterUserLogs?: (username: string) => void;
}

export const UsersModule: React.FC<UsersModuleProps> = ({ logs, onTraceUserInGraph, onFilterUserLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'student' | 'faculty' | 'sysadmin'>('ALL');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'HIGH' | 'LOW'>('ALL');
  const [selectedUser, setSelectedUser] = useState<User>(INITIAL_USERS[0]);

  const filteredUsers = INITIAL_USERS.filter(u => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (riskFilter === 'HIGH' && u.riskScore < 50) return false;
    if (riskFilter === 'LOW' && u.riskScore >= 50) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      u.username.toLowerCase().includes(term) ||
      u.fullName.toLowerCase().includes(term) ||
      u.department.toLowerCase().includes(term) ||
      u.id.toLowerCase().includes(term)
    );
  });

  const getUserLogs = (userId: string) => {
    return logs.filter(l => l.userId === userId);
  };

  const selectedUserLogs = getUserLogs(selectedUser.id);
  const selectedUserAnomalies = selectedUserLogs.filter(l => l.isAnomaly);

  return (
    <div className="space-y-4 font-mono">
      {/* Top Banner */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            CAMPUS IDENTITY DIRECTORY & THREAT PROFILING
          </div>
          <h2 className="text-lg font-bold text-[#FFFFFF] mt-1">
            Registered Identities & Privilege Tiering
          </h2>
          <p className="text-xs text-[#94A3B8] max-w-3xl mt-0.5">
            Role-Based Access Control (RBAC), Departmental classification, assigned primary subnets, and live composite risk scores calculated from anomalous telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#050811] border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-bold">
            Total Identities: {INITIAL_USERS.length}
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#FF0055]/20 border border-[#FF0055]/50 text-[#FF0055] text-xs font-bold">
            Flagged: {INITIAL_USERS.filter(u => u.isFlagged).length}
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
              placeholder="Search by username, name, department, or student ID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#050811] border border-[#1E293B] focus:border-[#00F0FF] rounded-lg pl-9 pr-3 py-2 text-[#E0F2FE] placeholder-[#94A3B8] outline-none text-xs transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Role Filter */}
          <div className="flex items-center bg-[#050811] border border-[#1E293B] rounded-lg p-0.5">
            {(['ALL', 'student', 'faculty', 'sysadmin'] as const).map(role => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-2.5 py-1 rounded text-[11px] capitalize transition ${
                  roleFilter === role
                    ? 'bg-[#00F0FF]/25 text-[#00F0FF] font-bold border border-[#00F0FF]/50'
                    : 'text-[#94A3B8] hover:text-[#FFFFFF]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Risk Filter */}
          <div className="flex items-center bg-[#050811] border border-[#1E293B] rounded-lg p-0.5">
            {(['ALL', 'HIGH', 'LOW'] as const).map(risk => (
              <button
                key={risk}
                onClick={() => setRiskFilter(risk)}
                className={`px-2.5 py-1 rounded text-[11px] transition ${
                  riskFilter === risk
                    ? 'bg-[#FF6B00]/25 text-[#FF6B00] font-bold border border-[#FF6B00]/50'
                    : 'text-[#94A3B8] hover:text-[#FFFFFF]'
                }`}
              >
                {risk === 'ALL' ? 'All Risks' : risk === 'HIGH' ? 'High Risk (>50)' : 'Normal (<50)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split: User List and Selected User Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: User Cards */}
        <div className="lg:col-span-2 space-y-2.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredUsers.map(user => {
              const isSelected = selectedUser.id === user.id;
              const isHighRisk = user.riskScore >= 70;
              const isMedRisk = user.riskScore >= 40 && user.riskScore < 70;

              return (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition relative overflow-hidden backdrop-blur-md ${
                    isSelected
                      ? 'bg-[#0D1527] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                      : 'bg-[#0D1527]/70 border-[#1E293B] hover:border-[#00F0FF]/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#FFFFFF]">{user.fullName}</span>
                        {user.isFlagged && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/60 font-bold">
                            FLAGGED
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#00F0FF] mt-0.5">@{user.username} • {user.id}</div>
                    </div>

                    <div className="text-right">
                      <div className={`text-base font-bold ${
                        isHighRisk ? 'text-[#FF0055]' : isMedRisk ? 'text-[#FF6B00]' : 'text-[#00FF87]'
                      }`}>
                        {user.riskScore}
                        <span className="text-[10px] text-[#94A3B8] font-normal">/100</span>
                      </div>
                      <span className="text-[9px] text-[#94A3B8] uppercase">Risk Score</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#1E293B] space-y-1 text-[11px] text-[#94A3B8]">
                    <div className="flex justify-between">
                      <span>Role & Tier:</span>
                      <span className="text-[#E0F2FE] capitalize font-medium">{user.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Department:</span>
                      <span className="text-[#E0F2FE] truncate max-w-[180px]">{user.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Primary Subnet:</span>
                      <span className="text-[#9D4EDD]">{user.primarySubnet}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Identity Deep-Dive Profile */}
        <div className="bg-[#0D1527]/90 border border-[#1E293B] rounded-xl p-4 space-y-4">
          <div className="border-b border-[#1E293B] pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#00F0FF]" />
              <h3 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
                Identity Profile Dossier
              </h3>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
              selectedUser.riskScore > 60 ? 'bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/50' : 'bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/50'
            }`}>
              {selectedUser.riskScore > 60 ? 'THREAT LEVEL: HIGH' : 'THREAT LEVEL: NORMAL'}
            </span>
          </div>

          <div>
            <h4 className="text-base font-bold text-[#FFFFFF]">{selectedUser.fullName}</h4>
            <div className="text-xs text-[#00F0FF]">Account ID: {selectedUser.id}</div>
            <p className="text-xs text-[#94A3B8] mt-1">Department of {selectedUser.department}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#050811] border border-[#1E293B]">
              <div className="text-[10px] text-[#94A3B8]">ACCESS LOGS</div>
              <div className="text-base font-bold text-[#FFFFFF] mt-0.5">{selectedUserLogs.length}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#050811] border border-[#1E293B]">
              <div className="text-[10px] text-[#FF0055]">DETECTED ANOMALIES</div>
              <div className="text-base font-bold text-[#FF0055] mt-0.5">{selectedUserAnomalies.length}</div>
            </div>
          </div>

          {/* Action triggers */}
          <div className="space-y-2 pt-2 border-t border-[#1E293B]">
            {onTraceUserInGraph && (
              <button
                onClick={() => onTraceUserInGraph(selectedUser.username)}
                className="w-full py-2 px-3 rounded-lg bg-[#9D4EDD]/20 hover:bg-[#9D4EDD]/30 border border-[#9D4EDD]/60 text-[#9D4EDD] text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Activity className="w-3.5 h-3.5" />
                Trace in Access Pattern Graph
              </button>
            )}
            {onFilterUserLogs && (
              <button
                onClick={() => onFilterUserLogs(selectedUser.username)}
                className="w-full py-2 px-3 rounded-lg bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/50 text-[#00F0FF] text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Filter className="w-3.5 h-3.5" />
                View Filtered Access Logs
              </button>
            )}
          </div>

          {/* Recent activity snippet */}
          <div className="pt-2 border-t border-[#1E293B]">
            <div className="text-[11px] font-bold text-[#94A3B8] uppercase mb-2">Recent Ingested Events</div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {selectedUserLogs.length === 0 ? (
                <div className="text-xs text-[#94A3B8] italic">No active logs in current window buffer.</div>
              ) : (
                selectedUserLogs.slice(0, 4).map(l => (
                  <div key={l.id} className="p-2 rounded bg-[#050811] border border-[#1E293B] text-[10px] space-y-0.5">
                    <div className="flex justify-between text-[#E0F2FE]">
                      <span className="font-bold">{l.targetResource}</span>
                      <span className={l.isAnomaly ? 'text-[#FF0055] font-bold' : 'text-[#00FF87]'}>{l.action}</span>
                    </div>
                    <div className="flex justify-between text-[#94A3B8]">
                      <span>{l.ipAddress}</span>
                      <span>Score: {l.threatScore}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
