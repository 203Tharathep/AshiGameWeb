/**
 * CarSvgHelper.js
 * Generates stylized, crisp vector graphics of each of the 8 AshiLane car models
 * in the racer's custom body paint color with wheels, aero, and lights.
 */

export function getCarSilhouetteSVG(carId = 'gt', bodyColor = '#ff2255') {
  const color = bodyColor || '#ff2255';
  const rimColor = '#e2e8f0';
  const caliperColor = '#ff0033';
  const tireColor = '#1a1f2c';
  const glassColor = 'rgba(0, 243, 255, 0.45)';

  switch (carId) {
    case 'f1':
      return `
        <svg viewBox="0 0 160 60" class="car-svg-preview" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="f1Grad-${color.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="${color}" />
              <stop offset="60%" stop-color="${color}" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.25" />
            </linearGradient>
          </defs>
          <!-- Front Wing & Nose -->
          <polygon points="12,46 36,46 32,38 10,40" fill="#2d3748" />
          <polygon points="10,42 42,42 46,36 12,38" fill="${color}" />
          <!-- Main Monocoque Body -->
          <path d="M 32 38 L 72 32 L 95 24 L 115 24 L 138 32 L 144 44 L 34 44 Z" fill="url(#f1Grad-${color.replace('#','')})" />
          <!-- Halo & Cockpit -->
          <path d="M 75 32 Q 88 18 102 24 L 98 30 Z" fill="#1a202c" stroke="#4a5568" stroke-width="1.5" />
          <circle cx="86" cy="27" r="4.5" fill="#ffd700" /> <!-- Driver helmet -->
          <!-- Engine Air Intake & Shark Fin -->
          <polygon points="98,24 118,24 135,16 112,16" fill="${color}" />
          <polygon points="112,16 138,16 142,32 125,24" fill="#2d3748" />
          <!-- Big Rear Wing -->
          <rect x="136" y="10" width="16" height="4" fill="${color}" rx="1" />
          <rect x="142" y="14" width="4" height="24" fill="#1a202c" />
          <polygon points="134,8 154,8 152,18 136,18" fill="#2d3748" opacity="0.6" />
          <!-- Front Wheel (Open Wheel) -->
          <circle cx="34" cy="44" r="11" fill="${tireColor}" stroke="#4a5568" stroke-width="1.5" />
          <circle cx="34" cy="44" r="6" fill="${rimColor}" />
          <circle cx="34" cy="44" r="2.5" fill="${caliperColor}" />
          <!-- Rear Wheel (Massive Slick) -->
          <circle cx="128" cy="43" r="13" fill="${tireColor}" stroke="#4a5568" stroke-width="2" />
          <circle cx="128" cy="43" r="7.5" fill="${rimColor}" />
          <circle cx="128" cy="43" r="3" fill="${caliperColor}" />
          <!-- Front Neon Glow / DRL -->
          <line x1="12" y1="41" x2="28" y2="41" stroke="#00f3ff" stroke-width="2" stroke-linecap="round" />
        </svg>
      `;

    case 'kart':
      return `
        <svg viewBox="0 0 160 60" class="car-svg-preview" xmlns="http://www.w3.org/2000/svg">
          <!-- Kart Tubular Chassis -->
          <rect x="22" y="44" width="105" height="4" rx="2" fill="#2d3748" />
          <!-- Front Bumper Pod -->
          <path d="M 18 46 L 38 46 L 44 38 L 22 40 Z" fill="${color}" />
          <!-- Sidepod Left/Right -->
          <path d="M 46 44 L 102 44 L 98 34 L 52 36 Z" fill="${color}" />
          <rect x="52" y="38" width="42" height="4" fill="#ffffff" opacity="0.3" rx="1" />
          <!-- Steering Column & Wheel -->
          <line x1="56" y1="36" x2="70" y2="22" stroke="#cbd5e0" stroke-width="2.5" />
          <circle cx="70" cy="22" r="3.5" fill="#1a202c" />
          <!-- Driver Seat & High Rear Wing -->
          <path d="M 78 44 L 88 28 L 98 28 L 96 44 Z" fill="#1a202c" />
          <circle cx="86" cy="22" r="6" fill="#ffd700" /> <!-- Driver helmet -->
          <!-- Rear Wing on struts -->
          <line x1="108" y1="42" x2="114" y2="18" stroke="#718096" stroke-width="2" />
          <rect x="104" y="16" width="22" height="4" rx="1.5" fill="${color}" />
          <!-- Compact Wheels -->
          <circle cx="36" cy="46" r="9" fill="${tireColor}" stroke="#4a5568" stroke-width="1.5" />
          <circle cx="36" cy="46" r="5" fill="${rimColor}" />
          <circle cx="114" cy="45" r="10" fill="${tireColor}" stroke="#4a5568" stroke-width="2" />
          <circle cx="114" cy="45" r="5.5" fill="${rimColor}" />
        </svg>
      `;

    case 'truck':
      return `
        <svg viewBox="0 0 160 60" class="car-svg-preview" xmlns="http://www.w3.org/2000/svg">
          <!-- Heavy Lifted Suspension Springs -->
          <line x1="42" y1="38" x2="42" y2="46" stroke="#e2e8f0" stroke-width="3" stroke-dasharray="2,2" />
          <line x1="116" y1="38" x2="116" y2="46" stroke="#e2e8f0" stroke-width="3" stroke-dasharray="2,2" />
          <!-- Heavy Cyber / Monster Truck Cab -->
          <path d="M 18 36 L 48 36 L 68 20 L 108 20 L 110 32 L 140 32 L 142 40 L 22 40 Z" fill="${color}" />
          <!-- Tinted Cab Windows -->
          <polygon points="52,34 68,22 104,22 102,34" fill="${glassColor}" stroke="#1a202c" stroke-width="1.5" />
          <!-- Front Bullbar / Heavy Bumper -->
          <rect x="14" y="32" width="8" height="12" rx="2" fill="#2d3748" stroke="#4a5568" stroke-width="1" />
          <!-- Roof Light Bar -->
          <rect x="74" y="16" width="28" height="3.5" rx="1" fill="#2d3748" />
          <circle cx="78" cy="17.8" r="1.2" fill="#ffd700" />
          <circle cx="84" cy="17.8" r="1.2" fill="#ffd700" />
          <circle cx="90" cy="17.8" r="1.2" fill="#ffd700" />
          <circle cx="96" cy="17.8" r="1.2" fill="#ffd700" />
          <!-- Giant Monster Tires with Deep Tread -->
          <circle cx="42" cy="45" r="14" fill="${tireColor}" stroke="#718096" stroke-width="2.5" />
          <circle cx="42" cy="45" r="7" fill="${rimColor}" />
          <circle cx="42" cy="45" r="3" fill="${caliperColor}" />
          <circle cx="118" cy="45" r="14" fill="${tireColor}" stroke="#718096" stroke-width="2.5" />
          <circle cx="118" cy="45" r="7" fill="${rimColor}" />
          <circle cx="118" cy="45" r="3" fill="${caliperColor}" />
        </svg>
      `;

    case 'hyper':
      return `
        <svg viewBox="0 0 160 60" class="car-svg-preview" xmlns="http://www.w3.org/2000/svg">
          <!-- Low-slung futuristic Hypercar silhouette -->
          <path d="M 10 44 L 28 38 L 56 34 L 84 20 L 114 20 L 138 32 L 152 40 L 150 46 L 16 46 Z" fill="${color}" />
          <!-- Aerodynamic Cockpit Dome -->
          <path d="M 64 33 Q 88 18 110 24 L 114 33 Z" fill="${glassColor}" stroke="#00f3ff" stroke-width="1" />
          <!-- Dorsal Shark Fin -->
          <polygon points="106,20 128,14 138,28 120,24" fill="${color}" opacity="0.85" />
          <!-- Sharp Rear Diffuser & Active Wing -->
          <polygon points="138,26 154,24 152,28 140,30" fill="#1a202c" />
          <!-- Cyber LED Headlight Eyebrow -->
          <polygon points="12,41 34,37 32,39 14,43" fill="#00f3ff" />
          <!-- Neon Underglow Strip -->
          <line x1="38" y1="48" x2="120" y2="48" stroke="#00f3ff" stroke-width="2" stroke-linecap="round" opacity="0.8" />
          <!-- Wheels -->
          <circle cx="38" cy="45" r="11" fill="${tireColor}" stroke="#4a5568" stroke-width="1.5" />
          <circle cx="38" cy="45" r="6" fill="${rimColor}" />
          <circle cx="38" cy="45" r="2.5" fill="${caliperColor}" />
          <circle cx="124" cy="45" r="11.5" fill="${tireColor}" stroke="#4a5568" stroke-width="1.5" />
          <circle cx="124" cy="45" r="6.5" fill="${rimColor}" />
          <circle cx="124" cy="45" r="2.5" fill="${caliperColor}" />
        </svg>
      `;

    case 'muscle':
      return `
        <svg viewBox="0 0 160 60" class="car-svg-preview" xmlns="http://www.w3.org/2000/svg">
          <!-- Heavy Fastback Muscle Car Silhouette -->
          <path d="M 12 44 L 16 36 L 46 36 L 68 22 L 114 22 L 144 34 L 146 44 L 16 46 Z" fill="${color}" />
          <!-- Big Supercharger Blower Scoop on Hood -->
          <polygon points="34,36 44,28 52,28 48,36" fill="#e2e8f0" stroke="#1a202c" stroke-width="1" />
          <circle cx="39" cy="32" r="1.5" fill="#ff0033" />
          <circle cx="44" cy="32" r="1.5" fill="#ff0033" />
          <circle cx="49" cy="32" r="1.5" fill="#ff0033" />
          <!-- Muscle Cabin Glass -->
          <polygon points="68,34 78,24 110,24 126,34" fill="${glassColor}" stroke="#1a202c" stroke-width="1.5" />
          <!-- Wide Dual Racing Stripes -->
          <line x1="16" y1="36" x2="144" y2="34" stroke="#ffffff" stroke-width="3" opacity="0.4" />
          <!-- Aggressive Wheels (Fat rear drag tire) -->
          <circle cx="38" cy="45" r="11" fill="${tireColor}" stroke="#4a5568" stroke-width="2" />
          <circle cx="38" cy="45" r="6" fill="${rimColor}" />
          <circle cx="38" cy="45" r="2.5" fill="${caliperColor}" />
          <circle cx="124" cy="44" r="13" fill="${tireColor}" stroke="#4a5568" stroke-width="2.5" />
          <circle cx="124" cy="44" r="7" fill="${rimColor}" />
          <circle cx="124" cy="44" r="3" fill="${caliperColor}" />
        </svg>
      `;

    case 'rally':
      return `
        <svg viewBox="0 0 160 60" class="car-svg-preview" xmlns="http://www.w3.org/2000/svg">
          <!-- Hatchback WRC Rally Body -->
          <path d="M 14 44 L 20 36 L 50 36 L 70 20 L 122 20 L 132 30 L 140 44 L 18 46 Z" fill="${color}" />
          <!-- Roof Air Scoop -->
          <polygon points="84,20 98,16 104,20" fill="#2d3748" />
          <!-- Rally Pod 4x Front Spotlights -->
          <circle cx="16" cy="36" r="3" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
          <circle cx="22" cy="34" r="3" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
          <!-- Cabin Windows -->
          <polygon points="68,34 76,22 116,22 122,34" fill="${glassColor}" stroke="#1a202c" stroke-width="1.5" />
          <!-- High WRC Bi-Plane Rear Wing -->
          <polygon points="120,18 136,12 142,16 126,22" fill="${color}" />
          <polygon points="128,14 144,14 140,17 126,17" fill="#2d3748" />
          <!-- Mud Flaps behind tires -->
          <rect x="48" y="46" width="3" height="7" fill="#ff0033" rx="0.5" />
          <rect x="134" y="46" width="3" height="7" fill="#ff0033" rx="0.5" />
          <!-- Rally Wheels with White OZ Racing Rims -->
          <circle cx="38" cy="45" r="11" fill="${tireColor}" stroke="#4a5568" stroke-width="2" />
          <circle cx="38" cy="45" r="6" fill="#ffffff" />
          <circle cx="38" cy="45" r="2.5" fill="${caliperColor}" />
          <circle cx="122" cy="45" r="11" fill="${tireColor}" stroke="#4a5568" stroke-width="2" />
          <circle cx="122" cy="45" r="6" fill="#ffffff" />
          <circle cx="122" cy="45" r="2.5" fill="${caliperColor}" />
        </svg>
      `;

    case 'speedster':
      return `
        <svg viewBox="0 0 160 60" class="car-svg-preview" xmlns="http://www.w3.org/2000/svg">
          <!-- Curvaceous Retro Speedster Body -->
          <path d="M 12 44 Q 24 36 48 36 L 76 34 Q 96 26 112 28 L 138 34 Q 146 38 144 44 Z" fill="${color}" />
          <!-- Low Aero Curved Windscreen -->
          <path d="M 64 34 Q 76 22 88 32 Z" fill="${glassColor}" stroke="#cbd5e0" stroke-width="1.5" />
          <!-- Dual Headrest Streamliner Fairings -->
          <path d="M 94 32 Q 106 20 118 32 Z" fill="${color}" />
          <circle cx="82" cy="26" r="5" fill="#ffd700" /> <!-- Driver helmet -->
          <!-- Chrome Side Exhaust Pipes -->
          <rect x="52" y="43" width="58" height="3" rx="1.5" fill="#cbd5e0" stroke="#718096" stroke-width="0.5" />
          <!-- Classic Wire Wheels -->
          <circle cx="36" cy="45" r="11" fill="${tireColor}" stroke="#718096" stroke-width="1.5" />
          <circle cx="36" cy="45" r="6" fill="${rimColor}" />
          <circle cx="36" cy="45" r="2.5" fill="#a0aec0" />
          <circle cx="122" cy="45" r="11" fill="${tireColor}" stroke="#718096" stroke-width="1.5" />
          <circle cx="122" cy="45" r="6" fill="${rimColor}" />
          <circle cx="122" cy="45" r="2.5" fill="#a0aec0" />
        </svg>
      `;

    case 'gt':
    default:
      return `
        <svg viewBox="0 0 160 60" class="car-svg-preview" xmlns="http://www.w3.org/2000/svg">
          <!-- Super GT Aerodynamic Silhouette -->
          <path d="M 12 44 L 24 38 L 54 36 L 78 22 L 116 22 L 138 34 L 146 44 L 16 46 Z" fill="${color}" />
          <!-- Cabin Windows -->
          <polygon points="68,34 82,24 112,24 126,34" fill="${glassColor}" stroke="#1a202c" stroke-width="1.5" />
          <!-- Hood Vent Scoop -->
          <polygon points="36,36 44,34 48,36" fill="#1a202c" />
          <!-- Rear GT Wing -->
          <rect x="132" y="22" width="16" height="3" rx="1" fill="${color}" />
          <line x1="136" y1="25" x2="138" y2="34" stroke="#2d3748" stroke-width="2" />
          <line x1="144" y1="25" x2="142" y2="34" stroke="#2d3748" stroke-width="2" />
          <!-- Projector Headlight Beam -->
          <polygon points="14,41 28,38 26,40 16,42" fill="#00f3ff" />
          <!-- Alloy Wheels with Red Brembo Calipers -->
          <circle cx="36" cy="45" r="11" fill="${tireColor}" stroke="#4a5568" stroke-width="1.5" />
          <circle cx="36" cy="45" r="6" fill="${rimColor}" />
          <circle cx="36" cy="45" r="2.5" fill="${caliperColor}" />
          <circle cx="122" cy="45" r="11.5" fill="${tireColor}" stroke="#4a5568" stroke-width="1.5" />
          <circle cx="122" cy="45" r="6.5" fill="${rimColor}" />
          <circle cx="122" cy="45" r="2.5" fill="${caliperColor}" />
        </svg>
      `;
  }
}

