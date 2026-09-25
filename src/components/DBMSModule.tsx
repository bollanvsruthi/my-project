import React, { useState } from 'react';
import { Database, Play, Copy, Check, Table, ShieldAlert, Code2, Layers, Key } from 'lucide-react';
import { SQL_ANOMALY_QUERIES } from '../data/mockCampusData';
import { SQLAnomalyQuery } from '../types';

export const DBMSModule: React.FC = () => {
  const [selectedQueryId, setSelectedQueryId] = useState<string>('SQL-Q1');
  const [copiedQuery, setCopiedQuery] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [queryExecutionTime, setQueryExecutionTime] = useState<number>(4.2);

  const activeQuery = SQL_ANOMALY_QUERIES.find(q => q.id === selectedQueryId) || SQL_ANOMALY_QUERIES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeQuery.querySql);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setQueryExecutionTime(parseFloat((Math.random() * 3 + 2.1).toFixed(2)));
    }, 400);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Module Overview Banner */}
      <div className="bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#00FF87] text-xs font-semibold uppercase tracking-wider">
            <Database className="w-4 h-4" />
            DATABASE MANAGEMENT SYSTEMS (DBMS) • ER SCHEMA & SQL ANOMALY ENGINE
          </div>
          <h2 className="text-lg font-bold text-[#FFFFFF] mt-1">
            Campus Network Relational Schema & Anomaly Window Queries
          </h2>
          <p className="text-xs text-[#94A3B8] max-w-3xl mt-0.5">
            Normalized BCNF relational entities for User, Session, Access Logs, and Security Rules. 
            Demonstrates advanced SQL window functions (LAG/LEAD, EPOCH extraction, and multi-tenant aggregations).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#00FF87]/15 border border-[#00FF87]/50 text-[#00FF87] text-xs font-semibold">
            ENGINE: PostgreSQL 16
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#050811] border border-[#1E293B] text-[#E0F2FE] text-xs">
            BCNF Normalized
          </span>
        </div>
      </div>

      {/* ER Model Visual Schema Card */}
      <div className="bg-[#0D1527]/95 border border-[#1E293B] rounded-xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3 border-b border-[#1E293B] pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#00F0FF]" />
            ENTITY-RELATIONSHIP (ER) MODEL • CAMPUS ACCESS ARCHITECTURE
          </div>
          <span className="text-[11px] text-[#94A3B8]">
            Cardinality: <span className="text-[#00F0FF]">1:N Hierarchical Cascade</span>
          </span>
        </div>

        {/* Visual Entity Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
          {/* Entity: USERS */}
          <div className="bg-[#0e1424] border border-cyan-900/60 rounded-lg overflow-hidden shadow">
            <div className="bg-cyan-950/80 px-3 py-2 border-b border-cyan-800/60 flex items-center justify-between">
              <span className="font-bold text-cyan-300">USERS</span>
              <span className="text-[10px] text-cyan-400/80">Table (Strong)</span>
            </div>
            <div className="p-2.5 space-y-1 text-[11px]">
              <div className="flex items-center justify-between text-yellow-400 font-bold">
                <span className="flex items-center gap-1">
                  <Key className="w-3 h-3 text-yellow-400" /> user_id
                </span>
                <span className="text-slate-500 font-normal">VARCHAR(36) [PK]</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>username</span>
                <span className="text-slate-500">VARCHAR(64) UNIQUE</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>role</span>
                <span className="text-slate-500">ENUM(student,faculty,admin)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>department</span>
                <span className="text-slate-500">VARCHAR(100)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>risk_score</span>
                <span className="text-slate-500">INT DEFAULT 0</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>primary_subnet</span>
                <span className="text-slate-500">CIDR</span>
              </div>
            </div>
          </div>

          {/* Entity: SESSIONS */}
          <div className="bg-[#0e1424] border border-indigo-900/60 rounded-lg overflow-hidden shadow">
            <div className="bg-indigo-950/80 px-3 py-2 border-b border-indigo-800/60 flex items-center justify-between">
              <span className="font-bold text-indigo-300">SESSIONS</span>
              <span className="text-[10px] text-indigo-400/80">Table (1:N from Users)</span>
            </div>
            <div className="p-2.5 space-y-1 text-[11px]">
              <div className="flex items-center justify-between text-yellow-400 font-bold">
                <span className="flex items-center gap-1">
                  <Key className="w-3 h-3 text-yellow-400" /> session_id
                </span>
                <span className="text-slate-500 font-normal">VARCHAR(36) [PK]</span>
              </div>
              <div className="flex items-center justify-between text-cyan-300">
                <span>user_id</span>
                <span className="text-slate-500">[FK ➔ USERS]</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>session_token</span>
                <span className="text-slate-500">VARCHAR(256) INDEX</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>ip_address</span>
                <span className="text-slate-500">INET</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>user_agent</span>
                <span className="text-slate-500">TEXT</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>status</span>
                <span className="text-slate-500">ENUM(active,revoked)</span>
              </div>
            </div>
          </div>

          {/* Entity: ACCESS_LOGS */}
          <div className="bg-[#0e1424] border border-emerald-900/60 rounded-lg overflow-hidden shadow">
            <div className="bg-emerald-950/80 px-3 py-2 border-b border-emerald-800/60 flex items-center justify-between">
              <span className="font-bold text-emerald-300">ACCESS_LOGS</span>
              <span className="text-[10px] text-emerald-400/80">Partitioned by Timestamp</span>
            </div>
            <div className="p-2.5 space-y-1 text-[11px]">
              <div className="flex items-center justify-between text-yellow-400 font-bold">
                <span className="flex items-center gap-1">
                  <Key className="w-3 h-3 text-yellow-400" /> log_id
                </span>
                <span className="text-slate-500 font-normal">BIGSERIAL [PK]</span>
              </div>
              <div className="flex items-center justify-between text-indigo-300">
                <span>session_id</span>
                <span className="text-slate-500">[FK ➔ SESSIONS]</span>
              </div>
              <div className="flex items-center justify-between text-cyan-300">
                <span>user_id</span>
                <span className="text-slate-500">[FK ➔ USERS]</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>access_timestamp</span>
                <span className="text-slate-500">TIMESTAMPTZ INDEX</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>target_resource</span>
                <span className="text-slate-500">VARCHAR(128)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>threat_score</span>
                <span className="text-slate-500">SMALLINT (0-100)</span>
              </div>
            </div>
          </div>

          {/* Entity: ANOMALY_ALERTS */}
          <div className="bg-[#0e1424] border border-red-900/60 rounded-lg overflow-hidden shadow">
            <div className="bg-red-950/80 px-3 py-2 border-b border-red-800/60 flex items-center justify-between">
              <span className="font-bold text-red-300">ANOMALY_ALERTS</span>
              <span className="text-[10px] text-red-400/80">Security Audit Table</span>
            </div>
            <div className="p-2.5 space-y-1 text-[11px]">
              <div className="flex items-center justify-between text-yellow-400 font-bold">
                <span className="flex items-center gap-1">
                  <Key className="w-3 h-3 text-yellow-400" /> alert_id
                </span>
                <span className="text-slate-500 font-normal">VARCHAR(36) [PK]</span>
              </div>
              <div className="flex items-center justify-between text-emerald-300">
                <span>log_id</span>
                <span className="text-slate-500">[FK ➔ ACCESS_LOGS]</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>severity</span>
                <span className="text-slate-500">ENUM(CRITICAL,HIGH,MED)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>dmgt_rule_id</span>
                <span className="text-slate-500">VARCHAR(32)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>z_score</span>
                <span className="text-slate-500">NUMERIC(5,2)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>containment_status</span>
                <span className="text-slate-500">VARCHAR(20)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Relational Integrity: ON DELETE CASCADE from User to Session; Append-Only partition on ACCESS_LOGS</span>
          <span className="text-cyan-400">Indexing: B-Tree on (user_id, access_timestamp DESC)</span>
        </div>
      </div>

      {/* Interactive SQL Anomaly Query Lab */}
      <div className="bg-[#0D1527]/95 border border-[#1E293B] rounded-xl overflow-hidden shadow-xl">
        <div className="p-3 border-b border-[#1E293B] bg-[#050811] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#00FF87]" />
            <span className="text-xs font-mono font-bold text-[#FFFFFF] uppercase tracking-wider">
              SQL ANOMALY QUERY BENCH (4 CORE SECURITY QUERIES)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-copy-sql"
              onClick={handleCopy}
              className="px-2.5 py-1 rounded bg-[#050811] hover:bg-[#0D1527] border border-[#1E293B] text-[#E0F2FE] font-mono text-xs flex items-center gap-1 transition"
            >
              {copiedQuery ? <Check className="w-3.5 h-3.5 text-[#00FF87]" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedQuery ? 'Copied' : 'Copy SQL'}
            </button>
            <button
              id="btn-execute-sql"
              onClick={handleRun}
              disabled={isRunning}
              className="px-3 py-1 rounded bg-[#00FF87]/20 hover:bg-[#00FF87]/30 border border-[#00FF87]/60 text-[#00FF87] font-mono text-xs font-bold flex items-center gap-1.5 transition glow-emerald disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Executing...' : 'Run Query'}
            </button>
          </div>
        </div>

        {/* Query Switcher Tabs */}
        <div className="flex border-b border-[#1E293B] bg-[#050811] overflow-x-auto">
          {SQL_ANOMALY_QUERIES.map(q => (
            <button
              key={q.id}
              onClick={() => setSelectedQueryId(q.id)}
              className={`px-4 py-2.5 text-xs font-mono whitespace-nowrap transition border-b-2 flex items-center gap-2 ${
                selectedQueryId === q.id
                  ? 'border-[#00FF87] text-[#00FF87] bg-[#00FF87]/15 font-bold'
                  : 'border-transparent text-[#94A3B8] hover:text-[#FFFFFF]'
              }`}
            >
              <span>{q.title}</span>
            </button>
          ))}
        </div>

        {/* Query Description & MITRE Mapping Banner */}
        <div className="p-3 bg-[#0D1527] border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="text-[#E0F2FE] flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#FF6B00]" />
            <span>{activeQuery.description}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#FF0055]/20 border border-[#FF0055]/50 text-[#FF0055] text-[11px] font-bold">
              MITRE: {activeQuery.mitreMapping}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#050811] text-[#00F0FF] border border-[#1E293B] text-[11px]">
              Category: {activeQuery.category}
            </span>
          </div>
        </div>

        {/* Code Editor Preview */}
        <div className="p-4 bg-[#050811] overflow-x-auto border-b border-[#1E293B]">
          <pre className="font-mono text-xs text-[#00FF87] leading-relaxed">
            <code>{activeQuery.querySql}</code>
          </pre>
        </div>

        {/* Execution Output Table */}
        <div className="p-4 bg-[#0D1527]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Table className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Query Execution Output ({activeQuery.sampleResults.length} rows returned)</span>
            </div>
            <span className="text-[11px] font-mono text-[#00FF87]">
              Execution Time: {queryExecutionTime} ms (Index Scan: user_logs_temporal_idx)
            </span>
          </div>

          <div className="overflow-x-auto border border-[#1E293B] rounded-lg bg-[#050811]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#0D1527] text-[11px] text-[#94A3B8] border-b border-[#1E293B]">
                <tr>
                  {Object.keys(activeQuery.sampleResults[0] || {}).map(key => (
                    <th key={key} className="px-3 py-2 uppercase font-semibold">
                      {key.replace('_', ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {activeQuery.sampleResults.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#0D1527]/60 text-[#E0F2FE]">
                    {Object.values(row).map((val, cIdx) => (
                      <td key={cIdx} className="px-3 py-2 text-[11px]">
                        {typeof val === 'string' && val.includes('CRITICAL') ? (
                          <span className="px-1.5 py-0.5 rounded bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/60 font-bold">
                            {val}
                          </span>
                        ) : typeof val === 'number' ? (
                          <span className="text-[#00F0FF]">{val}</span>
                        ) : (
                          String(val)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
