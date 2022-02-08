module.exports = {
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.mdx?$/,
      type: 'asset/source',
    })

    return config
  },
}
