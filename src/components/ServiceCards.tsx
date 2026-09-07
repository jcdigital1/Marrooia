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
            className="group bg-white/95 backdrop-blur-md p-3.5 rounded-[22px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:border-red-500/40 hover:shadow-[0_8px_24px_rgba(220,38,38,0.12)] transition-all cursor-pointer flex flex-col justify-between active:scale-98"
          >
            <div>
              <div className="text-2xl mb-1.5 transform group-hover:scale-110 transition-transform origin-left">
                {item.icon}
              </div>
              <h4 className="text-xs font-black text-neutral-900 tracking-tight font-['Outfit',sans-serif] group-hover:text-red-600 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-neutral-600 leading-snug mt-1 font-medium">
                {item.description}
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-red-600 group-hover:text-red-700">
              <span>Saber mais</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
