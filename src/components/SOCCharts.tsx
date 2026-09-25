import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Radio, 
  CheckCircle2,
  AlertTriangle,
  Server
} from 'lucide-react';
import { AccessLog, ThreatAlert } from '../types';

interface SOCChartsProps {
  logs: AccessLog[];
  alerts: ThreatAlert[];
}

export const SOCCharts: React.FC<SOCChartsProps> = ({ logs, alerts }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeChartTab, setActiveChartTab] = useState<'TIMELINE' | 'MITRE' | 'SUBNETS'>('TIMELINE');
  const [hoveredPoint, setHoveredPoint] = useState<{ hour: string; total: number; anomalies: number } | null>(null);

  // 24-Hour Telemetry Mock Data based on current log buffer
  const hourlyData = [
    { hour: '00:00', total: 140, anomalies: 2, failures: 4 },
    { hour: '02:00', total: 60, anomalies: 1, failures: 2 },
    { hour: '04:00', total: 45, anomalies: 8, failures: 12 }, // early morning attack window
    { hour: '05:00', total: 110, anomalies: 18, failures: 24 }, // peak attack window (current scenario)
    { hour: '06:00', total: 220, anomalies: 6, failures: 8 },
    { hour: '08:00', total: 890, anomalies: 3, failures: 15 },
    { hour: '10:00', total: 1450, anomalies: 5, failures: 22 },
    { hour: '12:00', total: 1680, anomalies: 4, failures: 19 },
    { hour: '14:00', total: 1520, anomalies: 6, failures: 28 },
    { hour: '16:00', total: 1200, anomalies: 5, failures: 16 },
    { hour: '18:00', total: 980, anomalies: 4, failures: 12 },
    { hour: '20:00', total: 640, anomalies: 3, failures: 9 },
    { hour: '22:00', total: 390, anomalies: 7, failures: 14 },
  ];

  // Dynamic calculation for max value in SVG scaling
  const maxTotal = Math.max(...hourlyData.map(d => d.total));
  const svgWidth = 720;
  const svgHeight = 160;
  const paddingX = 40;
  const paddingY = 25;

  const pointsTotal = hourlyData.map((d, i) => {
    const x = paddingX + (i / (hourlyData.length - 1)) * (svgWidth - 2 * paddingX);
    const y = svgHeight - paddingY - (d.total / maxTotal) * (svgHeight - 2 * paddingY);
    return `${x},${y}`;
  }).join(' ');

  const pointsAnomalies = hourlyData.map((d, i) => {
    const x = paddingX + (i / (hourlyData.length - 1)) * (svgWidth - 2 * paddingX);
    // Scale anomalies up so they are clearly visible
    const y = svgHeight - paddingY - (Math.min(d.anomalies * 25, maxTotal) / maxTotal) * (svgHeight - 2 * paddingY);
    return `${x},${y}`;
  }).join(' ');

  // MITRE Attack breakdown
  const mitreCategories = [
    { tactic: 'Credential Access', technique: 'T1539 (Cookie Replay) & T1110 (Brute Force)', count: 18, severity: 'CRITICAL', color: '#FF0055', pct: 45 },
    { tactic: 'Lateral Movement', technique: 'T1021 (Remote Services - Bastion Bypass)', count: 9, severity: 'HIGH', color: '#9D4EDD', pct: 25 },
    { tactic: 'Defense Evasion', technique: 'T1090.003 (Tor Proxy Ingress)', count: 8, severity: 'HIGH', color: '#FF6B00', pct: 20 },
    { tactic: 'Privilege Escalation', technique: 'T1078 (Valid Accounts / Faculty Override)', count: 4, severity: 'MEDIUM', color: '#00F0FF', pct: 10 },
  ];

  // Campus Subnet Risk Density
  const subnetsList = [
    { name: '185.220.101.0/24 (Tor Exit Node)', location: 'Frankfurt Darknet Ingress', risk: 96, status: 'HOSTILE', count: 14, color: '#FF0055' },
    { name: '10.10.0.0/16 (Library Commons WiFi)', location: 'Public Guest Unencrypted', risk: 82, status: 'HIGH RISK', count: 28, color: '#FF6B00' },
    { name: '10.20.0.0/16 (West Quad Dorms)', location: 'Student Residential APs', risk: 68, status: 'SUSPICIOUS', count: 142, color: '#9D4EDD' },
    { name: '192.168.1.0/24 (Registrar Core DB)', location: 'Central Administration', risk: 42, status: 'ELEVATED', count: 9, color: '#00F0FF' },
    { name: '10.50.0.0/16 (Science & Physics)', location: 'Faculty Workstations', risk: 12, status: 'GUARDED', count: 84, color: '#00FF87' },
  ];

  return (
    <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] rounded-xl overflow-hidden shadow-2xl transition-all">
      {/* Top Bar Header */}
      <div className="p-3 border-b border-[#1E293B] bg-[#050811]/90 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00F0FF]" />
          <h2 className="text-xs font-mono font-bold text-[#FFFFFF] tracking-wider uppercase">
            SOC THREAT INTELLIGENCE & TELEMETRY CHARTS
          </h2>
          <span className="px-2 py-0.5 rounded bg-[#00F0FF]/15 text-[#00F0FF] text-[10px] font-mono border border-[#00F0FF]/40">
            Real-Time Analysis
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub tabs */}
          <div className="flex items-center bg-[#050811] border border-[#1E293B] rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={() => setActiveChartTab('TIMELINE')}
              className={`px-2.5 py-1 rounded text-[11px] transition ${
                activeChartTab === 'TIMELINE' ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/60 font-bold' : 'text-[#94A3B8] hover:text-[#FFFFFF]'
              }`}
            >
              24h Ingestion Curve
            </button>
            <button
              onClick={() => setActiveChartTab('MITRE')}
              className={`px-2.5 py-1 rounded text-[11px] transition ${
                activeChartTab === 'MITRE' ? 'bg-[#9D4EDD]/20 text-[#9D4EDD] border border-[#9D4EDD]/60 font-bold' : 'text-[#94A3B8] hover:text-[#FFFFFF]'
              }`}
            >
              MITRE ATT&CK Matrix
            </button>
            <button
              onClick={() => setActiveChartTab('SUBNETS')}
              className={`px-2.5 py-1 rounded text-[11px] transition ${
                activeChartTab === 'SUBNETS' ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/60 font-bold' : 'text-[#94A3B8] hover:text-[#FFFFFF]'
              }`}
            >
              Subnet Risk Density
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded bg-[#050811] border border-[#1E293B] text-[#94A3B8] hover:text-[#FFFFFF] transition"
            title={isExpanded ? 'Collapse Charts' : 'Expand Charts'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* View 1: 24h Timeline Chart */}
          {activeChartTab === 'TIMELINE' && (
            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5 text-[#00F0FF]">
                    <span className="w-2.5 h-1 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"></span>
                    Campus Access Volume (Peak: 1,680 req/hr)
                  </span>
                  <span className="flex items-center gap-1.5 text-[#FF0055]">
                    <span className="w-2.5 h-1 rounded-full bg-[#FF0055] shadow-[0_0_8px_#FF0055]"></span>
                    Anomalous Events (Burst Spike at 04:00 - 05:00 UTC)
                  </span>
                </div>
                {hoveredPoint && (
                  <span className="text-[#00F0FF] text-[11px] bg-[#050811] px-2 py-0.5 rounded border border-[#00F0FF]/40">
                    {hoveredPoint.hour}: {hoveredPoint.total} total • <span className="text-[#FF0055] font-bold">{hoveredPoint.anomalies} anomalies</span>
                  </span>
                )}
              </div>

              {/* Responsive SVG Area / Line Chart */}
              <div className="w-full bg-[#050811] border border-[#1E293B] rounded-xl p-2 relative overflow-hidden">
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-44 overflow-visible"
                >
                  <defs>
                    <linearGradient id="cyanArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="redArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF0055" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#FF0055" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                    const y = svgHeight - paddingY - frac * (svgHeight - 2 * paddingY);
                    return (
                      <line
                        key={idx}
                        x1={paddingX}
                        y1={y}
                        x2={svgWidth - paddingX}
                        y2={y}
                        stroke="#1E293B"
                        strokeDasharray="4,4"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Area fill for total requests */}
                  <polygon
                    points={`${paddingX},${svgHeight - paddingY} ${pointsTotal} ${svgWidth - paddingX},${svgHeight - paddingY}`}
                    fill="url(#cyanArea)"
                  />

                  {/* Line for total requests */}
                  <polyline
                    points={pointsTotal}
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Area fill for anomalies */}
                  <polygon
                    points={`${paddingX},${svgHeight - paddingY} ${pointsAnomalies} ${svgWidth - paddingX},${svgHeight - paddingY}`}
                    fill="url(#redArea)"
                  />

                  {/* Line for anomalies */}
                  <polyline
                    points={pointsAnomalies}
                    fill="none"
                    stroke="#FF0055"
                    strokeWidth="2.5"
                    strokeDasharray="4,3"
                    strokeLinecap="round"
                  />

                  {/* Data Points on anomalies and labels */}
                  {hourlyData.map((d, i) => {
                    const x = paddingX + (i / (hourlyData.length - 1)) * (svgWidth - 2 * paddingX);
                    const yTotal = svgHeight - paddingY - (d.total / maxTotal) * (svgHeight - 2 * paddingY);
                    const yAnom = svgHeight - paddingY - (Math.min(d.anomalies * 25, maxTotal) / maxTotal) * (svgHeight - 2 * paddingY);

                    return (
                      <g key={i}>
                        {/* Interactive hover circle */}
                        <circle
                          cx={x}
                          cy={yTotal}
                          r="4"
                          fill="#00F0FF"
                          className="hover:r-6 cursor-pointer transition-all"
                          onMouseEnter={() => setHoveredPoint(d)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                        {d.anomalies > 4 && (
                          <circle
                            cx={x}
                            cy={yAnom}
                            r="5"
                            fill="#FF0055"
                            className="animate-ping"
                          />
                        )}
                        {/* Hour Label */}
                        <text
                          x={x}
                          y={svgHeight - 6}
                          textAnchor="middle"
                          fill="#94A3B8"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          {d.hour}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {/* View 2: MITRE ATT&CK Matrix Breakdown */}
          {activeChartTab === 'MITRE' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
              {mitreCategories.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#050811] border border-[#1E293B] hover:border-[#9D4EDD]/60 rounded-xl p-3 space-y-2 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#FFFFFF] flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" style={{ color: item.color }} />
                      {item.tactic}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded font-bold uppercase"
                      style={{ color: item.color, backgroundColor: `${item.color}20`, border: `1px solid ${item.color}60` }}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] leading-tight">
                    {item.technique}
                  </p>
                  <div>
                    <div className="flex justify-between text-[10px] text-[#94A3B8] mb-1">
                      <span>Telemetry Share: {item.count} detections</span>
                      <span style={{ color: item.color }} className="font-bold">{item.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#1E293B] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View 3: Subnet Risk Density */}
          {activeChartTab === 'SUBNETS' && (
            <div className="space-y-2.5 font-mono">
              <div className="text-[11px] text-[#94A3B8] flex items-center justify-between">
                <span>Campus Subnet Partition</span>
                <span>Contagion Risk Meter (0 - 100)</span>
              </div>
              <div className="space-y-2">
                {subnetsList.map((sub, idx) => (
                  <div
                    key={idx}
                    className="bg-[#050811] border border-[#1E293B] rounded-lg p-2.5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <Server className="w-4 h-4 text-[#94A3B8]" />
                      <div>
                        <div className="text-xs font-bold text-[#FFFFFF]">{sub.name}</div>
                        <div className="text-[10px] text-[#94A3B8]">{sub.location} • {sub.count} logs</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-48 shrink-0">
                      <div className="flex-1">
                        <div className="flex justify-between text-[10px] mb-1">
                          <span style={{ color: sub.color }} className="font-bold">{sub.status}</span>
                          <span className="text-[#FFFFFF]">{sub.risk}/100</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#1E293B] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${sub.risk}%`, backgroundColor: sub.color }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
