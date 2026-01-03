export async function generateEmbedding(text: string): Promise<number[]> {
    // In production, call OpenAI or another embedding service
    // return openai.embeddings.create({ input: text, model: 'text-embedding-3-small' });

    // Mock 1536-dimensional vector for local dev without keys
    return new Array(1536).fill(0).map(() => Math.random());
}

export async function parseResumeWithAI(fileUrl: string) {
    // Mock integration with Skima or Affinda
    // In production: const result = await affiliateClient.parse(fileUrl);
    return {
        skills: ['TypeScript', 'React', 'Node.js', 'AWS', 'PostgreSQL'],
        education: [{ degree: 'BS Computer Science', year: 2020 }],
        experience_years: 5,
        summary: "Senior Full Stack Engineer with specific focus on AI..."
    };
}

export async function calculateMatchScore(resumeSkills: string[], jobDescription: string) {
    // Mock logic
    return Math.floor(Math.random() * (99 - 70) + 70);
}
