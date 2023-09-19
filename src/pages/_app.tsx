import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme/theme";
import { wrapper } from "../store/store";
import Fonts from "src/theme/fonts";

function Dashboard({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Fonts />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default wrapper.withRedux(Dashboard);
