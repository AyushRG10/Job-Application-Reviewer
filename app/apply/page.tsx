'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Upload, CheckCircle, ArrowRight } from 'lucide-react';

export default function ApplyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get job details from URL params (in a real app, fetch by ID)
    const jobTitle = searchParams.get('title') || 'Position';
    const company = searchParams.get('company') || 'Company';
    const jobUrl = searchParams.get('url') || '#';

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        linkedin: '',
        resume: null as File | null,
        coverLetter: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);

        // Simulate submission delay
        setTimeout(async () => {
            // Add to tracker via API
            await fetch('/api/tracker', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobTitle,
                    company,
                    jobUrl
                })
            });

            setStep(3);
        }, 2000);
    };

    const handleFinalRedirect = () => {
        // Redirect to original job board to "finalize"
        window.open(jobUrl, '_blank');
        router.push('/applications'); // Go back to tracker
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-gray-900">Apply to {company}</h1>
                    <p className="text-sm text-gray-500">{jobTitle}</p>
                </div>
            </div>

            <div className="flex-1 max-w-2xl mx-auto w-full p-6">

                {step === 1 && (
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Candidate Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    placeholder="e.g. Jordan Taylor"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    placeholder="jordan@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                                <input
                                    type="url"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    placeholder="https://linkedin.com/in/..."
                                    value={formData.linkedin}
                                    onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition">
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept=".pdf,.docx"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setFormData({ ...formData, resume: e.target.files[0] });
                                            }
                                        }}
                                    />
                                    {formData.resume ? (
                                        <div className="flex flex-col items-center">
                                            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                                            <span className="text-sm font-medium text-gray-900">{formData.resume.name}</span>
                                            <span className="text-xs text-gray-500">Click to change</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-600">Click to upload PDF</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg transition shadow-md">
                                Review Application
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
                        <h3 className="text-xl font-medium text-gray-900">Submitting to {company}...</h3>
                        <p className="text-gray-500 max-w-md">Our AI agent is auto-filling the external portal with your data.</p>
                    </div>
                )}

                {step === 3 && (
                    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Almost Done!</h2>
                            <p className="text-gray-500 mt-2">
                                We've pre-filled your application. Please verify and hit "Submit" on the {company} careers page to finalize.
                            </p>
                        </div>

                        <button
                            onClick={handleFinalRedirect}
                            className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg transition shadow-md flex items-center justify-center gap-2"
                        >
                            Go to {company} Portal <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
