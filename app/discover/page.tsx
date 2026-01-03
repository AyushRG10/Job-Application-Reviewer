'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Filter } from 'lucide-react';

// Type definition matching the API response
interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    isRemote: boolean;
    salaryMin: number;
    salaryMax: number;
    matchScore: number;
    tags: string[];
    url?: string; // New field
}

export default function DiscoverPage() {
    const [query, setQuery] = useState('');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);

    // Debounce search or search on enter
    const handleSearch = async (term: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/jobs?q=${encodeURIComponent(term)}&userId=demo`);
            const data = await res.json();
            if (data.data) {
                setJobs(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial load
        handleSearch('');
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold">Discover</h1>
            </div>

            {/* Search Chips / Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search jobs, companies, skills..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                />
            </div>

            {/* Filter Chips (Visual only for now, can be hooked up) */}
            <div className="flex flex-wrap gap-2">
                {['Remote Product Roles', 'High Growth Startups', 'Series A-C Companies', '4-Day Work Week'].map((label) => (
                    <button
                        key={label}
                        onClick={() => { setQuery(label); handleSearch(label); }}
                        className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition"
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center pt-4">
                <p className="text-gray-500">{loading ? 'Searching...' : `${jobs.length} jobs match your profile`}</p>
                <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold border px-2 py-1 rounded">AI-Ranked</span>
            </div>

            {/* Job List */}
            <div className="space-y-4">
                {loading ? (
                    // Skeleton
                    [1, 2, 3].map((i) => (
                        <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-xl border border-gray-200" />
                    ))
                ) : (
                    jobs.map((job) => (
                        <div key={job.id} className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    {/* Logo Placeholder */}
                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                                        {job.company.substring(0, 1)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                                        <p className="text-sm text-gray-500">{job.company}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-2">
                                    {job.matchScore && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                            {job.matchScore}% Match
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location} {job.isRemote && '(Remote)'}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between">
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900 flex items-center gap-1">
                                        ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                                        <DollarSign className="w-3 h-3 text-gray-400" />
                                    </p>
                                </div>
                                <a
                                    href={`/apply?title=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}&url=${encodeURIComponent(job.url || '')}`}
                                    className="w-full md:w-auto px-6 py-2 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg transition shadow-sm text-center inline-block"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
