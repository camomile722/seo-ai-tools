import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function Header() {
    return (
        <>
            <Flex
                py={{ base: "4", md: "10" }}
                bg="gray.50"
                boxShadow="md"
                justifyContent="center"
                gap="4"
                as="header"
            >
                <Image src="/images/chatgpt-logo.png" width="50px" />
                <Text as="h1" fontSize={{ base: "2xl", md: "4xl" }}>
                    SEO AI Tools
                </Text>
            </Flex>
        </>
    );
}

export default Header;
