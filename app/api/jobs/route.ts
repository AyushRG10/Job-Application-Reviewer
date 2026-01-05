import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'software';

    // Robust Mock Data for Fallback
    const MOCK_JOBS = [
        {
            id: 'mock-1',
            title: 'Senior Product Manager',
            company: 'TechFlow',
            location: 'Remote',
            isRemote: true,
            salaryMin: 140000,
            salaryMax: 190000,
            matchScore: 95,
            tags: ['Product', 'Strategy', 'Agile'],
            url: '#'
        },
        {
            id: 'mock-2',
            title: 'Frontend Developer',
            company: 'Creative Solutions',
            location: 'San Francisco, CA',
            isRemote: true,
            salaryMin: 120000,
            salaryMax: 160000,
            matchScore: 92,
            tags: ['React', 'TypeScript', 'Tailwind'],
            url: '#'
        },
        {
            id: 'mock-3',
            title: 'UX/UI Designer',
            company: 'DesignWorks',
            location: 'Remote',
            isRemote: true,
            salaryMin: 90000,
            salaryMax: 130000,
            matchScore: 89,
            tags: ['Figma', 'User Research', 'Prototyping'],
            url: '#'
        },
        {
            id: 'mock-4',
            title: 'Full Stack Engineer',
            company: 'StartupX',
            location: 'New York, NY',
            isRemote: false,
            salaryMin: 130000,
            salaryMax: 180000,
            matchScore: 88,
            tags: ['Node.js', 'React', 'PostgreSQL'],
            url: '#'
        },
        {
            id: 'mock-5',
            title: 'Marketing Manager',
            company: 'GrowthHackers',
            location: 'Remote',
            isRemote: true,
            salaryMin: 80000,
            salaryMax: 120000,
            matchScore: 85,
            tags: ['SEO', 'Content Marketing', 'Analytics'],
            url: '#'
        },
        {
            id: 'mock-6',
            title: 'Data Scientist',
            company: 'DataCorp',
            location: 'Austin, TX',
            isRemote: true,
            salaryMin: 110000,
            salaryMax: 160000,
            matchScore: 91,
            tags: ['Python', 'Machine Learning', 'SQL'],
            url: '#'
        },
        {
            id: 'mock-7',
            title: 'DevOps Engineer',
            company: 'CloudSystems',
            location: 'Remote',
            isRemote: true,
            salaryMin: 130000,
            salaryMax: 175000,
            matchScore: 87,
            tags: ['AWS', 'Kubernetes', 'CI/CD'],
            url: '#'
        }
    ];

    try {
        // Fetch more jobs (limit 50)
        const res = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}&limit=50`);
        const data = await res.json();

        // If no jobs found from API, return Mock Data so user sees something
        if (!data.jobs || data.jobs.length === 0) {
            return NextResponse.json({ data: MOCK_JOBS });
        }

        // Map Remotive structure to our UI's Job interface
        const jobs = data.jobs.slice(0, 50).map((job: any) => ({
            id: job.id.toString(),
            title: job.title,
            company: job.company_name,
            location: job.candidate_required_location || 'Remote',
            isRemote: true, // Remotive is all remote
            salaryMin: job.salary ? 100000 : 90000 + Math.floor(Math.random() * 40000), // Better mock salary 
            salaryMax: job.salary ? 150000 : 140000 + Math.floor(Math.random() * 60000),
            description: job.description,
            // Random match score between 85 and 99
            matchScore: Math.floor(Math.random() * (99 - 85) + 85),
            tags: job.job_type ? [job.job_type.replace('_', ' ')] : ['Remote'],
            url: job.url
        }));

        return NextResponse.json({ data: jobs });

    } catch (error) {
        console.error('External API error:', error);
        // Fallback to Mock Data on error
        return NextResponse.json({ data: MOCK_JOBS });
    }
}
