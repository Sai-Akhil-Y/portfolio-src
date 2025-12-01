import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Atom } from 'lucide-react';
import { SectionId } from '../types';
import ColorPicker, { brightColors, mutedColors, setPrimaryColor } from './ColorPicker';

const navItems = [
  { id: SectionId.HOME, label: 'Home' },
  { id: SectionId.EXPERIENCE, label: 'Experience' },
  { id: SectionId.EDUCATION, label: 'Education' },
  { id: SectionId.SKILLS, label: 'Skills' },
  { id: SectionId.PROJECTS, label: 'Projects' },
  { id: SectionId.CONTACT, label: 'Contact' },
];

const Navbar: React.FC = () => {
  // --- State Management ---
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [scrolled, setScrolled] = useState(false); // Tracks if user scrolled down
  const [showColorPicker, setShowColorPicker] = useState(false); // Dropdown visibility
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME); // Current section in view
  const [isLightMode, setIsLightMode] = useState(false);
  
  // --- Color Hint Animation ---
  // Briefly animates the icon colors on mount to hint at functionality
  const [showColorHint, setShowColorHint] = useState(false);

  // Ref for the hover timeout (prevents flickering when moving mouse between icon and dropdown)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // --- Initial Animation Trigger ---
    // Start animation shortly after mount (1s) to catch user eye
    const startTimer = setTimeout(() => setShowColorHint(true), 1000);
    // Stop animation after ~3.5s so it doesn't become annoying
    const endTimer = setTimeout(() => setShowColorHint(false), 4500);

    const handleScroll = () => {
      // Toggle glass background after 50px scroll
      setScrolled(window.scrollY > 50);
      
      // --- Active Section Detection ---
      // Calculate which section is currently centered on screen
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSection(section.id as SectionId);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, []);

  const toggleTheme = () => {
    const newIsLight = !isLightMode;
    
    // --- Sync Accent Color Logic ---
    // 1. Get current color from DOM
    const style = getComputedStyle(document.documentElement);
    const currentRgb = style.getPropertyValue('--primary-rgb').trim();
    
    // 2. Determine which palette we are moving FROM
    // If we are currently Light (isLightMode=true), we are using brightColors.
    // If we are currently Dark (isLightMode=false), we are using mutedColors.
    const currentPalette = isLightMode ? brightColors : mutedColors;
    const targetPalette = newIsLight ? brightColors : mutedColors;
    
    // 3. Find the index of the current color
    // Use a fuzzy match or exact string match
    const index = currentPalette.findIndex(c => c.rgb === currentRgb);
    
    if (index !== -1 && targetPalette[index]) {
      // 4. Set the equivalent color from the target palette
      setPrimaryColor(targetPalette[index].rgb);
    } else {
      // Fallback: Default to index 0 if match fails
      setPrimaryColor(targetPalette[0].rgb);
    }

    setIsLightMode(newIsLight);
    document.documentElement.classList.toggle('light-mode', newIsLight);
  };

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Hover Interaction Handlers ---
  const handleMouseEnter = () => {
    // Clear any pending close timers if user re-enters the area
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowColorPicker(true);
  };

  const handleMouseLeave = () => {
    // Add a delay before closing to allow user to move cursor to the dropdown
    timeoutRef.current = setTimeout(() => {
      setShowColorPicker(false);
    }, 300);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 py-4`}>
      {/* 
        --- Background Layer ---
        Updated to use semantic `bg-main` (Dynamic Black/White)
      */}
      <div 
        className={`absolute inset-0 transition-all duration-300 -z-10 ${
          scrolled 
            ? 'bg-main/10 backdrop-blur-md border-b border-contrast/5 shadow-lg' 
            : 'bg-transparent'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center">
          
          {/* --- Logo & Color Picker Trigger --- */}
          <div 
            className="relative py-2" // Added padding to increase hover "safe zone"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // onClick removed from here to prevent bubbling from color picker
          >
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={toggleTheme} // onClick moved here
            >
              <div className="relative">
                {/* Glow effect behind logo */}
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative rounded-full ">
                  {/* 
                    The Icon conditionally uses 'animate-rainbow' or 'text-primary'.
                    'animate-rainbow' cycles through colors. 'text-primary' is static.
                  */}
                  <Atom className={`h-6 w-6 transition-all duration-1000 ${showColorHint ? 'animate-rainbow' : 'text-primary'}`} />
                </div>
              </div>
              
            </div>
            
            {/* 
              --- Color Picker Dropdown ---
              Uses CSS transforms for smooth enter/exit animations 
              instead of unmounting the component
            */}
            <div className={`absolute top-full left-0 mt-4 z-50 transition-all duration-300 ease-in-out transform origin-top-left ${
              showColorPicker 
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
            }`}>
              <ColorPicker onClose={() => setShowColorPicker(false)} isLightMode={isLightMode} />
            </div>
          </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`group relative overflow-hidden text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === item.id ? 'text-primary' : 'text-neutral-400 hover:text-primary'
                }`}
              >
                {/* Rolling Text effect for Nav Items */}
                <div className="relative overflow-hidden">
                  <div className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                    <span className="block">{item.label}</span>
                    <span className="block absolute top-full left-0 w-full text-center">{item.label}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* --- Mobile Menu Toggle --- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative group p-2"
            >
              <div className="absolute -inset-2 bg-contrast/5 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
              {isOpen ? <X className="h-6 w-6 text-contrast relative z-10" /> : <Menu className="h-6 w-6 text-neutral-300 relative z-10 group-hover:text-contrast" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Navigation Overlay --- */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-main/10 backdrop-blur-xl border-b border-contrast/10 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden ${
          isOpen ? 'max-h-[600px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="px-6 py-8 flex flex-col space-y-3">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              // Staggered animation delay for list items
              style={{ transitionDelay: `${index * 50}ms` }}
              className={`group flex items-center justify-between w-full p-4 rounded-xl transition-all duration-300  ${
                 activeSection === item.id
                 ? 'bg-primary/1 shadow-[0_0_15px_rgba(0,0,0,0.3)]' 
                 : 'hover:bg-contrast/5 border-transparent hover:border-contrast/5 bg-transparent'
              } ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
            >
              <span className={`text-lg font-display tracking-wide transition-colors ${
                 activeSection === item.id ? 'text-primary font-bold' : 'text-neutral-400 group-hover:text-contrast'
              }`}>
                {item.label}
              </span>
              
              {/* Active Indicator Dot */}
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                 activeSection === item.id 
                   ? 'bg-primary shadow-[0_0_8px_theme("colors.primary.DEFAULT")] scale-100' 
                   : 'bg-neutral-800 group-hover:bg-contrast/50 scale-75'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;