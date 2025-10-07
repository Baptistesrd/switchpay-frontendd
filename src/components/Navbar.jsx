import {
  Box,
  Flex,
  Heading,
  Spacer,
  HStack,
  IconButton,
  Tooltip,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, RepeatIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar({ onRefresh }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 🎨 Thème
  const bg = useColorModeValue("rgba(255,255,255,0.9)", "rgba(17,24,39,0.85)");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const shadow = useColorModeValue(
    "0 2px 10px rgba(0,0,0,0.06)",
    "0 2px 10px rgba(0,0,0,0.4)"
  );

  const MotionBox = motion(Box);

  return (
    <MotionBox
      position="sticky"
      top="0"
      zIndex="1000"
      bg={bg}
      backdropFilter="saturate(200%) blur(20px)"
      borderBottom="1px solid"
      borderColor={border}
      boxShadow={shadow}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Flex align="center" px={{ base: 4, md: 8 }} py={4} maxW="7xl" mx="auto">
        {/* Logo */}
        <Heading
          as={Link}
          to="/"
          size="md"
          fontWeight="extrabold"
          _hover={{ textDecoration: "none" }}
        >
          <Text
            as="span"
            bgGradient="linear(to-r, brand.500, brand.300)"
            bgClip="text"
          >
            switchpay
          </Text>{" "}
        </Heading>

        <Spacer />

        {/* Desktop actions */}
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <Tooltip label="Refresh data">
            <IconButton
              aria-label="refresh"
              icon={<RepeatIcon />}
              onClick={onRefresh}
              variant="ghost"
              size="md"
            />
          </Tooltip>

          <Button
  as={Link}
  to="/"
  borderRadius="full"
  px={6}
  py={2.5}
  fontWeight="medium"
  fontSize="sm"
  bg="#007aff" // Apple system blue
  color="white"
  _hover={{
    bg: "#0a84ff", // un peu plus clair au survol
  }}
  _active={{
    bg: "#0066d6", // ton plus profond à la pression
    transform: "scale(0.98)",
  }}
  transition="background 0.15s ease, transform 0.1s ease"
>
  Home
</Button>


        </HStack>

        {/* Mobile */}
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
        />
      </Flex>

      {/* Drawer (mobile) */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            bgGradient="linear(to-r, brand.500, brand.300)"
            color="white"
            borderTopRadius="md"
          >
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              <Button
                as={Link}
                to="/"
                onClick={onClose}
                borderRadius="full"
                bgGradient="linear(to-r, brand.500, brand.300)"
                color="white"
                fontWeight="semibold"
                _hover={{ filter: "brightness(1.1)" }}
              >
                Home
              </Button>

              <Button
                leftIcon={<RepeatIcon />}
                variant="outline"
                onClick={() => {
                  onRefresh();
                  onClose();
                }}
              >
                Refresh
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
}
