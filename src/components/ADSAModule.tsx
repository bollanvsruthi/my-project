import React, { useState } from 'react';
import { Cpu, Network, ArrowRight, Play, CheckCircle2, GitFork, RefreshCw, Layers } from 'lucide-react';

export const ADSAModule: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<'GRAPH_ADJ' | 'BFS_PATH' | 'DSU_BLAST' | 'DEQUE_RATE'>('BFS_PATH');
  const [bfsStep, setBfsStep] = useState<number>(0);
  const [isBfsRunning, setIsBfsRunning] = useState<boolean>(false);

  const bfsSteps = [
    {
      current: 'Queue: [usr-alex]',
      visited: ['usr-alex'],
      action: 'Initialize BFS from identity "alex.chen" (Root Vertex)',
      depth: 0
    },
    {
      current: 'Pop usr-alex ➔ Explore neighbors: [ip-dorm, ip-tor]',
      visited: ['usr-alex', 'ip-dorm', 'ip-tor'],
      action: 'Discovered dual ingress IP nodes! ip-tor (185.220.101.5) flagged as Tor proxy',
      depth: 1
    },
    {
      current: 'Pop ip-tor ➔ Explore neighbors: [res-sis, sub-dorms]',
      visited: ['usr-alex', 'ip-dorm', 'ip-tor', 'res-sis'],
      action: 'ALERT: Direct edge discovered to restricted SIS-GradePortal without intermediate firewall bastion!',
      depth: 2
    },
    {
      current: 'Path Traced: usr-alex ➔ ip-tor ➔ res-sis (Cost: 2 hops)',
      visited: ['usr-alex', 'ip-dorm', 'ip-tor', 'res-sis'],
      action: 'Shortest Path Anomaly confirmed: Policy dictates minimum 4 hops with MFA bastion.',
      depth: 2
    }
  ];

  const handleStepBfs = () => {
    if (bfsStep < bfsSteps.length - 1) {
      setBfsStep(prev => prev + 1);
    } else {
      setBfsStep(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-[#0b101e]/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            ADVANCED DATA STRUCTURES & ALGORITHMS (ADSA) • GRAPH MODELS & COMPUTATIONAL COMPLEXITY
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            Access-Pattern Graphs, Breadth-First Traversal & Disjoint Set Blast Radius
          </h2>
          <p className="text-xs text-slate-400 font-mono max-w-3xl mt-0.5">
            Algorithmic implementations for real-time security telemetry: Adjacency List graph representations,
            BFS multi-hop path anomaly detection, Disjoint Set Union (DSU) blast radius calculation, and O(1) amortized sliding window deques.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-300 font-mono text-xs font-semibold">
            COMPLEXITY: O(|V| + |E|)
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs">
            DSU O(α(N))
          </span>
        </div>
      </div>

      {/* Algorithmic Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        <button
          onClick={() => setSelectedAlgo('BFS_PATH')}
          className={`p-3.5 rounded-xl border text-left transition ${
            selectedAlgo === 'BFS_PATH'
              ? 'bg-amber-950/30 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'bg-[#0d1322] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-white">1. BFS Path Traversal</span>
            <span className="text-[10px] text-amber-400 font-bold">O(|V| + |E|)</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Traces shortest access route to detect unauthorized bypass of campus security bastions.
          </p>
        </button>

        <button
          onClick={() => setSelectedAlgo('GRAPH_ADJ')}
          className={`p-3.5 rounded-xl border text-left transition ${
            selectedAlgo === 'GRAPH_ADJ'
              ? 'bg-amber-950/30 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'bg-[#0d1322] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-white">2. Adjacency List Graph</span>
            <span className="text-[10px] text-cyan-400 font-bold">Sparse Memory</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Memory-efficient adjacency list representation of heterogeneous campus nodes & sessions.
          </p>
        </button>

        <button
          onClick={() => setSelectedAlgo('DSU_BLAST')}
          className={`p-3.5 rounded-xl border text-left transition ${
            selectedAlgo === 'DSU_BLAST'
              ? 'bg-amber-950/30 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'bg-[#0d1322] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-white">3. DSU Blast Radius</span>
            <span className="text-[10px] text-purple-400 font-bold">O(α(N))</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Disjoint Set Union with path compression to calculate contagion across compromised subnets.
          </p>
        </button>

        <button
          onClick={() => setSelectedAlgo('DEQUE_RATE')}
          className={`p-3.5 rounded-xl border text-left transition ${
            selectedAlgo === 'DEQUE_RATE'
              ? 'bg-amber-950/30 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'bg-[#0d1322] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-white">4. Sliding Deque Rate</span>
            <span className="text-[10px] text-emerald-400 font-bold">O(1) Amortized</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Ring buffer sliding window for zero-latency burst brute-force attempt detection.
          </p>
        </button>
      </div>

      {/* Main Algorithm Simulator Box */}
      <div className="bg-[#0a0f1d]/95 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* BFS Interactive Stepper */}
        {selectedAlgo === 'BFS_PATH' && (
          <div className="p-5 space-y-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase">
                <Network className="w-4 h-4 text-amber-400" />
                Breadth-First Search (BFS) Path Anomaly Visualizer
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Step {bfsStep + 1} of {bfsSteps.length}</span>
                <button
                  onClick={handleStepBfs}
                  className="px-3 py-1 rounded bg-amber-950 hover:bg-amber-900 border border-amber-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Play className="w-3.5 h-3.5" />
                  {bfsStep === bfsSteps.length - 1 ? 'Restart BFS' : 'Next BFS Step'}
                </button>
              </div>
            </div>

            {/* Current Step Telemetry */}
            <div className="p-4 rounded-xl bg-[#070b16] border border-amber-900/50 space-y-2">
              <div className="text-xs font-bold text-amber-400">
                {bfsSteps[bfsStep].current}
              </div>
              <div className="text-xs text-slate-200">
                {bfsSteps[bfsStep].action}
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span>Visited Nodes:</span>
                <div className="flex gap-1 flex-wrap">
                  {bfsSteps[bfsStep].visited.map(v => (
                    <span key={v} className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Algorithm Code Snippet */}
            <div className="p-3 bg-[#050811] rounded-lg border border-slate-800 text-xs text-slate-300 overflow-x-auto">
              <pre>
{`// Breadth-First Search Path Anomaly Detection
function detectPathAnomaly(graph: AccessGraph, source: string, target: string, minAllowedHops: number) {
  const queue: Array<{ node: string; hops: number; path: string[] }> = [{ node: source, hops: 0, path: [source] }];
  const visited = new Set<string>([source]);

  while (queue.length > 0) {
    const { node, hops, path } = queue.shift()!;
    if (node === target) {
      // If path skips mandatory bastion, flag lateral movement breach
      const hasBastion = path.some(v => v.includes('bastion') || v.includes('vpn'));
      if (hops < minAllowedHops || !hasBastion) {
        return { isAnomaly: true, hops, path, reason: 'UNAUTHORIZED_DIRECT_ROUTE' };
      }
    }
    for (const neighbor of graph.getAdjacency(node)) {
      if (!visited.has(neighbor.id)) {
        visited.add(neighbor.id);
        queue.push({ node: neighbor.id, hops: hops + 1, path: [...path, neighbor.id] });
      }
    }
  }
  return { isAnomaly: false };
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Adjacency List Details */}
        {selectedAlgo === 'GRAPH_ADJ' && (
          <div className="p-5 space-y-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                <GitFork className="w-4 h-4 text-cyan-400" />
                Dynamic Adjacency List Implementation (Java / TypeScript)
              </div>
              <span className="text-xs text-cyan-400">Space Complexity: O(|V| + |E|)</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-[#060a14] border border-slate-800 space-y-2 text-xs">
                <div className="text-cyan-400 font-bold">Current In-Memory Adjacency Table:</div>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-cyan-300 font-bold">usr-alex</span> ➔ [ip-dorm (w=1, t=05:22), <span className="text-red-400 font-bold">ip-tor (w=3, t=05:23)</span>]
                  </div>
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-cyan-300 font-bold">ip-tor</span> ➔ [<span className="text-red-400 font-bold">res-sis (w=4, action=EXFIL)</span>]
                  </div>
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-cyan-300 font-bold">usr-admin</span> ➔ [ip-library (w=2, 14 failed SSH)]
                  </div>
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-cyan-300 font-bold">sub-dorms</span> ➔ [res-canvas (w=1)]
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#050811] rounded-lg border border-slate-800 text-xs text-slate-300 overflow-x-auto">
                <pre>
{`public class AccessGraph {
    private final Map<String, List<WeightedEdge>> adjList = new HashMap<>();

    public void addAccessEvent(String src, String dst, double weight, String timestamp) {
        adjList.computeIfAbsent(src, k -> new ArrayList<>())
               .add(new WeightedEdge(dst, weight, timestamp));
    }

    public List<WeightedEdge> getNeighbors(String vertexId) {
        return adjList.getOrDefault(vertexId, Collections.emptyList());
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* DSU Blast Radius */}
        {selectedAlgo === 'DSU_BLAST' && (
          <div className="p-5 space-y-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Disjoint Set Union (DSU) Blast Radius Calculation
              </div>
              <span className="text-xs text-purple-400">Time Complexity: O(α(N)) via Path Compression</span>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 space-y-2 text-xs">
              <div className="text-purple-300 font-bold">Incident Contagion Component:</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                When credentials for "alex.chen" were compromised from 185.220.101.5, DSU dynamically performed Union(alex.chen, TorExit) 
                and Union(TorExit, SIS-GradePortal). The resulting connected component size is 3 entities, triggering an automated containment perimeter.
              </p>
            </div>

            <div className="p-3 bg-[#050811] rounded-lg border border-slate-800 text-xs text-slate-300 overflow-x-auto">
              <pre>
{`class DisjointSetUnion {
  private parent: Map<string, string> = new Map();
  private rank: Map<string, number> = new Map();

  find(i: string): string {
    if (this.parent.get(i) === i) return i;
    // Path compression
    const root = this.find(this.parent.get(i)!);
    this.parent.set(i, root);
    return root;
  }

  union(i: string, j: string): void {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      // Union by rank
      const rankI = this.rank.get(rootI) || 0;
      const rankJ = this.rank.get(rootJ) || 0;
      if (rankI < rankJ) this.parent.set(rootI, rootJ);
      else if (rankI > rankJ) this.parent.set(rootJ, rootI);
      else {
        this.parent.set(rootJ, rootI);
        this.rank.set(rootI, rankI + 1);
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Sliding Deque Rate */}
        {selectedAlgo === 'DEQUE_RATE' && (
          <div className="p-5 space-y-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                Sliding Window Deque Rate Limiter & Burst Evaluator
              </div>
              <span className="text-xs text-emerald-400">Amortized O(1) Push / Pop</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2 text-xs">
              <div className="text-emerald-300 font-bold">Sliding Window Mechanism:</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                As access attempts arrive at timestamp t, elements with timestamp &lt; t - 60 seconds are popped from the head of the deque. 
                If deque.length &gt; 5 failed logins, an automated firewall rate-limit flag is returned in O(1) amortized time.
              </p>
            </div>

            <div className="p-3 bg-[#050811] rounded-lg border border-slate-800 text-xs text-slate-300 overflow-x-auto">
              <pre>
{`class SlidingWindowRateLimiter {
  private attempts: number[] = [];
  private readonly windowMs: number = 60000; // 60-second window
  private readonly maxFailures: number = 5;

  public recordAttempt(timestamp: number, isFailure: boolean): boolean {
    if (!isFailure) return false;
    const threshold = timestamp - this.windowMs;
    // O(1) amortized cleanup of expired attempts
    while (this.attempts.length > 0 && this.attempts[0] < threshold) {
      this.attempts.shift();
    }
    this.attempts.push(timestamp);
    return this.attempts.length > this.maxFailures;
  }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
