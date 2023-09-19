import { Box, Flex } from "@chakra-ui/react";

export interface WrapperProps {
    children: React.ReactNode;
}
const Wrapper = ({ children }: WrapperProps) => {
    return <Box p={{ base: "2rem", md: "3rem", lg: "6rem" }}>{children}</Box>;
};

export default Wrapper;
