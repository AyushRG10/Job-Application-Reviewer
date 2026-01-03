import { NextResponse } from 'next/server';
import { mockApplicationsStore } from '@/lib/store';

export async function GET(request: Request) {
    // Return mock store data
    const applications = mockApplicationsStore;

    // Grouping for Kanban Board
    const kanban = {
        all: applications,
        applied: applications.filter((a: any) => a.status === 'APPLIED'),
        interviewing: applications.filter((a: any) => a.status === 'INTERVIEWING'),
        offers: applications.filter((a: any) => a.status === 'OFFER'),
        rejected: applications.filter((a: any) => a.status === 'REJECTED'),
    };

    return NextResponse.json({ data: kanban });
}

// ... imports

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newApp = {
            id: Date.now().toString(),
            job: {
                title: body.jobTitle,
                company: body.company,
                location: 'Remote',
                salaryMin: 0,
                salaryMax: 0
            },
            status: 'APPLIED',
            progress: 20,
            nextStep: 'Resume Screen',
            nextStepDate: null,
            updatedAt: new Date().toISOString()
        };

        // Add to imported store
        const { addApplication } = require('@/lib/store');
        addApplication(newApp);

        return NextResponse.json({ data: newApp });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    // ... existing patch logic
    try {
        const { appId, status } = await request.json();
        const appIndex = mockApplicationsStore.findIndex((a: any) => a.id === appId);

        if (appIndex > -1) {
            mockApplicationsStore[appIndex].status = status;

            // Update progress logic
            let progress = 20;
            if (status === 'INTERVIEWING') progress = 60;
            if (status === 'OFFER') progress = 100;
            if (status === 'REJECTED') progress = 100;

            mockApplicationsStore[appIndex].progress = progress;

            return NextResponse.json({ data: mockApplicationsStore[appIndex] });
        }

        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
