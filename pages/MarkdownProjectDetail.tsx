import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ExternalLink, Tag, Loader2 } from 'lucide-react';
import { getMarkdownProject } from '../utils/markdown-loader';
import { MarkdownProject } from '../types/markdown-project';
import MarkdownRenderer from '../components/MarkdownRenderer';

const MarkdownProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<MarkdownProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) {
            setNotFound(true);
            setLoading(false);
            return;
        }

        getMarkdownProject(id)
            .then(result => {
                if (result) {
                    setProject(result);
                } else {
                    setNotFound(true);
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 size={48} className="animate-spin text-indigo-600 mx-auto mb-4" />
                    <p className="text-slate-600">Loading project...</p>
                </div>
            </div>
        );
    }

    if (notFound || !project) {
        return <Navigate to="/markdown-projects" replace />;
    }

    return (
        <article className="min-h-screen bg-white">
            {/* Header Image */}
            <div className="h-[40vh] md:h-[50vh] w-full relative bg-slate-900">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end pb-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
                        <Link to="/markdown-projects" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
                            <ArrowLeft size={20} className="mr-2" /> Back to Markdown Projects
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 shadow-sm">{project.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm">
                            <span className="flex items-center">
                                <Calendar size={16} className="mr-1.5" />
                                {project.date}
                            </span>
                            <div className="flex gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 border border-slate-600 rounded text-xs bg-slate-800/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                <div className="grid md:grid-cols-[1fr_250px] gap-12">
                    {/* Main Content */}
                    <div className="prose prose-lg prose-indigo max-w-none">
                        <p className="lead text-xl text-slate-600 mb-8 font-light">
                            {project.shortDescription}
                        </p>

                        {/* Markdown Render */}
                        {project.content ? (
                            <MarkdownRenderer content={project.content} />
                        ) : (
                            <p className="text-slate-500 italic">No detailed content available for this project.</p>
                        )}
                    </div>

                    {/* Sidebar info */}
                    <div className="space-y-8">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-4 text-lg">Project Info</h3>

                            <div className="space-y-4">
                                {project.projectUrl && (
                                    <a
                                        href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm shadow-indigo-200"
                                    >
                                        Launch Project <ExternalLink size={16} className="ml-2" />
                                    </a>
                                )}

                                {project.qrCodeUrl && (
                                    <div className="pt-4 border-t border-slate-200 text-center">
                                        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Scan to view on mobile</p>
                                        <img src={project.qrCodeUrl} alt="QR Code" className="w-32 h-32 mx-auto rounded-lg border border-slate-200" />
                                    </div>
                                )}

                                <div className="pt-4 border-t border-slate-200">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
                                        <Tag size={14} className="mr-2" /> Technologies
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default MarkdownProjectDetail;
