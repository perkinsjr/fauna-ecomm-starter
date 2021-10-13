import { Box, Flex } from "@chakra-ui/react";
import { NavContent } from "./NavContent";
export const Container = ({ children }) => {
    return (
        <Box minHeight="480px">
            <Box as="header" height="16" position="relative">
                <Box
                    height="100%"
                    maxW="7xl"
                    mx="auto"
                    ps={{ base: "6", md: "8" }}
                    pe={{ base: "5", md: "0" }}
                >
                    <Flex
                        as="nav"
                        aria-label="Site navigation"
                        align="center"
                        justify="space-between"
                        height="100%"
                    >
                        <Box></Box>
                        <NavContent.Desktop display={{ base: 'none', md: 'flex' }} />
                        <NavContent.Mobile display={{ base: 'flex', md: 'none' }} />
                    </Flex>
                </Box>
            </Box>
            {children}
        </Box>
    );
};
