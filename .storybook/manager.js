import { themes } from '@storybook/theming'
import { addons } from '@storybook/addons'

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: 'https://pmnd.rs/favicon-32x32.png',
    brandTitle: 'Poimandres Components',
    brandUrl: 'https://pmnd.rs',
  },
})
