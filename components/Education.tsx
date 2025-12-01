import React from 'react';
import { SectionId, Education as EducationType } from '../types';
import { GraduationCap, Award } from 'lucide-react';
import RollingText from './RollingText';

const educationData: EducationType[] = [
  {
    id: 1,
    degree: "Masters in Computer Science",
    institution: "Stony Brook University",
    year: "2025",
    details: "Specializing in Distributed Systems, Cloud Computing, and Scalable Architecture."
  },
  {
    id: 2,
    degree: "Bachelors in Computer Science",
    institution: "Amrita Vishhwa Vidyapeetham",
    year: "2021",
    details: "Core focus on Algorithms, Data Structures, and Full Stack Web Development."
  }
];

const Education: React.FC = () => {
  return (
    <section id={SectionId.EDUCATION} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 flex justify-center items-center gap-3">
          <RollingText highlight stagger>ACADEMIC</RollingText>
          PROFILE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {educationData.map((edu) => (
            <div key={edu.id} className="glass-panel animated-border p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-1  transition-transform duration-300">
              <div className="absolute top-5 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <GraduationCap className="w-32 h-32 text-contrast" />
              </div>
              
              <div className="relative z-10">
                {/* Header: Icon and Year */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:text-primary-content group-hover:bg-primary group-hover:border-transparent group-hover:shadow-[0_0_15px_theme('colors.primary.glow')] transition-all duration-300">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="px-4 py-1 rounded-full bg-contrast/5 text-sm font-mono text-neutral-400 border border-contrast/10 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                    {edu.year}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-primary mb-2"><RollingText textClass="text-primary">{edu.degree}</RollingText></h3>
                <div className="text-lg text-primary/80 font-medium tracking-wide">{edu.institution}</div>
                <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
                  {edu.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;