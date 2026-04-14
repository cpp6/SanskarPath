import React from 'react';

/**
 * Sanskar Digital Custom Icons
 * Calm, meditative symbols for navigation and branding.
 */

export const LotusIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 21c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8z" />
    <path d="M12 5v16" />
    <path d="M5 13h14" />
    <path d="M12 7.5c1.5-1.5 4.5-1.5 4.5 2.5s-3 5-4.5 7" />
    <path d="M12 7.5c-1.5-1.5-4.5-1.5-4.5 2.5s3 5 4.5 7" />
    <path d="M8 10.5c-1.5 0-3 1.5-3 3.5s1.5 3 3 3" />
    <path d="M16 10.5c1.5 0 3 1.5 3 3.5s-1.5 3-3 3" />
  </svg>
);

export const DiyaIcon = ({ className = "w-6 h-6", color = "currentColor", flameColor = "#F97316" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    {/* Flame */}
    <path 
      d="M12 2C12 2 9 5 9 8C9 10.5 10.5 12 12 12C13.5 12 15 10.5 15 8C15 5 12 2 12 2Z" 
      fill={flameColor}
      className="animate-diya-flicker origin-bottom"
    />
    {/* Lamp Body */}
    <path 
      d="M4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14H4Z" 
      fill={color} 
    />
  </svg>
);

export const BanyanTreeIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22v-5" />
    <path d="M9 22v-3" />
    <path d="M15 22v-3" />
    <path d="M12 17c-2 0-5-1-5-4s2-5 5-5 5 2 5 5-3 4-5 4z" />
    <path d="M12 8c-3 0-6-2-6-5" />
    <path d="M12 8c3 0 6-2 6-5" />
    <path d="M7 11c-1-1-3-1-3-3s2-3 3-3" />
    <path d="M17 11c1-1 3-1 3-3s-2-3-3-3" />
  </svg>
);

export const SanskarLogo = ({ className = "w-10 h-10" }) => (
  <div className={`relative flex items-center justify-center bg-saffron-500 rounded-2xl shadow-lg shadow-saffron-200 dark:shadow-saffron-900/40 ${className}`}>
    <DiyaIcon className="w-6 h-6" color="#3D2A18" flameColor="#FFF" />
  </div>
);
