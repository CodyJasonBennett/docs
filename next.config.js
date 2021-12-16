module.exports = {
  swcMinify: true,
  experimental: {
    styledComponents: true,
  },
  exportPathMap: async () => ({ '/': { page: '/[[...slug]]' } }),
  webpack(config) {
    config.module.rules.push({
      test: /\.mdx$/,
      use: ['next-swc-loader', 'mdx-loader'],
    })

    return config
  },
}
