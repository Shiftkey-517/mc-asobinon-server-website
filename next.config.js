/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
const config = {
  env: {
    SSH_HOST: process.env.SSH_HOST,
    SSH_USERNAME: process.env.SSH_USERNAME,
    SSH_PASSWORD: process.env.SSH_PASSWORD,
    API_TOKEN: process.env.API_TOKEN,
    TWITTER_API_TOKEN: process.env.TWITTER_API_TOKEN,
  },
  images: {
    domains: ['pbs.twimg.com'],
  },
}

module.exports = config
