import React, { useState, FormEvent } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            // Call our serverless function instead of EmailJS directly
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
            console.error('Contact form error:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Have a question or want to work together? Send us a message and we'll get back to you as soon as possible.
                    </p>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                <User size={16} className="inline mr-2" />
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                <Mail size={16} className="inline mr-2" />
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                                <MessageSquare size={16} className="inline mr-2" />
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-colors resize-none"
                                placeholder="Tell us what's on your mind..."
                            />
                        </div>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                                <CheckCircle size={20} />
                                <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                                <AlertCircle size={20} />
                                <span className="font-medium">{errorMessage}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'sending' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>We typically respond within 24-48 hours during business days.</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
