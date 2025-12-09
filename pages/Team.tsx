import React from 'react';
import { Github, Twitter, Linkedin, Globe } from 'lucide-react';
import { TEAM_MEMBERS } from '../constants';
import MarkdownRenderer from '../components/MarkdownRenderer';

const Team: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase mb-2">The People Behind</h2>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Meet Our Team</h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-500">
            We are a group of creators, thinkers, and builders dedicated to crafting exceptional digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-8 flex flex-col items-center">
                <div className="w-32 h-32 mb-6 relative">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full transform rotate-6 scale-105"></div>
                    <img 
                        className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white shadow-md" 
                        src={member.avatar} 
                        alt={member.name} 
                    />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
                
                {/* Render Bio as Markdown */}
                <div className="text-slate-600 text-sm leading-relaxed mb-6 text-center w-full">
                   <MarkdownRenderer content={member.bio} />
                </div>
                
                <div className="flex justify-center space-x-4 mt-auto">
                  {member.socials.github && (
                    <a href={member.socials.github} className="text-slate-400 hover:text-slate-900 transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} className="text-slate-400 hover:text-blue-400 transition-colors">
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="text-slate-400 hover:text-blue-700 transition-colors">
                      <Linkedin size={20} />
                    </a>
                  )}
                   {member.socials.website && (
                    <a href={member.socials.website} className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;