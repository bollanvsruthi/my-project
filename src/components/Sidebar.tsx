import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  KeyRound,
  ShieldAlert,
  Network,
  Database,
  Bell,
  BarChart3,
  Layers,
  Settings,
  Shield,
  Radio,
  Flame,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { ThreatAlert } from '../types';

export type NavTabId =
  | 'dashboard'
  | 'logs'
  | 'users'
  | 'sessions'
  | 'anomalies'
  | 'graph'
  | 'sql'
  | 'alerts'
  | 'reports'
  | 'architecture'
  | 'settings'
  | 'presentation';

interface SidebarProps {
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
  unresolvedAlertCount: number;
  anomalyCount: number;
  isStreaming: boolean;
  onOpenViva: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  unresolvedAlertCount,
  anomalyCount,
  isStreaming,
  onOpenViva
}) => {
  const navItems = [
    { id: 'dashboard' as NavTabId, label: 'Dashboard', icon: LayoutDashboard, badge: null, color: 'text-[#00F0FF]' },
    { id: 'logs' as NavTabId, label: 'Access Logs', icon: FileText, badge: 'Live', color: 'text-[#00FF87]' },
    { id: 'users' as NavTabId, label: 'Users', icon: Users, badge: null, color: 'text-[#00F0FF]' },
    { id: 'sessions' as NavTabId, label: 'Sessions', icon: KeyRound, badge: null, color: 'text-[#9D4EDD]' },
    { id: 'anomalies' as NavTabId, label: 'Anomaly Detection', icon: ShieldAlert, badge: anomalyCount > 0 ? `${anomalyCount}` : null, color: 'text-[#FF6B00]' },
    { id: 'graph' as NavTabId, label: 'Access Pattern Graph', icon: Network, badge: null, color: 'text-[#9D4EDD]' },
    { id: 'sql' as NavTabId, label: 'SQL Analytics', icon: Database, badge: null, color: 'text-[#00FF87]' },
    { id: 'alerts' as NavTabId, label: 'Security Alerts', icon: Bell, badge: unresolvedAlertCount > 0 ? `${unresolvedAlertCount}` : null, color: 'text-[#FF0055]' },
    { id: 'reports' as NavTabId, label: 'Reports', icon: BarChart3, badge: null, color: 'text-[#00F0FF]' },
    { id: 'architecture' as NavTabId, label: 'System Architecture', icon: Layers, badge: null, color: 'text-[#9D4EDD]' },
    { id: 'presentation' as NavTabId, label: 'Presentation (4-Slide)', icon: GraduationCap, badge: 'Deck', color: 'text-[#FF6B00]' },
    { id: 'settings' as NavTabId, label: 'Settings', icon: Settings, badge: null, color: 'text-[#94A3B8]' },
  ];

  return (
    <aside className="w-64 bg-[#050811] border-r border-[#1E293B] flex flex-col justify-between shrink-0 select-none z-30">
      {/* Top Section: Brand & Telemetry */}
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-[#1E293B] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0D1527] border border-[#00F0FF]/60 flex items-center justify-center glow-cyan shrink-0">
            <Shield className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-sm text-[#FFFFFF] tracking-tight truncate">
                CYBERWATCH
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 font-mono font-bold">
                SOC
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] font-mono truncate">
              Access Log Monitoring
            </p>
          </div>
        </div>

        {/* Real-time Status Chip */}
        <div className="px-4 py-2.5 bg-[#0D1527]/50 border-b border-[#1E293B]/70 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-[#00FF87] animate-pulse shadow-[0_0_8px_#00FF87]' : 'bg-[#94A3B8]'}`} />
            <span className="text-[11px] text-[#E0F2FE]">
              {isStreaming ? 'INGESTION ACTIVE' : 'INGESTION PAUSED'}
            </span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#9D4EDD]/20 text-[#9D4EDD] font-bold border border-[#9D4EDD]/40">
            TEAM-15
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1 font-mono text-xs overflow-y-auto max-h-[calc(100vh-270px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition group ${
                  isActive
                    ? 'bg-[#0D1527] text-[#FFFFFF] border border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,240,255,0.15)] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-[#0D1527]/40 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition ${
                      isActive ? item.color : 'text-[#94A3B8] group-hover:text-[#E0F2FE]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        item.id === 'alerts'
                          ? 'bg-[#FF0055] text-white animate-pulse shadow-[0_0_8px_#FF0055]'
                          : item.id === 'anomalies'
                          ? 'bg-[#FF6B00]/25 text-[#FF6B00] border border-[#FF6B00]/50'
                          : 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Viva Mentor Assistant & Academic Badges */}
      <div className="p-3 border-t border-[#1E293B] space-y-2 font-mono">
        <button
          onClick={onOpenViva}
          className="w-full p-2.5 rounded-xl bg-gradient-to-r from-[#9D4EDD]/20 via-[#00F0FF]/15 to-[#9D4EDD]/20 border border-[#9D4EDD]/50 hover:border-[#00F0FF] text-[#E0F2FE] transition text-left flex items-center justify-between group shadow-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#050811] border border-[#9D4EDD]/60 flex items-center justify-center text-[#9D4EDD] group-hover:text-[#00F0FF] transition">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white flex items-center gap-1">
                Viva Master Guide
                <span className="text-[9px] px-1 rounded bg-[#00FF87]/20 text-[#00FF87]">EN+TE</span>
              </div>
              <div className="text-[9px] text-[#94A3B8]">DBMS • DMGT • ADSA • Py</div>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#00F0FF] transition" />
        </button>

        <div className="p-2 rounded-lg bg-[#0D1527] border border-[#1E293B] text-[10px] text-[#94A3B8] flex items-center justify-between">
          <span>Campus Security Node</span>
          <span className="text-[#00FF87] font-semibold">10.0.0.1/24</span>
        </div>
      </div>
    </aside>
  );
};
