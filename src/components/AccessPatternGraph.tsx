import React, { useState } from 'react';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldAlert, 
  Radio, 
  Server, 
  User as UserIcon, 
  Lock, 
  Flame, 
  Activity,
  Layers
} from 'lucide-react';
import { GraphNode, GraphEdge } from '../types';

interface AccessPatternGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  highlightAnomalyType?: string;
  onSelectNode?: (node: GraphNode | null) => void;
}

export const AccessPatternGraph: React.FC<AccessPatternGraphProps> = ({
  nodes,
  edges,
  highlightAnomalyType,
  onSelectNode
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('usr-alex');
  const [filterMode, setFilterMode] = useState<'ALL' | 'ANOMALIES_ONLY'>('ALL');
  const [zoomLevel, setZoomLevel] = useState(1);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  const filteredEdges = edges.filter(e => {
    if (filterMode === 'ANOMALIES_ONLY' && !e.isAnomaly) return false;
    if (highlightAnomalyType && e.anomalyType !== highlightAnomalyType && !e.label.includes(highlightAnomalyType)) {
      // allow if highlighting
    }
    return true;
  });

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNodeId(node.id);
    if (onSelectNode) onSelectNode(node);
  };

  // Helper to get node position by ID
  const getNodePos = (id: string) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x || 100, y: node.y || 100 } : { x: 100, y: 100 };
  };

  return (
    <div className="bg-[#0D1527]/95 border border-[#1E293B] rounded-xl flex flex-col h-[650px] overflow-hidden shadow-2xl relative font-mono">
      {/* Top Toolbar */}
      <div className="p-3 border-b border-[#1E293B] bg-[#050811] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-xs font-bold text-[#FFFFFF] tracking-wider uppercase">
            CAMPUS ACCESS-PATTERN TOPOLOGICAL GRAPH (ADSA)
          </span>
          <span className="text-[10px] bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 px-2 py-0.5 rounded">
            |V|={nodes.length} Vertices, |E|={filteredEdges.length} Edges
          </span>
        </div>

        {/* View Controls & Filters */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center bg-[#050811] border border-[#1E293B] rounded-lg p-0.5">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-2.5 py-1 rounded text-[11px] transition ${
                filterMode === 'ALL' ? 'bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/50 font-bold' : 'text-[#94A3B8]'
              }`}
            >
              Full Campus Mesh
            </button>
            <button
              onClick={() => setFilterMode('ANOMALIES_ONLY')}
              className={`px-2.5 py-1 rounded text-[11px] flex items-center gap-1 transition ${
                filterMode === 'ANOMALIES_ONLY' ? 'bg-[#FF0055]/25 text-[#FF0055] border border-[#FF0055]/60 font-bold' : 'text-[#94A3B8]'
              }`}
            >
              <ShieldAlert className="w-3 h-3 text-[#FF0055]" />
              Attack Trajectories Only
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#050811] border border-[#1E293B] rounded-lg p-1">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
              className="p-1 hover:text-[#00F0FF] text-[#94A3B8] transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-[#94A3B8] px-1">
              {(zoomLevel * 100).toFixed(0)}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.7))}
              className="p-1 hover:text-[#00F0FF] text-[#94A3B8] transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 hover:text-[#00F0FF] text-[#94A3B8] transition"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Tier Column Labels on Top */}
        <div className="absolute top-2 left-6 right-80 flex justify-between text-[10px] font-mono text-slate-500 pointer-events-none uppercase tracking-widest z-10">
          <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">Tier 1: Identities (U)</span>
          <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">Tier 2: Ingress IP Nodes (I)</span>
          <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">Tier 3: Campus Subnet Routers (S)</span>
          <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">Tier 4: Core Resources (R)</span>
        </div>

        {/* SVG Interactive Canvas */}
        <div className="flex-1 overflow-auto cyber-grid relative bg-[#090d18]/70">
          <svg
            className="w-full h-full min-w-[850px] min-h-[580px] transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
          >
            <defs>
              {/* Arrow markers */}
              <marker
                id="arrow-normal"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#00f0ff" opacity="0.7" />
              </marker>
              <marker
                id="arrow-anomaly"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff003c" />
              </marker>
            </defs>

            {/* Edges rendering */}
            {filteredEdges.map(edge => {
              const src = getNodePos(edge.source);
              const dst = getNodePos(edge.target);
              const isAnomaly = edge.isAnomaly;

              // Quadratic curve control point
              const midX = (src.x + dst.x) / 2;
              const midY = (src.y + dst.y) / 2 - (isAnomaly ? 15 : 0);

              return (
                <g key={edge.id} className="transition-all">
                  <path
                    d={`M ${src.x} ${src.y} Q ${midX} ${midY} ${dst.x} ${dst.y}`}
                    fill="none"
                    stroke={isAnomaly ? '#ff003c' : '#00f0ff'}
                    strokeWidth={isAnomaly ? 2.5 : 1.5}
                    strokeDasharray={isAnomaly ? '6,4' : 'none'}
                    strokeOpacity={isAnomaly ? 0.9 : 0.4}
                    markerEnd={isAnomaly ? 'url(#arrow-anomaly)' : 'url(#arrow-normal)'}
                    className={isAnomaly ? 'animate-pulse' : ''}
                  />
                  {/* Edge Tag */}
                  <rect
                    x={midX - 35}
                    y={midY - 10}
                    width={70}
                    height={18}
                    rx={4}
                    fill="#080c16"
                    stroke={isAnomaly ? '#ff003c' : '#1e293b'}
                    strokeWidth={1}
                    opacity={0.9}
                  />
                  <text
                    x={midX}
                    y={midY + 2}
                    textAnchor="middle"
                    fill={isAnomaly ? '#ff6685' : '#94a3b8'}
                    fontSize="9"
                    fontFamily="Fira Code"
                    fontWeight={isAnomaly ? 'bold' : 'normal'}
                  >
                    {isAnomaly ? 'BREACH' : edge.timestamp}
                  </text>
                </g>
              );
            })}

            {/* Nodes rendering */}
            {nodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isCompromised = node.status === 'compromised';
              const isSuspicious = node.status === 'suspicious';

              let nodeColor = '#00f0ff';
              let ringColor = 'rgba(0, 240, 255, 0.3)';
              if (isCompromised) {
                nodeColor = '#ff003c';
                ringColor = 'rgba(255, 0, 60, 0.4)';
              } else if (isSuspicious) {
                nodeColor = '#f59e0b';
                ringColor = 'rgba(245, 158, 11, 0.4)';
              }

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => handleNodeClick(node)}
                  className="cursor-pointer group"
                >
                  {/* Outer pulse circle if anomalous */}
                  {(isCompromised || isSuspicious) && (
                    <circle
                      r={isSelected ? 26 : 22}
                      fill="none"
                      stroke={nodeColor}
                      strokeWidth={1.5}
                      opacity={0.7}
                      className="animate-ping"
                    />
                  )}

                  {/* Selection halo */}
                  {isSelected && (
                    <circle
                      r={24}
                      fill={ringColor}
                      stroke={nodeColor}
                      strokeWidth={2}
                    />
                  )}

                  {/* Main Node Body */}
                  <circle
                    r={node.type === 'RESOURCE' ? 18 : 16}
                    fill="#0a0f1d"
                    stroke={nodeColor}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    className="transition-all duration-150 group-hover:scale-110"
                  />

                  {/* Node Type Glyph */}
                  <text
                    textAnchor="middle"
                    dy="4"
                    fill={nodeColor}
                    fontSize="11"
                    fontFamily="Fira Code"
                    fontWeight="bold"
                  >
                    {node.type === 'USER' ? 'U' : node.type === 'IP' ? 'IP' : node.type === 'SUBNET' ? 'S' : 'R'}
                  </text>

                  {/* Node Label Below */}
                  <text
                    textAnchor="middle"
                    y={28}
                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                    fontSize="10"
                    fontFamily="Fira Code"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    {node.label}
                  </text>

                  {/* Risk Badge */}
                  {node.risk > 40 && (
                    <g transform="translate(10, -14)">
                      <rect
                        width={24}
                        height={12}
                        rx={3}
                        fill={isCompromised ? '#450a0a' : '#451a03'}
                        stroke={nodeColor}
                        strokeWidth={0.8}
                      />
                      <text
                        x={12}
                        y={9}
                        textAnchor="middle"
                        fill={nodeColor}
                        fontSize="8"
                        fontFamily="Fira Code"
                        fontWeight="bold"
                      >
                        {node.risk}%
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Sidebar: Selected Node Forensic Inspector */}
        <div className="w-80 border-l border-[#1E293B] bg-[#050811]/95 p-4 flex flex-col justify-between overflow-y-auto">
          {selectedNode ? (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider">GRAPH VERTEX INSPECTOR</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    selectedNode.status === 'compromised'
                      ? 'bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/60'
                      : selectedNode.status === 'suspicious'
                      ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/60'
                      : 'bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/60'
                  }`}
                >
                  {selectedNode.status}
                </span>
              </div>

              <div>
                <div className="text-white font-bold text-sm flex items-center gap-1.5">
                  {selectedNode.type === 'USER' && <UserIcon className="w-4 h-4 text-[#00F0FF]" />}
                  {selectedNode.type === 'IP' && <Radio className="w-4 h-4 text-[#FF6B00]" />}
                  {selectedNode.type === 'SUBNET' && <Server className="w-4 h-4 text-[#9D4EDD]" />}
                  {selectedNode.type === 'RESOURCE' && <Lock className="w-4 h-4 text-[#FF0055]" />}
                  {selectedNode.label}
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">
                  Type: <span className="text-[#00F0FF]">{selectedNode.type}</span> • ID: {selectedNode.id}
                </div>
              </div>

              {/* Threat Meter */}
              <div className="p-2.5 rounded-lg bg-[#0D1527] border border-[#1E293B] space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#94A3B8]">Risk Assessment:</span>
                  <span className={`font-bold ${selectedNode.risk > 70 ? 'text-[#FF0055]' : selectedNode.risk > 30 ? 'text-[#FF6B00]' : 'text-[#00FF87]'}`}>
                    {selectedNode.risk}/100
                  </span>
                </div>
                <div className="w-full bg-[#050811] rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full ${
                      selectedNode.risk > 70 ? 'bg-[#FF0055]' : selectedNode.risk > 30 ? 'bg-[#FF6B00]' : 'bg-[#00FF87]'
                    }`}
                    style={{ width: `${selectedNode.risk}%` }}
                  ></div>
                </div>
              </div>

              {/* Topological Math Attributes (ADSA) */}
              <div className="space-y-1.5 text-[11px]">
                <span className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider">
                  ADSA Graph Topology Metrics
                </span>
                <div className="p-2.5 rounded-lg bg-[#0D1527] border border-[#1E293B] space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Node In/Out Degree:</span>
                    <span className="text-[#00F0FF] font-bold">
                      deg(v) = {edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Connected Component:</span>
                    <span className="text-[#9D4EDD]">Cluster CC_{selectedNode.type === 'USER' ? 'Auth' : 'Target'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">BFS Min Hop Distance:</span>
                    <span className="text-[#E0F2FE]">d(v, Root) = 1 hop</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Blast Radius:</span>
                    <span className={selectedNode.risk > 70 ? 'text-[#FF0055] font-bold' : 'text-[#00FF87]'}>
                      {selectedNode.risk > 70 ? 'HIGH (Multi-Subnet Contagion)' : 'LOCAL (Single CIDR)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Connected Incidents */}
              <div className="space-y-1">
                <span className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider">
                  Active Security Incidents
                </span>
                {selectedNode.risk > 40 ? (
                  <div className="p-2.5 rounded-lg bg-[#FF0055]/15 border border-[#FF0055]/60 text-[#FF0055] space-y-1">
                    <div className="flex items-center gap-1 font-bold">
                      <Flame className="w-3.5 h-3.5 text-[#FF0055]" />
                      Active Attack Trajectory
                    </div>
                    <p className="text-[10px] text-[#E0F2FE] leading-tight">
                      Identified in spatiotemporal velocity breach and lateral access hops to core registrar.
                    </p>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-[#0D1527] border border-[#1E293B] text-[#94A3B8] text-[10px]">
                    No active critical anomaly alerts for this vertex.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-[#94A3B8] font-mono text-xs text-center py-12">
              Select any graph vertex to inspect topological properties and attack paths.
            </div>
          )}

          <div className="pt-3 border-t border-[#1E293B] text-[10px] font-mono text-[#94A3B8]">
            Adjacency List • Warshall Closure • BFS Path Tracing
          </div>
        </div>
      </div>
    </div>
  );
};
