import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  Binary, 
  Cpu, 
  Code2, 
  Network, 
  ShieldCheck, 
  Server, 
  ArrowRight,
  GitBranch,
  Terminal,
  Activity
} from 'lucide-react';
import { TEAM_MEMBERS } from './Footer';

export const SystemArchitectureView: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'ALL' | 'DBMS' | 'DMGT' | 'ADSA' | 'PYTHON'>('ALL');

  return (
    <div className="space-y-4 font-mono">
      {/* Top Banner */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#9D4EDD] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            END-TO-END ACADEMIC CURRICULUM ARCHITECTURE
          </div>
          <h2 className="text-lg font-bold text-[#FFFFFF] mt-1">
            System Pipeline: DBMS • DMGT • ADSA • OOPJ & Python
          </h2>
          <p className="text-xs text-[#94A3B8] max-w-3xl mt-0.5">
            Holistic cross-disciplinary computer science architecture tracing raw network packet ingestion down through normalized relational databases, discrete logic invariants, topological graph traversals, and Python statistical ML.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#050811] border border-[#9D4EDD]/60 text-[#9D4EDD] text-xs font-bold">
            5 Core Subjects Integrated
          </span>
        </div>
      </div>

      {/* Layer Filter Buttons */}
      <div className="flex items-center bg-[#0D1527] border border-[#1E293B] rounded-xl p-1 gap-1 text-xs">
        {[
          { id: 'ALL', label: 'Full System Pipeline' },
          { id: 'DBMS', label: '1. DBMS (Relational ER & SQL)' },
          { id: 'DMGT', label: '2. DMGT (Discrete Formal Logic)' },
          { id: 'ADSA', label: '3. ADSA (Graph Data Structures)' },
          { id: 'PYTHON', label: '4. OOPJ & Python ML Detector' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveLayer(item.id as any)}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              activeLayer === item.id
                ? 'bg-[#9D4EDD]/25 text-[#9D4EDD] border border-[#9D4EDD]/50 font-bold'
                : 'text-[#94A3B8] hover:text-[#FFFFFF]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Pipeline Diagram Cards */}
      <div className="space-y-3">
        {/* Layer 1: Ingestion */}
        <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E293B] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#050811] border border-[#00F0FF]/50 flex items-center justify-center text-[#00F0FF]">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#FFFFFF]">STAGE 1: RAW INGESTION & NORMALIZATION</div>
              <div className="text-[11px] text-[#94A3B8]">Campus RADIUS WiFi logs, Syslog, Nginx reverse proxy access streams.</div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#94A3B8] hidden sm:block" />
        </div>

        {/* Layer 2: DBMS */}
        {(activeLayer === 'ALL' || activeLayer === 'DBMS') && (
          <div className="p-4 rounded-xl bg-[#0D1527] border border-[#00FF87]/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#00FF87]" />
                <span className="text-xs font-bold text-[#FFFFFF]">STAGE 2: DBMS RELATIONAL ER MODEL & SQL WINDOW FUNCTIONS</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#00FF87]/20 text-[#00FF87] font-bold">PostgreSQL 16 BCNF</span>
            </div>
            <p className="text-xs text-[#E0F2FE]">
              Stores normalized entities: <code className="text-[#00FF87]">USERS (1) ➔ SESSIONS (N) ➔ ACCESS_LOGS (N)</code>. Employs <code className="text-[#00F0FF]">LAG()</code> window functions to calculate geodesic distance divided by delta timestamp between sequential user sessions.
            </p>
          </div>
        )}

        {/* Layer 3: DMGT */}
        {(activeLayer === 'ALL' || activeLayer === 'DMGT') && (
          <div className="p-4 rounded-xl bg-[#0D1527] border border-[#9D4EDD]/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Binary className="w-4 h-4 text-[#9D4EDD]" />
                <span className="text-xs font-bold text-[#FFFFFF]">STAGE 3: DMGT DISCRETE MATHEMATICAL LOGIC & FORMAL RULES</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#9D4EDD]/20 text-[#9D4EDD] font-bold">Predicate Calculus</span>
            </div>
            <p className="text-xs text-[#E0F2FE]">
              Evaluates First-Order Predicates <code className="text-[#9D4EDD]">∀ u ∈ U: dist(ip1, ip2)/Δt &gt; v_max ⟹ Anomaly</code>, verifies session equivalence relation partitions, and calculates Warshall's Transitive Closure <code className="text-[#9D4EDD]">A*</code> on network reachability.
            </p>
          </div>
        )}

        {/* Layer 4: ADSA */}
        {(activeLayer === 'ALL' || activeLayer === 'ADSA') && (
          <div className="p-4 rounded-xl bg-[#0D1527] border border-[#00F0FF]/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-[#00F0FF]" />
                <span className="text-xs font-bold text-[#FFFFFF]">STAGE 4: ADSA ACCESS-PATTERN TOPOLOGICAL GRAPH</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#00F0FF]/20 text-[#00F0FF] font-bold">BFS & Disjoint Sets</span>
            </div>
            <p className="text-xs text-[#E0F2FE]">
              In-memory Adjacency List graph representing Users, IP Gateways, Subnets, and Target Systems. Breadth-First Search (BFS) traces lateral movement paths; Disjoint Set Union (DSU) calculates blast radius in <code className="text-[#00F0FF]">O(α(N))</code> time.
            </p>
          </div>
        )}

        {/* Layer 5: OOPJ & Python */}
        {(activeLayer === 'ALL' || activeLayer === 'PYTHON') && (
          <div className="p-4 rounded-xl bg-[#0D1527] border border-[#FF6B00]/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#FF6B00]" />
                <span className="text-xs font-bold text-[#FFFFFF]">STAGE 5: OOPJ ARCHITECTURE & PYTHON STATISTICAL DETECTOR</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF6B00]/20 text-[#FF6B00] font-bold">Scikit-Learn & Z-Score</span>
            </div>
            <p className="text-xs text-[#E0F2FE]">
              Modular Object-Oriented design using Strategy and Observer patterns. Python engine computes dynamic Gaussian Z-Scores <code className="text-[#FF6B00]">Z = (x - μ) / σ</code> and runs Isolation Forest clustering to catch zero-day distributed attacks.
            </p>
          </div>
        )}
      </div>

      {/* Team Contribution Mapping */}
      <div className="p-4 rounded-xl bg-[#080D1A] border border-[#1E293B] space-y-3">
        <div className="text-xs font-bold text-[#FFFFFF] uppercase">Project Module Responsibility Matrix (TEAM-15)</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          {TEAM_MEMBERS.map(m => (
            <div key={m.rollNo} className="p-2.5 rounded-lg bg-[#050811] border border-[#1E293B] space-y-0.5">
              <div className="flex justify-between text-[#00F0FF] font-bold text-[11px]">
                <span>{m.name}</span>
                <span className="text-slate-400 font-normal">{m.rollNo}</span>
              </div>
              <div className="text-[10px] text-[#94A3B8]">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
