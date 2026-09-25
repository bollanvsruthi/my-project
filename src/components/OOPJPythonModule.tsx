import React, { useState } from 'react';
import { Code, Play, Copy, Check, Sliders, ShieldAlert, Sparkles, BarChart2, Layers } from 'lucide-react';

export const OOPJPythonModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'PYTHON_DETECTOR' | 'OOP_ARCHITECTURE'>('PYTHON_DETECTOR');
  const [zThreshold, setZThreshold] = useState<number>(3.0);
  const [windowSize, setWindowSize] = useState<number>(50);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Simulated telemetry points for statistical detector
  const [samplePoints] = useState([
    { id: 1, user: 'alex.chen', latency: 142, attemptsInMin: 1, zScore: 0.2, isOutlier: false },
    { id: 2, user: 'maya.patel', latency: 110, attemptsInMin: 1, zScore: 0.1, isOutlier: false },
    { id: 3, user: 'prof.morrison', latency: 195, attemptsInMin: 2, zScore: 0.6, isOutlier: false },
    { id: 4, user: 'jordan.lee', latency: 130, attemptsInMin: 1, zScore: 0.3, isOutlier: false },
    { id: 5, user: 'admin.kaufman', latency: 81, attemptsInMin: 14, zScore: 4.82, isOutlier: true, note: 'BURST_ATTACK' },
    { id: 6, user: 'alex.chen', latency: 480, attemptsInMin: 8, zScore: 3.91, isOutlier: true, note: 'LATENCY_SPIKE_TOR' },
    { id: 7, user: 'dean.vasquez', latency: 160, attemptsInMin: 1, zScore: 0.4, isOutlier: false },
    { id: 8, user: 'external_bot', latency: 72, attemptsInMin: 28, zScore: 6.14, isOutlier: true, note: 'CREDENTIAL_STUFF' },
  ]);

  const pythonScript = `#!/usr/bin/env python3
"""
Campus Network Access Log - Statistical Anomaly Detector
Implements Rolling Gaussian Z-Score, Interquartile Range (IQR), and Isolation Forest.
"""

import numpy as np
import pandas as pd
from scipy import stats
from sklearn.ensemble import IsolationForest
from datetime import datetime, timedelta

class CampusAccessAnomalyDetector:
    def __init__(self, z_threshold: float = ${zThreshold.toFixed(1)}, window_size: int = ${windowSize}):
        self.z_threshold = z_threshold
        self.window_size = window_size
        self.model = IsolationForest(contamination=0.03, random_state=42)
        
    def calculate_rolling_z_score(self, df: pd.DataFrame, metric_col: str = 'attempt_frequency') -> pd.DataFrame:
        """Computes rolling mean (mu) and std (sigma) to detect sudden burst deviations."""
        rolling_mean = df[metric_col].rolling(window=self.window_size, min_periods=5).mean()
        rolling_std = df[metric_col].rolling(window=self.window_size, min_periods=5).std().replace(0, 1e-5)
        
        df['z_score'] = (df[metric_col] - rolling_mean) / rolling_std
        df['is_z_anomaly'] = df['z_score'].abs() > self.z_threshold
        return df

    def calculate_iqr_outliers(self, df: pd.DataFrame, latency_col: str = 'latency_ms') -> pd.DataFrame:
        """Uses Interquartile Range (IQR) to identify non-parametric latency spikes (e.g. Tor relays)."""
        q1 = df[latency_col].quantile(0.25)
        q3 = df[latency_col].quantile(0.75)
        iqr = q3 - q1
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr
        
        df['is_iqr_anomaly'] = (df[latency_col] < lower_bound) | (df[latency_col] > upper_bound)
        return df

    def fit_predict_isolation_forest(self, df: pd.DataFrame) -> pd.DataFrame:
        """Multi-dimensional unsupervised anomaly detection on (attempts, latency, off_hours)."""
        features = df[['attempt_frequency', 'latency_ms', 'is_off_hours']].fillna(0)
        df['iforest_anomaly'] = self.model.fit_predict(features)
        # Isolation Forest outputs -1 for anomalies, 1 for normal
        df['is_iforest_anomaly'] = df['iforest_anomaly'] == -1
        return df

# Example Execution:
if __name__ == "__main__":
    detector = CampusAccessAnomalyDetector(z_threshold=${zThreshold.toFixed(1)})
    # In production, stream dataframe from PostgreSQL / Kafka queue
    print(f"[*] Statistical Anomaly Detector initialized with Z-Threshold: {detector.z_threshold}σ")
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Overview Banner */}
      <div className="bg-[#0b101e]/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <span className="text-blue-400 font-bold">Py</span>
            OOPJ & PYTHON ENGINE • OBJECT-ORIENTED ARCHITECTURE & STATISTICAL DETECTOR
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            Polymorphic OOP Hierarchy & Gaussian Z-Score / IQR Threat Detection
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl mt-0.5">
            Combines robust Java/TypeScript Object-Oriented design patterns (Strategy, Observer, Factory) 
            with high-performance Python statistical anomaly modeling (Z-Score, IQR, Isolation Forest).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('PYTHON_DETECTOR')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition ${
              activeSubTab === 'PYTHON_DETECTOR'
                ? 'bg-cyan-950 border-cyan-500 text-cyan-300 glow-cyan'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Python Statistical Lab
          </button>
          <button
            onClick={() => setActiveSubTab('OOP_ARCHITECTURE')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition ${
              activeSubTab === 'OOP_ARCHITECTURE'
                ? 'bg-cyan-950 border-cyan-500 text-cyan-300 glow-cyan'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            OOPJ Architecture
          </button>
        </div>
      </div>

      {activeSubTab === 'PYTHON_DETECTOR' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="p-4 bg-[#0a0f1d] border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Z-Score Anomaly Cutoff (σ):</span>
                  <span className="text-cyan-400 font-bold">+{zThreshold.toFixed(1)}σ</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="4.5"
                  step="0.1"
                  value={zThreshold}
                  onChange={e => setZThreshold(parseFloat(e.target.value))}
                  className="w-44 accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Rolling Window (N):</span>
                  <span className="text-indigo-400 font-bold">{windowSize} logs</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="10"
                  value={windowSize}
                  onChange={e => setWindowSize(parseInt(e.target.value))}
                  className="w-44 accent-indigo-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCode ? 'Copied' : 'Copy Python Code'}
              </button>
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="px-3.5 py-1.5 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition glow-cyan"
              >
                <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                {isSimulating ? 'Evaluating...' : 'Run Detector'}
              </button>
            </div>
          </div>

          {/* Real-time Interactive Scatter & Outlier Visualizer */}
          <div className="p-4 bg-[#090e1a] border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5 uppercase">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                Sample Log Telemetry Evaluation (Z-Score & IQR Cutoff)
              </span>
              <span className="text-slate-400 text-[11px]">
                Distribution: μ = 145ms, σ = 32ms | Attempt Baseline: 1.2/min
              </span>
            </div>

            {/* Scatter grid table */}
            <div className="overflow-x-auto border border-slate-800 rounded-lg bg-[#060a14]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-[11px] text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Account Identity</th>
                    <th className="px-3 py-2">Latency (ms)</th>
                    <th className="px-3 py-2">Attempts / Min</th>
                    <th className="px-3 py-2">Computed Z-Score</th>
                    <th className="px-3 py-2">Statistical Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {samplePoints.map(pt => {
                    const isFlagged = pt.zScore >= zThreshold;
                    return (
                      <tr key={pt.id} className={isFlagged ? 'bg-red-950/20' : 'hover:bg-slate-900/40'}>
                        <td className="px-3 py-2 text-slate-400">{pt.id}</td>
                        <td className="px-3 py-2 font-bold text-white">{pt.user}</td>
                        <td className="px-3 py-2 text-cyan-300">{pt.latency} ms</td>
                        <td className="px-3 py-2 text-indigo-300">{pt.attemptsInMin}</td>
                        <td className="px-3 py-2 font-bold">
                          <span className={isFlagged ? 'text-red-400' : 'text-slate-300'}>
                            +{pt.zScore.toFixed(2)}σ
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          {isFlagged ? (
                            <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold text-[10px]">
                              🚨 ANOMALY (|Z| &gt; {zThreshold.toFixed(1)})
                            </span>
                          ) : (
                            <span className="text-emerald-400 text-[11px]">Within 99.7% Gaussian Normal</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Python Code Viewer */}
          <div className="p-4 bg-[#050811] rounded-xl border border-slate-800 overflow-x-auto">
            <pre className="text-xs text-emerald-300/90 leading-relaxed">
              <code>{pythonScript}</code>
            </pre>
          </div>
        </div>
      )}

      {activeSubTab === 'OOP_ARCHITECTURE' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pattern 1 */}
            <div className="p-4 rounded-xl bg-[#0e1424] border border-cyan-900/60 space-y-2">
              <div className="text-xs font-bold text-cyan-300 uppercase">1. Strategy Pattern</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Abstract <code className="text-cyan-400">AnomalyDetector</code> interface implemented by 
                <code className="text-slate-200"> ZScoreDetector</code>, <code className="text-slate-200">VelocityDetector</code>, and 
                <code className="text-slate-200">GraphPathDetector</code>. Enables plug-and-play detection algorithms without modifying ingestion pipelines.
              </p>
            </div>

            {/* Pattern 2 */}
            <div className="p-4 rounded-xl bg-[#0e1424] border border-purple-900/60 space-y-2">
              <div className="text-xs font-bold text-purple-300 uppercase">2. Observer Pattern</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                <code className="text-purple-400">AlertDispatcher</code> acts as subject, notifying SOC UI subscribers, 
                automated border firewall actors, and incident response queues upon state change.
              </p>
            </div>

            {/* Pattern 3 */}
            <div className="p-4 rounded-xl bg-[#0e1424] border border-emerald-900/60 space-y-2">
              <div className="text-xs font-bold text-emerald-300 uppercase">3. Immutability & Audit</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                <code className="text-emerald-400">AccessRecord</code> entities are strictly immutable append-only value objects, 
                guaranteeing non-repudiation for campus legal compliance.
              </p>
            </div>
          </div>

          {/* OOP Java Code Implementation */}
          <div className="p-4 bg-[#050811] rounded-xl border border-slate-800 text-xs text-slate-300 overflow-x-auto">
            <pre>
{`// Object-Oriented Architecture (OOPJ)
public interface AnomalyDetector {
    DetectionResult evaluate(AccessLog log, SessionContext context);
}

// Concrete Strategy: Statistical Z-Score Detector
public class ZScoreAnomalyDetector implements AnomalyDetector {
    private final double zThreshold;
    private final RollingStats rollingStats;

    public ZScoreAnomalyDetector(double zThreshold, int windowSize) {
        this.zThreshold = zThreshold;
        this.rollingStats = new RollingStats(windowSize);
    }

    @Override
    public DetectionResult evaluate(AccessLog log, SessionContext context) {
        double currentZ = rollingStats.calculateZ(log.getLatencyMs());
        if (Math.abs(currentZ) > zThreshold) {
            return new DetectionResult(true, "Z-Score anomaly: " + currentZ, Severity.HIGH);
        }
        return DetectionResult.clean();
    }
}

// Observer Pattern: Security Alert Dispatcher
public class AlertDispatcher {
    private final List<SecuritySubscriber> subscribers = new CopyOnWriteArrayList<>();

    public void register(SecuritySubscriber sub) { subscribers.add(sub); }
    public void notify(ThreatAlert alert) {
        for (SecuritySubscriber sub : subscribers) {
            sub.onSecurityAlert(alert);
        }
    }
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
