'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResumePage() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [score, setScore] = useState<number | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/resume', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.data) {
                setResult(data);
                setScore(data.data.score);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Resume Lab</h1>
                <p className="text-gray-500">Optimize your resume with AI insights</p>
            </div>

            {/* Score Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">AI Resume Score</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-orange-500">{score ?? '--'}</span>
                            <span className="text-gray-400">/100</span>
                        </div>
                    </div>
                    <span className="text-xs text-gray-400">Last updated today</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className="bg-green-700 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${score ?? 0}%` }}
                    />
                </div>
            </div>

            {/* Upload Area */}
            {!result ? (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition relative">

                    {!file ? (
                        <>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept=".pdf,.docx"
                                onChange={handleFileChange}
                            />
                            <Upload className="w-10 h-10 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">
                                Upload or drag your resume
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">PDF, DOCX up to 5MB</p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center z-20">
                            <FileText className="w-12 h-12 text-green-600 mb-3" />
                            <h3 className="text-lg font-bold text-gray-900">
                                {file.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="px-6 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 disabled:opacity-50 shadow-sm transition-all"
                                >
                                    {uploading ? 'Analyzing...' : 'Analyze My Resume'}
                                </button>
                                <button
                                    onClick={() => setFile(null)}
                                    className="px-4 py-2 text-gray-500 hover:text-red-600 font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
                        <CheckCircle className="text-green-600 w-5 h-5" />
                        <p className="text-green-800 font-medium">Analysis Complete</p>
                    </div>

                    {/* Optimization Tips */}
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        Optimization Tips
                    </h2>

                    <div className="space-y-3">
                        {result.tips?.map((tip: any, i: number) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-lg flex gap-4">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold h-fit
                   ${tip.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {tip.priority}
                                </span>
                                <div>
                                    <p className="font-medium text-gray-900">{tip.message}</p>
                                    <p className="text-sm text-gray-500 mt-1">{tip.context}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => { setFile(null); setResult(null); }} className="text-sm text-gray-500 hover:text-gray-900 underline">
                        Upload a different resume
                    </button>
                </div>
            )}
        </div>
    );
}
