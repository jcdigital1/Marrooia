import React from 'react';

export const ChatBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-full flex flex-col flex-1 min-h-0 bg-[#F2F2F7] overflow-hidden">
      {/* Ultra clean Apple iOS ambient lighting */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#F7F7FA] via-[#F2F2F7] to-[#EDEDF2]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Foreground content */}
      <div className="relative z-10 w-full h-full flex flex-col flex-1 min-h-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

