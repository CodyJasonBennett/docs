module.exports = {
  swcMinify: true,
  experimental: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: ['next-swc-loader', 'mdx-loader'],
    })

    return config
  },
}
