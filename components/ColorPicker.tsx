import React from 'react';

interface ColorPickerProps {
  onClose: () => void;
  isLightMode: boolean;
}

// Muted palette — optimized for visibility on black backgrounds
export const mutedColors = [
  { name: 'Muted Violet',      rgb: '170, 150, 210' }, // counterpart: Vivid Violet
  { name: 'Muted Emerald',     rgb: '140, 200, 180' }, // counterpart: Emerald Green
  { name: 'Muted Red',         rgb: '220, 120, 120' }, // counterpart: Crimson Red
  { name: 'Muted Yellow',      rgb: '220, 200, 100' }, // counterpart: Golden Yellow
  { name: 'Muted White',       rgb: '235, 235, 235' }, // kept as requested
  { name: 'Muted Blue',        rgb: '160, 185, 235' }, // counterpart: Electric Blue
  { name: 'Muted Lime',        rgb: '190, 210, 120' }, // counterpart: Lime Green
  { name: 'Muted Orange',      rgb: '210, 150, 110' }, // counterpart: Vivid Orange
  { name: 'Muted Pink',        rgb: '220, 150, 175' }, // counterpart: Hot Pink
  { name: 'Muted Turquoise',   rgb: '160, 220, 210' }  // counterpart: Bright Turquoise
];

// Bright palette — optimized for visibility on white backgrounds
export const brightColors = [
  { name: 'Vivid Violet',     rgb: '90, 50, 170'   }, // counterpart: Muted Violet
  { name: 'Emerald Green',    rgb: '0, 100, 70'    }, // counterpart: Muted Emerald
  { name: 'Crimson Red',      rgb: '150, 20, 30'  }, // counterpart: Muted Red
  { name: 'Golden Yellow',    rgb: '170, 130, 10' }, // counterpart: Muted Yellow
  { name: 'Muted Black',      rgb: '0, 0, 0'       }, // kept as requested
  { name: 'Electric Blue',    rgb: '20, 70, 170'   }, // counterpart: Muted Blue
  { name: 'Lime Green',       rgb: '80, 140, 20'   }, // counterpart: Muted Lime
  { name: 'Vivid Orange',     rgb: '160, 80, 10'   }, // counterpart: Muted Orange
  { name: 'Hot Pink',         rgb: '170, 20, 100'  }, // counterpart: Muted Pink
  { name: 'Bright Turquoise', rgb: '0, 120, 110'   }  // counterpart: Muted Turquoise
];



// Helper to update global CSS variables for primary color
export const setPrimaryColor = (rgb: string) => {
  // 1. Update the CSS Variable globally
  document.documentElement.style.setProperty('--primary-rgb', rgb);

  // 2. Calculate Brightness to set Contrast Text Color
  // Formula: (R*299 + G*587 + B*114) / 1000
  const parts = rgb.split(',').map(x => parseInt(x.trim()));
  // Guard against invalid parsing
  if (parts.length === 3 && !parts.some(isNaN)) {
      const [r, g, b] = parts;
      const brightness = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
      
      // Threshold of 125 is standard for perceived brightness.
      // If > 125 (Bright), text should be Black (0 0 0).
      // If <= 125 (Dark), text should be White (255 255 255).
      const textOnPrimary = brightness > 125 ? '0 0 0' : '255 255 255';
      document.documentElement.style.setProperty('--text-on-primary', textOnPrimary);
  }

  // 3. Dispatch custom event for Canvas/Background to redraw
  window.dispatchEvent(new Event('primary-color-change'));
};

const ColorPicker: React.FC<ColorPickerProps> = ({ onClose, isLightMode }) => {
  const colors = isLightMode ? brightColors : mutedColors;

  return (
    // Updated bg to use 'bg-main/80'.
    // Dark Mode: bg-black/80 (Dark Glass).
    // Light Mode: bg-white/80 (Light Glass).
    <div className="p-6 bg-main/10 backdrop-blur-md rounded-2xl w-60 shadow-2xl border border-contrast/10">
      <div className="grid grid-cols-5 gap-2 justify-center">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={(e) => {
              e.stopPropagation();
              setPrimaryColor(color.rgb);
            }}
            className="w-6 h-6 rounded-lg border border-contrast/10 hover:scale-110 transition-transform duration-200 relative group flex items-center justify-center"
            style={{ backgroundColor: `rgb(${color.rgb})` }}
            title={color.name}
          >
             {/* Hover ring effect */}
             <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 ring-2 ring-contrast/50 transition-opacity duration-200" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;