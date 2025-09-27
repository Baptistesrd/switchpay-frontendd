// src/components/Navbar.jsx
import {
  Box,
  Flex,
  Heading,
  Spacer,
  HStack,
  useColorMode,
  IconButton,
  Tooltip,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  SunIcon,
  MoonIcon,
  RepeatIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Navbar({ onRefresh }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 🎨 Couleurs selon mode
  const bg = useColorModeValue("rgba(255,255,255,0.92)", "rgba(15,23,42,0.7)");
  const borderCol = useColorModeValue("gray.300", "whiteAlpha.200");
  const shadow = useColorModeValue(
    "0 2px 6px rgba(0,0,0,0.08)",
    "0 1px 3px rgba(0,0,0,0.5)"
  );

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      bg={bg}
      backdropFilter="saturate(200%) blur(15px)"
      borderBottom="1px solid"
      borderColor={borderCol}
      boxShadow={shadow} // ✅ Ombre subtile pour démarquer en clair
    >
      <Flex align="center" px={6} py={4} maxW="7xl" mx="auto">
        {/* Logo / Title */}
        <Heading size="md" fontWeight="black">
          switchpay.&nbsp;
          <Box
            as="span"
            bgGradient="linear(to-r, brand.500, brand.300)"
            bgClip="text"
          >
            Your Money Matters.
          </Box>
        </Heading>

        <Spacer />

        {/* Desktop actions */}
        <HStack spacing={3} display={{ base: "none", md: "flex" }}>
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

        {/* Mobile hamburger */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          onClick={onOpen}
        />
      </Flex>

      {/* Drawer mobile */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Link to="/" onClick={onClose}>
                <Box
                  as="button"
                  px={6}
                  py={2}
                  w="full"
                  borderRadius="full"
                  bgGradient="linear(to-r, brand.500, brand.300)"
                  color="white"
                  fontWeight="bold"
                  textAlign="center"
                  _hover={{ filter: "brightness(1.08)" }}
                >
                  Home
                </Box>
              </Link>
              <Tooltip label="Refresh">
                <IconButton
                  aria-label="refresh"
                  icon={<RepeatIcon />}
                  onClick={onRefresh}
                  variant="outline"
                  w="full"
                />
              </Tooltip>
              <IconButton
                aria-label="toggle theme"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="outline"
                w="full"
              />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
