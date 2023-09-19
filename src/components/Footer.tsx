import { Box, Text, Image, Flex } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box as="footer" bg="gray.50">
            <Box
                bg="brand.200"
                py={{ base: "8", md: "10" }}
                maxW="1440px"
                margin="0 auto"
            >
                <Flex
                    align="center"
                    justify={{ base: "center", md: "space-around" }}
                    flexDir={{ base: "column", md: "row" }}
                    gap={4}
                >
                    <Image
                        src="/images/camomile-logo2.svg"
                        width={{ base: "150px", lg: "220px" }}
                    />
                    <Text fontSize="small">&copy; 2021 Copyright</Text>
                </Flex>
            </Box>
        </Box>
    );
};
export default Footer;
