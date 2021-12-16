import { createGlobalStyle, useTheme, ThemeProvider as ThemeProviderImpl } from 'styled-components'

export const theme = {
  light: {
    foreground: '#000000',
    background: '#ffffff',
  },
  dark: {
    foreground: '#ffffff',
    background: '#000000',
  },
}

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    appearance: none;
    background-color: transparent;
    border-radius: 0;
    border: 0;
    box-sizing: inherit;
    color: inherit;
    font-family: inherit;
    margin: 0;
    outline: none;
    padding: 0;
    text-decoration: none;
  }

  body {
    background: ${(props) => props.theme.background};
    box-sizing: border-box;
    color: ${(props) => props.theme.foreground};
    font-synthesis: none;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    width: 100vw;
  }
`

export default function ThemeProvider({ themeId = 'dark', theme: themeOverrides, children }) {
  const currentTheme = { ...theme[themeId], ...themeOverrides }
  const parentTheme = useTheme()
  const isRootProvider = !parentTheme?.themeId

  return (
    <ThemeProviderImpl theme={currentTheme}>
      {isRootProvider && <GlobalStyle />}
      {children}
    </ThemeProviderImpl>
  )
}

export { useTheme }
