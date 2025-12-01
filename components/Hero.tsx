import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, FileUser } from 'lucide-react';
import { SectionId } from '../types';

// Flattened list of skills for the marquee loop
const skills = [
  "Kubernetes",  "Apache Spark",  "Kafka",  "Docker",  "Terraform",  "FastAPI",  "PostgreSQL",  "Airflow",  "Prometheus",  "Ansible",  "GCP",  "Playwright",  "Spring Boot",  "MongoDB",  "AWS",  "Kibana",  "Node.js",  "React.js",  "Elasticsearch",  "Logstash",  "Flask",  "Chef",  "OCI",  "Hugging Face",  "Jenkins",  "GitLab CI/CD",  "Rundeck",  "JFrog Artifactory",  "Express.js",  "Selenium",  "Espresso"
];


const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Dedicated software engineer specializing in large-scale systems, automation, and cloud infrastructure, delivering streamlined deployments and scalable, reliable solutions.";

  // Ref for the scrolling container
  const marqueeRef = useRef<HTMLDivElement>(null);

  // --- Typewriter Effect Logic ---
  useEffect(() => {
    let index = 0;
    // Set up an interval to add characters one by one
    const intervalId = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(intervalId); // Cleanup when finished
      }
    }, 40); // Typing speed: 40ms per character

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // --- Marquee Physics Logic ---
  useEffect(() => {
    let currentScrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    
    // Physics State
    let currentOffset = 0; // Percentage (0 to -50)
    let direction = -1; // -1 = Moving Left (Default/Down Scroll), 1 = Moving Right (Up Scroll)
    let baseSpeed = 0.003; // Base movement per frame %
    
    const handleScroll = () => {
       currentScrollY = window.scrollY;
       const delta = currentScrollY - lastScrollY;
       scrollVelocity += delta;
       lastScrollY = currentScrollY;
       
       // Clamp velocity
       if (scrollVelocity > 100) scrollVelocity = 100;
       if (scrollVelocity < -100) scrollVelocity = -100;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    let animationFrameId: number;

    const animate = () => {
      // 1. Determine Direction (Persists after scroll stops)
      // If scrolling DOWN (positive velocity), flow LEFT (negative direction)
      if (scrollVelocity > 0.5) {
        direction = -1; 
      } 
      // If scrolling UP (negative velocity), flow RIGHT (positive direction)
      else if (scrollVelocity < -0.5) {
        direction = 1;
      }

      // 2. Friction
      scrollVelocity *= 0.95;
      if (Math.abs(scrollVelocity) < 0.1) scrollVelocity = 0;

      // 3. Calculate Speed
      // Base Speed + Velocity Boost
      // Reduced multiplier from 0.01 to 0.001 to prevent excessive speed
      const currentSpeed = baseSpeed + (Math.abs(scrollVelocity) * 0.001);

      // 4. Update Offset
      currentOffset += currentSpeed * direction;

      // 5. Wrap Logic (Infinite Scroll)
      // The content is duplicated, so -50% is visual equivalent of 0%
      if (currentOffset <= -50) {
        currentOffset += 50;
      } else if (currentOffset >= 0) {
        currentOffset -= 50;
      }

      // 6. Apply Transform
      if (marqueeRef.current) {
        marqueeRef.current.style.transform = `translateX(${currentOffset}%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id={SectionId.HOME} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Intro Tagline */}
        <p className="text-xl md:text-2xl text-neutral-400 max-w-5xl mx-auto mb-10 font-light leading-relaxed animate-slide-up " >
        {"HELLO! I'm "}
        </p>

        {/* Main Heading with Gradient Text */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-contrast mb-6 animate-slide-up">
           <span className="text-gradient">Sai Akhil Yerramsetty</span>
        </h1>
        
        {/* Description with Typewriter Effect */}
        <p className="text-xl md:text-2xl text-neutral-400 max-w-5xl mx-auto mb-10 font-light leading-relaxed animate-slide-up min-h-[60px]" >
          {text}
          {/* Blinking Cursor */}
          <span className="text-primary animate-pulse">_</span>
        </p>
        
        {/* Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex gap-4">
             <a href="https://github.com/Sai-Akhil-Y/" className="p-4 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:border-transparent hover:text-primary-content hover:shadow-[0_0_15px_theme('colors.primary.glow')] transition-all duration-300">
                <Github className="w-6 h-6 hover:border-transparent" />
             </a>
             <a href="https://www.linkedin.com/in/sai-akhil-yerramsetty/" className="p-4 rounded-full bg-primary/10 border border-primary/20 text-primary hover:border-transparent hover:bg-primary hover:text-primary-content hover:shadow-[0_0_15px_theme('colors.primary.glow')] transition-all duration-300">
                <Linkedin className="w-6 h-6 hover:border-transparent" />
             </a>
             <a href="https://drive.google.com/file/d/1r_3ZpOAlDUgyKNV47RAbNMVBcphBUur5/view?usp=sharing" className="p-4 rounded-full bg-primary/10 border hover:border-transparent border-primary/20 text-primary hover:bg-primary hover:text-primary-content hover:shadow-[0_0_15px_theme('colors.primary.glow')] transition-all duration-300">
                <FileUser className="w-6 h-6 hover:border-transparent" />
             </a>
          </div>
        </div>
      </div>

      {/* 
        --- Horizontal Scrolling Skills Marquee ---
        Placed at the bottom of the section
      */}
      <div className="absolute bottom-0 w-full p-5 overflow-hidden bg-main/5 backdrop-blur-sm border-t border-contrast/5 z-20">
        {/* 
           Wrapper div for marquee content.
           Added 'w-max' to ensure the container spans the full width of the content,
           making the 50% translation accurately correspond to exactly one set of skills.
        */}
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform w-max">
          {/* Duplicate list to create seamless loop */}
          {[...skills, ...skills].map((skill, i) => (
            <span 
              key={i} 
              className="mx-8 text-neutral-500 font-mono text-sm tracking-[0.2em] uppercase hover:text-primary transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator - Floating slightly above the marquee */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <ArrowDown className="w-6 h-6 text-neutral-500" />
      </div>
    </section>
  );
};

export default Hero;