/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  output: 'export', // Enable static export
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Hackathon-From-LLM-To-Agentic-AI/landing-page' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Hackathon-From-LLM-To-Agentic-AI/landing-page' : '',
};

export default nextConfig;
