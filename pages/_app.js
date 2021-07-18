import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #000;
    font-family: sans-serif;
  }

  .bg_body {
    background: url('https://www.techcult.com.br/wp-content/uploads/2016/01/homem-aranha-3.jpg');
    background-position: center;
    background-size: cover;
    background-position-y: -158px;
    position: fixed;
    opacity: 0.4;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #__next{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
