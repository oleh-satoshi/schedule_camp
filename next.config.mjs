const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repo = 'schedule_camp' // например, v0-schedule-pi

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? `/${repo}` : '',
  assetPrefix: isGithubPages ? `/${repo}/` : '',
}

export default nextConfig
