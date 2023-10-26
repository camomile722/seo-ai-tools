import { Box } from "@chakra-ui/react";
import Head from "next/head";

import Footer from "./Footer";
import Header from "./Header";

export interface LayoutProps {
    children: React.ReactNode;
    metaTitle: string;
    metaDescription: string;
}

export const Layout = ({
    children,
    metaTitle,
    metaDescription,
}: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{metaTitle} </title>
                <meta name="description" content={metaDescription} />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>

            <Header />

            <Box as="main">{children}</Box>

            <Footer />
        </>
    );
};
