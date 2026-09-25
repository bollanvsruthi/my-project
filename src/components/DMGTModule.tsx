import React, { useState } from 'react';
import { Binary, CheckCircle2, XCircle, Calculator, Sigma, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { DMGT_RULES } from '../data/mockCampusData';
import { DMGTRule } from '../types';

export const DMGTModule: React.FC = () => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>('DMGT-R1_VELOCITY');
  
  // Interactive test vectors state
  const [testDeltaT, setTestDeltaT] = useState<number>(94);
  const [testDistanceKm, setTestDistanceKm] = useState<number>(6200);
  const [testSubnetCount, setTestSubnetCount] = useState<number>(2);
  const [testIpDegree, setTestIpDegree] = useState<number>(14);

  const activeRule = DMGT_RULES.find(r => r.ruleId === selectedRuleId) || DMGT_RULES[0];

  // Predicate evaluation logic
  const calculatedVelocity = testDeltaT > 0 ? (testDistanceKm / (testDeltaT / 3600)).toFixed(0) : '0';
  const isVelocityViolated = parseFloat(calculatedVelocity) > 900;
  const isEquivalenceViolated = testSubnetCount > 1;
  const isDegreeViolated = testIpDegree > 10;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-[#0b101e]/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <Binary className="w-4 h-4" />
            DISCRETE MATHEMATICS & GRAPH THEORY (DMGT) • MATHEMATICAL SECURITY FORMALISMS
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            Formal Logic Predicates, Equivalence Partitions & Transitive Closures
          </h2>
          <p className="text-xs text-slate-400 font-mono max-w-3xl mt-0.5">
            Theoretical verification of network access security using First-Order Predicate Calculus, 
            Equivalence Relations on Session Partitions, Warshall\'s Transitive Closures, and Bipartite Graph Neighborhoods.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-800/60 text-purple-300 font-mono text-xs font-semibold">
            FORMAL METHODS
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs">
            Provable Safety
          </span>
        </div>
      </div>

      {/* 4 Core Mathematical Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 font-mono">
        {DMGT_RULES.map(rule => {
          const isSelected = selectedRuleId === rule.ruleId;
          return (
            <div
              key={rule.ruleId}
              onClick={() => setSelectedRuleId(rule.ruleId)}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-950/30 border-purple-500/80 shadow-[0_0_16px_rgba(168,85,247,0.2)]'
                  : 'bg-[#0d1322] border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-purple-400 uppercase font-bold mb-1">
                  <span>{rule.discreteMathTopic}</span>
                  <span className="px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-200">
                    {rule.triggerCount} Triggers
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white mb-2 leading-snug">
                  {rule.name}
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
                  {rule.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>Rule ID: {rule.ruleId}</span>
                <span className="text-cyan-400 flex items-center gap-0.5">
                  Inspect <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Rule Inspector & Interactive Truth Engine */}
      <div className="bg-[#0a0f1d]/95 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-3 bg-[#080d18] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
            <Sigma className="w-4 h-4 text-purple-400" />
            FORMAL PROPOSITION & TRUTH EVALUATION LAB • {activeRule.name}
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
            {activeRule.discreteMathTopic}
          </span>
        </div>

        <div className="p-5 space-y-5 font-mono">
          {/* Mathematical Predicate Formula Display */}
          <div className="p-4 rounded-xl bg-[#060912] border border-purple-900/50 space-y-2">
            <div className="text-[10px] text-purple-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              First-Order Predicate Calculus Definition
            </div>
            <div className="text-sm md:text-base font-bold text-purple-200 tracking-wide overflow-x-auto py-1">
              {activeRule.formalLogic}
            </div>
            <div className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
              <span className="text-slate-300 font-semibold">Relational Model: </span>
              {activeRule.relationalDefinition}
            </div>
          </div>

          {/* Interactive Variable Tester & Live Truth Evaluation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Interactive Input Controls */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-cyan-400" />
                Simulate Input Vector Parameters
              </div>

              {activeRule.ruleId === 'DMGT-R1_VELOCITY' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Time Interval between consecutive logins (Δt):</span>
                      <span className="text-cyan-400 font-bold">{testDeltaT} seconds</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="1800"
                      value={testDeltaT}
                      onChange={e => setTestDeltaT(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Geodesic Distance between IP Coordinates:</span>
                      <span className="text-cyan-400 font-bold">{testDistanceKm} km</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="12000"
                      step="100"
                      value={testDistanceKm}
                      onChange={e => setTestDistanceKm(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {activeRule.ruleId === 'DMGT-R2_EQUIVALENCE' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Number of concurrent subnets using token s:</span>
                      <span className="text-indigo-400 font-bold">{testSubnetCount} subnets</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={testSubnetCount}
                      onChange={e => setTestSubnetCount(Number(e.target.value))}
                      className="w-full accent-indigo-400 cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Equivalence classes require equivalence relation reflexivity: a single session token s cannot belong to multiple disjoint subnet cosets simultaneously.
                  </p>
                </div>
              )}

              {activeRule.ruleId === 'DMGT-R3_TRANSITIVE' && (
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-black/40 border border-slate-800 space-y-1 text-[11px]">
                    <div className="text-purple-300 font-bold">Warshall\'s Reachability Matrix:</div>
                    <div className="text-slate-300">A = [Dorm, Library, PhysicsLab, Bastion, RegistrarCore]</div>
                    <div className="text-emerald-400">A*[Dorm, Bastion] = 1, A*[Bastion, RegistrarCore] = 1</div>
                    <div className="text-red-400 font-bold">Direct edge (Dorm, RegistrarCore) = 1 [VIOLATION]</div>
                  </div>
                </div>
              )}

              {activeRule.ruleId === 'DMGT-R4_RATE_BURST' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Bipartite IP Vertex Degree deg(v_ip):</span>
                      <span className="text-amber-400 font-bold">{testIpDegree} user identities</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={testIpDegree}
                      onChange={e => setTestIpDegree(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Normal threshold: deg(IP) ≤ 3 (personal smartphone + laptop). deg(IP) &gt; 10 triggers Hall\'s condition anomaly flag.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Evaluated Output & Formal Verdict */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Propositional Truth Value</span>
                  <span className="text-[10px] text-slate-400">Boolean Result:</span>
                </div>

                {activeRule.ruleId === 'DMGT-R1_VELOCITY' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Calculated Velocity:</span>
                      <span className="font-bold text-white">{calculatedVelocity} km/h</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Physical Plausibility Limit (v_max):</span>
                      <span className="text-slate-300">900 km/h (Commercial Airspeed)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Proposition P ∧ Q:</span>
                      <span className="text-cyan-300 font-bold">
                        ({testDeltaT}s &lt; 300s) ∧ ({calculatedVelocity} &gt; 900) = TRUE
                      </span>
                    </div>
                  </div>
                )}

                {activeRule.ruleId === 'DMGT-R2_EQUIVALENCE' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Session Partition Class:</span>
                      <span className="text-white font-bold">|S/~| = {testSubnetCount} distinct subnets</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Transitivity Invariance:</span>
                      <span className={isEquivalenceViolated ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {isEquivalenceViolated ? 'BROKEN (Token multiplexed)' : 'PRESERVED'}
                      </span>
                    </div>
                  </div>
                )}

                {activeRule.ruleId === 'DMGT-R3_TRANSITIVE' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Policy Matrix Check:</span>
                      <span className="text-red-400 font-bold">DIRECT EDGE DETECTED</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Transitive Closure Path:</span>
                      <span className="text-slate-300 font-mono">DormWiFi ➔ TorProxy ➔ RegistrarDB</span>
                    </div>
                  </div>
                )}

                {activeRule.ruleId === 'DMGT-R4_RATE_BURST' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Neighborhood Cardinality |N(IP)|:</span>
                      <span className="text-white font-bold">{testIpDegree} user nodes</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Bipartite Matching Condition:</span>
                      <span className={isDegreeViolated ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {isDegreeViolated ? 'VIOLATED (Credential Stuffing)' : 'NORMAL'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Final Verdict Banner */}
              <div
                className={`mt-4 p-3 rounded-lg border flex items-center justify-between ${
                  (activeRule.ruleId === 'DMGT-R1_VELOCITY' && isVelocityViolated) ||
                  (activeRule.ruleId === 'DMGT-R2_EQUIVALENCE' && isEquivalenceViolated) ||
                  (activeRule.ruleId === 'DMGT-R3_TRANSITIVE') ||
                  (activeRule.ruleId === 'DMGT-R4_RATE_BURST' && isDegreeViolated)
                    ? 'bg-red-950/60 border-red-700 text-red-200'
                    : 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" />
                  <div>
                    <div className="font-bold text-xs">
                      RULE VIOLATION: ANOMALY CONFIRMED
                    </div>
                    <div className="text-[10px] opacity-80">
                      Automated ticket generated for SOC incident queue.
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-900 text-white font-bold text-xs">
                  FLAGGED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
