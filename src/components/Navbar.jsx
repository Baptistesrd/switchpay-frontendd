import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Docs", to: "/docs" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar({ onRefresh, lastUpdated }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <MotionBox
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex={1000}
        width="100vw"
        bg={isScrolled ? "rgba(10,10,20,0.85)" : "transparent"}
        backdropFilter={isScrolled ? "blur(12px)" : "none"}
        boxShadow="none"
        borderBottom="1px solid"
        borderColor={isScrolled ? "rgba(255,255,255,0.06)" : "transparent"}
        sx={{
          transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Flex
          align="center"
          px={{ base: 6, md: 16 }}
          py={4}
          width="100%"
        >
          {/* Logo */}
          <Text
            as={Link}
            to="/"
            fontWeight="extrabold"
            fontSize="lg"
            letterSpacing="wide"
            bgGradient="linear(to-r, #60a5fa, #a78bfa)"
            bgClip="text"
            _hover={{ textDecoration: "none", opacity: 0.85 }}
            transition="opacity 0.2s ease"
            flexShrink={0}
          >
            SwitchPay
          </Text>

          {/* Center nav links — desktop only */}
          <HStack
            spacing={8}
            display={{ base: "none", md: "flex" }}
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
          >
            {NAV_LINKS.map(({ label, to }) => (
              <Text
                key={label}
                as={Link}
                to={to}
                fontSize="sm"
                color="gray.400"
                _hover={{ color: "white", textDecoration: "none" }}
                transition="color 0.2s ease"
              >
                {label}
              </Text>
            ))}
          </HStack>

          {/* Spacer pushes CTAs to the right */}
          <Box flex="1" />

          {/* CTA buttons — desktop only */}
          <HStack spacing={3} display={{ base: "none", md: "flex" }}>
            <Button
              as={Link}
              to="/app"
              variant="ghost"
              size="sm"
              color="gray.300"
              _hover={{ bg: "whiteAlpha.200", color: "white" }}
              transition="all 0.2s ease"
            >
              Log in
            </Button>
            <Button
              as={Link}
              to="/app"
              size="sm"
              bgGradient="linear(to-r, #2563eb, #7c3aed)"
              color="white"
              borderRadius="md"
              _hover={{ filter: "brightness(1.15)" }}
              _active={{ transform: "scale(0.97)" }}
              transition="all 0.2s ease"
            >
              Get started
            </Button>
          </HStack>

          {/* Hamburger — mobile only */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            size="sm"
            color="whiteAlpha.800"
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            _hover={{ bg: "whiteAlpha.200" }}
          />
        </Flex>
      </MotionBox>

      {/* Mobile Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DrawerContent
          bg="gray.900"
          borderRight="1px solid"
          borderColor="whiteAlpha.100"
          color="white"
          maxW="260px"
        >
          <DrawerCloseButton color="whiteAlpha.700" mt={1} />
          <DrawerHeader>
            <Text
              bgGradient="linear(to-r, #60a5fa, #a78bfa)"
              bgClip="text"
              fontWeight="extrabold"
              fontSize="lg"
              letterSpacing="wide"
            >
              SwitchPay
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={3} align="stretch" mt={2}>
              {NAV_LINKS.map(({ label, to }) => (
                <Text
                  key={label}
                  as={Link}
                  to={to}
                  onClick={onClose}
                  fontSize="sm"
                  color="gray.400"
                  py={2}
                  px={3}
                  borderRadius="md"
                  _hover={{
                    color: "white",
                    bg: "whiteAlpha.100",
                    textDecoration: "none",
                  }}
                  transition="all 0.2s ease"
                >
                  {label}
                </Text>
              ))}

              <Box pt={4} borderTop="1px solid" borderColor="whiteAlpha.100">
                <VStack spacing={3}>
                  <Button
                    as={Link}
                    to="/app"
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    width="full"
                    color="gray.300"
                    _hover={{ bg: "whiteAlpha.200", color: "white" }}
                    transition="all 0.2s ease"
                  >
                    Log in
                  </Button>
                  <Button
                    as={Link}
                    to="/app"
                    onClick={onClose}
                    size="sm"
                    width="full"
                    bgGradient="linear(to-r, #2563eb, #7c3aed)"
                    color="white"
                    borderRadius="md"
                    _hover={{ filter: "brightness(1.15)" }}
                    _active={{ transform: "scale(0.97)" }}
                    transition="all 0.2s ease"
                  >
                    Get started
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
