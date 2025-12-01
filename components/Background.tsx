import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;

    // --- Resize Handler ---
    // Ensures canvas matches window size dynamically
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    // --- Color Management ---
    // Default Color (Teal-ish): 72, 112, 117
    let r = 170;
    let g = 150;
    let b = 210;

    // Fetches the CSS variable '--primary-rgb' from the root
    // This allows the canvas to sync with the ColorPicker selection
    const updateColor = () => {
        const style = getComputedStyle(document.documentElement);
        const colorVar = style.getPropertyValue('--primary-rgb').trim();

        if (colorVar) {
            const parts = colorVar.split(',').map(p => parseInt(p.trim(), 10));
            if (parts.length === 3 && !parts.some(isNaN)) {
                r = parts[0];
                g = parts[1];
                b = parts[2];
            }
        }
    };

    // Initial Color Fetch
    updateColor();

    // Listen for custom event triggered by ColorPicker component
    window.addEventListener('primary-color-change', updateColor);

    // --- Scroll Physics Logic ---
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    
    // currentBaseSpeed tracks the resting flow direction.
    // Positive = Right to Left (Default)
    // Negative = Left to Right (Reverse)
    let currentBaseSpeed = 0.0025; 

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Calculate directional delta: positive = scrolling down, negative = scrolling up
      const delta = currentScrollY - lastScrollY;
      
      // Add delta to velocity to create momentum
      scrollVelocity += delta;

      // Clamp velocity to prevent visual chaos during rapid scrolling
      if (scrollVelocity > 100) scrollVelocity = 100;
      if (scrollVelocity < -100) scrollVelocity = -100;
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;
    // Number of individual wave lines to draw
    const lines = 50; 
    
    // --- Animation Loop ---
    const animate = () => {
      // Clear canvas with semantic background color (Black in Dark Mode, White in Light Mode)
      // We check the computed style of the body to get the current theme color
      const bodyStyle = getComputedStyle(document.body);
      ctx.fillStyle = bodyStyle.backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // --- Direction Control ---
      // Determine the "Resting" direction based on the user's last scroll intent.
      if (scrollVelocity > 0.5) {
        currentBaseSpeed = 0.0025;
      } else if (scrollVelocity < -0.5) {
        currentBaseSpeed = -0.0025;
      }

      // --- Friction ---
      // Smoothly decay scroll velocity back to 0 so the wave doesn't spin forever
      scrollVelocity *= 0.95;
      
      // Cutoff to prevent micro-calculations when effectively stopped
      if (Math.abs(scrollVelocity) < 0.1) scrollVelocity = 0;

      // Calculate the actual speed for this frame:
      // Base Speed (Direction) + Momentum from Scroll
      const effectiveSpeed = currentBaseSpeed + (scrollVelocity * 0.0005);

      time += effectiveSpeed;

      // --- Wave Drawing ---
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        // Calculate Alpha (Opacity):
        // Lines further back (lower index) are more transparent for depth effect
        const alpha = 0.25 + (i / lines) * 0.25; 
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 1;

        // Spread the lines vertically to create a thick ribbon effect
        const verticalOffset = (i - lines / 2) * 3;
        
        // Draw points across the width of the screen
        for (let x = 0; x <= width; x += 5) {
            const centerY = height / 2;
            
            // --- Wave Math (Superposition) ---
            const wave1 = Math.sin(x * 0.0015 + time * 0.4 + (i * 0.02)) * 80;
            const wave2 = Math.cos(x * 0.004 - time * 0.2 + (i * 0.01)) * 40;
            const wave3 = Math.sin(x * 0.01 + time + (i * 0.1)) * (10 + (i % 5) * 3);
            const wave4 = Math.sin(x * 0.003 + time * 0.3 + (i * 0.015)) * 60;

            const y = centerY + verticalOffset + wave1 + wave2 + wave3 + wave4;
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('primary-color-change', updateColor);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-main pointer-events-none transition-colors duration-500" />;
};

export default Background;