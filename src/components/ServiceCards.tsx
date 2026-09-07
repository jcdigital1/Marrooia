import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES_INFO } from '../config';

interface ServiceCardsProps {
  onSelectService: (serviceKey: string, serviceTitle: string) => void;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onSelectService }) => {
  return (
    <div className="space-y-2.5 my-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SERVICES_INFO.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectService(item.id, item.title)}
            className="group bg-gradient-to-b from-[#1F202A] to-[#14151C] p-3.5 rounded-[22px] border border-neutral-700/80 shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:border-red-500/60 hover:shadow-[0_12px_28px_rgba(220,38,38,0.25)] transition-all cursor-pointer flex flex-col justify-between active:scale-98"
          >
            <div>
              <div className="text-2xl mb-1.5 transform group-hover:scale-110 transition-transform origin-left drop-shadow-sm">
                {item.icon}
              </div>
              <h4 className="text-xs font-black text-white tracking-tight font-['Outfit',sans-serif] group-hover:text-red-400 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-neutral-300 leading-snug mt-1 font-normal">
                {item.description}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] font-bold text-red-400 group-hover:text-red-300">
              <span>Saber mais</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
