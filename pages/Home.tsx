import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Layers, Users } from 'lucide-react';
import { SITE_CONFIG, PROJECTS } from '../constants';

const Home: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          {/* Low-key badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-medium mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-400"></span>
            </span>
            Welcome to {SITE_CONFIG.name}
          </div>
          
          {/* Low-key Title: Smaller, lighter weight, neutral color */}
          <h1 className="text-3xl md:text-5xl font-medium text-slate-800 tracking-tight mb-6">
            Showcasing Innovation <br className="hidden md:block" />
            and Technical Excellence
          </h1>
          
          {/* Low-key Subtitle: Smaller, lighter gray */}
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-500 mb-10 leading-relaxed font-light">
            {SITE_CONFIG.description} Dive into our portfolio of cutting-edge applications, 
            tools, and experiments powered by modern web technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Low-key Buttons: Slate/Neutral instead of Indigo */}
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
            >
              Explore Projects
              <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
            </Link>
            <Link
              to="/team"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-200 text-sm font-medium rounded-lg text-slate-600 bg-white hover:bg-slate-50 transition-colors"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 mb-6">
                <Layers size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Diverse Portfolio</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                From mobile apps to web dashboards, exploring various domains and technologies.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 mb-6">
                <Code size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Clean Code</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Emphasizing maintainability, performance, and modern best practices in every line.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 mb-6">
                <Users size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Collaborative</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Built by a dedicated team of passionate developers and designers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mini Showcase */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Latest Updates</h2>
                    <p className="text-slate-500 text-sm mt-1">Recent additions to our repository</p>
                </div>
                <Link to="/projects" className="hidden md:flex items-center text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors">
                    View all <ArrowRight size={16} className="ml-1" />
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {featuredProjects.map(project => (
                     <Link to={project.hasDetail ? `/project/${project.id}` : '/projects'} key={project.id} className="group block">
                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-4 border border-slate-100">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                        </div>
                        <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">{project.title}</h3>
                        <p className="text-slate-500 text-sm mt-1 line-clamp-2">{project.shortDescription}</p>
                     </Link>
                ))}
            </div>
            
            <div className="mt-8 md:hidden">
                 <Link to="/projects" className="flex items-center justify-center text-slate-600 font-medium hover:text-slate-900 transition-colors">
                    View all projects <ArrowRight size={16} className="ml-1" />
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;