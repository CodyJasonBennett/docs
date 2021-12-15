module.exports = {
  swcMinify: true,
  experimental: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(woff2|png|jpg|mp4|glb)$/,
        type: 'asset/resource',
      },
      {
        test: /\.mdx$/,
        use: ['next-swc-loader', 'mdx-loader'],
      },
    )

    return config
  },
}
