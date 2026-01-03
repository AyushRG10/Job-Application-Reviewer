import { NextResponse } from 'next/server';
import { parseResumeWithAI } from '@/lib/ai';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // 1. Mock Parsing (Since we don't have DB/S3)
        const fileUrl = `https://mock-storage.com/${file.name}`;
        const parsedData = await parseResumeWithAI(fileUrl);

        // 2. Generate Result without DB
        const score = Math.floor(Math.random() * (95 - 72) + 72); // Dynamic score

        const resumeMock = {
            id: 'mock-resume-id-' + Date.now(),
            userId: "demo-user",
            fileUrl,
            parsedData,
            skills: parsedData.skills,
            score
        };

        // 3. Generate Optimization Tips
        const tips = [
            {
                id: '1',
                priority: 'high',
                message: "Add 'Node.js' to skills section",
                context: "Matches 12 new listings found in your area"
            },
            {
                id: '2',
                priority: 'medium',
                message: "Quantify your impact in 'Senior Engineer' role",
                context: "Use metrics like 'Improved latency by 20%'"
            },
            {
                id: '3',
                priority: 'low',
                message: "Include a link to your GitHub portfolio",
                context: "Highly valued by tech startups"
            }
        ];

        // Simulate network delay for "Analysis" feel
        await new Promise(resolve => setTimeout(resolve, 1500));

        return NextResponse.json({
            data: resumeMock,
            tips
        });

    } catch (error) {
        console.error('Resume upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
