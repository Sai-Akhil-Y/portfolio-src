import React from 'react';
import { SectionId, Experience as ExperienceType } from '../types';
import RollingText from './RollingText';

const experienceData: ExperienceType[] = [
  {
    id: 1,
    role: "Graduate Research Assistant",
    company: "Stony Brook University",
    period: "Aug 2024 – Present",
    description: [
      "Trained causal-inference models to analyze macroeconomic impacts on financial markets.",
      "Conducted extensive data analysis to identify correlations between economic indicators and market trends."
    ]
  },
  {
    id: 2,
    role: "Teaching Assistant",
    company: "Stony Brook University",
    period: "Aug 2024 – Dec 2024",
    description: [
      "Led object-oriented programming lab sessions for CSE 114.02.",
      "Tutored students on OOP concepts and Java assignments.",
      "Proctored exams and enforced academic-integrity policies."
    ]
  },
  {
    id: 3,
    role: "Associate Software Engineer",
    company: "Oracle",
    period: "Jul 2021 – Jul 2023",
    description: [
    "Built 45+ upgrade scripts and integrated Rundeck to streamline OPERA PMS deployments.",
    "Created a tmux-based automation framework that cut deployment time by 60%+.",
    "Migrated 50+ customer environments from legacy systems to a cloud-native stack.",
    "Performed large-scale Flyway migrations in a GitLab CI/CD, Docker, and Kubernetes pipeline for 150+ schemas.",
    "Developed Oracle Vault microservices for automated secrets management, reducing manual work by 90%+."
    ]
  },
  {
    id: 4,
    role: "Subject Matter Expert",
    company: "Chegg India",
    period: "Jan 2022 – Oct 2022",
    description: [
      "Answered computer-science questions across multiple undergraduate topics.",
      "Ensured responses met quality standards and guidelines.",
      "Delivered structured, step-by-step solutions."
    ]
  },
  {
    id: 5,
    role: "Software Engineering Intern",
    company: "Oracle",
    period: "Jan 2021 – Jun 2021",
    description: [
      "Built and maintained on-demand test environments, reducing testing wait times by 75%.",
      "Improved deployment workflows by integrating Git, Jenkins, and Artifactory.",
      "Supported IAM testing and validation using Selenium."
    ]
  },
  {
    id: 6,
    role: "Machine Learning Intern",
    company: "Verzeo",
    period: "May 2019 – Jun 2019",
    description: [
      "Studied machine-learning fundamentals through hands-on training.",
      "Built foundational ML skills via applied sessions.",
      "Developed an ML model for tasks such as image-to-text conversion."
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id={SectionId.EXPERIENCE} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 flex justify-center items-center gap-3">
          <RollingText highlight stagger>CAREER</RollingText>
          LOG
        </h2>

        <div className="relative border-l border-contrast/10 ml-4 md:ml-12 space-y-12">
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-neutral-800 border border-contrast/20 group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_0_10px_theme('colors.primary.glow')] transition-all duration-300"></div>
              
              <div className="glass-panel animated-border p-6 md:p-8 rounded-xl transition-all duration-300 ">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl md:text-2xl lg:text-2xl font-display font-bold tracking-tighter text-primary mb-6 animate-slide-up">
                      <RollingText textClass="text-primary">{exp.role}</RollingText>
                    </h3>

                    <div className="text-lg text-primary/80 font-medium tracking-wide">{exp.company}</div>
                  </div>
                  <span className="mt-2 md:mt-0 px-4 py-1 rounded-full bg-contrast/5 text-sm font-mono text-neutral-400 border border-contrast/10 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex items-start text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      <span className="mr-3 text-primary/50 font-mono mt-1">{'>'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;