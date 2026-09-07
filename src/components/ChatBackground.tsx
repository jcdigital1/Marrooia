import React from 'react';

export const ChatBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-full flex flex-col flex-1 min-h-0 bg-[#D0C5B4] overflow-hidden">
      {/* Rich warm base gradient - deeper, warmer and highly defined to avoid being too light */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 25%, #DDD4C5 0%, #D0C4B2 45%, #BFB09C 100%)',
        }}
      />

      {/* High-detail crisp vector wallpaper pattern (Paint rollers, houses, commercial buildings, solar panels, brushes, ladders, tools) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.28] mix-blend-multiply">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="marrooia-rich-wallpaper"
              width="240"
              height="240"
              patternUnits="userSpaceOnUse"
            >
              {/* === 1. PAINT ROLLER WITH TEXTURE & HANDLE (x: 25, y: 20) === */}
              <g stroke="#261A0E" strokeWidth="1.35" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Cylinder */}
                <rect x="25" y="16" width="34" height="15" rx="3" fill="#261A0E" fillOpacity="0.08" />
                <line x1="33" y1="16" x2="33" y2="31" strokeDasharray="1.5 2" />
                <line x1="42" y1="16" x2="42" y2="31" strokeDasharray="1.5 2" />
                <line x1="51" y1="16" x2="51" y2="31" strokeDasharray="1.5 2" />
                {/* Frame & Rod */}
                <path d="M42 31 v8 h10 v12 h-14 v16" />
                {/* Ergonomic Grip Handle */}
                <rect x="34" y="67" width="8" height="18" rx="2" fill="#261A0E" fillOpacity="0.12" />
                <line x1="34" y1="72" x2="42" y2="72" />
                <line x1="34" y1="77" x2="42" y2="77" />
                <line x1="34" y1="82" x2="42" y2="82" />
                {/* Paint Drips */}
                <path d="M28 31 c0 3 2 3 2 0" />
                <path d="M37 31 c0 5 3 5 3 0" />
              </g>

              {/* === 2. HOUSE / RESIDENCIAL (x: 130, y: 18) === */}
              <g stroke="#261A0E" strokeWidth="1.35" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Chimney */}
                <path d="M160 26 v-9 h5 v13" />
                <path d="M162 13 c0-2 2-2 2-4" strokeWidth="1" strokeDasharray="1 1" />
                {/* Roof */}
                <path d="M126 36 L148 18 L170 36" />
                <path d="M148 18 L152 21" />
                {/* House Body */}
                <rect x="131" y="36" width="34" height="24" rx="1" fill="#261A0E" fillOpacity="0.08" />
                {/* Door */}
                <path d="M143 60 v-13 h10 v13" />
                <circle cx="150" cy="53" r="0.7" fill="#261A0E" />
                {/* Window with 4 panes */}
                <rect x="134" y="40" width="7" height="7" rx="0.5" />
                <line x1="137.5" y1="40" x2="137.5" y2="47" />
                <line x1="134" y1="43.5" x2="141" y2="43.5" />
              </g>

              {/* === 3. SOLAR PANEL & SUN / LIMPEZA SOLAR (x: 125, y: 100) === */}
              <g stroke="#261A0E" strokeWidth="1.35" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Radiant Sun */}
                <circle cx="168" cy="94" r="6" fill="#261A0E" fillOpacity="0.14" />
                <line x1="168" y1="84" x2="168" y2="86" />
                <line x1="168" y1="102" x2="168" y2="104" />
                <line x1="158" y1="94" x2="160" y2="94" />
                <line x1="176" y1="94" x2="178" y2="94" />
                <line x1="161" y1="87" x2="162.5" y2="88.5" />
                <line x1="173.5" y1="99.5" x2="175" y2="101" />
                <line x1="175" y1="87" x2="173.5" y2="88.5" />
                <line x1="162.5" y1="99.5" x2="161" y2="101" />
                {/* Solar Panel (Angled Photovoltaic Array) */}
                <polygon points="126,128 162,116 172,142 134,154" fill="#261A0E" fillOpacity="0.08" />
                {/* Grid Cells */}
                <line x1="144" y1="122" x2="153" y2="148" />
                <line x1="130" y1="136" x2="167" y2="124" />
                <line x1="132" y1="145" x2="169" y2="133" />
                {/* Mounting Stand Legs */}
                <line x1="130" y1="138" x2="130" y2="158" />
                <line x1="168" y1="126" x2="168" y2="146" />
              </g>

              {/* === 4. PAINT BUCKET & HANDLE (x: 28, y: 110) === */}
              <g stroke="#261A0E" strokeWidth="1.35" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Arched Wire Handle */}
                <path d="M28 120 C28 106, 58 106, 58 120" />
                {/* Rim */}
                <ellipse cx="43" cy="120" rx="15" ry="4" fill="#261A0E" fillOpacity="0.1" />
                {/* Bucket Body */}
                <path d="M29 120 L34 148 H52 L57 120" fill="#261A0E" fillOpacity="0.08" />
                {/* Splash Drip */}
                <path d="M38 123 v12 c0 2.5 3 2.5 3 0 v-12" />
                <circle cx="48" cy="140" r="1.2" fill="#261A0E" />
              </g>

              {/* === 5. PROFESSIONAL PAINT BRUSH (x: 75, y: 175) === */}
              <g stroke="#261A0E" strokeWidth="1.35" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Angled Handle */}
                <path d="M62 225 L76 195" />
                <path d="M66 226 L80 196" />
                <path d="M62 225 C60 228, 65 230, 66 226" />
                {/* Metal Ferrule */}
                <polygon points="75,195 86,184 94,191 83,202" fill="#261A0E" fillOpacity="0.12" />
                <line x1="78" y1="192" x2="89" y2="181" strokeDasharray="1 1.5" />
                {/* Bristles */}
                <polygon points="86,184 99,171 107,178 94,191" fill="#261A0E" fillOpacity="0.08" />
                <line x1="90" y1="180" x2="103" y2="167" />
                <line x1="93" y1="184" x2="105" y2="172" />
              </g>

              {/* === 6. COMMERCIAL BUILDING / SKYSCRAPER (x: 184, y: 168) === */}
              <g stroke="#261A0E" strokeWidth="1.35" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Antenna */}
                <line x1="198" y1="168" x2="198" y2="154" />
                <circle cx="198" cy="153" r="1.5" fill="#261A0E" />
                {/* Building Tower */}
                <rect x="185" y="168" width="26" height="56" rx="1.5" fill="#261A0E" fillOpacity="0.08" />
                {/* Window Grid */}
                <rect x="189" y="174" width="4" height="4" rx="0.5" />
                <rect x="196" y="174" width="4" height="4" rx="0.5" />
                <rect x="203" y="174" width="4" height="4" rx="0.5" />
                <rect x="189" y="183" width="4" height="4" rx="0.5" />
                <rect x="196" y="183" width="4" height="4" rx="0.5" />
                <rect x="203" y="183" width="4" height="4" rx="0.5" />
                <rect x="189" y="192" width="4" height="4" rx="0.5" />
                <rect x="196" y="192" width="4" height="4" rx="0.5" />
                <rect x="203" y="192" width="4" height="4" rx="0.5" />
                <rect x="189" y="201" width="4" height="4" rx="0.5" />
                <rect x="196" y="201" width="4" height="4" rx="0.5" />
                <rect x="203" y="201" width="4" height="4" rx="0.5" />
                {/* Entrance */}
                <path d="M194 224 v-8 h8 v8" />
              </g>

              {/* === 7. PAINTER'S LADDER (x: 90, y: 45) === */}
              <g stroke="#261A0E" strokeWidth="1.35" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="90" y1="82" x2="102" y2="44" />
                <line x1="114" y1="82" x2="102" y2="44" />
                <line x1="99" y1="44" x2="105" y2="44" strokeWidth="2" />
                {/* Rungs */}
                <line x1="93" y1="73" x2="111" y2="73" />
                <line x1="96" y1="64" x2="108" y2="64" />
                <line x1="99" y1="54" x2="105" y2="54" />
              </g>

              {/* === 8. PUTTY KNIFE / ESPÁTULA (x: 18, y: 190) === */}
              <g stroke="#261A0E" strokeWidth="1.35" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 192 L33 192 L29 208 L21 208 Z" fill="#261A0E" fillOpacity="0.08" />
                <rect x="23" y="208" width="4" height="15" rx="1" fill="#261A0E" fillOpacity="0.12" />
                <circle cx="25" cy="219" r="0.7" fill="#261A0E" />
              </g>

              {/* === 9. ARTIST PALETTE WITH COLOR WELLS (x: 185, y: 75) === */}
              <g stroke="#261A0E" strokeWidth="1.35" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M185 82 C185 72, 212 72, 212 85 C212 94, 203 98, 198 94 C195 91, 190 92, 190 96 C190 102, 185 96, 185 82 Z" fill="#261A0E" fillOpacity="0.08" />
                <circle cx="192" cy="79" r="1.5" fill="#261A0E" />
                <circle cx="200" cy="78" r="1.5" fill="#261A0E" />
                <circle cx="206" cy="85" r="1.5" fill="#261A0E" />
                <circle cx="192" cy="88" r="1.8" />
              </g>

              {/* === 10. SPARKLES & CRAFT ACCENTS (Dynamic Fillers) === */}
              {/* Star 1 */}
              <path d="M82 22 L84 27 L89 29 L84 31 L82 36 L80 31 L75 29 L80 27 Z" fill="#261A0E" fillOpacity="0.35" stroke="none" />
              {/* Star 2 */}
              <path d="M158 74 L159.5 78 L163.5 79.5 L159.5 81 L158 85 L156.5 81 L152.5 79.5 L156.5 78 Z" fill="#261A0E" fillOpacity="0.3" stroke="none" />
              {/* Star 3 */}
              <path d="M222 32 L223.5 35 L227 36.5 L223.5 38 L222 41 L220.5 38 L217 36.5 L220.5 35 Z" fill="#261A0E" fillOpacity="0.3" stroke="none" />
              {/* Star 4 */}
              <path d="M136 182 L137.5 185.5 L141 187 L137.5 188.5 L136 192 L134.5 188.5 L131 187 L134.5 185.5 Z" fill="#261A0E" fillOpacity="0.3" stroke="none" />

              {/* Paint Swatch Wave */}
              <path d="M60 124 C68 120, 74 128, 82 124 C90 120, 96 126, 104 122" stroke="#261A0E" strokeWidth="1.25" strokeLinecap="round" fill="none" strokeDasharray="3 2" />
              
              {/* Droplets & Plus Marks */}
              <circle cx="68" cy="58" r="1.6" fill="#261A0E" fillOpacity="0.35" />
              <circle cx="112" cy="18" r="1.4" fill="#261A0E" fillOpacity="0.3" />
              <circle cx="216" cy="120" r="1.5" fill="#261A0E" fillOpacity="0.3" />
              <circle cx="150" cy="226" r="1.3" fill="#261A0E" fillOpacity="0.25" />

              {/* Alignment Plus crosses */}
              <g stroke="#261A0E" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.35">
                <line x1="112" y1="185" x2="118" y2="185" />
                <line x1="115" y1="182" x2="115" y2="188" />
                <line x1="18" y1="78" x2="24" y2="78" />
                <line x1="21" y1="75" x2="21" y2="81" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#marrooia-rich-wallpaper)" />
        </svg>
      </div>

      {/* Subtle architectural vignette framing to bring out messages */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(45, 30, 15, 0.12) 100%)',
        }}
      />
      
      {/* Subtle brand red accent glow in the upper atmosphere */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[340px] h-[160px] bg-red-600/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Foreground content */}
      <div className="relative z-10 w-full h-full flex flex-col flex-1 min-h-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
};


