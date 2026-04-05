import {
  Box,
  Flex,
  Heading,
  Spacer,
  HStack,
  IconButton,
  Tooltip,
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
import { RepeatIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar({ onRefresh, lastUpdated }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 10);
    });
  }, [scrollY]);

  const MotionBox = motion(Box);

  return (
    <MotionBox
      position="sticky"
      top="0"
      zIndex="1000"
      bg={isScrolled ? "rgba(13,17,23,0.9)" : "rgba(13,17,23,0.7)"}
      backdropFilter="saturate(180%) blur(20px)"
      borderBottom="1px solid rgba(255,255,255,0.08)"
      transition="all 0.3s ease"
      boxShadow={isScrolled ? "0 0 30px rgba(0,0,0,0.3)" : "none"}
    >
      <Flex
        align="center"
        px={{ base: 4, md: 8 }}
        py={isScrolled ? 3 : 4}
        maxW="7xl"
        mx="auto"
        transition="padding 0.3s ease"
      >
        <Heading
          as={Link}
          to="/"
          size="md"
          fontWeight="extrabold"
          _hover={{ textDecoration: "none" }}
        >
          <Text
            as="span"
            bgGradient="linear(to-r, #60a5fa, #a78bfa)"
            bgClip="text"
            letterSpacing="wide"
          >
            switchpay
          </Text>
        </Heading>

        <Spacer />

        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          {lastUpdated && (
            <Text fontSize="xs" color="whiteAlpha.400" userSelect="none">
              Updated {lastUpdated.toLocaleTimeString()}
            </Text>
          )}
          <Tooltip label="Refresh sandbox" hasArrow>
            <IconButton
              aria-label="refresh"
              icon={<RepeatIcon />}
              onClick={() => onRefresh?.()}
              variant="ghost"
              size="md"
              color="whiteAlpha.900"
              _hover={{
                bg: "whiteAlpha.200",
                transform: "scale(1.05)",
              }}
              transition="all 0.2s ease"
            />
          </Tooltip>

          <Button
            as={Link}
            to="/"
            borderRadius="full"
            px={6}
            py={2.5}
            fontWeight="semibold"
            fontSize="sm"
            bgGradient="linear(to-r, #2563eb, #7c3aed)"
            color="white"
            _hover={{
              filter: "brightness(1.2)",
              transform: "translateY(-1px)",
            }}
            _active={{
              transform: "scale(0.97)",
            }}
            transition="all 0.2s ease"
          >
            Home
          </Button>
        </HStack>

        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          color="whiteAlpha.900"
        />
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter="blur(6px)" />
        <DrawerContent
          bgGradient="linear(to-b, #0f172a, #1e293b)"
          color="white"
          borderLeft="1px solid rgba(255,255,255,0.1)"
        >
          <DrawerCloseButton color="whiteAlpha.800" mt={2} />
          <DrawerHeader fontWeight="bold" letterSpacing="0.05em">
            Navigation
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={5} align="stretch" mt={4}>
              <Button
                as={Link}
                to="/"
                onClick={onClose}
                borderRadius="full"
                bgGradient="linear(to-r, #2563eb, #7c3aed)"
                color="white"
                fontWeight="semibold"
                _hover={{ filter: "brightness(1.2)" }}
              >
                Home
              </Button>

              <Button
                leftIcon={<RepeatIcon />}
                variant="outline"
                borderColor="whiteAlpha.400"
                color="whiteAlpha.900"
                _hover={{ bg: "whiteAlpha.200" }}
                onClick={() => {
                  onRefresh?.();
                  onClose();
                }}
              >
                Refresh sandbox
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
}
