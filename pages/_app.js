import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { Container } from "../components/layout/Container";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Container>
        <Component {...pageProps} />)
      </Container>
    </ChakraProvider>
  )
}

export default MyApp
