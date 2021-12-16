const nextOptions = require('../next.config')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { backgrounds: false, docs: false, outline: false },
    },
    '@storybook/addon-a11y',
  ],
  stories: ['../src/**/*.stories.js'],
  webpackFinal(config) {
    // Respect absolute paths
    config.resolve.modules.push('src')

    // Use Next Webpack config
    return nextOptions.webpack(config, { isServer: false })
  },
}
