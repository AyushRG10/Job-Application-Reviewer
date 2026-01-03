'use client';

import { useState, useEffect } from 'react';
import { Clock, Calendar, ChevronRight } from 'lucide-react';

interface Application {
    id: string;
    job: {
        title: string;
        company: string;
    };
    status: 'APPLIED' | 'INTERVIEWING' | 'OFFER' | 'REJECTED';
    progress: number;
    nextStep: string | null;
    nextStepDate: string | null;
    updatedAt: string;
}

interface KanbanData {
    all: Application[];
    applied: Application[];
    interviewing: Application[];
    offers: Application[];
    rejected: Application[];
}

export default function ApplicationsPage() {
    const [data, setData] = useState<KanbanData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const res = await fetch('/api/tracker?userId=demo');
            const json = await res.json();
            if (json.data) {
                setData(json.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
        // Optional: Poll every 30s to simulate realtime if WebSocket isn't up
        const interval = setInterval(fetchApplications, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('applicationId', id);
    };

    const handleDrop = async (e: React.DragEvent, newStatus: string) => {
        const id = e.dataTransfer.getData('applicationId');
        // Optimistic update logic would go here

        // Call API to update status
        await fetch('/api/tracker', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appId: id, status: newStatus })
        });

        fetchApplications(); // Refresh
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold">My Applications</h1>
                {data && (
                    <div className="flex gap-2">
                        <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-bold">All {data.all.length}</span>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">Applied {data.applied.length}</span>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">Interviewing {data.interviewing.length}</span>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {loading ? (
                    <div className="w-full h-32 bg-gray-100 animate-pulse rounded-xl" />
                ) : (
                    data?.all.map((app) => (
                        <div key={app.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                        {app.job.company.substring(0, 1)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{app.job.title}</h3>
                                        <p className="text-sm text-gray-500">{app.job.company}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium 
                    ${app.status === 'INTERVIEWING' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {app.status}
                                </span>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Application Progress</span>
                                    <span>{app.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-green-700 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${app.progress}%` }}
                                    />
                                </div>
                            </div>

                            {app.nextStep && (
                                <div className="bg-green-50 rounded-lg p-3 flex justify-between items-center border border-green-100">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-green-700" />
                                        <div>
                                            <p className="text-xs text-gray-500">Next Step</p>
                                            <p className="text-sm font-medium text-gray-900">{app.nextStep}</p>
                                        </div>
                                    </div>
                                    {app.nextStepDate && (
                                        <div className="flex items-center gap-1 text-sm text-green-700 font-medium">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(app.nextStepDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="mt-4 flex justify-end">
                                <button className="text-sm font-medium text-green-700 flex items-center gap-1 hover:underline">
                                    Prep Now <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
