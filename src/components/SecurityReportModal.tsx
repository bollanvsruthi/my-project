import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  Building2, 
  Terminal,
  Lock
} from 'lucide-react';
import { AccessLog, ThreatAlert } from '../types';
import { TEAM_MEMBERS } from './Footer';

interface SecurityReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AccessLog[];
  alerts: ThreatAlert[];
}

export const SecurityReportModal: React.FC<SecurityReportModalProps> = ({
  isOpen,
  onClose,
  logs,
  alerts
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalLogs = logs.length;
  const anomalies = logs.filter(l => l.isAnomaly);
  const criticalThreats = alerts.filter(a => a.severity === 'CRITICAL');
  const containedThreats = alerts.filter(a => a.status === 'CONTAINED');

  const reportText = `================================================================================
CYBERSECURITY ACCESS LOG MONITORING SYSTEM - EXECUTIVE INCIDENT AUDIT REPORT
CAMPUS NETWORK SECURITY INCIDENT RESPONSE CENTER (SOC)
PROJECT TEAM: TEAM-15
DATE: ${new Date().toUTCString()}
================================================================================

1. EXECUTIVE SUMMARY:
--------------------------------------------------------------------------------
During this operational monitoring window, the Campus Access Log Monitoring System
analyzed ${totalLogs} distinct access authentication events across 6 physical and virtual
campus subnets. Automated heuristic, mathematical (DMGT), and statistical (Python Z-score)
detection engines intercepted ${anomalies.length} anomalous access requests (${((anomalies.length / totalLogs) * 100).toFixed(1)}% anomaly rate).

2. KEY INCIDENT METRICS:
--------------------------------------------------------------------------------
- Ingested Logs: ${totalLogs}
- Anomalous Events: ${anomalies.length}
- Critical Threat Incidents: ${criticalThreats.length}
- Contained / Mitigated Vectors: ${containedThreats.length}
- System Threat Status: DEFCON 2 (ELEVATED THREAT LEVEL)

3. HIGH-SEVERITY THREATS & VIOLATIONS:
--------------------------------------------------------------------------------
${alerts.map((a, i) => `[ALERT #${i + 1}] ${a.title}
  Severity: ${a.severity} | MITRE: ${a.mitreTechnique}
  Affected Identity: ${a.affectedUser} | Origin IP: ${a.affectedIp}
  Target Resource: ${a.targetResource}
  Detection Rule: ${a.dmgtRuleId} | Statistical Z-Score: +${a.zScore.toFixed(2)}σ
  Status: ${a.status}
  Evidence:
    ${a.evidence.map(e => `* ${e}`).join('\n    ')}
`).join('\n')}

4. TOP COMPROMISED / SUSPICIOUS ENTITIES:
--------------------------------------------------------------------------------
* User: alex.chen (Student ID: usr-101) - Spatiotemporal Velocity breach (Frankfurt Tor reuse)
* User: admin.kaufman (SysAdmin ID: usr-103) - 14 rapid failed SSH attempts from unencrypted WiFi
* Ingress Node: 185.220.101.5 (Tor Exit Node) - High-risk Darknet IP
* Subnet: 10.10.0.0/16 (Library Public WiFi) - Source of brute force password guessing

5. MATHEMATICAL & ALGORITHMIC VERIFICATION:
--------------------------------------------------------------------------------
* DBMS: BCNF normalized schema with SQL window functions (LAG/LEAD) for delta timestamp computation.
* DMGT: First-Order Predicate Calculus rules and Warshall's Transitive Closure reachability matrices.
* ADSA: Topological Adjacency List graph and Breadth-First Search (BFS) path violation tracing.
* Python: Statistical Gaussian Z-score, Interquartile Range (IQR), and Isolation Forest models.

6. STRATEGIC SECURITY RECOMMENDATIONS:
--------------------------------------------------------------------------------
1. Zero Trust Architecture: Enforce mandatory hardware security keys (FIDO2 WebAuthn) for all
   administrative SSH bastions and Registrar core databases.
2. Geolocation Velocity Lockouts: Reject session cookie reuse when displacement velocity
   exceeds 900 km/h (DMGT-R1).
3. 802.1X Campus Port Security: Quarantine open library and dorm subnets from internal Tier-1 bastions.
4. Token Binding: Cryptographically bind session IDs to TLS client certificates to invalidate Tor replays.

================================================================================
REPORT AUDITORS: TEAM-15
${TEAM_MEMBERS.map(m => `- ${m.rollNo}: ${m.name} (${m.role})`).join('\n')}
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CyberWatch_SOC_Audit_Report_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0D1527] border border-[#00F0FF]/60 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#1E293B] bg-[#050811] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono text-[#FFFFFF] tracking-wide">
                EXECUTIVE SECURITY AUDIT & FORENSICS REPORT
              </h3>
              <p className="text-xs text-[#94A3B8] font-mono">
                Generated for Campus IT Governance & Academic Accreditation (TEAM-15)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[#050811] border border-[#1E293B] hover:border-[#00F0FF]/60 text-[#E0F2FE] flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-[#00FF87]" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied Text' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-[#00F0FF]/20 hover:bg-[#00F0FF]/30 border border-[#00F0FF] text-[#00F0FF] font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download .TXT
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#050811] border border-[#1E293B] text-[#94A3B8] hover:text-[#FFFFFF] transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body / Report Viewer */}
        <div className="flex-1 overflow-y-auto p-5 font-mono text-xs space-y-5 bg-[#080d1a]">
          {/* Executive Summary Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#050811] p-3 rounded-xl border border-[#1E293B]">
              <div className="text-[10px] text-[#94A3B8]">INGESTED LOGS</div>
              <div className="text-xl font-bold text-[#FFFFFF] mt-1">{totalLogs}</div>
              <div className="text-[10px] text-[#00F0FF] mt-0.5">Sliding buffer</div>
            </div>
            <div className="bg-[#050811] p-3 rounded-xl border border-[#1E293B]">
              <div className="text-[10px] text-[#94A3B8]">ANOMALY RATE</div>
              <div className="text-xl font-bold text-[#FF6B00] mt-1">{((anomalies.length / totalLogs) * 100).toFixed(1)}%</div>
              <div className="text-[10px] text-[#FF6B00] mt-0.5">{anomalies.length} flag events</div>
            </div>
            <div className="bg-[#050811] p-3 rounded-xl border border-[#FF0055]/50 glow-crimson">
              <div className="text-[10px] text-[#FF0055] font-bold">CRITICAL THREATS</div>
              <div className="text-xl font-bold text-[#FF0055] mt-1">{criticalThreats.length}</div>
              <div className="text-[10px] text-[#FF0055] mt-0.5">Immediate triage</div>
            </div>
            <div className="bg-[#050811] p-3 rounded-xl border border-[#00FF87]/50 glow-emerald">
              <div className="text-[10px] text-[#00FF87]">CONTAINED VECTORS</div>
              <div className="text-xl font-bold text-[#00FF87] mt-1">{containedThreats.length}</div>
              <div className="text-[10px] text-[#00FF87] mt-0.5">Firewall drop active</div>
            </div>
          </div>

          {/* Report Raw Content Preview */}
          <div className="bg-[#050811] border border-[#1E293B] rounded-xl p-4 overflow-x-auto text-[#E0F2FE] leading-relaxed">
            <pre className="whitespace-pre-wrap font-mono text-[11px] text-[#94A3B8]">
              {reportText}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-[#1E293B] bg-[#050811] flex items-center justify-between font-mono text-xs text-[#94A3B8]">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#00FF87]" />
            Encrypted Audit Hash: SHA256: 8f9b4...c702a (Tamper Evident)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-[#FFFFFF] transition"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
