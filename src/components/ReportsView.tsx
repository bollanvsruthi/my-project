import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle,
  Building,
  Users,
  Activity,
  Calendar,
  Layers
} from 'lucide-react';
import { AccessLog, ThreatAlert } from '../types';
import { TEAM_MEMBERS } from './Footer';

interface ReportsViewProps {
  logs: AccessLog[];
  alerts: ThreatAlert[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ logs, alerts }) => {
  const [copied, setCopied] = useState(false);
  const [reportFormat, setReportFormat] = useState<'EXECUTIVE' | 'TECHNICAL' | 'COMPLIANCE'>('EXECUTIVE');

  const totalLogs = logs.length;
  const anomalies = logs.filter(l => l.isAnomaly);
  const criticalThreats = alerts.filter(a => a.severity === 'CRITICAL');
  const containedThreats = alerts.filter(a => a.status === 'CONTAINED');
  const failureCount = logs.filter(l => l.status === 'FAILURE' || l.action === 'LOGIN_FAIL').length;

  const handleDownloadReport = () => {
    const reportText = `================================================================================
CYBERSECURITY ACCESS LOG MONITORING SYSTEM - AUDIT REPORT
REPORT TYPE: ${reportFormat} REPORT
CAMPUS NETWORK INCIDENT RESPONSE CENTER (SOC)
PROJECT TEAM: TEAM-15
GENERATED AT: ${new Date().toUTCString()}
================================================================================

1. EXECUTIVE METRICS & POSTURE:
- Total Access Logs Analyzed: ${totalLogs}
- Detected Security Anomalies: ${anomalies.length}
- Authentication Failures: ${failureCount}
- Critical Security Alerts: ${criticalThreats.length}
- Mitigated / Contained Threats: ${containedThreats.length}
- Overall System Status: DEFCON 2 (ELEVATED)

2. THREAT INCIDENT ROSTER:
${alerts.map((a, i) => `[INCIDENT #${i + 1}] ${a.title}
  Severity: ${a.severity} | MITRE Tactic: ${a.mitreTactic}
  Affected User: ${a.affectedUser} | Origin IP: ${a.affectedIp}
  Target Resource: ${a.targetResource}
  Detection Rule: ${a.dmgtRuleId} | Statistical Z-Score: +${a.zScore.toFixed(2)}σ
  Status: ${a.status}
`).join('\n')}

3. SUSPICIOUS ENTITY LIST:
* alex.chen (Student ID: usr-101) - Impossible velocity breach (Tor relay handoff)
* admin.kaufman (SysAdmin: usr-103) - Off-hours rapid password guessing attack
* Subnet 185.220.101.0/24 - Hostile Tor exit node
* Subnet 10.10.0.0/16 - Public Library WiFi (high brute-force origin)

4. ARCHITECTURAL VALIDATION SUMMARY:
- DBMS: Normalized BCNF relational schema with temporal LAG() window functions.
- DMGT: First-Order Predicate Calculus and Warshall Transitive Closure reachability.
- ADSA: Adjacency-list Access Pattern Graph with BFS trajectory traversal.
- OOPJ & Python: Rolling Gaussian Z-Score, Interquartile Range, and Isolation Forest.

5. RECOMMENDED ACTIONS:
- Implement Zero-Trust MFA Step-up challenges on student portal logins.
- Apply automated BGP null-routing for repetitive Tor exit node traffic.
- Enforce strict micro-segmentation between dorm WiFi and Registrar administrative core.

================================================================================
AUDITORS & RESEARCH TEAM (TEAM-15):
${TEAM_MEMBERS.map(m => `- ${m.rollNo}: ${m.name} (${m.role})`).join('\n')}
================================================================================
`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Campus_Security_Audit_Report_${reportFormat}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyReport = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Top Banner */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            SECURITY INCIDENT AUDIT & FORENSIC REPORTS
          </div>
          <h2 className="text-lg font-bold text-[#FFFFFF] mt-1">
            Executive Summary & Compliance Documentation
          </h2>
          <p className="text-xs text-[#94A3B8] max-w-3xl mt-0.5">
            Tamper-evident security posture reporting ready for university administration, academic evaluation, and compliance reviews.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadReport}
            className="px-3 py-1.5 rounded-lg bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/50 text-[#00F0FF] text-xs font-bold flex items-center gap-1.5 transition glow-cyan"
          >
            <Download className="w-3.5 h-3.5" />
            Export Report (.txt)
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="flex items-center bg-[#0D1527] border border-[#1E293B] rounded-xl p-1 gap-1 text-xs">
        {[
          { id: 'EXECUTIVE', label: 'Executive Briefing' },
          { id: 'TECHNICAL', label: 'Technical Forensics' },
          { id: 'COMPLIANCE', label: 'Academic & FERPA Compliance' },
        ].map(fmt => (
          <button
            key={fmt.id}
            onClick={() => setReportFormat(fmt.id as any)}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              reportFormat === fmt.id
                ? 'bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/50 font-bold'
                : 'text-[#94A3B8] hover:text-[#FFFFFF]'
            }`}
          >
            {fmt.label}
          </button>
        ))}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1E293B] text-xs">
          <div className="text-[10px] text-[#94A3B8]">INGESTED LOGS</div>
          <div className="text-xl font-bold text-[#FFFFFF] mt-1">{totalLogs}</div>
          <div className="text-[10px] text-[#00FF87] mt-1">Buffer Window Active</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#1E293B] text-xs">
          <div className="text-[10px] text-[#94A3B8]">DETECTED THREATS</div>
          <div className="text-xl font-bold text-[#FF6B00] mt-1">{anomalies.length}</div>
          <div className="text-[10px] text-[#FF6B00] mt-1">{((anomalies.length / (totalLogs || 1)) * 100).toFixed(1)}% Anomaly Ratio</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#FF0055]/50 glow-crimson text-xs">
          <div className="text-[10px] text-[#FF0055] font-bold">CRITICAL ALERTS</div>
          <div className="text-xl font-bold text-[#FF0055] mt-1">{criticalThreats.length}</div>
          <div className="text-[10px] text-[#FF0055] mt-1 font-bold">Active Priority</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#00FF87]/50 glow-emerald text-xs">
          <div className="text-[10px] text-[#00FF87]">CONTAINED VECTORS</div>
          <div className="text-xl font-bold text-[#00FF87] mt-1">{containedThreats.length}</div>
          <div className="text-[10px] text-[#00FF87] mt-1">Remediated via 1-Click</div>
        </div>
      </div>

      {/* Detailed Document Preview */}
      <div className="p-5 rounded-xl bg-[#080D1A] border border-[#1E293B] space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00F0FF]" />
            <span className="font-bold text-[#FFFFFF] uppercase">DOCUMENT: CAMPUS_SECURITY_POSTURE_Q3.DOC</span>
          </div>
          <span className="text-[10px] text-[#94A3B8]">Status: VERIFIED BY TEAM-15</span>
        </div>

        {/* Section 1 */}
        <div className="space-y-1.5">
          <h4 className="text-[#00F0FF] font-bold">1. Executive Overview & Scope</h4>
          <p className="text-[#E0F2FE] leading-relaxed">
            The Cybersecurity Access Log Monitoring System monitored network traffic across dormitory access points, library WiFi, science complexes, and IT registrar databases. During this observation window, our multi-tier detection architecture flagged anomalous velocity deviations and high-rate authentication failures.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-1.5">
          <h4 className="text-[#FF6B00] font-bold">2. Threat Summary & MITRE ATT&CK Matrix</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded bg-[#050811] border border-[#1E293B] space-y-1">
              <div className="font-bold text-[#FF0055]">T1539 - Session Cookie Replay (Impossible Travel)</div>
              <div className="text-[#94A3B8]">Bearer token utilized in Frankfurt Tor node 94s after dorm login (3,800 km/h velocity).</div>
            </div>
            <div className="p-2.5 rounded bg-[#050811] border border-[#1E293B] space-y-1">
              <div className="font-bold text-[#FF6B00]">T1110 - Brute Force Password Guessing</div>
              <div className="text-[#94A3B8]">14 consecutive failed SSH attempts against root bastion from public library subnet.</div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-1.5">
          <h4 className="text-[#00FF87] font-bold">3. Technical Defense Strategy</h4>
          <p className="text-[#E0F2FE] leading-relaxed">
            We recommend deploying automated Zero-Trust step-up challenges upon detecting spatiotemporal anomalies, segmenting public student WiFi from administrative bastions, and using ephemeral bearer token hashing.
          </p>
        </div>
      </div>
    </div>
  );
};
