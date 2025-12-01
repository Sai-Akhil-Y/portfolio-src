import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './components/Background';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-contrast selection:bg-primary selection:text-black relative">
      {/* 
         Global Animated Background 
         Sits at Z-0 (defined inside component) to stay behind everything 
      */}
      <Background />
      
      {/* 
         Main Content Wrapper 
         Z-10 ensures content sits above the canvas background 
      */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <Contact />
        </main>
        
      </div>
    </div>
  );
};

export default App;