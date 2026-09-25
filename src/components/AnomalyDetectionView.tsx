import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Binary, 
  Cpu, 
  Sparkles, 
  Sliders, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Layers, 
  Network, 
  Code2, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { DMGT_RULES } from '../data/mockCampusData';
import { AccessLog, ThreatAlert } from '../types';

interface AnomalyDetectionViewProps {
  logs: AccessLog[];
  alerts: ThreatAlert[];
  onTriggerAttack?: (type: 'IMPOSSIBLE_TRAVEL' | 'BRUTE_FORCE' | 'LATERAL_HOP' | 'DATA_EXFIL' | 'PRIVILEGE_ESC') => void;
  onTraceInGraph?: (alert: ThreatAlert) => void;
}

export const AnomalyDetectionView: React.FC<AnomalyDetectionViewProps> = ({
  logs,
  alerts,
  onTriggerAttack,
  onTraceInGraph
}) => {
  const [selectedEngine, setSelectedEngine] = useState<'ALL' | 'RULE_BASED' | 'GRAPH_BASED' | 'STATISTICAL'>('ALL');
  const [zScoreSlider, setZScoreSlider] = useState<number>(3.0);
  const [velocitySlider, setVelocitySlider] = useState<number>(900); // km/h

  const anomalies = logs.filter(l => l.isAnomaly);

  return (
    <div className="space-y-4 font-mono">
      {/* Top Banner */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#FF6B00] text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            MULTI-MODEL ANOMALY DETECTION ENGINE
          </div>
          <h2 className="text-lg font-bold text-[#FFFFFF] mt-1">
            Hybrid Heuristic, Graph Traversal & Gaussian Statistical Triage
          </h2>
          <p className="text-xs text-[#94A3B8] max-w-3xl mt-0.5">
            4-layer detection pipeline unifying DMGT First-Order Predicate Calculus, Warshall Transitive Closures, ADSA topological BFS paths, and rolling Python Z-Score distributions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#FF6B00]/20 border border-[#FF6B00]/50 text-[#FF6B00] text-xs font-bold">
            Anomalies Caught: {anomalies.length}
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-bold">
            Active Engines: 4
          </span>
        </div>
      </div>

      {/* Engine Selector Tabs */}
      <div className="flex items-center bg-[#0D1527] border border-[#1E293B] rounded-xl p-1 gap-1 text-xs">
        {[
          { id: 'ALL', label: 'All 4 Detection Engines', icon: Layers },
          { id: 'RULE_BASED', label: '1. Rule-Based & Temporal (DMGT)', icon: Binary },
          { id: 'GRAPH_BASED', label: '2. Access-Pattern Graph (ADSA)', icon: Network },
          { id: 'STATISTICAL', label: '3. Python Statistical (Z-Score & IQR)', icon: Activity },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedEngine(tab.id as any)}
              className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-medium transition ${
                selectedEngine === tab.id
                  ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50 shadow-[0_0_12px_rgba(0,240,255,0.2)] font-bold'
                  : 'text-[#94A3B8] hover:text-[#FFFFFF]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Threshold Calibration Controls */}
      <div className="bg-[#0D1527]/90 border border-[#1E293B] rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <div className="flex items-center justify-between text-[#E0F2FE] mb-1.5">
            <span className="font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#00F0FF]" />
              Gaussian Z-Score Anomaly Cutoff (σ)
            </span>
            <span className="text-[#00F0FF] font-bold">{zScoreSlider.toFixed(1)}σ</span>
          </div>
          <input
            type="range"
            min="1.5"
            max="5.0"
            step="0.1"
            value={zScoreSlider}
            onChange={e => setZScoreSlider(parseFloat(e.target.value))}
            className="w-full accent-[#00F0FF] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#94A3B8] mt-1">
            <span>High Sensitivity (1.5σ)</span>
            <span>Recommended (3.0σ)</span>
            <span>Strict Outliers (5.0σ)</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[#E0F2FE] mb-1.5">
            <span className="font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#FF6B00]" />
              Impossible Travel Velocity Threshold
            </span>
            <span className="text-[#FF6B00] font-bold">{velocitySlider} km/h</span>
          </div>
          <input
            type="range"
            min="300"
            max="2500"
            step="50"
            value={velocitySlider}
            onChange={e => setVelocitySlider(parseInt(e.target.value))}
            className="w-full accent-[#FF6B00] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#94A3B8] mt-1">
            <span>Car / Train (300 km/h)</span>
            <span>Commercial Flight (900 km/h)</span>
            <span>Supersonic (2500 km/h)</span>
          </div>
        </div>
      </div>

      {/* Detection Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Method 1: Rule-Based (DMGT) */}
        {(selectedEngine === 'ALL' || selectedEngine === 'RULE_BASED') && (
          <div className="p-4 rounded-xl bg-[#0D1527]/90 border border-[#9D4EDD]/60 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
              <div className="flex items-center gap-2">
                <Binary className="w-4 h-4 text-[#9D4EDD]" />
                <h3 className="text-xs font-bold text-[#FFFFFF] uppercase">1. Rule-Based & Discrete Logic Rules</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#9D4EDD]/20 text-[#9D4EDD] font-bold">DMGT Predicates</span>
            </div>

            <p className="text-xs text-[#94A3B8]">
              Evaluates incoming access events against strict mathematical invariants: impossible travel velocities, session token subnet partition invariance, and off-hours dormant windows.
            </p>

            <div className="space-y-2">
              {DMGT_RULES.map(rule => (
                <div key={rule.ruleId} className="p-2.5 rounded-lg bg-[#050811] border border-[#1E293B] text-[11px] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#E0F2FE]">{rule.name}</span>
                    <span className="text-[10px] text-[#00FF87]">{rule.ruleId}</span>
                  </div>
                  <div className="text-[10px] text-[#00F0FF] font-mono">{rule.formalLogic}</div>
                  <div className="text-[10px] text-[#94A3B8]">Condition: {rule.violationCondition}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Method 2: Access Pattern Graph (ADSA) */}
        {(selectedEngine === 'ALL' || selectedEngine === 'GRAPH_BASED') && (
          <div className="p-4 rounded-xl bg-[#0D1527]/90 border border-[#00F0FF]/60 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-[#00F0FF]" />
                <h3 className="text-xs font-bold text-[#FFFFFF] uppercase">2. Access-Pattern Graph Traversal</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#00F0FF]/20 text-[#00F0FF] font-bold">ADSA Graph</span>
            </div>

            <p className="text-xs text-[#94A3B8]">
              Maintains an in-memory topological graph <code className="text-[#00F0FF]">G = (V, E)</code>. Executes BFS traversal to check for unauthorized direct access paths from unauthenticated WiFi to restricted databases without firewall bastion hops.
            </p>

            <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B] space-y-2 text-[11px]">
              <div className="text-[#00FF87] font-bold">Active Path Invariant Rules:</div>
              <ul className="list-disc list-inside space-y-1 text-[#94A3B8] text-[10px]">
                <li><span className="text-[#E0F2FE]">Dormitory Subnet (10.20.0.0/16)</span> cannot establish direct socket to <span className="text-[#FF0055]">Registrar Core (192.168.1.0/24)</span>.</li>
                <li><span className="text-[#E0F2FE]">External Tor Nodes</span> must never match active campus bearer cookies.</li>
                <li>Bipartite degree check: Single IP degree to student vertices must not exceed 10 accounts/min.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Method 3: Statistical Gaussian Anomaly Detector (Python) */}
        {(selectedEngine === 'ALL' || selectedEngine === 'STATISTICAL') && (
          <div className="p-4 rounded-xl bg-[#0D1527]/90 border border-[#FF6B00]/60 space-y-3 md:col-span-2">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#FF6B00]" />
                <h3 className="text-xs font-bold text-[#FFFFFF] uppercase">3. Python Statistical Anomaly Detector (Z-Score & Isolation Forest)</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF6B00]/20 text-[#FF6B00] font-bold">Gaussian 3σ Model</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B]">
                <div className="text-[#00F0FF] font-bold text-[11px]">Gaussian Z-Score Formula</div>
                <div className="font-mono text-[12px] text-[#FFFFFF] my-1">Z = (x - μ) / σ</div>
                <div className="text-[10px] text-[#94A3B8]">Flags events where latency or burst attempt frequency exceeds 3 standard deviations from normal.</div>
              </div>

              <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B]">
                <div className="text-[#9D4EDD] font-bold text-[11px]">Interquartile Range (IQR)</div>
                <div className="font-mono text-[12px] text-[#FFFFFF] my-1">IQR = Q3 - Q1</div>
                <div className="text-[10px] text-[#94A3B8]">Robust outlier detection that is resilient against skewed distributions like Tor latency hops.</div>
              </div>

              <div className="p-3 rounded-lg bg-[#050811] border border-[#1E293B]">
                <div className="text-[#00FF87] font-bold text-[11px]">Isolation Forest Model</div>
                <div className="font-mono text-[12px] text-[#FFFFFF] my-1">iForest(n=100, c=0.03)</div>
                <div className="text-[10px] text-[#94A3B8]">Unsupervised decision trees isolating anomalies in multidimensional feature space.</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Caught Anomalies Stream */}
      <div className="bg-[#0D1527]/90 border border-[#1E293B] rounded-xl p-4">
        <div className="flex items-center justify-between mb-3 border-b border-[#1E293B] pb-2">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#FF0055]" />
            <h3 className="text-xs font-bold text-[#FFFFFF] uppercase">
              Live Intercepted Security Anomalies ({anomalies.length})
            </h3>
          </div>
          <span className="text-[10px] text-[#94A3B8]">Auto-triaged by Rule Engine</span>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {anomalies.length === 0 ? (
            <div className="text-xs text-[#94A3B8] italic p-4 text-center">No anomalies detected in current buffer. Click "Simulate Attack" to test!</div>
          ) : (
            anomalies.map(anom => (
              <div key={anom.id} className="p-3 rounded-lg bg-[#050811] border border-[#FF0055]/50 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#FF0055]/20 text-[#FF0055] font-bold">
                      {anom.anomalyType || 'ANOMALY'}
                    </span>
                    <span className="font-bold text-[#FFFFFF]">{anom.targetResource}</span>
                    <span className="text-[11px] text-[#00F0FF]">@{anom.username}</span>
                  </div>
                  <div className="text-[10px] text-[#94A3B8]">{anom.details}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-[#FF0055]">Threat Score: {anom.threatScore}</div>
                  <div className="text-[10px] text-[#94A3B8]">{anom.ipAddress}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
