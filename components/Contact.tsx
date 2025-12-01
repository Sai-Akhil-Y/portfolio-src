
import React from 'react';
import { SectionId } from '../types';
import { Phone, MapPin, Linkedin, Mail, FileText } from 'lucide-react';
import RollingText from './RollingText';

// --- Constants ---
const CONTACT_DETAILS = {
  email: "saiakhily93@gmail.com",
  phone: "+16315423754",
  linkedin: "sai-akhil-yerramsetty",
  location: "Chicago, IL",
  mapsLink: "https://www.google.com/maps?q=Chicago,IL",
  linkedinLink: "https://www.linkedin.com/in/sai-akhil-yerramsetty",
  notionFormLink: "https://gem-apology-a00.notion.site/ebd/254be05788d180639c3ac43b844ad72a"
};

const Contact: React.FC = () => {
  return (
    <section id={SectionId.CONTACT} className="py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 flex justify-center items-center gap-3">
          <RollingText highlight stagger>REACH</RollingText>
          ME
        </h2>

        <div className="glass-panel animated-border p-8 md:p-12 rounded-3xl relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            
            <p className="text-neutral-400 mb-10 text-center max-w-lg mx-auto leading-relaxed">
              Always open for new opportunities. Feel free to connect with me through any of the channels below.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              {/* Notion Form Item - Moved to Grid */}
              <a 
                href={CONTACT_DETAILS.notionFormLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-xl bg-contrast/5 border border-contrast/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-main/10 border border-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content group-hover:border-transparent group-hover:shadow-[0_0_15px_theme('colors.primary.glow')] transition-all duration-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono mb-1">Send a Message</p>
                  <p className="text-contrast group-hover:text-primary transition-colors">Fill the Form</p>
                </div>
              </a>

              {/* Phone Item */}
              <a 
                href={`tel:${CONTACT_DETAILS.phone}`} 
                className="group flex items-center p-4 rounded-xl bg-contrast/5 border border-contrast/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-main/10 border border-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content group-hover:border-transparent group-hover:shadow-[0_0_15px_theme('colors.primary.glow')] transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono mb-1">Phone</p>
                  <p className="text-contrast group-hover:text-primary transition-colors">{CONTACT_DETAILS.phone}</p>
                </div>
              </a>

              {/* LinkedIn Item */}
              <a 
                href={CONTACT_DETAILS.linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-xl bg-contrast/5 border border-contrast/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-main/10 border border-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content group-hover:border-transparent group-hover:shadow-[0_0_15px_theme('colors.primary.glow')] transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono mb-1">LinkedIn</p>
                  <p className="text-contrast group-hover:text-primary transition-colors">{CONTACT_DETAILS.linkedin}</p>
                </div>
              </a>

              {/* Location Item */}
              <a 
                href={CONTACT_DETAILS.mapsLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center p-4 rounded-xl bg-contrast/5 border border-contrast/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-main/10 border border-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content group-hover:border-transparent group-hover:shadow-[0_0_15px_theme('colors.primary.glow')] transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="ml-4">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono mb-1">Location</p>
                  <p className="text-contrast group-hover:text-primary transition-colors">{CONTACT_DETAILS.location}</p>
                </div>
              </a>
            </div>

            {/* Email Item - Centered Row */}
            <div className="flex justify-center w-full mt-6">
              <a 
                href={`mailto:${CONTACT_DETAILS.email}`}
                className="group flex items-center p-4 rounded-xl bg-contrast/5 border border-contrast/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 w-full md:w-auto md:min-w-[calc(50%-0.75rem)]"
              >
                <div className="p-3 rounded-full bg-main/10 border border-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content group-hover:border-transparent group-hover:shadow-[0_0_15px_theme('colors.primary.glow')] transition-all duration-300 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="ml-4 min-w-0">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono mb-1">Email</p>
                  <p className="text-contrast break-all group-hover:text-primary transition-colors">{CONTACT_DETAILS.email}</p>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
