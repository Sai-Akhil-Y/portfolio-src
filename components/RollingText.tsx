import React from 'react';

interface RollingTextProps {
  children: React.ReactNode;
  highlight?: boolean;
  textClass?: string;
  stagger?: boolean;
}

const RollingText: React.FC<RollingTextProps> = ({ children, highlight = false, textClass = 'text-contrast', stagger = false }) => {
  const isString = typeof children === 'string';

  if (stagger && isString) {
    const text = children as string;
    const characters = text.split('');
    
    return (
      <span className={`relative inline-flex flex-wrap overflow-hidden cursor-pointer group align-middle font-display ${highlight ? 'bg-primary text-primary-content px-4 py-1 rounded-lg' : textClass}`}>
        {characters.map((char, index) => (
          <span key={index} className="relative overflow-hidden inline-block leading-tight">
            <div 
               className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full"
               style={{ transitionDelay: `${index * 20}ms` }} 
            >
              {/* Use whitespace-pre to preserve spaces */}
              <span className="block whitespace-pre">{char}</span>
              <span className="block absolute top-full left-0 whitespace-pre">{char}</span>
            </div>
          </span>
        ))}
      </span>
    );
  }

  // Original Block Behavior
  return (
    <span className={`relative inline-block overflow-hidden cursor-pointer group align-middle font-display ${highlight ? 'bg-primary text-primary-content px-4 py-1 rounded-lg' : textClass}`}>
      <div className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
        <span className="block leading-tight">{children}</span>
        <span className="block absolute top-full left-0 w-full text-left leading-tight">{children}</span>
      </div>
    </span>
  );
};

export default RollingText;