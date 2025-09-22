// src/components/Navbar.jsx
import {
  Box, Flex, Heading, Spacer, HStack, useColorMode,
  IconButton, Tooltip, useColorModeValue
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, RepeatIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Navbar({ onRefresh }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const borderCol = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      bg={useColorModeValue("rgba(255,255,255,0.75)", "rgba(15,23,42,0.7)")}
      backdropFilter="saturate(200%) blur(15px)"
      borderBottom="1px solid"
      borderColor={borderCol}
    >
      <Flex align="center" px={6} py={4} maxW="7xl" mx="auto">
        <Heading size="md" fontWeight="black">
          switchpay.&nbsp;
          <Box as="span" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text">
            Your Money Matters.
          </Box>
        </Heading>
        <Spacer />
        <HStack spacing={3}>
          <Tooltip label="Refresh">
            <IconButton
              aria-label="refresh"
              icon={<RepeatIcon />}
              onClick={onRefresh}
              variant="ghost"
            />
          </Tooltip>
          <IconButton
            aria-label="toggle theme"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="outline"
            borderRadius="full"
          />
          <Link to="/">
            <Box
              as="button"
              px={6}
              py={2}
              borderRadius="full"
              bgGradient="linear(to-r, brand.500, brand.300)"
              color="white"
              fontWeight="bold"
              _hover={{ filter: "brightness(1.08)" }}
            >
              Home
            </Box>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
