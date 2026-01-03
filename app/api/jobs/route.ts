import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'software'; // Default to software if empty

    try {
        // Fetch real jobs from Remotive (Public API, no key required)
        // Using default cors proxy or direct if server-side
        const res = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}&limit=20`);

        // Remotive sometimes returns { "jobs": [...] } structure
        const data = await res.json();

        if (!data.jobs) {
            return NextResponse.json({ data: [] });
        }

        // Map Remotive structure to our UI's Job interface
        const jobs = data.jobs.slice(0, 20).map((job: any) => ({
            id: job.id.toString(),
            title: job.title,
            company: job.company_name,
            location: job.candidate_required_location || 'Remote',
            isRemote: true, // Remotive is all remote
            salaryMin: job.salary ? 100000 : 0, // Mock normalization since data varies
            salaryMax: job.salary ? 150000 : 0,
            description: job.description,
            matchScore: Math.floor(Math.random() * (98 - 85) + 85), // Synthetic AI score for demo
            tags: job.job_type ? [job.job_type.replace('_', ' ')] : [],
            url: job.url
        }));

        return NextResponse.json({ data: jobs });

    } catch (error) {
        console.error('External API error:', error);
        // Fallback Mock Data if API fails or rate limits
        const mockJobs = [
            {
                id: 'mock-1',
                title: 'Senior Frontend Engineer (Fallback)',
                company: 'Tech Corp',
                location: 'Remote',
                isRemote: true,
                salaryMin: 120000,
                salaryMax: 180000,
                matchScore: 92,
                tags: ['React', 'TypeScript'],
            }
        ];
        return NextResponse.json({ data: mockJobs });
    }
}
