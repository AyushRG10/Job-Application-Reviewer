export let mockApplicationsStore: any[] = [
    {
        id: '1',
        job: { title: 'Senior Frontend Engineer', company: 'Tech Corp' },
        status: 'INTERVIEWING',
        progress: 60,
        nextStep: 'Technical Round',
        nextStepDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '2',
        job: { title: 'Product Designer', company: 'Creative Studio' },
        status: 'APPLIED',
        progress: 20,
        nextStep: null,
        nextStepDate: null,
        updatedAt: new Date().toISOString()
    }
];

export const addApplication = (app: any) => {
    mockApplicationsStore.unshift(app);
};
