import React from 'react';
import { SectionId, SkillCategory } from '../types';
import { Terminal, Cloud, Database, ShieldCheck } from 'lucide-react';
import RollingText from './RollingText';

const skillsData: SkillCategory[] = [
  { 
    category: "Core Languages", 
    skills: ["Python", "Java", "JavaScript", "SQL", "Ruby", "Bash", "Powershell", "C", "Unix"] 
  },
  { 
    category: "Cloud & DevOps", 
    skills: ["AWS", "GCP", "OCI", "Docker", "Kubernetes", "Ansible", "Chef", "Terraform", "Kibana", "Prometheus", "GitLab CI/CD", "Jenkins", "Rundeck", "Flyway", "JFrog Artifactory", "Git", "Jira", "TMux"] 
  },
  { 
    category: "Backend & Data", 
    skills: ["FastAPI", "Flask", "Spring Boot", "Node.js", "Express.js", "React.js", "GraphQL", "PostgreSQL", "MongoDB", "Apache Spark", "Kafka", "Airflow", "HDFS", "Elasticsearch", "Logstash", "Hugging Face"] 
  },
  { 
    category: "QA & Automation", 
    skills: ["Selenium", "Playwright", "Jest", "Espresso", "Postman"] 
  },
];

const icons = [Terminal, Cloud, Database, ShieldCheck];

const Skills: React.FC = () => {
  return (
    <section id={SectionId.SKILLS} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 flex justify-center items-center gap-3">
          <RollingText highlight stagger>SKILL</RollingText>
          STACK
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsData.map((category, index) => {
            const Icon = icons[index];
            
            // --- Asymmetric Grid Logic ---
            // Designed to create a visual "Zig-Zag" or masonry feel on Desktop (md+)
            const spanClass = (index === 1 || index === 2) ? "md:col-span-2" : "md:col-span-1";
            
            return (
              <div key={index} className={`glass-panel animated-border p-8 rounded-2xl group transition-all duration-300 hover:transform hover:-translate-y-1 flex flex-col ${spanClass} `}>
                {/* Card Header with Icon */}
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:text-primary-content group-hover:bg-primary group-hover:shadow-[0_0_15px_theme('colors.primary.glow')] group-hover:border-transparent transition-all duration-300">
                    <Icon className="w-6 h-6 " />
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-contrast tracking-wide group-hover:text-primary transition-colors">
                    <RollingText>{category.category}</RollingText>
                  </h3>
                </div>
                
                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2 content-start flex-grow">
                  {category.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 text-sm font-mono text-neutral-400 bg-contrast/5 border border-contrast/5 rounded-md hover:border-primary/30 hover:text-contrast hover:bg-primary/10 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;