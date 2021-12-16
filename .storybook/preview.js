import styled from 'styled-components'
import ThemeProvider from '../src/components/ThemeProvider'

const StoryRoot = styled.div.attrs(() => ({
  id: 'story-root',
}))`
  position: absolute;
  inset: 0;
`

export const decorators = [
  (Story, context) => {
    const themeId = context.globals.theme

    return (
      <ThemeProvider themeId={themeId}>
        <StoryRoot>
          <Story />
        </StoryRoot>
      </ThemeProvider>
    )
  },
]

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
}

export const parameters = {
  layout: 'fullscreen',
  controls: { hideNoControlsWarning: true },
}
