import React from 'react';
import { SectionId, Project } from '../types';
import { Github, ShoppingCart, Calendar, Smartphone, Image as ImageIcon, Quote, Lock, Fingerprint, Search, CalendarCheck } from 'lucide-react';
import RollingText from './RollingText';

// Extended type for local use including the icon component
type ProjectWithIcon = Project & { icon: React.ElementType };

const projects: ProjectWithIcon[] = [
  {
    id: 1,
    title: "Smart Grocery Shopper",
    description: "Implemented a real-time cost optimization system that aggregates retail data from different stores, factoring in geolocation, fuel costs, and shopping methods to recommend the overall cost-effective and time-effective purchase option.",
    tags: ["Apache Spark", "Kafka", "HDFS", "MongoDB", "Python", "React.js", "Node.js"],
    icon: ShoppingCart,
    github: "https://github.com/Sai-Akhil-Y/Grocery_Shopping_Recommender"
  },
  {
    id: 2,
    title: "Intelligent Faculty Schedule Optimization",
    description: "Designed and implemented an automated faculty scheduling system using Node.js and PostgreSQL to generate optimized schedules, ensuring proper faculty assignments.",
    tags: ["JavaScript", "React.js", "Jira", "SonarQube", "Playwright", "Jest"],
    icon: Calendar,
    github: "https://github.com/Sai-Akhil-Y/Bachelors-Projects/tree/main/Teacher%20Timetable%20Generator%20v1"
  },
  {
    id: 3,
    title: "Context-Aware Call Reminder Application",
    description: "Created a smart Android application in Java that dynamically overlays personalized reminders on incoming calls, enhancing productivity through real-time contextual alerts.",
    tags: ["Android Studio", "Java", "Espresso"],
    icon: Smartphone,
    github: "#"
  },
  {
    id: 4,
    title: "Enhanced GANs for Image Out-painting",
    description: "An enhanced Generative Adversarial Network (GAN) that leverages dense blocks and dual discriminators to intelligently extend images beyond their original boundaries.",
    tags: ["Python", "PyTorch", "OpenCV"],
    icon: ImageIcon,
    github: "https://github.com/Sai-Akhil-Y/Bachelors-Projects/tree/main/Image%20Outpainting"
  },
  {
    id: 5,
    title: "Metaphor Detection",
    description: "Proposed an improved model to detect metaphors in a given context using state-of-the-art Natural Language Processing transformer models and recurrent neural networks.",
    tags: ["Python", "TensorFlow", "Hugging Face", "NLTK", "Scikit-learn"],
    icon: Quote,
    github: "https://github.com/Sai-Akhil-Y/Bachelors-Projects/tree/main/Metaphor%20Detection"
  },
  {
    id: 6,
    title: "Secure Encrypted TCP Proxy",
    description: "A multi-mode TCP proxy that uses AES-256 GCM encryption and PBKDF2 key derivation to secure and relay network traffic.",
    tags: ["Go", "crypto/cipher", "PBKDF2", "TCP/IP"],
    icon: Lock,
    github: "#"
  },
  {
    id: 7,
    title: "TCP Service Fingerprinting Tool",
    description: "A custom network tool that performs a concurrent TCP SYN scan of a target host and then intelligently probes open ports with both plain TCP and TLS connections.",
    tags: ["Go", "crypto/tls", "scapy"],
    icon: Fingerprint,
    github: "#"
  },
  {
    id: 8,
    title: "Conference & Event Management System",
    description: "A comprehensive web application designed to streamline conference logistics for planners and provide a simple registration process for attendees.",
    tags: ["JavaScript", "Flask", "MySQL"],
    icon: CalendarCheck,
    github: "https://github.com/Sai-Akhil-Y/Bachelors-Projects/tree/main/Conference%20Management%20System"
  },
  {
    id: 9,
    title: "Product Price Tracker",
    description: "A Flask-based web application that aggregates and compares mobile phone search results from major e-commerce sites like Amazon and Flipkart.",
    tags: ["Python", "Flask", "Beautiful Soup"],
    icon: Search,
    github: "#"
  }
];

const Projects: React.FC = () => {
  return (
    <section id={SectionId.PROJECTS} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 flex justify-center items-center gap-3">
          <RollingText highlight stagger>PROJECT</RollingText>
          VAULT
        </h2>

        {/* Uniform Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const Icon = project.icon;
            
            return (
              <div 
                key={project.id} 
                className="glass-panel animated-border rounded-2xl group transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
              >
                  <div className="p-8 flex flex-col h-full">
                     {/* Header: Icon + Title */}
                     <div className="flex items-center gap-4 mb-6">
                        <div className="shrink-0 p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-content group-hover:border-transparent group-hover:shadow-[0_0_15px_theme('colors.primary.glow')] transition-all duration-500">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-contrast group-hover:text-primary transition-colors leading-tight text-left pt-1">
                           <RollingText textClass="text-left">{project.title}</RollingText>
                        </h3>
                     </div>

                     {/* Description */}
                     <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
                      {project.description}
                     </p>

                     {/* Footer: Tags + Link */}
                     <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-xs font-mono font-medium px-2 py-1 rounded-md bg-contrast/5 text-neutral-500 border border-contrast/5 group-hover:border-primary/20 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {project.github && (
                          <div className="pt-4 border-t border-contrast/5">
                             <a href={project.github} className="flex justify-between items-center text-sm font-medium text-neutral-500 hover:text-contrast transition-colors group/link">
                               <span className="group-hover/link:text-primary transition-colors">View Source</span>
                               <Github className="w-4 h-4" />
                             </a>
                          </div>
                       )}
                     </div>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;