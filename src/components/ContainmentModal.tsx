import React from 'react';
import { ShieldBan, KeyRound, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { ThreatAlert } from '../types';

interface ContainmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: ThreatAlert | null;
  actionType: 'BLOCK_IP' | 'REVOKE_SESSION' | 'REQUIRE_MFA' | null;
  onConfirm: () => void;
}

export const ContainmentModal: React.FC<ContainmentModalProps> = ({
  isOpen,
  onClose,
  alert,
  actionType,
  onConfirm
}) => {
  if (!isOpen || !alert || !actionType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 font-mono">
      <div className="bg-[#0e1424] border border-red-800/80 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 glow-red">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-700/60 flex items-center justify-center">
              {actionType === 'BLOCK_IP' ? (
                <ShieldBan className="w-5 h-5 text-red-400" />
              ) : (
                <KeyRound className="w-5 h-5 text-amber-400" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase">
                {actionType === 'BLOCK_IP' ? 'Confirm IP Quarantine' : 'Revoke Bearer Session Token'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Automated SOC Containment Enforcement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Forensic Evidence Container */}
        <div className="p-3.5 rounded-xl bg-black/50 border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-300">
            <span className="text-slate-500">Incident Target:</span>
            <span className="text-cyan-300 font-bold">{alert.affectedUser}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span className="text-slate-500">Source IP:</span>
            <span className="text-amber-300 font-bold">{alert.affectedIp}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span className="text-slate-500">Severity & Z-Score:</span>
            <span className="text-red-400 font-bold">{alert.severity} (+{alert.zScore.toFixed(2)}σ)</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span className="text-slate-500">MITRE Technique:</span>
            <span className="text-slate-300 truncate max-w-[240px]">{alert.mitreTechnique}</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {actionType === 'BLOCK_IP'
            ? `Injecting a drop rule for ${alert.affectedIp} into campus border gateways. All active TCP/UDP sockets originating from this IP will be forcefully terminated.`
            : `Invalidating active bearer token for identity "${alert.affectedUser}". Session cache will be evicted across all campus microservices and user will be forced to re-authenticate with 2FA.`}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition flex items-center gap-1.5 shadow-lg shadow-red-950"
          >
            <CheckCircle className="w-4 h-4" />
            Enforce Containment
          </button>
        </div>
      </div>
    </div>
  );
};
