const nextOptions = require('../next.config')

module.exports = {
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  stories: ['../src/**/*.stories.js'],
  webpackFinal(config) {
    // Respect absolute paths
    config.resolve.modules.push('src')

    // Filter to base rules
    const baseExts = ['.css', '.js']
    config.module.rules = config.module.rules.filter((rule) => baseExts.some((ext) => rule.test?.test(ext)))

    // Use Next Webpack config
    return nextOptions.webpack?.(config) ?? config
  },
}
