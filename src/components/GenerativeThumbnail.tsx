import React from 'react';
import { Database, MapPin, Cpu } from 'lucide-react';

interface GenerativeThumbnailProps {
  type: string;
}

export const GenerativeThumbnail: React.FC<GenerativeThumbnailProps> = ({ type }) => {
  if (type === 'constmg') {
    return (
      <div className="w-full h-full bg-[#0D1017] relative overflow-hidden flex flex-col justify-between p-6 select-none border border-white/[0.04]">
        {/* Subtle geometric grid background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle, #5B6CFF 1px, transparent 1px), linear-gradient(to right, rgba(91, 108, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(91, 108, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 flex justify-between items-center text-[11px] font-mono text-zinc-400">
          <span className="text-[#5B6CFF] font-medium">Enterprise ERP Architecture</span>
          <span>Relational Engine</span>
        </div>

        {/* Minimal geometric block diagram */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#5B6CFF]/10 text-[#5B6CFF]">
              <Database size={22} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">ConstMG ERP Database</div>
              <div className="text-[10px] font-mono text-zinc-400">MySQL &bull; Laravel REST API</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between text-[10px] font-mono text-zinc-500">
          <span>Batch Transaction Pipeline</span>
          <span>Normalized Schema</span>
        </div>
      </div>
    );
  }

  if (type === 'pt-murgung') {
    return (
      <div className="w-full h-full bg-[#0D1017] relative overflow-hidden flex flex-col justify-between p-6 select-none border border-white/[0.04]">
        {/* Concentric radar geofence circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-48 h-48 rounded-full border border-[#5B6CFF]" />
          <div className="w-32 h-32 rounded-full border border-dashed border-[#5B6CFF] absolute" />
          <div className="w-16 h-16 rounded-full border border-[#5B6CFF] absolute" />
        </div>

        <div className="relative z-10 flex justify-between items-center text-[11px] font-mono text-zinc-400">
          <span className="text-[#5B6CFF] font-medium">GPS Geofencing Engine</span>
          <span>Real-time Presensi</span>
        </div>

        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#5B6CFF]/10 text-[#5B6CFF]">
              <MapPin size={22} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">PT Murgung Attendance</div>
              <div className="text-[10px] font-mono text-zinc-400">GPS Coordinate Geofence</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between text-[10px] font-mono text-zinc-500">
          <span>Toleransi Radius Dinamis</span>
          <span>Payroll Automated</span>
        </div>
      </div>
    );
  }

  // Fallback: desktop cashier (C++ POS)
  return (
    <div className="w-full h-full bg-[#0D1017] relative overflow-hidden flex flex-col justify-between p-6 select-none border border-white/[0.04]">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(91, 108, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(91, 108, 255, 0.1) 50%, rgba(91, 108, 255, 0.1) 75%, transparent 75%, transparent)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 flex justify-between items-center text-[11px] font-mono text-zinc-400">
        <span className="text-[#5B6CFF] font-medium">Native Desktop POS</span>
        <span>Pure C++ OOP</span>
      </div>

      <div className="relative z-10 flex items-center justify-center my-auto">
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#5B6CFF]/10 text-[#5B6CFF]">
            <Cpu size={22} />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">High-Speed POS Engine</div>
            <div className="text-[10px] font-mono text-zinc-400">Zero Latency File-Based I/O</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-between text-[10px] font-mono text-zinc-500">
        <span>Offline Resilient</span>
        <span>Memory &lt; 15MB</span>
      </div>
    </div>
  );
};
