/** @type {import('next').NextConfig} */
const nextConfig = {
    // If you use external images (e.g. from S3), configure the domains here
    images: {
        domains: ['mock-storage.com'],
    },
    // We can force node runtime for APIs if needed, but default is usually fine
    // experimental: { serverActions: true },
};

module.exports = nextConfig;
