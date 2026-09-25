import React from 'react';
import { Shield, Users, Award, Terminal, Cpu } from 'lucide-react';

export const TEAM_MEMBERS = [
  { rollNo: '25B21A4564', name: 'BOLLA NAGA VENKATA SRUTHI', role: 'Team Lead & Full-Stack Security Engineer' },
  { rollNo: '25B21A4553', name: 'KESAVADASU MOULIKA', role: 'DBMS & ER Architecture Specialist' },
  { rollNo: '25B21A4567', name: 'MURAPAKA PAVAN VEERA SAI SANTHOSH', role: 'DMGT Formal Logic & Relations Modeler' },
  { rollNo: '25B21A4570', name: 'GUTHULA KRISHNA SURYAPRASAD', role: 'ADSA Graph Algorithms & Topology Engineer' },
  { rollNo: '25B21A4562', name: 'KOTA JASWANTH', role: 'OOPJ & Python Statistical Detector Engineer' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-[#1E293B] bg-[#050811] text-[#E0F2FE] font-mono text-xs relative overflow-hidden">
      {/* Top glowing accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-80"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Team Branding Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0D1527] border border-[#00F0FF]/60 flex items-center justify-center glow-cyan">
              <Shield className="w-6 h-6 text-[#00F0FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded bg-[#00F0FF]/15 border border-[#00F0FF]/60 text-[#00F0FF] text-xs font-bold tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                  TEAM-15
                </span>
                <h3 className="text-base font-bold text-[#FFFFFF] tracking-wide">
                  CYBERSECURITY ACCESS LOG MONITORING
                </h3>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                College Capstone Engineering Project • Campus Network Anomaly Triage System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-[#0D1527] border border-[#9D4EDD]/60 text-[#E0F2FE] text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(157,78,221,0.2)]">
              <Award className="w-3.5 h-3.5 text-[#9D4EDD]" />
              DBMS • DMGT • ADSA • OOPJ & Python
            </span>
          </div>
        </div>

        {/* Team Members Grid */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00F0FF] uppercase tracking-wider mb-4">
            <Users className="w-4 h-4 text-[#00F0FF]" />
            <span>PROJECT CONTRIBUTORS & RESEARCH TEAM</span>
            <span className="text-[#94A3B8] font-normal">({TEAM_MEMBERS.length} Members)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={member.rollNo}
                id={`team-member-${member.rollNo}`}
                className="p-3.5 rounded-xl bg-[#0D1527]/90 backdrop-blur-md border border-[#1E293B] hover:border-[#00F0FF]/80 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#050811] text-[#00F0FF] border border-[#00F0FF]/40 group-hover:border-[#00F0FF] transition shadow-sm">
                      {member.rollNo}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-mono">#{idx + 1}</span>
                  </div>

                  <h4 className="text-xs font-bold text-[#FFFFFF] group-hover:text-[#00F0FF] transition leading-snug">
                    {member.name}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-[#1E293B] text-[10px] text-[#94A3B8] group-hover:text-[#E0F2FE] transition">
                  {member.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Telemetry Details */}
        <div className="pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Campus Network Access Pattern Analyzer • Developed by <strong className="text-[#FFFFFF]">TEAM-15</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#94A3B8]">All Rights Reserved © 2026</span>
            <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse shadow-[0_0_10px_#00FF87]"></span>
            <span className="text-[#00FF87] font-bold">SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
