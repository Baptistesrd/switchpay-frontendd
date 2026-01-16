import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  Stack,
  Spacer,
  Button,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Link as ChakraLink,
  Tooltip,
  AspectRatio,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  Input,
  Icon,
  Drawer,
  IconButton,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

import {
  LockIcon,
  CheckCircleIcon,
  TimeIcon,
  ExternalLinkIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { motion, useMotionValue, animate } from "framer-motion";
import { useNavigate, Link, Link as RouterLink } from "react-router-dom";
import axios from "axios";

import BackgroundFX from "../components/BackgroundFX";
import AnimatedParticles from "../components/AnimatedParticles";
import GlowBlob from "../components/GlowBlob";
import GlowCard from "../components/GlowCard";
import HowItWorksTimeline from "../components/HowItWorksTimeline";
import Layout from "../components/Layout";
import AnimatedChat from "../components/AnimatedChat";
import PaymentStackMap from "../components/PaymentStackMap";

// === Motion wrappers ===
const MotionBox = motion(Box);

// === Section wrapper (accepts extra props) ===
const Section = ({ children, id, bg, ...rest }) => (
  <Box as="section" id={id} py={{ base: 14, md: 18 }} bg={bg} {...rest}>
    <Container maxW="6xl" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
      {children}
    </Container>
  </Box>
);

// === Magnetic hover (desktop-focused) ===
function Magnetic({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(Math.min(dx * 0.06, 10), -10));
    y.set(Math.max(Math.min(dy * 0.06, 10), -10));
  };

  const handleLeave = () => {
    animate(x, 0, { duration: 0.25 });
    animate(y, 0, { duration: 0.25 });
  };

  return (
    <motion.div style={{ x, y }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </motion.div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);

  // ======================
  // WAITLIST STATE
  // ======================
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [waitlistError, setWaitlistError] = useState("");

  const submitWaitlist = async () => {
    if (!waitlistEmail) return;

    setWaitlistLoading(true);
    setWaitlistError("");

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/waitlist`, {
        email: waitlistEmail,
      });
      setWaitlistSuccess(true);
      setWaitlistEmail("");
    } catch {
      setWaitlistError("Error. Try again.");
    } finally {
      setWaitlistLoading(false);
    }
  };

  // ======================
  // THEME
  // ======================
  const pageBg = useColorModeValue(
    "linear(to-b, #f7faff, #eef3ff, #eaf0ff)",
    "linear(to-b, #0a0f1f, #0f172a, #0b1220)"
  );
  const subText = useColorModeValue("gray.600", "gray.300");
  const borderCol = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  const cardBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.100");
  const cardBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  const buttonBorder = useColorModeValue("blackAlpha.400", "whiteAlpha.400");
  const buttonHoverBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const buttonColor = useColorModeValue("gray.800", "white");

  const premiumBg = useColorModeValue(
    "linear(to-b, white, yellow.50)",
    "linear(to-b, gray.900, yellow.900)"
  );

  // ======================
  // METRICS
  // ======================
  const [metrics, setMetrics] = useState({
    total_transactions: 0,
    total_volume: 0,
    transactions_by_psp: {},
  });

  // ======================
  // SCROLL
  // ======================
  const [navProgress, setNavProgress] = useState(0);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/metrics`);
        setMetrics(res.data);
      } catch {
        // silent
      }
    };

    fetchMetrics();
    const intervalId = setInterval(fetchMetrics, 8000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let raf = 0;

    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const hero = document.getElementById("hero");
        if (!hero) {
          setNavProgress(0);
          return;
        }
        const rect = hero.getBoundingClientRect();
        const height = rect.height || 1;
        const progress = Math.min(1, Math.max(0, -rect.top / height));
        setNavProgress(progress);

        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        setShowFloatingCTA(scrollTop > 100);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;

    const offset = 72; // better on mobile
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const toggleMenu = () => {
    if (isOpen) onClose();
    else onOpen();
  };

  return (
    <Layout>
      <Box position="relative" overflowX="hidden" bgGradient={pageBg} minH="100vh">
        <BackgroundFX />

        {/* NAVBAR */}
        <Flex
          as="nav"
          position="fixed"
          top={{ base: "12px", md: "20px" }}
          left="50%"
          w={{ base: "calc(100% - 24px)", md: "100%" }}
          maxW="6xl"
          transform={`translateX(-50%) translateY(${(-navProgress * 140).toFixed(2)}px)`}
          opacity={1 - navProgress}
          pointerEvents={navProgress >= 1 ? "none" : "auto"}
          transition="opacity .35s ease, transform .35s ease"
          willChange="transform, opacity"
          zIndex="100"
          bg="rgba(20,25,45,0.65)"
          backdropFilter="saturate(180%) blur(18px)"
          border="1px solid"
          borderColor="rgba(255,255,255,0.1)"
          borderRadius="full"
          px={{ base: 4, md: 6 }}
          py={{ base: 2.5, md: 3 }}
          align="center"
          gap={3}
        >
          <Heading
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="black"
            color="white"
            lineHeight="1"
            whiteSpace="nowrap"
          >
            switchpay
          </Heading>

          <Spacer />

          {/* Desktop links */}
          <HStack spacing={6} display={{ base: "none", md: "flex" }} color="whiteAlpha.900">
            <ChakraLink as={RouterLink} to="/docs" _hover={{ color: "brand.500" }}>
              Documentation
            </ChakraLink>

            <ChakraLink as="button" onClick={() => scrollTo("#how")} _hover={{ color: "brand.500" }}>
              How it works
            </ChakraLink>

            <ChakraLink as="button" onClick={() => scrollTo("#why")} _hover={{ color: "brand.500" }}>
              Why switchpay
            </ChakraLink>

            <ChakraLink
              as="button"
              onClick={() => scrollTo("#security")}
              _hover={{ color: "brand.500" }}
            >
              Security
            </ChakraLink>

            <ChakraLink as="button" onClick={() => scrollTo("#pricing")} _hover={{ color: "brand.500" }}>
              Pricing
            </ChakraLink>

            <ChakraLink as={RouterLink} to="/contact" _hover={{ color: "brand.500" }}>
              Contact
            </ChakraLink>
          </HStack>

          <Spacer display={{ base: "none", md: "block" }} />

          {/* Desktop CTA */}
          <Box display={{ base: "none", md: "block" }}>
            <HStack spacing={3}>
              <Button
                onClick={() => navigate("/app")}
                px={7}
                py={3.5}
                fontSize="md"
                fontWeight="700"
                bgGradient="linear(to-r, #06b6d4, #7c3aed, #ec4899)"
                color="white"
                borderRadius="full"
              >
                Try the sandbox
              </Button>

              <Button
                variant="outline"
                borderColor="brand.400"
                color="brand.400"
                onClick={() => scrollTo("#waitlist")}
              >
                Join waitlist
              </Button>
            </HStack>
          </Box>

          {/* Mobile burger */}
          <Box display={{ base: "block", md: "none" }}>
            <motion.div initial={false} animate={isOpen ? "open" : "closed"}>
              <IconButton
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                icon={
                  <motion.div
                    variants={{ closed: { rotate: 0 }, open: { rotate: 90 } }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {isOpen ? (
                      <Box position="relative" w="22px" h="22px">
                        <motion.span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            width: "100%",
                            height: "2px",
                            backgroundColor: "white",
                            borderRadius: "1px",
                            transform: "translateY(-50%) rotate(45deg)",
                          }}
                        />
                        <motion.span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            width: "100%",
                            height: "2px",
                            backgroundColor: "white",
                            borderRadius: "1px",
                            transform: "translateY(-50%) rotate(-45deg)",
                          }}
                        />
                      </Box>
                    ) : (
                      <HamburgerIcon boxSize={6} />
                    )}
                  </motion.div>
                }
                variant="ghost"
                color="white"
                fontSize="2xl"
                onClick={toggleMenu}
                _hover={{ transform: "scale(1.06)", color: "brand.400" }}
                transition="all .25s ease"
              />
            </motion.div>
          </Box>

          {/* Drawer */}
          <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay bg="rgba(0, 0, 0, 0.45)" backdropFilter="blur(12px)" />
            <DrawerContent
              bgGradient="linear(to-b, rgba(10,15,30,0.95), rgba(25,30,60,0.9))"
              backdropFilter="blur(18px)"
              borderLeft="1px solid rgba(255,255,255,0.1)"
              boxShadow="0 0 60px rgba(0,0,0,0.5)"
              animation="fadeSlideIn 0.4s ease forwards"
            >
              <DrawerCloseButton color="white" top="24px" right="24px" size="lg" />
              <DrawerHeader
                fontWeight="extrabold"
                fontSize="2xl"
                color="white"
                textAlign="center"
                letterSpacing="-0.02em"
              >
                Menu
              </DrawerHeader>

              <DrawerBody>
                <VStack align="start" spacing={8} mt={10} w="full" color="gray.200">
                  {[
                    { label: "How it works", id: "#how" },
                    { label: "Why switchpay", id: "#why" },
                    { label: "Security", id: "#security" },
                    { label: "Pricing", id: "#pricing" },
                    { label: "Join waitlist", id: "#waitlist" },
                    { label: "Contact", route: "/contact" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.4 }}
                      whileHover={{ x: 8, scale: 1.03 }}
                    >
                      {item.route ? (
                        <ChakraLink
                          as={RouterLink}
                          to={item.route}
                          fontSize="xl"
                          fontWeight="semibold"
                          onClick={onClose}
                          _hover={{ color: "brand.400" }}
                        >
                          {item.label}
                        </ChakraLink>
                      ) : (
                        <ChakraLink
                          as="button"
                          onClick={() => {
                            scrollTo(item.id);
                            onClose();
                          }}
                          fontSize="xl"
                          fontWeight="semibold"
                          _hover={{ color: "brand.400" }}
                        >
                          {item.label}
                        </ChakraLink>
                      )}
                    </motion.div>
                  ))}
                </VStack>

                <Box position="absolute" bottom="40px" left="50%" transform="translateX(-50%)" w="85%">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Button
                      onClick={() => {
                        navigate("/app");
                        onClose();
                      }}
                      w="100%"
                      size="lg"
                      py={6}
                      fontWeight="700"
                      borderRadius="full"
                      fontSize="lg"
                      bgGradient="linear(to-r, #06b6d4, #7c3aed, #ec4899)"
                      bgSize="200% 200%"
                      color="white"
                      boxShadow="0 0 25px rgba(236,72,153,0.3)"
                      _hover={{
                        backgroundPosition: "100% 50%",
                        transform: "translateY(-3px)",
                        boxShadow: "0 0 40px rgba(236,72,153,0.5)",
                      }}
                      transition="all 0.35s ease"
                    >
                      🚀 Make a transaction
                    </Button>
                  </motion.div>
                </Box>
              </DrawerBody>
            </DrawerContent>

            <style>
              {`
                @keyframes fadeSlideIn {
                  from { transform: translateX(30%); opacity: 0; }
                  to { transform: translateX(0); opacity: 1; }
                }
              `}
            </style>
          </Drawer>
        </Flex>

        {/* HERO */}
        <Box as="header" position="relative" pt={{ base: 28, md: 100 }} pb={{ base: 8, md: 10 }}>
          <Box position="absolute" inset={0} zIndex={0}>
            <AnimatedParticles />
            <GlowBlob top="6%" left="65%" size="520px" delay={0.2} />
            <GlowBlob top="58%" left="10%" size="460px" delay={0.6} />
          </Box>

          <Section id="hero">
            <VStack spacing={{ base: 7, md: 12 }} align="center" textAlign="center">
              <Heading
                as="h1"
                textAlign="center"
                fontWeight="extrabold"
                bgGradient="linear(to-r, whiteAlpha.900, gray.400)"
                bgClip="text"
                lineHeight="1.05"
                letterSpacing="-0.03em"
                fontSize={{ base: "3xl", sm: "4xl", md: "6xl", lg: "7xl" }}
                px={{ base: 2, md: 0 }}
                overflowWrap="anywhere"
              >
                Welcome to <br />
                <Box
                  as="span"
                  bgGradient="linear(to-r, cyan.400, purple.500, pink.400)"
                  bgClip="text"
                  animation="gradientShift 6s ease infinite"
                  backgroundSize="200% 200%"
                  display="inline-block"
                >
                  switchpay.
                </Box>
              </Heading>

              <style>
                {`
                  @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                `}
              </style>

              <Heading
                as="h2"
                fontSize={{ base: "xl", sm: "2xl", md: "4xl", lg: "5xl" }}
                fontWeight="800"
                lineHeight="1.08"
                bgGradient="linear(to-r, whiteAlpha.900, gray.400)"
                bgClip="text"
                letterSpacing="-0.02em"
                textAlign="center"
                px={{ base: 2, md: 0 }}
              >
                Don’t let one PSP decide your success.
              </Heading>

              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={subText}
                maxW={{ base: "95%", md: "3xl" }}
              >
                Stand out from your competitors. Automatically route each payment to the best payment
                service provider based on auth rate, country, currency, fees, and device.{" "}
                <b>More conversions. Lower costs.</b>
              </Text>

              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={{ base: 2, sm: 6 }}
                mt={{ base: 0, md: -4 }}
                justify="center"
                align="center"
              >
                <HStack spacing={2}>
                  <CheckCircleIcon color="green.400" />
                  <Text color={subText}>95%+ success (simulated)</Text>
                </HStack>
                <HStack spacing={2}>
                  <TimeIcon color="blue.400" />
                  <Text color={subText}>Latency-aware routing</Text>
                </HStack>
              </Stack>

              {/* CTA (mobile-friendly widths) */}
              <Stack
                spacing={{ base: 3, sm: 4 }}
                direction={{ base: "column", sm: "row" }}
                w="100%"
                justify="center"
                align="center"
                pt={2}
              >
                <Stack direction={{ base: "column", sm: "row" }} spacing={3} w={{ base: "100%", sm: "auto" }}>
                  <Button
                    onClick={() => navigate("/app")}
                    w={{ base: "100%", sm: "auto" }}
                    px={7}
                    py={3.5}
                    fontSize="md"
                    fontWeight="700"
                    bgGradient="linear(to-r, #06b6d4, #7c3aed, #ec4899)"
                    color="white"
                    borderRadius="full"
                  >
                    Try the sandbox
                  </Button>

                  <Button
                    variant="outline"
                    borderColor="brand.400"
                    color="brand.400"
                    onClick={() => scrollTo("#waitlist")}
                    w={{ base: "100%", sm: "auto" }}
                  >
                    Join waitlist
                  </Button>
                </Stack>

                <Button
                  variant="outline"
                  borderColor="brand.400"
                  color="brand.400"
                  rightIcon={<ExternalLinkIcon />}
                  onClick={() => scrollTo("#how")}
                  w={{ base: "100%", sm: "auto" }}
                >
                  See how it works
                </Button>
              </Stack>

              <GlowCard
                flex="1"
                p={{ base: 5, md: 10 }}
                w="100%"
                maxW="5xl"
                mt={{ base: 8, md: 20 }}
                position="relative"
                borderRadius="2xl"
                bg="rgba(255,255,255,0.04)"
                backdropFilter="blur(20px)"
                overflow="hidden"
                border="1px solid rgba(255,255,255,0.08)"
                boxShadow="0 0 60px rgba(0,0,0,0.1)"
              >
                <Box
                  position="absolute"
                  top="-20%"
                  left="-10%"
                  w="150%"
                  h="150%"
                  bgGradient="radial(circle at center, rgba(0,255,255,0.12), transparent 70%)"
                  animation="pulse 6s ease-in-out infinite"
                  filter="blur(80px)"
                  zIndex={0}
                />

                <VStack align="stretch" spacing={5} position="relative" zIndex={1}>
                  <VStack spacing={4} align="center">
                    <Text
                      fontWeight="semibold"
                      fontSize="sm"
                      color="gray.400"
                      textTransform="uppercase"
                      letterSpacing="0.08em"
                      textAlign="center"
                    >
                      Integrated Payment Service Providers
                    </Text>

                    <HStack
                      spacing={{ base: 5, md: 10 }}
                      flexWrap="wrap"
                      justify="center"
                      opacity={0.9}
                    >
                      {[
                        { src: "/Stripe_Logo,_revised_2016.svg.png", alt: "Stripe" },
                        { src: "/Adyen_Corporate_Logo.svg.png", alt: "Adyen" },
                        { src: "/Airwallex_Logo_-_Black.png", alt: "Airwallex" },
                        { src: "/Wise2020.svg", alt: "Wise" },
                        { src: "/Rapyd-logo-768x236.webp", alt: "Rapyd" },
                        { src: "/PayPal.svg.png", alt: "PayPal" },
                      ].map((psp, i) => (
                        <Box
                          key={i}
                          as="img"
                          src={psp.src}
                          alt={psp.alt}
                          maxW={{ base: "56px", sm: "70px", md: "90px" }}
                          h="auto"
                          objectFit="contain"
                          opacity={0.75}
                          transition="all 0.3s ease"
                          filter="drop-shadow(0 0 6px rgba(0,255,255,0.1))"
                          _hover={{
                            opacity: 1,
                            transform: "translateY(-2px) scale(1.03)",
                            filter: "drop-shadow(0 0 10px rgba(0,255,255,0.3))",
                          }}
                        />
                      ))}
                    </HStack>
                  </VStack>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 6 }}>
                    <Feature label="Higher auth rates" />
                    <Feature label="Lower fees" />
                    <Feature label="Geo coverage" />
                    <Feature label="Failover routing" />
                  </SimpleGrid>
                </VStack>

                <style>
                  {`
                    @keyframes pulse {
                      0%,100% { opacity: 0.5; transform: scale(1); }
                      50% { opacity: 0.9; transform: scale(1.05); }
                    }
                  `}
                </style>
              </GlowCard>
            </VStack>
          </Section>
        </Box>

        {/* HOW IT WORKS */}
        <Section id="how" position="relative" pb={{ base: 20, md: 32 }} pt={{ base: 16, md: 24 }} overflow="hidden">
          <Box
            position="absolute"
            top="10%"
            left="50%"
            transform="translateX(-50%)"
            w={{ base: "360px", md: "500px" }}
            h={{ base: "360px", md: "500px" }}
            bgGradient="radial(circle at center, rgba(0,255,255,0.06), transparent 70%)"
            filter="blur(120px)"
            opacity={0.5}
            zIndex={0}
          />

          <VStack align="center" spacing={6} position="relative" zIndex={1} w="100%">
            <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="extrabold" textAlign="center" color="white">
              How it works
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color="gray.400" textAlign="center" maxW="2xl" px={{ base: 2, md: 6 }}>
              switchpay routes your payments intelligently, instantly, and with precision.
            </Text>

            <Box w="100%" mt={{ base: 2, md: 0 }}>
              <HowItWorksTimeline />
              <Box w="100%" mt={{ base: 8, md: 10 }}>
                <PaymentStackMap />
              </Box>
            </Box>
          </VStack>
        </Section>

        {/* PRODUCT DEMO */}
        <Section
          id="demo"
          bg={useColorModeValue("linear(to-r, white, blue.50)", "linear(to-r, gray.900, gray.800)")}
          pt={{ base: 20, md: 32 }}
          pb={{ base: 20, md: 32 }}
        >
          <VStack spacing={{ base: 10, md: 16 }} align="center" textAlign="center" position="relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Heading size="2xl" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text">
                Product Demo
              </Heading>
              <Text mt={3} fontSize={{ base: "md", md: "lg" }} color={subText} maxW="2xl" mx="auto" px={{ base: 2, md: 0 }}>
                See SwitchPay in action. Real-time routing. Real savings.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              style={{
                width: "100%",
                maxWidth: "1000px",
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 60px rgba(35, 104, 245, 0.45)",
              }}
            >
              <Box position="absolute" inset={-1} borderRadius="24px" pointerEvents="none" boxShadow="0 0 80px rgba(35, 104, 245, 0.6)" />

              <AspectRatio ratio={16 / 9} w="100%">
                <Box position="relative">
                  <video
                    ref={videoRef}
                    src="switchpay-demo.mp4"
                    poster="/demo-thumbnail.jpg"
                    title="switchpay Demo"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(1.1) contrast(1.05)",
                      borderRadius: "24px",
                    }}
                  />

                  <MotionBox
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bgGradient="linear(to-t, rgba(0,0,0,0.3), rgba(0,0,0,0))"
                    opacity={0}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontSize="4xl"
                    fontWeight="bold"
                  />

                  <motion.button
                    onClick={() => {
                      const video = videoRef.current;
                      if (!video) return;
                      video.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.07, boxShadow: "0 0 15px rgba(35, 104, 245, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      right: "1rem",
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backdropFilter: "blur(10px) saturate(180%)",
                      background: "rgba(35, 104, 245, 0.15)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "white",
                      fontSize: "20px",
                      transition: "all 0.25s ease",
                    }}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    <motion.span
                      key={isMuted ? "off" : "on"}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMuted ? "🔇" : "🔊"}
                    </motion.span>
                  </motion.button>
                </Box>
              </AspectRatio>
            </motion.div>

            <Stack direction={{ base: "column", sm: "row" }} spacing={4} w="100%" justify="center" pt={{ base: 0, md: 2 }}>
              <Button
                onClick={() => navigate("/app")}
                w={{ base: "100%", sm: "auto" }}
                px={10}
                py={6}
                fontSize="lg"
                fontWeight="700"
                letterSpacing="0.02em"
                textTransform="none"
                bgGradient="linear(to-r, #06b6d4, #7c3aed, #ec4899)"
                bgSize="200% 200%"
                color="white"
                borderRadius="full"
                transition="all 0.3s ease"
                _hover={{
                  backgroundPosition: "100% 50%",
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 25px rgba(236, 72, 153, 0.4)",
                }}
              >
                Try switchpay now
              </Button>

              <Button
                variant="outline"
                size="lg"
                borderColor="brand.400"
                color="brand.400"
                rightIcon={<ExternalLinkIcon />}
                w={{ base: "100%", sm: "auto" }}
                onClick={() => window.open("https://youtu.be/IjdUfmRmKAo", "_blank")}
              >
                Watch full demo on YouTube
              </Button>
            </Stack>
          </VStack>
        </Section>

        <Box h={{ base: "80px", md: "140px" }} />

        {/* WHY SWITCHPAY */}
        <Section
          id="why"
          bg={useColorModeValue("linear(to-b, gray.50, purple.50)", "linear(to-b, gray.800, gray.900)")}
        >
          <VStack align="start" spacing={8}>
            <Heading size="xl">Why switchpay</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%">
              <ValueCard
                title="Plug & Play"
                text="Integrate in minutes. A ready-to-use backend (FastAPI) and frontend (React) built for fast iteration and seamless scaling."
              />
              <ValueCard
                title="Idempotency by design"
                text="Never lose sleep over duplicate payments. Every request is safe: same key for same response, always."
              />
              <ValueCard
                title="Observability"
                text="Track what matters. Get real-time KPIs, transaction volumes, and PSP distribution straight from metrics."
              />
            </SimpleGrid>
          </VStack>
        </Section>

        {/* AI ASSISTANT */}
        <Section id="assistant" py={{ base: 18, md: 28 }} bg={pageBg}>
          <VStack spacing={{ base: 10, md: 14 }} align="center" textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="800"
              lineHeight="1.05"
              bgGradient="linear(to-r, whiteAlpha.900, gray.400)"
              bgClip="text"
              letterSpacing="-0.02em"
              textAlign="center"
              px={{ base: 2, md: 0 }}
            >
              Meet switchpayAI
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color={subText} maxW="2xl" lineHeight="1.5" px={{ base: 2, md: 0 }}>
              Your AI copilot for payments. Ask about routing, PSPs, fees or integrations, and get instant answers powered by real-time data.
            </Text>

            <AnimatedChat />

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} maxW="6xl" w="100%">
              {[
                { title: "Interactive Docs", text: "Live API snippets you can copy-paste directly into your code." },
                { title: "Real-time Data", text: "Up-to-date PSP fees & routing logic integrated into your workflow." },
                { title: "Dev-Friendly", text: "Guides, examples & SDKs for a seamless integration journey." },
              ].map((f, i) => (
                <GlowCard key={i} p={{ base: 6, md: 8 }} bg={cardBg} border="1px solid" borderColor={cardBorder} shadow="md">
                  <Heading size="md" mb={3}>
                    {f.title}
                  </Heading>
                  <Text color={subText}>{f.text}</Text>
                </GlowCard>
              ))}
            </SimpleGrid>

            <Button
              size="lg"
              w={{ base: "100%", sm: "auto" }}
              px={10}
              py={6}
              borderRadius="full"
              bg="transparent"
              border="1px solid"
              borderColor={buttonBorder}
              backdropFilter="blur(20px) saturate(180%)"
              color={buttonColor}
              fontWeight="semibold"
              _hover={{ bg: buttonHoverBg, transform: "scale(1.03)" }}
              transition="all .3s ease"
              onClick={() => scrollTo("#pricing")}
            >
              🚀 Launch Assistant
            </Button>
          </VStack>

          <Box h={{ base: "80px", md: "140px" }} />
        </Section>

        {/* SECURITY */}
        <Section
          id="security"
          bg={useColorModeValue("linear(to-r, gray.50, white)", "linear(to-r, gray.900, gray.800)")}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} alignItems="center">
            <VStack align="start" spacing={6}>
              <Heading size="xl">Security & Reliability</Heading>
              <Text color={subText}>
                Start with simulated PSPs and switch seamlessly to real providers (Stripe, Adyen, Wise…) when you’re ready.
              </Text>
              <HStack spacing={3} flexWrap="wrap">
                <Badge colorScheme="green" px={3} py={1} borderRadius="full">
                  <LockIcon mr={1} /> API Key
                </Badge>
                <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                  Idempotency
                </Badge>
                <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
                  Metrics
                </Badge>
              </HStack>
            </VStack>

            <GlowCard>
              <VStack align="stretch" spacing={4}>
                <Heading size="md">Next steps</Heading>
                <RoadmapItem text="Connect your first sandbox (e.g. Stripe PaymentIntent)." />
                <RoadmapItem text="Enable retry & failover with PSP fallback." />
                <RoadmapItem text="Optimize routing score." />
              </VStack>
            </GlowCard>
          </SimpleGrid>
        </Section>

        {/* WAITLIST */}
        <Section id="waitlist">
          <VStack spacing={6} align="center" textAlign="center">
            <Heading size="xl">Join the waitlist</Heading>

            {!waitlistSuccess ? (
              <>
                <Input
                  placeholder="you@company.com"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  maxW="420px"
                  w="100%"
                />

                <Button onClick={submitWaitlist} isLoading={waitlistLoading} w={{ base: "100%", sm: "auto" }}>
                  Join the waitlist
                </Button>

                {waitlistError && <Text color="red.400">{waitlistError}</Text>}
              </>
            ) : (
              <Text>You're on the list 🚀</Text>
            )}
          </VStack>
        </Section>

        {/* PRICING */}
        <Section
          id="pricing"
          bg={useColorModeValue("linear(to-b, white, gray.50)", "linear(to-b, gray.900, gray.800)")}
        >
          <VStack spacing={10} align="center" textAlign="center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="800"
                lineHeight="1.1"
                bgGradient="linear(to-r, whiteAlpha.900, gray.400)"
                bgClip="text"
                letterSpacing="-0.02em"
                textAlign="center"
                px={{ base: 2, md: 0 }}
              >
                Simple and transparent pricing.
              </Heading>

              <Text fontSize={{ base: "md", md: "lg" }} color={subText} px={{ base: 2, md: 0 }}>
                Start for free. Scale without limits. Only pay for real value.
              </Text>
            </motion.div>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="100%" maxW="6xl">
              {[
                {
                  title: "Starter",
                  price: "Free",
                  desc: "For indie devs & startups testing payments.",
                  features: ["100 tx/month", "Sandbox PSPs", "Basic metrics"],
                  highlight: false,
                  premium: false,
                },
                {
                  title: "Growth",
                  price: "€99/mo",
                  desc: "For scaling teams optimizing conversion.",
                  features: ["10k tx/month", "Smart routing", "switchpayAI Assistant", "Advanced dashboard"],
                  highlight: true,
                  premium: false,
                },
                {
                  title: "Enterprise",
                  price: "Custom",
                  desc: "For global players needing reliability at scale.",
                  features: ["Unlimited tx", "Dedicated PSP mix", "24/7 support", "SLAs & compliance"],
                  highlight: false,
                  premium: true,
                },
              ].map((tier, i) => (
                <GlowCard
                  key={i}
                  p={{ base: 6, md: 8 }}
                  borderWidth={tier.highlight ? "2px" : "1px"}
                  borderColor={
                    tier.premium ? "yellow.400" : tier.highlight ? "brand.400" : borderCol
                  }
                  transition="all 0.35s ease"
                  _hover={{
                    transform: { base: "none", md: "scale(1.04)" },
                    boxShadow: tier.premium
                      ? "0 0 50px rgba(255, 215, 0, 0.35)"
                      : tier.highlight
                      ? "0 0 40px rgba(123, 63, 252, 0.3)"
                      : "0 0 25px rgba(35,104,245,0.2)",
                  }}
                  display="flex"
                  flexDirection="column"
                  bg={tier.premium ? premiumBg : "inherit"}
                >
                  <VStack spacing={4} flex="1" align="stretch">
                    <Badge
                      alignSelf="center"
                      colorScheme={tier.premium ? "yellow" : tier.highlight ? "purple" : "gray"}
                      variant={tier.premium ? "solid" : tier.highlight ? "solid" : "subtle"}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {tier.title}
                    </Badge>

                    <Heading size="2xl" textAlign="center">
                      {tier.price}
                    </Heading>

                    <Text color={subText} mb={2} textAlign="center">
                      {tier.desc}
                    </Text>

                    <VStack spacing={2} align="start" flex="1">
                      {tier.features.map((f, idx) => (
                        <HStack key={idx} spacing={2}>
                          <CheckCircleIcon color={tier.premium ? "yellow.400" : "green.400"} />
                          <Text>{f}</Text>
                        </HStack>
                      ))}
                    </VStack>

                    <Spacer />

                    <Magnetic>
                      <Button
                        mt={4}
                        w="100%"
                        px={10}
                        py={5}
                        fontSize="md"
                        fontWeight="700"
                        textTransform="none"
                        letterSpacing="0.02em"
                        borderRadius="full"
                        color="white"
                        bgGradient={
                          tier.premium
                            ? "linear(to-r, #facc15, #f59e0b, #d97706)"
                            : "linear(to-r, #06b6d4, #7c3aed, #ec4899)"
                        }
                        bgSize="200% 200%"
                        transition="all 0.35s ease"
                        boxShadow={
                          tier.premium
                            ? "0 0 25px rgba(245, 158, 11, 0.35)"
                            : "0 0 25px rgba(236, 72, 153, 0.25)"
                        }
                        _hover={{
                          backgroundPosition: "100% 50%",
                          transform: { base: "none", md: "translateY(-2px) scale(1.03)" },
                          filter: "brightness(1.06)",
                        }}
                        onClick={() => {
                          if (tier.price === "Custom") navigate("/contact");
                          else scrollTo("#waitlist");
                        }}
                      >
                        {tier.price === "Custom" ? "Contact us" : "Join waitlist"}
                      </Button>
                    </Magnetic>
                  </VStack>
                </GlowCard>
              ))}
            </SimpleGrid>
          </VStack>
        </Section>

        {/* CTA */}
        <Section id="cta">
          <GlowCard
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ base: "stretch", md: "center" }}
            gap={{ base: 6, md: 0 }}
            p={{ base: 7, md: 12 }}
          >
            <VStack align="start" spacing={3} flex="1">
              <Heading size="lg">Start routing smarter, today.</Heading>
              <Text color={subText}>Jump into the app and create your first transaction.</Text>
            </VStack>

            <Spacer display={{ base: "none", md: "block" }} />

            <Magnetic>
              <Stack direction={{ base: "column", sm: "row" }} spacing={3} w={{ base: "100%", md: "auto" }}>
                <Button
                  onClick={() => navigate("/app")}
                  w={{ base: "100%", sm: "auto" }}
                  px={7}
                  py={3.5}
                  fontSize="md"
                  fontWeight="700"
                  bgGradient="linear(to-r, #06b6d4, #7c3aed, #ec4899)"
                  color="white"
                  borderRadius="full"
                >
                  Try the sandbox
                </Button>

                <Button
                  variant="outline"
                  borderColor="brand.400"
                  color="brand.400"
                  w={{ base: "100%", sm: "auto" }}
                  onClick={() => scrollTo("#waitlist")}
                >
                  Join waitlist
                </Button>
              </Stack>
            </Magnetic>
          </GlowCard>

          <Box h={{ base: "80px", md: "140px" }} />
        </Section>

        {/* FAQ */}
        <Section id="faq" bg="linear-gradient(to-b, #0f172a, #1e293b)" color="whiteAlpha.900" py={{ base: 16, md: 20 }}>
          <VStack align="start" spacing={8} maxW="4xl" mx="auto" w="100%">
            <Heading
              size="xl"
              fontWeight="extrabold"
              bgGradient="linear(to-r, #60a5fa, #a78bfa)"
              bgClip="text"
            >
              Everything you need to know
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.700">
              Got questions? We’ve got answers. Everything about SwitchPay, explained.
            </Text>

            <Accordion allowToggle w="100%" borderColor="whiteAlpha.200">
              <AccordionItem border="none">
                <AccordionButton _expanded={{ bg: "whiteAlpha.100" }} px={4} py={3} borderRadius="lg">
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    What exactly does switchpay do?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} color="whiteAlpha.800">
                  switchpay intelligently routes every transaction to the most efficient PSP based on country, currency, fees, and device.
                  Think of it as <strong>“Stripe + Adyen + Rapyd”</strong> behind one adaptive API.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <AccordionButton _expanded={{ bg: "whiteAlpha.100" }} px={4} py={3} borderRadius="lg">
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    How do I try it right now?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} color="whiteAlpha.800">
                  Jump into the <strong>Sandbox</strong> section above.
                  <Box mt={3}>
                    <Button
                      as={Link}
                      to="/app"
                      bgGradient="linear(to-r, #2563eb, #7c3aed)"
                      color="white"
                      borderRadius="full"
                      size="sm"
                      px={5}
                      py={2}
                      _hover={{ filter: "brightness(1.2)" }}
                    >
                      Make a transaction
                    </Button>
                  </Box>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <AccordionButton _expanded={{ bg: "whiteAlpha.100" }} px={4} py={3} borderRadius="lg">
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    Which PSPs are supported today?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} color="whiteAlpha.800">
                  Currently integrated: <strong>Stripe</strong>, <strong>Adyen</strong>, <strong>Wise</strong>, and <strong>Rapyd</strong>.
                  We’re adding <strong>dLocal</strong> and <strong>Checkout.com</strong> next, each with country-specific routing logic.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <AccordionButton _expanded={{ bg: "whiteAlpha.100" }} px={4} py={3} borderRadius="lg">
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    Is switchpay live or just a prototype?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} color="whiteAlpha.800">
                  The current build is a <strong>live sandbox environment</strong> running on FastAPI and React.
                  It’s built for testing: every transaction uses simulated data but real PSP logic.
                  The goal is to demonstrate how a unified routing layer could simplify multi-PSP operations.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <AccordionButton _expanded={{ bg: "whiteAlpha.100" }} px={4} py={3} borderRadius="lg">
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    Can I integrate this into my own app right now?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4} color="whiteAlpha.800">
                  Yes, switchpay is designed as an API-first router. The same logic powering this demo can be embedded in your stack to
                  automatically route payments, minimize fees, and improve success rates across markets.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
        </Section>

        {/* SOCIALS */}
        <Section
          id="socials"
          bg={useColorModeValue("linear(to-r, white, gray.50)", "linear(to-r, gray.800, gray.900)")}
        >
          <GlowCard>
            <Flex align="center" gap={6} wrap="wrap" justify="space-between">
              <VStack align="start" spacing={1}>
                <Heading size="md">Let’s connect</Heading>
                <Text color={subText}>Reach me on your favorite platform.</Text>
              </VStack>

              <HStack spacing={3} flexWrap="wrap">
                <Tooltip label="LinkedIn">
                  <Button
                    as="a"
                    href="https://www.linkedin.com/in/baptiste-sardou-789114288/"
                    target="_blank"
                    rel="noreferrer"
                    leftIcon={<Icon as={FaLinkedin} />}
                    variant="outline"
                  >
                    LinkedIn
                  </Button>
                </Tooltip>

                <Tooltip label="X / Twitter">
                  <Button
                    as="a"
                    href="https://x.com/baptiste_sardou"
                    target="_blank"
                    rel="noreferrer"
                    leftIcon={<Icon as={FaTwitter} />}
                    variant="outline"
                  >
                    X
                  </Button>
                </Tooltip>

                <Tooltip label="Instagram">
                  <Button
                    as="a"
                    href="https://www.instagram.com/baptistesardou/"
                    target="_blank"
                    rel="noreferrer"
                    leftIcon={<Icon as={SiInstagram} />}
                    variant="outline"
                  >
                    Instagram
                  </Button>
                </Tooltip>
              </HStack>
            </Flex>
          </GlowCard>
        </Section>

        {/* FOOTER */}
        <Box as="footer" py={10} borderTop="1px solid" borderColor={borderCol} bg="transparent">
          <Container maxW="6xl" px={{ base: 4, md: 6 }}>
            <Flex align="center" gap={4} wrap="wrap">
              <HStack spacing={3}>
                <Box w="10px" h="10px" borderRadius="full" bgGradient="linear(to-br, brand.400, brand.600)" />
                <Text>© {new Date().getFullYear()} SwitchPay</Text>
              </HStack>

              <Spacer />

              <HStack spacing={4} flexWrap="wrap">
                <ChakraLink as="a" href="https://x.com/baptiste_sardou" isExternal>
                  X
                </ChakraLink>
                <ChakraLink
                  as="a"
                  href="https://www.linkedin.com/in/baptiste-sardou-789114288/"
                  isExternal
                >
                  LinkedIn
                </ChakraLink>
                <ChakraLink as="a" href="https://substack.com/@baptistesardou?utm_source=user-menu" isExternal>
                  Substack
                </ChakraLink>
              </HStack>
            </Flex>
          </Container>
        </Box>

        {/* Optional: tiny mobile floating CTA (kept simple & safe) */}
        {showFloatingCTA && (
          <Box
            position="fixed"
            bottom={{ base: "14px", md: "24px" }}
            left="50%"
            transform="translateX(-50%)"
            zIndex={200}
            w={{ base: "calc(100% - 24px)", sm: "auto" }}
            maxW="520px"
          >
            <GlowCard
              p={3}
              borderRadius="full"
              bg="rgba(20,25,45,0.72)"
              backdropFilter="saturate(180%) blur(18px)"
              border="1px solid rgba(255,255,255,0.10)"
            >
              <Stack direction={{ base: "column", sm: "row" }} spacing={3}>
                <Button
                  onClick={() => navigate("/app")}
                  w={{ base: "100%", sm: "auto" }}
                  bgGradient="linear(to-r, #06b6d4, #7c3aed, #ec4899)"
                  color="white"
                  borderRadius="full"
                >
                  Try the sandbox
                </Button>
                <Button
                  variant="outline"
                  borderColor="brand.400"
                  color="brand.400"
                  w={{ base: "100%", sm: "auto" }}
                  onClick={() => scrollTo("#waitlist")}
                >
                  Join waitlist
                </Button>
              </Stack>
            </GlowCard>
          </Box>
        )}
      </Box>
    </Layout>
  );
}

/* === Helpers === */
function Feature({ label }) {
  const chipBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const chipHoverBg = useColorModeValue("brand.500", "brand.500");
  const chipHoverColor = useColorModeValue("white", "white");

  return (
    <Box
      px={3}
      py={2}
      bg={chipBg}
      borderRadius="full"
      textAlign="center"
      fontWeight="medium"
      transition="all .15s ease"
      border="1px solid"
      borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.300")}
      _hover={{
        bg: chipHoverBg,
        color: chipHoverColor,
        boxShadow: "0 8px 24px rgba(35, 104, 245, .35)",
        transform: "translateY(-1px)",
      }}
    >
      {label}
    </Box>
  );
}

function ValueCard({ title, text }) {
  return (
    <GlowCard>
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>{text}</Text>
    </GlowCard>
  );
}

function RoadmapItem({ text }) {
  return (
    <HStack align="start" spacing={3}>
      <CheckCircleIcon color="green.400" mt="2px" />
      <Text>{text}</Text>
    </HStack>
  );
}

function MiniKpis({ metrics }) {
  return (
    <SimpleGrid columns={3} spacing={3}>
      <Kpi
        label="Volume"
        value={`${Number(metrics.total_volume ?? 0).toLocaleString("fr-FR", {
          maximumFractionDigits: 0,
        })}€`}
      />
      <Kpi label="Tx" value={metrics.total_transactions ?? 0} />
      <Kpi label="PSPs" value={Object.keys(metrics.transactions_by_psp || {}).length} />
    </SimpleGrid>
  );
}

function Kpi({ label, value }) {
  return (
    <Box p={3} borderRadius="lg" bg={useColorModeValue("gray.50", "whiteAlpha.100")} textAlign="center">
      <Text fontSize="xs" opacity={0.7}>
        {label}
      </Text>
      <Heading size="md">{value}</Heading>
    </Box>
  );
}

function StatCard({ label, value }) {
  return (
    <GlowCard>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
      </Stat>
    </GlowCard>
  );
}
