import React, { useState, useEffect } from 'react';
import { Sidebar, NavTabId } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { MetricsOverview } from './components/MetricsOverview';
import { SOCCharts } from './components/SOCCharts';
import { LiveLogStream } from './components/LiveLogStream';
import { AlertCards } from './components/AlertCards';
import { AccessPatternGraph } from './components/AccessPatternGraph';
import { DBMSModule } from './components/DBMSModule';
import { DMGTModule } from './components/DMGTModule';
import { ADSAModule } from './components/ADSAModule';
import { OOPJPythonModule } from './components/OOPJPythonModule';
import { PresentationDeck } from './components/PresentationDeck';
import { UsersModule } from './components/UsersModule';
import { SessionsModule } from './components/SessionsModule';
import { AnomalyDetectionView } from './components/AnomalyDetectionView';
import { SecurityAlertsView } from './components/SecurityAlertsView';
import { ReportsView } from './components/ReportsView';
import { SystemArchitectureView } from './components/SystemArchitectureView';
import { SettingsView } from './components/SettingsView';
import { ContainmentModal } from './components/ContainmentModal';
import { LogDetailDrawer } from './components/LogDetailDrawer';
import { SecurityReportModal } from './components/SecurityReportModal';
import { VivaDemoModal } from './components/VivaDemoModal';
import { Footer } from './components/Footer';
import { 
  INITIAL_LOGS, 
  INITIAL_ALERTS, 
  INITIAL_GRAPH_NODES, 
  INITIAL_GRAPH_EDGES,
  INITIAL_USERS,
  CAMPUS_SUBNETS 
} from './data/mockCampusData';
import { AccessLog, ThreatAlert, GraphNode, GraphEdge } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');
  const [logs, setLogs] = useState<AccessLog[]>(INITIAL_LOGS);
  const [alerts, setAlerts] = useState<ThreatAlert[]>(INITIAL_ALERTS);
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_GRAPH_NODES);
  const [edges, setEdges] = useState<GraphEdge[]>(INITIAL_GRAPH_EDGES);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [streamSpeed, setStreamSpeed] = useState<number>(4500); // 4500ms default
  const [selectedLog, setSelectedLog] = useState<AccessLog | null>(null);
  const [containmentAlert, setContainmentAlert] = useState<ThreatAlert | null>(null);
  const [containmentAction, setContainmentAction] = useState<'BLOCK_IP' | 'REVOKE_SESSION' | 'REQUIRE_MFA' | null>(null);
  const [highlightAnomalyType, setHighlightAnomalyType] = useState<string | undefined>(undefined);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Modals state
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isVivaOpen, setIsVivaOpen] = useState<boolean>(false);

  // Background streaming simulation of normal campus traffic
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const randomUser = INITIAL_USERS[Math.floor(Math.random() * INITIAL_USERS.length)];
      const resources = ['LMS-Canvas', 'LibraryProxy', 'StudentPortal', 'CampusWiFi-Auth', 'ResearchHPC-Cluster'];
      const randomRes = resources[Math.floor(Math.random() * resources.length)];
      const now = new Date();
      const timeStr = now.toISOString().replace('T', ' ').substring(0, 19);

      const newLog: AccessLog = {
        id: `log-${Date.now().toString().slice(-4)}`,
        timestamp: timeStr,
        sessionId: `sess-${Math.floor(Math.random() * 899999 + 100000)}`,
        userId: randomUser.id,
        username: randomUser.username,
        ipAddress: `10.20.${Math.floor(Math.random() * 50 + 1)}.${Math.floor(Math.random() * 250 + 1)}`,
        subnet: '10.20.0.0/16',
        building: 'West Dorm WiFi',
        targetResource: randomRes,
        action: 'RESOURCE_QUERY',
        status: 'SUCCESS',
        latencyMs: Math.floor(Math.random() * 80 + 90),
        threatScore: Math.floor(Math.random() * 15 + 2),
        isAnomaly: false,
        details: 'Routine HTTP request from authenticated campus client'
      };

      setLogs(prev => [newLog, ...prev.slice(0, 99)]);
    }, streamSpeed);

    return () => clearInterval(interval);
  }, [isStreaming, streamSpeed]);

  // Attack Injection Simulator
  const handleInjectAttack = (type: 'IMPOSSIBLE_TRAVEL' | 'BRUTE_FORCE' | 'LATERAL_HOP' | 'DATA_EXFIL' | 'PRIVILEGE_ESC') => {
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 19);

    if (type === 'IMPOSSIBLE_TRAVEL') {
      const attackLog: AccessLog = {
        id: `log-${Date.now().toString().slice(-4)}`,
        timestamp: timeStr,
        sessionId: 'sess-849102',
        userId: 'usr-101',
        username: 'alex.chen',
        ipAddress: '185.220.101.5',
        subnet: '185.220.101.0/24',
        building: 'Tor Exit (Frankfurt)',
        targetResource: 'SIS-GradePortal',
        action: 'RESOURCE_QUERY',
        status: 'SUCCESS',
        latencyMs: 512,
        threatScore: 96,
        isAnomaly: true,
        anomalyType: 'IMPOSSIBLE_TRAVEL',
        details: 'CRITICAL: Simultaneous session token replay detected across transatlantic subnets. Delta T: 75 seconds.'
      };

      const newAlert: ThreatAlert = {
        id: `alt-${Date.now().toString().slice(-3)}`,
        timestamp: timeStr,
        severity: 'CRITICAL',
        type: 'IMPOSSIBLE_TRAVEL',
        title: 'Spatiotemporal Velocity Violation (Tor Replay)',
        description: 'Session bearer token sess-849102 was reused in Frankfurt Tor node shortly after dorm authentication. Distance velocity exceeds 3,500 km/h.',
        affectedUser: 'alex.chen',
        affectedIp: '185.220.101.5',
        targetResource: 'SIS-GradePortal',
        mitreTactic: 'Credential Access',
        mitreTechnique: 'T1539 - Steal Web Session Cookie',
        status: 'UNRESOLVED',
        dmgtRuleId: 'DMGT-R1_VELOCITY',
        zScore: 5.68,
        evidence: [
          'Origin Subnet: 10.20.0.0/16 (West Dorms)',
          'Anomalous Subnet: 185.220.101.0/24 (Tor Exit Node)',
          'Z-Score velocity outlier: +5.68σ'
        ]
      };

      setLogs(prev => [attackLog, ...prev]);
      setAlerts(prev => [newAlert, ...prev]);
      setHighlightAnomalyType('IMPOSSIBLE_TRAVEL');
    } else if (type === 'BRUTE_FORCE') {
      const attackLog: AccessLog = {
        id: `log-${Date.now().toString().slice(-4)}`,
        timestamp: timeStr,
        sessionId: 'sess-849200',
        userId: 'usr-103',
        username: 'admin.kaufman',
        ipAddress: '10.10.45.12',
        subnet: '10.10.0.0/16',
        building: 'Library Open WiFi',
        targetResource: 'AdminSSH-Bastion',
        action: 'LOGIN_FAIL',
        status: 'FAILURE',
        latencyMs: 65,
        threatScore: 92,
        isAnomaly: true,
        anomalyType: 'OFF_HOURS_BRUTE_FORCE',
        details: 'SSH Dictionary burst attack detected: 14 failures within 20 seconds during dormant hours.'
      };

      const newAlert: ThreatAlert = {
        id: `alt-${Date.now().toString().slice(-3)}`,
        timestamp: timeStr,
        severity: 'HIGH',
        type: 'OFF_HOURS_BRUTE_FORCE',
        title: 'Off-Hours SSH Brute Force Infiltration',
        description: 'Repeated authentication failures against root bastion originating from open Library subnet.',
        affectedUser: 'admin.kaufman',
        affectedIp: '10.10.45.12',
        targetResource: 'AdminSSH-Bastion',
        mitreTactic: 'Credential Access',
        mitreTechnique: 'T1110.001 - Password Guessing',
        status: 'UNRESOLVED',
        dmgtRuleId: 'DMGT-R4_RATE_BURST',
        zScore: 4.95,
        evidence: [
          'Rate: 14 attempts/20 seconds',
          'Source: Unauthenticated guest subnet',
          'Target: Restricted Tier-1 Bastion'
        ]
      };

      setLogs(prev => [attackLog, ...prev]);
      setAlerts(prev => [newAlert, ...prev]);
      setHighlightAnomalyType('OFF_HOURS_BRUTE_FORCE');
    } else if (type === 'LATERAL_HOP') {
      const attackLog: AccessLog = {
        id: `log-${Date.now().toString().slice(-4)}`,
        timestamp: timeStr,
        sessionId: 'sess-849999',
        userId: 'usr-101',
        username: 'alex.chen',
        ipAddress: '10.20.14.88',
        subnet: '10.20.0.0/16',
        building: 'Dorm Hall B',
        targetResource: 'SIS-GradePortal/RegistrarAdmin',
        action: 'PRIVILEGE_ELEVATE',
        status: 'BLOCKED',
        latencyMs: 280,
        threatScore: 98,
        isAnomaly: true,
        anomalyType: 'LATERAL_MOVEMENT',
        details: 'DMGT Transitive Closure Violation: Direct socket request from Dorm WiFi to Registrar DB.'
      };

      const newAlert: ThreatAlert = {
        id: `alt-${Date.now().toString().slice(-3)}`,
        timestamp: timeStr,
        severity: 'HIGH',
        type: 'LATERAL_MOVEMENT',
        title: 'Unauthorized Transitive Subnet Traversal',
        description: 'Student subnet attempted direct RPC call to 192.168.1.0/24 Core Registrar, bypassing required firewall bastion.',
        affectedUser: 'alex.chen',
        affectedIp: '10.20.14.88',
        targetResource: 'SIS-GradePortal/RegistrarAdmin',
        mitreTactic: 'Lateral Movement',
        mitreTechnique: 'T1021 - Remote Services',
        status: 'UNRESOLVED',
        dmgtRuleId: 'DMGT-R3_TRANSITIVE',
        zScore: 4.12,
        evidence: [
          'Violates reachability matrix A*',
          'No intermediate bastion session token found',
          'Firewall dropped connection handshake'
        ]
      };

      setLogs(prev => [attackLog, ...prev]);
      setAlerts(prev => [newAlert, ...prev]);
      setHighlightAnomalyType('LATERAL_MOVEMENT');
    } else if (type === 'DATA_EXFIL') {
      const attackLog: AccessLog = {
        id: `log-${Date.now().toString().slice(-4)}`,
        timestamp: timeStr,
        sessionId: 'sess-849888',
        userId: 'usr-106',
        username: 'dean.vasquez',
        ipAddress: '10.50.8.99',
        subnet: '10.50.0.0/16',
        building: 'Physics Complex Rm 401',
        targetResource: 'SIS-GradePortal/ExportAllRecords',
        action: 'DATA_EXFIL',
        status: 'BLOCKED',
        latencyMs: 820,
        threatScore: 95,
        isAnomaly: true,
        anomalyType: 'UNUSUAL_VOLUME',
        details: 'Statistical Volume Outlier: Mass record export of 4,500 transcript records at 03:15 AM dormant window.'
      };

      const newAlert: ThreatAlert = {
        id: `alt-${Date.now().toString().slice(-3)}`,
        timestamp: timeStr,
        severity: 'CRITICAL',
        type: 'UNUSUAL_VOLUME' as any,
        title: 'Off-Hours Massive Student Data Exfiltration Probe',
        description: 'Bulk query requesting 4,500 student academic transcripts executed during baseline dormant hours (03:15 AM). Blocked by data loss prevention (DLP) rule.',
        affectedUser: 'dean.vasquez',
        affectedIp: '10.50.8.99',
        targetResource: 'SIS-GradePortal/ExportAllRecords',
        mitreTactic: 'Exfiltration',
        mitreTechnique: 'T1048 - Exfiltration Over Alternative Protocol',
        status: 'UNRESOLVED',
        dmgtRuleId: 'DMGT-R4_RATE_BURST',
        zScore: 6.24,
        evidence: [
          'Export record size: 4,500 records (normal limit: 25)',
          'Volume Z-Score: +6.24σ outlier',
          'Off-hours dormant window rule violation'
        ]
      };

      setLogs(prev => [attackLog, ...prev]);
      setAlerts(prev => [newAlert, ...prev]);
      setHighlightAnomalyType('UNUSUAL_VOLUME');
    } else if (type === 'PRIVILEGE_ESC') {
      const attackLog: AccessLog = {
        id: `log-${Date.now().toString().slice(-4)}`,
        timestamp: timeStr,
        sessionId: 'sess-849777',
        userId: 'usr-105',
        username: 'jordan.lee',
        ipAddress: '10.10.22.44',
        subnet: '10.10.0.0/16',
        building: 'Library Open WiFi',
        targetResource: 'Campus-RADIUS/RootSudo',
        action: 'PRIVILEGE_ELEVATE',
        status: 'BLOCKED',
        latencyMs: 190,
        threatScore: 91,
        isAnomaly: true,
        anomalyType: 'CREDENTIAL_STUFFING',
        details: 'Unauthorized privilege escalation: Student token attempted root sudo command execution.'
      };

      const newAlert: ThreatAlert = {
        id: `alt-${Date.now().toString().slice(-3)}`,
        timestamp: timeStr,
        severity: 'HIGH',
        type: 'CREDENTIAL_STUFFING',
        title: 'Unauthorized Sudo / Root Privilege Elevation Attempt',
        description: 'Low-privilege student account attempted sudo privilege escalation to root RADIUS authentication server.',
        affectedUser: 'jordan.lee',
        affectedIp: '10.10.22.44',
        targetResource: 'Campus-RADIUS/RootSudo',
        mitreTactic: 'Privilege Escalation',
        mitreTechnique: 'T1068 - Exploitation for Privilege Escalation',
        status: 'UNRESOLVED',
        dmgtRuleId: 'DMGT-R2_EQUIVALENCE',
        zScore: 4.88,
        evidence: [
          'Account Role: Student (Tier 3)',
          'Requested Resource: Root RADIUS Auth Server (Tier 1)',
          'Action intercepted by RBAC engine'
        ]
      };

      setLogs(prev => [attackLog, ...prev]);
      setAlerts(prev => [newAlert, ...prev]);
      setHighlightAnomalyType('CREDENTIAL_STUFFING');
    }
  };

  const handleReset = () => {
    setLogs(INITIAL_LOGS);
    setAlerts(INITIAL_ALERTS);
    setNodes(INITIAL_GRAPH_NODES);
    setEdges(INITIAL_GRAPH_EDGES);
    setSelectedLog(null);
    setHighlightAnomalyType(undefined);
  };

  const handleContainmentAction = (alert: ThreatAlert, actionType: 'BLOCK_IP' | 'REVOKE_SESSION' | 'REQUIRE_MFA') => {
    setContainmentAlert(alert);
    setContainmentAction(actionType);
  };

  const handleConfirmContainment = () => {
    if (!containmentAlert) return;
    setAlerts(prev =>
      prev.map(a =>
        a.id === containmentAlert.id ? { ...a, status: 'CONTAINED' as const } : a
      )
    );
    // Update graph nodes if IP was blocked
    if (containmentAction === 'BLOCK_IP') {
      setNodes(prev =>
        prev.map(n =>
          n.label.includes(containmentAlert.affectedIp) ? { ...n, status: 'normal', risk: 0 } : n
        )
      );
    }
    setContainmentAlert(null);
    setContainmentAction(null);
  };

  const handleTraceGraph = (alert: ThreatAlert) => {
    setHighlightAnomalyType(alert.type);
    setActiveTab('graph');
  };

  // Filter logs based on global search if specified
  const displayLogs = globalSearch
    ? logs.filter(
        l =>
          l.username.toLowerCase().includes(globalSearch.toLowerCase()) ||
          l.ipAddress.toLowerCase().includes(globalSearch.toLowerCase()) ||
          l.targetResource.toLowerCase().includes(globalSearch.toLowerCase()) ||
          l.sessionId.toLowerCase().includes(globalSearch.toLowerCase())
      )
    : logs;

  return (
    <div className="min-h-screen bg-[#050811] text-[#E0F2FE] flex font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Left Professional SOC Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unresolvedAlertCount={alerts.filter(a => a.status === 'UNRESOLVED').length}
        anomalyCount={logs.filter(l => l.isAnomaly).length}
        isStreaming={isStreaming}
        onOpenViva={() => setIsVivaOpen(true)}
      />

      {/* 2. Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header Bar */}
        <TopNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onInjectAttack={handleInjectAttack}
          onReset={handleReset}
          isStreaming={isStreaming}
          setIsStreaming={setIsStreaming}
          streamSpeed={streamSpeed}
          setStreamSpeed={setStreamSpeed}
          onOpenReport={() => setIsReportOpen(true)}
          onOpenViva={() => setIsVivaOpen(true)}
          alertCount={alerts.filter(a => a.status === 'UNRESOLVED').length}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-4 max-w-[1600px] w-full mx-auto">
          {/* Top Telemetry Banner - 8 Key Metrics (always visible on core dashboard or can be toggled) */}
          {activeTab === 'dashboard' && <MetricsOverview logs={logs} alerts={alerts} />}

          {/* Tab 1: Dashboard Main SOC View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              <SOCCharts logs={logs} alerts={alerts} />
              <AlertCards
                alerts={alerts}
                onContainmentAction={handleContainmentAction}
                onTraceGraph={handleTraceGraph}
              />
              <LiveLogStream
                logs={displayLogs}
                onSelectLog={setSelectedLog}
                selectedLogId={selectedLog?.id}
              />
            </div>
          )}

          {/* Tab 2: Access Logs Dedicated Module */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="bg-[#0D1527]/90 border border-[#1E293B] rounded-xl p-4 flex items-center justify-between font-mono">
                <div>
                  <h2 className="text-base font-bold text-[#FFFFFF]">Full Access Log Ledger & Forensics</h2>
                  <p className="text-xs text-[#94A3B8]">Granular search, building filtering, risk score thresholds, and export options.</p>
                </div>
                <div className="text-xs text-[#00FF87] font-bold">
                  {displayLogs.length} Records in Active Window
                </div>
              </div>
              <LiveLogStream
                logs={displayLogs}
                onSelectLog={setSelectedLog}
                selectedLogId={selectedLog?.id}
              />
            </div>
          )}

          {/* Tab 3: Users Module */}
          {activeTab === 'users' && (
            <UsersModule
              logs={logs}
              onTraceUserInGraph={(username) => {
                setActiveTab('graph');
              }}
              onFilterUserLogs={(username) => {
                setGlobalSearch(username);
                setActiveTab('logs');
              }}
            />
          )}

          {/* Tab 4: Sessions Module */}
          {activeTab === 'sessions' && (
            <SessionsModule
              logs={logs}
              onRevokeSession={(sessionId) => {
                setLogs(prev =>
                  prev.map(l =>
                    l.sessionId === sessionId
                      ? { ...l, details: 'TOKEN REVOKED: Manual security override' }
                      : l
                  )
                );
              }}
            />
          )}

          {/* Tab 5: Anomaly Detection Comprehensive View */}
          {activeTab === 'anomalies' && (
            <AnomalyDetectionView
              logs={logs}
              alerts={alerts}
              onTriggerAttack={handleInjectAttack}
              onTraceInGraph={handleTraceGraph}
            />
          )}

          {/* Tab 6: Access Pattern Graph */}
          {activeTab === 'graph' && (
            <AccessPatternGraph
              nodes={nodes}
              edges={edges}
              highlightAnomalyType={highlightAnomalyType}
            />
          )}

          {/* Tab 7: SQL Analytics (DBMS) */}
          {activeTab === 'sql' && <DBMSModule />}

          {/* Tab 8: Security Alerts Dedicated Management */}
          {activeTab === 'alerts' && (
            <SecurityAlertsView
              alerts={alerts}
              onContainmentAction={handleContainmentAction}
              onTraceGraph={handleTraceGraph}
              onTriggerAttack={handleInjectAttack}
            />
          )}

          {/* Tab 9: Reports Dedicated Management */}
          {activeTab === 'reports' && (
            <ReportsView logs={logs} alerts={alerts} />
          )}

          {/* Tab 10: System Architecture */}
          {activeTab === 'architecture' && <SystemArchitectureView />}

          {/* Tab 11: 4-Slide Presentation Deck */}
          {activeTab === 'presentation' && <PresentationDeck />}

          {/* Tab 12: Settings */}
          {activeTab === 'settings' && (
            <SettingsView
              isStreaming={isStreaming}
              setIsStreaming={setIsStreaming}
              streamSpeed={streamSpeed}
              setStreamSpeed={setStreamSpeed}
              onResetData={handleReset}
            />
          )}
        </main>

        {/* Global Footer (TEAM-15 Showcase) */}
        <Footer />
      </div>

      {/* Containment Confirmation Modal */}
      <ContainmentModal
        isOpen={!!containmentAlert}
        onClose={() => setContainmentAlert(null)}
        alert={containmentAlert}
        actionType={containmentAction}
        onConfirm={handleConfirmContainment}
      />

      {/* Log Forensic Detail Drawer */}
      <LogDetailDrawer
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
        onTraceInGraph={() => {
          setSelectedLog(null);
          setActiveTab('graph');
        }}
      />

      {/* Executive Security Audit Report Modal */}
      <SecurityReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        logs={logs}
        alerts={alerts}
      />

      {/* Interactive Viva Guide Modal (Telugu + English) */}
      <VivaDemoModal
        isOpen={isVivaOpen}
        onClose={() => setIsVivaOpen(false)}
        onJumpToTab={(tab) => {
          if (tab === 'soc') setActiveTab('dashboard');
          else if (tab === 'graph') setActiveTab('graph');
          else if (tab === 'dbms') setActiveTab('sql');
          else if (tab === 'dmgt') setActiveTab('anomalies');
          else if (tab === 'adsa') setActiveTab('graph');
          else if (tab === 'python') setActiveTab('anomalies');
          else if (tab === 'presentation') setActiveTab('presentation');
        }}
      />
    </div>
  );
}
