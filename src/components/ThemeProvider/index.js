import { createGlobalStyle, useTheme, ThemeProvider as ThemeProviderImpl } from 'styled-components'
import Head from 'next/head'
import theme from 'data/theme'

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
    tab-size: 2;
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

  @font-face {
    font-family: 'Inter';
    font-weight: 400;
    src: url('/fonts/inter-regular.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    font-weight: 500;
    src: url('/fonts/inter-medium.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    font-weight: 600;
    src: url('/fonts/inter-semibold.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    font-weight: 700;
    src: url('/fonts/inter-bold.woff2') format('woff2');
    font-display: swap;
  }
`

export default function ThemeProvider({ theme: themeOverrides, children }) {
  const currentTheme = { ...theme, ...themeOverrides }
  const isRootProvider = !useTheme()

  return (
    <ThemeProviderImpl theme={currentTheme}>
      {isRootProvider && (
        <>
          <GlobalStyle />
          <Head>
            <link rel="preload" href="/fonts/inter-regular.woff2" as="font" crossOrigin="" />
            <link rel="preload" href="/fonts/inter-medium.woff2" as="font" crossOrigin="" />
            <link rel="preload" href="/fonts/inter-semibold.woff2" as="font" crossOrigin="" />
            <link rel="preload" href="/fonts/inter-bold.woff2" as="font" crossOrigin="" />
          </Head>
        </>
      )}
      {children}
    </ThemeProviderImpl>
  )
}
