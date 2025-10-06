import React, { useEffect, useState } from "react";
import {
  Box, Container, Flex, HStack, VStack, Stack, Spacer, Button,
  Heading, Text, Badge, SimpleGrid, Stat, StatLabel, StatNumber,
  useColorMode, useColorModeValue, Link as ChakraLink, Tooltip,
  AspectRatio, Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon, Modal, ModalOverlay, ModalContent,
  useDisclosure, Input, Icon,
  Drawer, IconButton, DrawerOverlay, DrawerContent,
  DrawerCloseButton, DrawerHeader, DrawerBody
} from "@chakra-ui/react";


import {
  MoonIcon, SunIcon, LockIcon, CheckCircleIcon,
  TimeIcon, ExternalLinkIcon, HamburgerIcon
} from "@chakra-ui/icons";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
import { motion, useMotionValue, animate } from "framer-motion";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";

import BackgroundFX from "../components/BackgroundFX";
import AnimatedParticles from "../components/AnimatedParticles";
import GlowBlob from "../components/GlowBlob";
import GlowCard from "../components/GlowCard";
import HowItWorksTimeline from "../components/HowItWorksTimeline";
import ChatbotWidget from "../components/ChatbotWidget";
import Layout from "../components/Layout";
import AnimatedChat from "../components/AnimatedChat";
import Counter from "../components/Counter";


// === Motion wrappers ===
const MotionBox = motion(Box);
const FloatingPlanet = motion(Box);

// === Section wrapper ===
const Section = ({ children, id, bg }) => (
  <Box as="section" id={id} py={{ base: 14, md: 18 }} bg={bg}>
    <Container maxW="6xl" position="relative" zIndex={1}>
      {children}
    </Container>
  </Box>
);

// === Button brandé ===
const BrandButton = ({ children, ...props }) => (
  <Button
    size="lg"
    px={8}
    borderRadius="full"
    bgGradient="linear(to-r, brand.500, brand.300)"
    color="white"
    _hover={{ filter: "brightness(1.05)" }}
    {...props}
  >
    {children}
  </Button>
);

// === Effet magnétique (hover) ===
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
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 🎨 THEME HOOKS
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

  // 🌟 Pricing-specific
  const pricingBg = useColorModeValue(
    "linear(to-b, white, gray.50)",
    "linear(to-b, gray.900, gray.800)"
  );
  const premiumBg = useColorModeValue(
    "linear(to-b, white, yellow.50)",
    "linear(to-b, gray.900, yellow.900)"
  );

  // 📊 State
  const [metrics, setMetrics] = useState({
    total_transactions: 0,
    total_volume: 0,
    transactions_by_psp: {},
  });
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [navProgress, setNavProgress] = useState(0);

  // === Fetch metrics ===
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/metrics`);
        setMetrics(res.data);
      } catch {
        // Silent fail
      }
    };

    fetchMetrics();
    const intervalId = setInterval(fetchMetrics, 8000);
    return () => clearInterval(intervalId);
  }, []);

  // === Scroll nav ===
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

  // === Smooth scroll ===
  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // === SECTION PRICING ===
  const tiers = [
    {
      title: "Starter",
      price: "Free",
      desc: "For indie devs & startups testing payments.",
      features: ["100 tx/month", "Sandbox PSPs", "Basic metrics"],
      color: "gray",
      gradient: "linear(to-r, brand.500, brand.300)",
    },
    {
      title: "Growth",
      price: "€99/mo",
      desc: "For scaling teams optimizing conversion.",
      features: ["10k tx/month", "Smart routing", "Failover & retries", "Advanced dashboard"],
      color: "purple",
      gradient: "linear(to-r, brand.500, brand.300)",
    },
    {
      title: "Enterprise",
      price: "Custom",
      desc: "For global players needing reliability at scale.",
      features: ["Unlimited tx", "Dedicated PSP mix", "24/7 support", "SLAs & compliance"],
      color: "yellow",
      gradient: "linear(to-r, yellow.400, yellow.600)",
      premium: true,
    },
  ];

  return (
    <Layout>
      <Box position="relative" overflowX="hidden" bgGradient={pageBg} minH="100vh">
        {/* BACKGROUND FX */}
        <BackgroundFX />

        {/* NAVBAR */}
<Flex
  as="nav"
  position="absolute"
  top="20px"
  left="50%"
  w="100%"
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
  px={6}
  py={3}
  align="center"
  maxW="6xl"
  mx="auto"
>
  {/* Logo */}
  <Heading
    fontSize={{ base: "lg", md: "xl" }}
    fontWeight="black"
    color="white"
  >
    switchpay
  </Heading>

  <Spacer />

  {/* Menu Links (desktop only) */}
  <HStack spacing={6} display={{ base: "none", md: "flex" }}>
    <ChakraLink as="button" onClick={() => scrollTo("#how")} _hover={{ color: "brand.500" }}>
  How it works
</ChakraLink>
<ChakraLink as="button" onClick={() => scrollTo("#why")} _hover={{ color: "brand.500" }}>
  Why SwitchPay
</ChakraLink>
<ChakraLink as="button" onClick={() => scrollTo("#metrics")} _hover={{ color: "brand.500" }}>
  Live Metrics
</ChakraLink>
<ChakraLink as="button" onClick={() => scrollTo("#security")} _hover={{ color: "brand.500" }}>
  Security
</ChakraLink>
<ChakraLink as="button" onClick={() => scrollTo("#pricing")} _hover={{ color: "brand.500" }}>
  Pricing
</ChakraLink>

{/* 🚀 New Docs link */}
<ChakraLink
  as={RouterLink}
  to="/docs"
  _hover={{ color: "brand.500" }}
>
  Docs
</ChakraLink>

<ChakraLink as={RouterLink} to="/contact" _hover={{ color: "brand.500" }}>
  Contact
</ChakraLink>

  </HStack>

  <Spacer />

  {/* CTA desktop */}
  <Box display={{ base: "none", md: "block" }}>
    <Magnetic>
      <BrandButton onClick={() => navigate("/app")}>
        Make a transaction
      </BrandButton>
    </Magnetic>
  </Box>

  {/* Mobile Burger */}
  <Box display={{ base: "block", md: "none" }}>
    <IconButton
      aria-label="Open Menu"
      icon={<HamburgerIcon />}
      variant="ghost"
      color="white"
      fontSize="2xl"
      onClick={onOpen}
    />
  </Box>

  {/* Drawer Mobile Menu */}
  <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay />
    <DrawerContent bg={pageBg}>
      <DrawerCloseButton />
      <DrawerHeader fontWeight="bold">Menu</DrawerHeader>
      <DrawerBody>
        <VStack spacing={6} align="start" mt={4}>
          <ChakraLink onClick={() => scrollTo("#how")}>How it works</ChakraLink>
          <ChakraLink onClick={() => scrollTo("#why")}>Why SwitchPay</ChakraLink>
          <ChakraLink onClick={() => scrollTo("#metrics")}>Live Metrics</ChakraLink>
          <ChakraLink onClick={() => scrollTo("#security")}>Security</ChakraLink>
          <ChakraLink onClick={() => scrollTo("#pricing")}>Pricing</ChakraLink>
          <ChakraLink as={RouterLink} to="/contact">Contact</ChakraLink>
          <BrandButton w="100%" onClick={() => navigate("/app")}>
            🚀 Make a transaction
          </BrandButton>
        </VStack>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
</Flex>




       {/* HERO */}
<Box as="header" position="relative" py={{ base: 20, md: 100 }}>
  {/* Background FX */}
  <Box position="absolute" inset={0} zIndex={0}>
    <AnimatedParticles />
    <GlowBlob top="6%" left="65%" size="520px" delay={0.2} />
    <GlowBlob top="58%" left="10%" size="460px" delay={0.6} />
  </Box>

  <Section id="hero">
    <VStack spacing={{ base: 8, md: 12 }} align="center" textAlign="center">
      {/* Titres */}
      <Heading
        as="h1"
        w="100%"
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl", lg: "8xl" }}
        lineHeight={{ base: "1.2", md: "1.1" }}
        fontWeight="extrabold"
        whiteSpace="normal"
      >
        Welcome to <br /> switchpay.
      </Heading>

      <Heading
        as="h2"
        w="100%"
        fontSize={{ base: "xl", sm: "2xl", md: "4xl", lg: "6xl" }}
        fontWeight="extrabold"
        bgGradient="linear(to-r, brand.500, brand.300)"
        bgClip="text"
        className="shimmer"
        lineHeight="1.1"
      >
        Your money matters.
      </Heading>

      {/* Texte d’accroche */}
      <Text
        fontSize={{ base: "md", md: "lg" }}
        color={subText}
        maxW={{ base: "90%", md: "3xl" }}
      >
        Stand out from your competitors. Automatically route each payment
        to the best payment service provider based on country,
        currency, fees, and device. <b>More conversions. Lower costs.</b>
      </Text>

      {/* Mini-features */}
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={{ base: 3, sm: 6 }}
        pt={2}
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

      {/* CTA */}
<Stack
  spacing={{ base: 3, sm: 4 }}
  direction={{ base: "column", sm: "row" }}
  w="100%"
  justify="center"
  align="center"
>
  <Magnetic>
    <BrandButton
      w={{ base: "100%", sm: "auto" }}
      onClick={() => navigate("/app")}
    >
      Get started for Free
    </BrandButton>
  </Magnetic>
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


      {/* Carte PSP + Features (DANS le HERO) */}
      <GlowCard flex="1" p={6} w="100%" maxW="4xl" mt={{ base: 10, md: 20 }}>
        <VStack align="stretch" spacing={6}>
          {/* Integrated PSPs */}
          <VStack spacing={3} align="center">
            <Text fontWeight="bold" fontSize="md">Integrated PSPs</Text>
            <HStack spacing={6} flexWrap="wrap" justify="center">
              <Box as="img" src="/Stripe_Logo,_revised_2016.svg.png" alt="Stripe" maxW={{ base: "64px", md: "100px" }} h="auto" objectFit="contain" />
              <Box as="img" src="/Adyen_Corporate_Logo.svg.png" alt="Adyen" maxW={{ base: "64px", md: "100px" }} h="auto" objectFit="contain" />
              <Box as="img" src="/Airwallex_Logo_-_Black.png" alt="Airwallex" maxW={{ base: "64px", md: "100px" }} h="auto" objectFit="contain" />
              <Box as="img" src="/Wise2020.svg" alt="Wise" maxW={{ base: "64px", md: "100px" }} h="auto" objectFit="contain" />
              <Box as="img" src="/Rapyd-logo-768x236.webp" alt="Rapyd" maxW={{ base: "64px", md: "100px" }} h="auto" objectFit="contain" />
              <Box as="img" src="/PayPal.svg.png" alt="PayPal" maxW={{ base: "64px", md: "100px" }} h="auto" objectFit="contain" />
            </HStack>
          </VStack>

          {/* Titre Features */}
          <Heading size="md" textAlign="center">What SwitchPay optimizes</Heading>

          {/* Features */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 4 }}>
            <Feature label="Higher auth rates" />
            <Feature label="Lower fees" />
            <Feature label="Geo coverage" />
            <Feature label="Failover routing" />
          </SimpleGrid>
        </VStack>
      </GlowCard>
    </VStack>
  </Section>
</Box>


        {/* HOW IT WORKS */}
        <Section id="how" pb={32}>
          <VStack align="start" spacing={8}>
            <Heading size="xl">How it works</Heading>
            <HowItWorksTimeline />
          </VStack>
        </Section>

        {/* PRODUCT DEMO */}
<Section
  id="demo"
  bg={useColorModeValue(
    "linear(to-r, white, blue.50)",
    "linear(to-r, gray.900, gray.800)"
  )}
  pt={32}
  pb={32}
>
  <VStack spacing={16} align="center" textAlign="center" position="relative">
    {/* Titre animé */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Heading
        size="2xl"
        bgGradient="linear(to-r, brand.500, brand.300)"
        bgClip="text"
      >
        Product Demo
      </Heading>
      <Text mt={3} fontSize="lg" color={subText} maxW="2xl" mx="auto">
        See SwitchPay in action. Real-time routing. Real savings.
      </Text>
    </motion.div>

    {/* Vidéo intégrée avec effet glassmorphism */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      style={{
        width: "100%",
        maxWidth: "1000px",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 0 60px rgba(35, 104, 245, 0.45)",
        position: "relative",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <AspectRatio ratio={16 / 9} w="100%">
        <video
          src="/Streamlining Payments for SMBs with SwitchPay 🚀.mp4"
          title="SwitchPay Demo"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AspectRatio>

      {/* Glow effect autour */}
      <Box
        position="absolute"
        inset={-1}
        borderRadius="24px"
        pointerEvents="none"
        boxShadow="0 0 80px rgba(35, 104, 245, 0.6)"
      />
    </motion.div>

    {/* CTA sous la vidéo */}
    <Stack direction={{ base: "column", sm: "row" }} spacing={6} pt={6}>
      <Button
        size="lg"
        bgGradient="linear(to-r, brand.500, brand.300)"
        color="white"
        _hover={{ filter: "brightness(1.15)" }}
        onClick={() => navigate("/app")}
      >
        Try SwitchPay now
      </Button>
      <Button
        variant="outline"
        size="lg"
        borderColor="brand.400"
        color="brand.400"
        rightIcon={<ExternalLinkIcon />}
        onClick={() =>
          window.open("https://youtu.be/IjdUfmRmKAo", "_blank")
        }
      >
        Watch full demo on YouTube
      </Button>
    </Stack>
  </VStack>




        <Box h={{ base: "140px", md: "220px" }} /> 
</Section>

        {/* WHY SWITCHPAY */}
        <Section id="why" bg={useColorModeValue("linear(to-b, gray.50, purple.50)", "linear(to-b, gray.800, gray.900)")}>
          <VStack align="start" spacing={8}>
            <Heading size="xl">Why SwitchPay</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <ValueCard title="Plug & Play" text="Integrate in minutes. A ready-to-use backend (FastAPI) and frontend (React) built for fast iteration and seamless scaling." />
              <ValueCard title="Idempotency by design" text="Never lose sleep over duplicate payments. Every request is safe: same key for same response, always." />
              <ValueCard title="Observability" text="Track what matters. Get real-time KPIs, transaction volumes, and PSP distribution straight from metrics" />
            </SimpleGrid>
          </VStack>
        </Section>

        {/* LIVE METRICS (Demo KPIs) */}
<Section id="metrics" position="relative" overflow="visible" bg="transparent">
  {/* 🌄 Image stylisée en fond */}
  <Box
    position="absolute"
    top="-5%"
    left="50%"
    transform="translateX(-50%)"
    w="110vw"            // 👈 pas full, comme une carte immersive
    h="100%"
    zIndex={0}
    borderRadius="3xl" // 👈 arrondi premium
    overflow="hidden"
    boxShadow="0 0 60px rgba(35,104,245,0.25)" // 👈 glow bleu subtil
    _before={{
      content: '""',
      position: "absolute",
      inset: 0,
      bgImage:
        "url('/banniere-41-paysage-montagne-aube-rayons-du-soleil-levant-illuminent-sommets-montagnes-couleur-rose-vif-inhabituelle_198208-1332.jpg')",
      bgSize: "cover",
      bgPosition: "center",
      filter: "blur(2px) brightness(0.5)", // 👈 flou + sombre
      maskImage:
        "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)", // ✅ fondu bas
      WebkitMaskImage:
        "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
    }}
    _after={{
      content: '""',
      position: "absolute",
      inset: 0,
      bg: "linear-gradient(to-b, rgba(10,10,20,0.6), rgba(10,10,20,0.95))",
    }}
  />

  {/* KPIs au-dessus */}
  <VStack align="start" spacing={10} position="relative" zIndex={1}>
    <Heading size="xl" color="white">
      Track the best KPIs for better decision-making payments.
    </Heading>
    <Text color="gray.200" maxW="2xl">
      Demo KPIs powered by <code>SwitchPay</code>. These numbers show the kind
      of insights you’ll get.
    </Text>

    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={2}>
      <StatCard
        label="Total Volume"
        value={
          <>
            <Counter to={12500000} duration={1800} decimals={2} isMoney /> €
          </>
        }
      />
      <StatCard
        label="# Transactions"
        value={<Counter to={487231} duration={2000} />}
      />

      <GlowCard>
        <Stat>
          <StatLabel color="gray.300">By PSP</StatLabel>
          <StatNumber fontSize="lg" color="white">
            <Badge mr={2} colorScheme="blue" variant="subtle">
              Stripe: <Counter to={238121} duration={1500} />
            </Badge>
            <Badge mr={2} colorScheme="purple" variant="subtle">
              Adyen: <Counter to={132893} duration={1800} />
            </Badge>
            <Badge mr={2} colorScheme="green" variant="subtle">
              Rapyd: <Counter to={77320} duration={2100} />
            </Badge>
            <Badge mr={2} colorScheme="teal" variant="subtle">
              Wise: <Counter to={3897} duration={2500} />
            </Badge>
          </StatNumber>
        </Stat>
      </GlowCard>
    </SimpleGrid>
  </VStack>

  {/* espace bas */}
  <Box h={{ base: "140px", md: "220px" }} />
</Section>


        {/* === AI ASSISTANT === */}
<Section id="assistant" py={{ base: 20, md: 28 }} bg={pageBg}>
  <VStack spacing={14} align="center" textAlign="center">
    {/* Header */}
    <Heading 
  size="4xl" 
  fontWeight="extrabold" 
  bgGradient="linear(to-r, brand.500, brand.300)" 
  bgClip="text"
  mb={0}   // 👈 zéro marge en bas
>
  Meet switchpayAI
</Heading>

<Text 
  fontSize="lg" 
  color={subText} 
  maxW="2xl" 
  lineHeight="1.3"
  mt={1}   // 👈 un petit espace fin (optionnel)
>
  Your AI copilot for payments. Ask about routing, PSPs, fees or integrations, 
  and get instant answers powered by real-time data.
</Text>


    {/* Conversation animée avec ton composant */}
    <AnimatedChat />

    {/* 3 cartes SaaS */}
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} maxW="6xl" w="100%">
      {[
        { title: "Interactive Docs", text: "Live API snippets you can copy-paste directly into your code." },
        { title: "Real-time Data", text: "Up-to-date PSP fees & routing logic integrated into your workflow." },
        { title: "Dev-Friendly", text: "Guides, examples & SDKs for a seamless integration journey." },
      ].map((f, i) => (
        <GlowCard
          key={i}
          p={8}
          bg={cardBg}
          border="1px solid"
          borderColor={cardBorder}
          shadow="md"
        >
          <Heading size="md" mb={3}>{f.title}</Heading>
          <Text color={subText}>{f.text}</Text>
        </GlowCard>
      ))}
    </SimpleGrid>

    {/* Transparent Apple-style CTA */}
    <Button
      size="lg"
      px={10}
      py={6}
      borderRadius="full"
      bg="transparent"
      border="1px solid"
      borderColor={buttonBorder}
      backdropFilter="blur(20px) saturate(180%)"
      color={buttonColor}
      fontWeight="semibold"
      _hover={{ bg: buttonHoverBg, transform: "scale(1.05)" }}
      transition="all .3s ease"
      onClick={() => scrollTo("#pricing")}
    >
      🚀 Launch Assistant
    </Button>
  </VStack>

        {/* Big spacing avant SECURITY */}
  <Box h={{ base: "140px", md: "220px" }} /> 
</Section>



        {/* SECURITY */}
        <Section id="security" bg={useColorModeValue("linear(to-r, gray.50, white)", "linear(to-r, gray.900, gray.800)")}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
            <VStack align="start" spacing={6}>
              <Heading size="xl">Security & Reliability</Heading>
              <Text color={subText}>
                Start with simulated PSPs and switch seamlessly to real providers (Stripe, Adyen, Wise…) when you’re ready.
              </Text>
              <HStack spacing={4}>
                <Badge colorScheme="green" px={3} py={1} borderRadius="full"><LockIcon mr={1} /> API Key</Badge>
                <Badge colorScheme="purple" px={3} py={1} borderRadius="full">Idempotency</Badge>
                <Badge colorScheme="blue" px={3} py={1} borderRadius="full">Metrics</Badge>
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
 

        {/* PRICING */}
<Section
  id="pricing"
  bg={useColorModeValue(
    "linear(to-b, white, gray.50)",
    "linear(to-b, gray.900, gray.800)"
  )}
>
  <VStack spacing={10} align="center" textAlign="center">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Heading size="2xl" fontWeight="extrabold" mb={3} py={15}>
        Simple, transparent pricing.
      </Heading>
      <Text fontSize="lg" color={subText}>
        Start for free. Scale without limits. Only pay for real value.
      </Text>
    </motion.div>

    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      spacing={8}
      w="100%"
      maxW="6xl"
    >
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
          features: [
            "10k tx/month",
            "Smart routing",
            "switchpayAI Assistant",
            "Advanced dashboard",
          ],
          highlight: true,
          premium: false,
        },
        {
          title: "Enterprise",
          price: "Custom",
          desc: "For global players needing reliability at scale.",
          features: [
            "Unlimited tx",
            "Dedicated PSP mix",
            "24/7 support",
            "SLAs & compliance",
          ],
          highlight: false,
          premium: true,
        },
      ].map((tier, i) => (
        <GlowCard
          key={i}
          p={8}
          borderWidth={tier.highlight ? "2px" : "1px"}
          borderColor={
            tier.premium
              ? "yellow.400"
              : tier.highlight
              ? "brand.400"
              : borderCol
          }
          transition="all 0.35s ease"
          _hover={{
            transform: "scale(1.06)",
            boxShadow: tier.premium
              ? "0 0 50px rgba(255, 215, 0, 0.7), 0 0 100px rgba(255, 215, 0, 0.4)"
              : tier.highlight
              ? "0 0 40px rgba(123, 63, 252, 0.6), 0 0 80px rgba(123, 63, 252, 0.3)"
              : "0 0 25px rgba(35,104,245,0.3)",
          }}
          display="flex"
          flexDirection="column"
          bg={tier.premium ? premiumBg : "inherit"} // ✅ premiumBg défini en haut
        >
          <VStack spacing={4} flex="1" align="stretch">
            <Badge
              alignSelf="center"
              colorScheme={
                tier.premium
                  ? "yellow"
                  : tier.highlight
                  ? "purple"
                  : "gray"
              }
              variant={
                tier.premium ? "solid" : tier.highlight ? "solid" : "subtle"
              }
              px={3}
              py={1}
              borderRadius="full"
            >
              {tier.title}
            </Badge>

            <Heading size="2xl" textAlign="center">
              {tier.price}
            </Heading>
            <Text color={subText} mb={4} textAlign="center">
              {tier.desc}
            </Text>

            <VStack spacing={2} align="start" flex="1">
              {tier.features.map((f, idx) => (
                <HStack key={idx} spacing={2}>
                  <CheckCircleIcon
                    color={tier.premium ? "yellow.400" : "green.400"}
                  />
                  <Text>{f}</Text>
                </HStack>
              ))}
            </VStack>

            <Spacer />

            <Magnetic>
              <BrandButton
                as={RouterLink}   // ✅ navigation sans flash
                to="/contact"
                mt={6}
                w="100%"
                bgGradient={
                  tier.premium
                    ? "linear(to-r, yellow.400, yellow.600)"
                    : "linear(to-r, brand.500, brand.300)"
                }
                _hover={{ filter: "brightness(1.08)" }}
              >
                {tier.price === "Custom" ? "Contact us" : "Get started"}
              </BrandButton>
            </Magnetic>
          </VStack>
        </GlowCard>
      ))}
    </SimpleGrid>
  </VStack>
</Section>

        {/* CTA */}
        <Section id="cta">
          <GlowCard display="flex" flexDirection={{ base: "column", md: "row" }} alignItems="center" p={{ base: 8, md: 12 }}>
            <VStack align="start" spacing={3} flex="1">
              <Heading size="lg">Start routing smarter, today.</Heading>
              <Text color={subText}>Jump into the app and create your first transaction.</Text>
            </VStack>
            <Spacer />
            <Magnetic>
              <BrandButton onClick={() => navigate("/app")}>Make a transaction</BrandButton>
            </Magnetic>
          </GlowCard>
        {/* Big spacing avant SECURITY */}
  <Box h={{ base: "140px", md: "220px" }} /> 
</Section>

        {/* FAQ */}
        <Section id="faq" bg={useColorModeValue("linear(to-r, white, gray.50)", "linear(to-r, gray.800, gray.900)")}>
          <VStack align="start" spacing={6}>
            <Heading size="xl">Frequently asked questions</Heading>
            <Accordion allowToggle w="100%">
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">What is SwitchPay?</Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  SwitchPay is a smart payment router that automatically picks the best PSP for each transaction.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">How do I test the app?</Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  You can use the local demo with FastAPI endpoints <code>/transaction</code> and <code>/metrics</code>.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">Which PSPs are supported?</Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  Currently: Stripe, Adyen, Wise, Rapyd. More coming soon.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
        </Section>

        {/* SOCIALS */}
        <Section id="socials" bg={useColorModeValue("linear(to-r, white, gray.50)", "linear(to-r, gray.800, gray.900)")}>
          <GlowCard>
            <Flex align="center" gap={6} wrap="wrap" justify="space-between">
              <VStack align="start" spacing={1}>
                <Heading size="md">Let’s connect</Heading>
                <Text color={subText}>Reach me on your favorite platform.</Text>
              </VStack>
              <HStack spacing={4}>
                <Tooltip label="LinkedIn">
                  <Button as="a" href="https://www.linkedin.com/in/baptiste-sardou-789114288/" target="_blank" rel="noreferrer" leftIcon={<Icon as={FaLinkedin} />} variant="outline">LinkedIn</Button>
                </Tooltip>
                <Tooltip label="X / Twitter">
                  <Button as="a" href="https://x.com/baptiste_sardou" target="_blank" rel="noreferrer" leftIcon={<Icon as={FaTwitter} />} variant="outline">X</Button>
                </Tooltip>
                <Tooltip label="Substack">
                  <Button as="a" href="https://substack.com/@baptistesardou?utm_source=user-menu" target="_blank" rel="noreferrer" leftIcon={<Icon as={SiSubstack} />} variant="outline">Substack</Button>
                </Tooltip>
              </HStack>
            </Flex>
          </GlowCard>
        </Section>

        {/* FOOTER */}
        <Box as="footer" py={10} borderTop="1px solid" borderColor={borderCol} bg="transparent">
          <Container maxW="6xl">
            <Flex align="center">
              <HStack spacing={3}>
                <Box w="10px" h="10px" borderRadius="full" bgGradient="linear(to-br, brand.400, brand.600)" />
                <Text>© {new Date().getFullYear()} SwitchPay</Text>
              </HStack>
              <Spacer />
              <HStack spacing={4}>
                <ChakraLink as="a" href="https://x.com/baptiste_sardou" isExternal>X</ChakraLink>
                <ChakraLink as="a" href="https://www.linkedin.com/in/baptiste-sardou-789114288/" isExternal>LinkedIn</ChakraLink>
                <ChakraLink as="a" href="https://substack.com/@baptistesardou?utm_source=user-menu" isExternal>Substack</ChakraLink>
              </HStack>
            </Flex>
          </Container>
        </Box>
        {/* CHATBOT */}
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
      <Heading size="md" mb={2}>{title}</Heading>
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
      <Kpi label="Volume" value={`${Number(metrics.total_volume ?? 0).toLocaleString("fr-FR", { maximumFractionDigits: 0 })}€`} />
      <Kpi label="Tx" value={metrics.total_transactions ?? 0} />
      <Kpi label="PSPs" value={Object.keys(metrics.transactions_by_psp || {}).length} />
    </SimpleGrid>
  );
}

function Kpi({ label, value }) {
  return (
    <Box p={3} borderRadius="lg" bg={useColorModeValue("gray.50", "whiteAlpha.100")} textAlign="center">
      <Text fontSize="xs" opacity={0.7}>{label}</Text>
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
