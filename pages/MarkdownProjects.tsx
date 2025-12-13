import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, QrCode, Search, Calendar, Loader2 } from 'lucide-react';
import { loadMarkdownProjects } from '../utils/markdown-loader';
import { MarkdownProject } from '../types/markdown-project';

const MarkdownProjects: React.FC = () => {
    const [projects, setProjects] = useState<MarkdownProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    useEffect(() => {
        loadMarkdownProjects()
            .then(setProjects)
            .finally(() => setLoading(false));
    }, []);

    // Extract all unique tags
    const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });

    if (loading) {
        return (
            <div className="py-12 bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 size={48} className="animate-spin text-indigo-600 mx-auto mb-4" />
                    <p className="text-slate-600">Loading projects...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Markdown Projects</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Projects automatically loaded from markdown files, sorted by date.
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-10 space-y-4">
                    <div className="relative max-w-md mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedTag === null
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            All
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedTag === tag
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <MarkdownProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No projects found matching your criteria.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedTag(null) }}
                            className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const MarkdownProjectCard: React.FC<{ project: MarkdownProject }> = ({ project }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full group">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {project.qrCodeUrl && (
                    <div className="absolute top-4 right-4 bg-white p-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <img src={project.qrCodeUrl} alt="QR Code" className="w-16 h-16" />
                    </div>
                )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2 mb-2 flex-wrap">
                        {project.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="text-xs text-slate-400 flex items-center whitespace-nowrap">
                        <Calendar size={12} className="mr-1" />
                        {project.date}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                    <Link to={`/markdown-project/${project.id}`} className="hover:text-indigo-600 transition-colors">
                        {project.title}
                    </Link>
                </h3>

                <p className="text-slate-600 text-sm mb-6 flex-grow">
                    {project.shortDescription}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <Link
                        to={`/markdown-project/${project.id}`}
                        className="text-indigo-600 font-medium text-sm hover:text-indigo-800 transition-colors"
                    >
                        Read Case Study
                    </Link>

                    <div className="flex items-center gap-3">
                        {project.qrCodeUrl && (
                            <button
                                className="text-slate-400 hover:text-slate-700 transition-colors md:hidden"
                                title="Show QR Code"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert('QR Code available on desktop hover or view details.');
                                }}
                            >
                                <QrCode size={18} />
                            </button>
                        )}
                        {project.projectUrl && (
                            <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors"
                            >
                                Visit <ExternalLink size={12} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownProjects;
