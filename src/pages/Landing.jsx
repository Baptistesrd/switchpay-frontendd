import React, { useEffect, useState } from "react";
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
  Link as ChakraLink,
  Tooltip,
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
  ExternalLinkIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { motion } from "framer-motion";
import { useNavigate, Link, Link as RouterLink } from "react-router-dom";
import axios from "axios";

import BackgroundFX from "../components/BackgroundFX";
import GlowCard from "../components/GlowCard";
import Layout from "../components/Layout";
import AnimatedChat from "../components/AnimatedChat";
import PaymentStackMap from "../components/PaymentStackMap";
import MagneticButton from "../components/MagneticButton";

import ValueCard from "../components/landing/ValueCard";
import RoadmapItem from "../components/landing/RoadmapItem";
import HeroSection from "../components/landing/HeroSection";
import PspCarousel from "../components/landing/PspCarousel";
import HowItWorksCards from "../components/landing/HowItWorksCards";
import HowItWorksTimeline from "../components/HowItWorksTimeline";
import { NAV_SCROLL_OFFSET, YOUTUBE_DEMO_URL, SOCIAL_LINKS } from "../constants/links";

const MotionBox = motion(Box);

const Section = ({ children, id, bg, ...rest }) => (
  <Box as="section" id={id} py={{ base: 14, md: 18 }} bg={bg} {...rest}>
    <Container maxW="6xl" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
      {children}
    </Container>
  </Box>
);

export default function Landing() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [waitlistError, setWaitlistError] = useState("");
  const [navProgress, setNavProgress] = useState(0);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const subText = "rgba(255,255,255,0.5)";
  const borderCol = "rgba(255,255,255,0.08)";
  const cardBg = "rgba(255,255,255,0.03)";
  const cardBorder = "rgba(255,255,255,0.08)";
  const premiumBg = "linear(to-b, rgba(245,158,11,0.07), rgba(30,25,10,0.5))";
  const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_DEMO_URL.split("/").pop()}`;

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

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const hero = document.getElementById("hero");
        if (!hero) { setNavProgress(0); return; }
        const rect = hero.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
        setNavProgress(progress);
        setShowFloatingCTA((window.scrollY || document.documentElement.scrollTop || 0) > 100);
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
    const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const toggleMenu = () => (isOpen ? onClose() : onOpen());

  const NAV_LINKS = [
    { label: "How it works", id: "#how" },
    { label: "Why switchpay", id: "#why" },
    { label: "Security", id: "#security" },
    { label: "Pricing", id: "#pricing" },
    { label: "Join waitlist", id: "#waitlist" },
    { label: "Contact", route: "/contact" },
  ];

  const PRICING_TIERS = [
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
  ];

  return (
    <Layout>
      <Box position="relative" bg="#030303" minH="100vh">
        <BackgroundFX />

        {/* NAVBAR */}
        <Flex
          as="nav"
          position="fixed"
          top="0"
          left="0"
          right="0"
          width="100vw"
          opacity={scrollY > 80 ? 0 : 1}
          pointerEvents={scrollY > 80 ? "none" : "auto"}
          transition="opacity 0.4s ease"
          zIndex="100"
          bg="#040406"
          backdropFilter="none"
          border="none"
          borderColor="transparent"
          borderRadius="0"
          px={{ base: 6, md: 16 }}
          py={4}
          align="center"
          gap={3}
        >
          <Heading fontSize={{ base: "lg", md: "xl" }} fontWeight="black" color="white" lineHeight="1" whiteSpace="nowrap">
            switchpay
          </Heading>

          <Spacer />

          <HStack spacing={6} display={{ base: "none", md: "flex" }} color="whiteAlpha.900">
            <ChakraLink as={RouterLink} to="/docs" _hover={{ color: "brand.500" }}>Documentation</ChakraLink>
            <ChakraLink as="button" onClick={() => scrollTo("#how")} _hover={{ color: "brand.500" }}>How it works</ChakraLink>
            <ChakraLink as="button" onClick={() => scrollTo("#why")} _hover={{ color: "brand.500" }}>Why switchpay</ChakraLink>
            <ChakraLink as="button" onClick={() => scrollTo("#security")} _hover={{ color: "brand.500" }}>Security</ChakraLink>
            <ChakraLink as="button" onClick={() => scrollTo("#pricing")} _hover={{ color: "brand.500" }}>Pricing</ChakraLink>
            <ChakraLink as={RouterLink} to="/contact" _hover={{ color: "brand.500" }}>Contact</ChakraLink>
          </HStack>

          <Spacer display={{ base: "none", md: "block" }} />

          <Box display={{ base: "none", md: "block" }}>
            <HStack spacing={3}>
              <Button
                onClick={() => navigate("/app")}
                px={8}
                py={3}
                fontSize="sm"
                fontWeight="600"
                borderRadius="full"
                color="white"
                border="1px solid"
                borderColor="whiteAlpha.200"
                bg="whiteAlpha.50"
                backdropFilter="blur(12px)"
                _hover={{
                  bg: "whiteAlpha.100",
                  borderColor: "whiteAlpha.400",
                  transform: "scale(1.03)",
                }}
                transition="all 0.2s"
              >
                Try the sandbox
              </Button>
              <Button
                onClick={() => scrollTo("#waitlist")}
                px={8}
                py={3}
                fontSize="sm"
                fontWeight="600"
                borderRadius="full"
                color="white"
                border="1px solid"
                borderColor="whiteAlpha.200"
                bg="whiteAlpha.50"
                backdropFilter="blur(12px)"
                _hover={{
                  bg: "whiteAlpha.100",
                  borderColor: "whiteAlpha.400",
                  transform: "scale(1.03)",
                }}
              >
                Join the waitlist
              </Button>
            </HStack>
          </Box>

          <Box display={{ base: "block", md: "none" }}>
            <motion.div initial={false} animate={isOpen ? "open" : "closed"}>
              <IconButton
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                icon={
                  <motion.div variants={{ closed: { rotate: 0 }, open: { rotate: 90 } }} transition={{ duration: 0.3, ease: "easeOut" }}>
                    {isOpen ? (
                      <Box position="relative" w="22px" h="22px">
                        <motion.span style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "2px", backgroundColor: "white", borderRadius: "1px", transform: "translateY(-50%) rotate(45deg)" }} />
                        <motion.span style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "2px", backgroundColor: "white", borderRadius: "1px", transform: "translateY(-50%) rotate(-45deg)" }} />
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

          <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay bg="rgba(0,0,0,0.45)" backdropFilter="blur(12px)" />
            <DrawerContent
              bgGradient="linear(to-b, rgba(10,15,30,0.95), rgba(25,30,60,0.9))"
              backdropFilter="blur(18px)"
              borderLeft="1px solid rgba(255,255,255,0.1)"
              boxShadow="0 0 60px rgba(0,0,0,0.5)"
              animation="fadeSlideIn 0.4s ease forwards"
            >
              <DrawerCloseButton color="white" top="24px" right="24px" size="lg" />
              <DrawerHeader fontWeight="extrabold" fontSize="2xl" color="white" textAlign="center" letterSpacing="-0.02em">
                Menu
              </DrawerHeader>
              <DrawerBody>
                <VStack align="start" spacing={8} mt={10} w="full" color="gray.200">
                  {NAV_LINKS.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i, duration: 0.4 }} whileHover={{ x: 8, scale: 1.03 }}>
                      {item.route ? (
                        <ChakraLink as={RouterLink} to={item.route} fontSize="xl" fontWeight="semibold" onClick={onClose} _hover={{ color: "brand.400" }}>
                          {item.label}
                        </ChakraLink>
                      ) : (
                        <ChakraLink as="button" onClick={() => { scrollTo(item.id); onClose(); }} fontSize="xl" fontWeight="semibold" _hover={{ color: "brand.400" }}>
                          {item.label}
                        </ChakraLink>
                      )}
                    </motion.div>
                  ))}
                </VStack>
                <Box position="absolute" bottom="40px" left="50%" transform="translateX(-50%)" w="85%">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    <Button onClick={() => { navigate("/app"); onClose(); }} w="100%" size="lg" py={6} fontWeight="700" borderRadius="full" fontSize="lg" bgGradient="linear(to-r, #06b6d4, #7c3aed, #ec4899)" bgSize="200% 200%" color="white" boxShadow="0 0 25px rgba(236,72,153,0.3)" _hover={{ backgroundPosition: "100% 50%", transform: "translateY(-3px)", boxShadow: "0 0 40px rgba(236,72,153,0.5)" }} transition="all 0.35s ease">
                      🚀 Make a transaction
                    </Button>
                  </motion.div>
                </Box>
              </DrawerBody>
            </DrawerContent>
            <style>{`@keyframes fadeSlideIn { from { transform: translateX(30%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
          </Drawer>
        </Flex>

        {/* HERO */}
        <Box pt="72px">
          <HeroSection />
        </Box>

        {/* PSP CAROUSEL */}
        <PspCarousel />

        {/* HOW IT WORKS */}
        <Box as="section" id="how" py={0} bg="transparent" overflow="visible" position="relative" zIndex={1}>
          <HowItWorksTimeline />

          {/* Payment Stack Map */}
          <Container maxW="6xl" px={{ base: 4, md: 6 }}>
            <Box w="100%" mt={4}>
              <PaymentStackMap />
            </Box>
          </Container>
        </Box>

        {/* PRODUCT DEMO */}
        <Box as="section" id="demo" py={{ base: 20, md: 28 }} position="relative" bg="#030303">
          <Container maxW="6xl" px={{ base: 4, md: 6 }}>
            {/* Badge + title */}
            <VStack spacing={4} align="center" textAlign="center" mb={12}>
              <Heading fontWeight="bold" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.1">
                <Box as="span" display="block" color="white">See SwitchPay</Box>
                <Box as="span" display="block" bgGradient="linear(to-r, #a5b4fc, #fda4af)" bgClip="text">
                  in action.
                </Box>
              </Heading>
              <Text color="rgba(255,255,255,0.4)" fontSize={{ base: "md", md: "lg" }}>
                Real-time routing. Real savings.
              </Text>
            </VStack>

            {/* Video container */}
            <Box position="relative" maxW="4xl" mx="auto">
              {/* Ambient glows */}
              <Box
                position="absolute"
                w="300px"
                h="300px"
                bg="#6366f1"
                opacity={0.12}
                top="-50px"
                left="-50px"
                borderRadius="full"
                filter="blur(80px)"
                zIndex={0}
                pointerEvents="none"
              />
              <Box
                position="absolute"
                w="200px"
                h="200px"
                bg="#f43f5e"
                opacity={0.10}
                bottom="-30px"
                right="-30px"
                borderRadius="full"
                filter="blur(80px)"
                zIndex={0}
                pointerEvents="none"
              />

              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                position="relative"
                zIndex={1}
                bg="rgba(255,255,255,0.03)"
                border="1px solid rgba(255,255,255,0.10)"
                borderRadius="3xl"
                overflow="hidden"
                boxShadow="0 0 80px rgba(99,102,241,0.15), 0 0 160px rgba(244,63,94,0.08)"
              >
                {/* YouTube iframe */}
                <Box w="100%" style={{ aspectRatio: "16/9" }}>
                  <iframe
                    src={YOUTUBE_EMBED_URL}
                    title="switchpay Demo"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  />
                </Box>
              </MotionBox>
            </Box>

            {/* CTA buttons */}
            <Stack direction={{ base: "column", sm: "row" }} spacing={4} justify="center" mt={12}>
              <Button
                onClick={() => navigate("/app")}
                bgGradient="linear(to-r, #6366f1, #7c3aed)"
                color="white"
                borderRadius="full"
                px={8}
                py={3}
                fontWeight="semibold"
                border="none"
                _hover={{ transform: "scale(1.03)", boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
                transition="all 0.2s"
              >
                Try switchpay now
              </Button>
              <Button
                variant="ghost"
                border="1px solid"
                borderColor="rgba(255,255,255,0.15)"
                color="rgba(255,255,255,0.7)"
                borderRadius="full"
                px={6}
                py={3}
                _hover={{ bg: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.3)", color: "white" }}
                rightIcon={<ExternalLinkIcon />}
                onClick={() => window.open(YOUTUBE_DEMO_URL, "_blank")}
              >
                Watch full demo on YouTube
              </Button>
            </Stack>
          </Container>
        </Box>

        <Box h={{ base: "80px", md: "140px" }} />

        {/* WHY SWITCHPAY */}
        <Section id="why" bg="#030303">
          <VStack align="start" spacing={8}>
            <Heading size="xl" bgGradient="linear(to-r, #a5b4fc, rgba(255,255,255,0.9))" bgClip="text">Why switchpay</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="100%">
              <ValueCard title="Plug & Play" text="Integrate in minutes. A ready-to-use backend (FastAPI) and frontend (React) built for fast iteration and seamless scaling." />
              <ValueCard title="Idempotency by design" text="Never lose sleep over duplicate payments. Every request is safe: same key for same response, always." />
              <ValueCard title="Observability" text="Track what matters. Get real-time KPIs, transaction volumes, and PSP distribution straight from metrics." />
            </SimpleGrid>
          </VStack>
        </Section>

        {/* AI ASSISTANT */}
        <Section id="assistant" py={{ base: 18, md: 28 }} bg="#030303">
          <VStack spacing={{ base: 10, md: 14 }} align="center" textAlign="center">
            <Heading as="h2" fontSize={{ base: "2xl", sm: "3xl", md: "5xl", lg: "6xl" }} fontWeight="800" lineHeight="1.05" bgGradient="linear(to-r, whiteAlpha.900, gray.400)" bgClip="text" letterSpacing="-0.02em" textAlign="center" px={{ base: 2, md: 0 }}>
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
                  <Heading size="md" mb={3}>{f.title}</Heading>
                  <Text color={subText}>{f.text}</Text>
                </GlowCard>
              ))}
            </SimpleGrid>
            <Button
              size="lg"
              w={{ base: "100%", sm: "auto" }}
              px={8}
              py={3}
              borderRadius="full"
              variant="ghost"
              border="1px solid"
              borderColor="rgba(255,255,255,0.15)"
              color="rgba(255,255,255,0.7)"
              fontWeight="semibold"
              _hover={{ bg: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.3)", color: "white" }}
              transition="all 0.2s"
              onClick={() => scrollTo("#pricing")}
            >
              Launch Assistant
            </Button>
          </VStack>
          <Box h={{ base: "80px", md: "140px" }} />
        </Section>

        {/* SECURITY */}
        <Section id="security" bg="#030303">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} alignItems="center">
            <VStack align="start" spacing={6}>
              <Heading size="xl" color="white">Security & Reliability</Heading>
              <Text color={subText}>
                Start with simulated PSPs and switch seamlessly to real providers (Stripe, Adyen, Wise…) when you're ready.
              </Text>
              <HStack spacing={3} flexWrap="wrap">
                <Badge bg="rgba(99,102,241,0.15)" color="#a5b4fc" border="1px solid" borderColor="rgba(99,102,241,0.3)" px={3} py={1} borderRadius="full"><LockIcon mr={1} /> API Key</Badge>
                <Badge bg="rgba(139,92,246,0.15)" color="#c4b5fd" border="1px solid" borderColor="rgba(139,92,246,0.3)" px={3} py={1} borderRadius="full">Idempotency</Badge>
                <Badge bg="rgba(6,182,212,0.15)" color="#67e8f9" border="1px solid" borderColor="rgba(6,182,212,0.3)" px={3} py={1} borderRadius="full">Metrics</Badge>
              </HStack>
            </VStack>
            <GlowCard>
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="white">Next steps</Heading>
                <RoadmapItem text="Connect your first sandbox (e.g. Stripe PaymentIntent)." />
                <RoadmapItem text="Enable retry & failover with PSP fallback." />
                <RoadmapItem text="Optimize routing score." />
              </VStack>
            </GlowCard>
          </SimpleGrid>
        </Section>

        {/* WAITLIST */}
        <Section id="waitlist" bg="#030303">
          <VStack spacing={6} align="center" textAlign="center">
            <Heading size="xl" bgGradient="linear(to-r, #a5b4fc, rgba(255,255,255,0.9))" bgClip="text">Join the waitlist</Heading>
            {!waitlistSuccess ? (
              <>
                <Input
                  placeholder="you@company.com"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  maxW="420px"
                  w="100%"
                  bg="rgba(255,255,255,0.05)"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.1)"
                  borderRadius="xl"
                  color="white"
                  _placeholder={{ color: "rgba(255,255,255,0.3)" }}
                  _focus={{ borderColor: "rgba(99,102,241,0.5)", boxShadow: "0 0 0 1px rgba(99,102,241,0.3)" }}
                />
                <Button
                  onClick={submitWaitlist}
                  isLoading={waitlistLoading}
                  w={{ base: "100%", sm: "auto" }}
                  bgGradient="linear(to-r, #6366f1, #7c3aed)"
                  color="white"
                  borderRadius="full"
                  px={8}
                  _hover={{ filter: "brightness(1.1)", transform: "scale(1.02)" }}
                >
                  Join the waitlist
                </Button>
                {waitlistError && <Text color="red.400">{waitlistError}</Text>}
              </>
            ) : (
              <Text color="rgba(255,255,255,0.7)">You're on the list 🚀</Text>
            )}
          </VStack>
        </Section>

        {/* PRICING */}
        <Section id="pricing" bg="#030303">
          <VStack spacing={10} align="center" textAlign="center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
              <Heading as="h2" fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }} fontWeight="800" lineHeight="1.1" bgGradient="linear(to-r, #a5b4fc, rgba(255,255,255,0.9))" bgClip="text" letterSpacing="-0.02em" textAlign="center" px={{ base: 2, md: 0 }}>
                Simple and transparent pricing.
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color={subText} px={{ base: 2, md: 0 }}>
                Start for free. Scale without limits. Only pay for real value.
              </Text>
            </motion.div>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="100%" maxW="6xl">
              {PRICING_TIERS.map((tier, i) => (
                <GlowCard key={i} p={{ base: 6, md: 8 }} borderWidth={tier.highlight ? "2px" : "1px"} borderColor={tier.premium ? "rgba(245,158,11,0.5)" : tier.highlight ? "rgba(99,102,241,0.4)" : borderCol} transition="all 0.35s ease" _hover={{ transform: { base: "none", md: "scale(1.04)" }, boxShadow: tier.premium ? "0 0 50px rgba(245,158,11,0.3)" : tier.highlight ? "0 0 40px rgba(99,102,241,0.4)" : "0 0 25px rgba(99,102,241,0.15)" }} display="flex" flexDirection="column" bg={tier.premium ? premiumBg : tier.highlight ? "rgba(99,102,241,0.05)" : "inherit"}>
                  <VStack spacing={4} flex="1" align="stretch">
                    <Badge alignSelf="center" bg={tier.premium ? "rgba(245,158,11,0.2)" : tier.highlight ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)"} color={tier.premium ? "#fcd34d" : tier.highlight ? "#a5b4fc" : "rgba(255,255,255,0.6)"} border="1px solid" borderColor={tier.premium ? "rgba(245,158,11,0.3)" : tier.highlight ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.1)"} px={3} py={1} borderRadius="full">
                      {tier.title}
                    </Badge>
                    <Heading size="2xl" textAlign="center">{tier.price}</Heading>
                    <Text color={subText} mb={2} textAlign="center">{tier.desc}</Text>
                    <VStack spacing={2} align="start" flex="1">
                      {tier.features.map((f, idx) => (
                        <HStack key={idx} spacing={2}>
                          <CheckCircleIcon color={tier.premium ? "#fcd34d" : "#a5b4fc"} />
                          <Text>{f}</Text>
                        </HStack>
                      ))}
                    </VStack>
                    <Spacer />
                    <MagneticButton
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
                      bgGradient={tier.premium ? "linear(to-r, #facc15, #f59e0b, #d97706)" : "linear(to-r, #6366f1, #7c3aed)"}
                      transition="all 0.2s ease"
                      boxShadow={tier.premium ? "0 0 25px rgba(245,158,11,0.35)" : "0 0 20px rgba(99,102,241,0.3)"}
                      _hover={{ transform: { base: "none", md: "scale(1.03)" }, boxShadow: tier.premium ? "0 0 35px rgba(245,158,11,0.5)" : "0 0 30px rgba(99,102,241,0.5)" }}
                      onClick={() => { if (tier.price === "Custom") navigate("/contact"); else scrollTo("#waitlist"); }}
                    >
                      {tier.price === "Custom" ? "Contact us" : "Join waitlist"}
                    </MagneticButton>
                  </VStack>
                </GlowCard>
              ))}
            </SimpleGrid>
          </VStack>
        </Section>

        {/* CTA */}
        <Section id="cta">
          <GlowCard display="flex" flexDirection={{ base: "column", md: "row" }} alignItems={{ base: "stretch", md: "center" }} gap={{ base: 6, md: 0 }} p={{ base: 7, md: 12 }}>
            <VStack align="start" spacing={3} flex="1">
              <Heading size="lg" color="white">Start routing smarter, today.</Heading>
              <Text color={subText}>Jump into the app and create your first transaction.</Text>
            </VStack>
            <Spacer display={{ base: "none", md: "block" }} />
            <Stack direction={{ base: "column", sm: "row" }} spacing={3} w={{ base: "100%", md: "auto" }}>
              <MagneticButton onClick={() => navigate("/app")} w={{ base: "100%", sm: "auto" }} px={7} py={3.5} fontSize="md" fontWeight="semibold" bgGradient="linear(to-r, #6366f1, #7c3aed)" color="white" borderRadius="full" border="none" _hover={{ transform: "scale(1.03)", boxShadow: "0 0 30px rgba(99,102,241,0.4)" }} transition="all 0.2s">
                Try the sandbox
              </MagneticButton>
              <Button variant="ghost" border="1px solid" borderColor="rgba(255,255,255,0.15)" color="rgba(255,255,255,0.7)" borderRadius="full" w={{ base: "100%", sm: "auto" }} _hover={{ bg: "rgba(255,255,255,0.05)", color: "white" }} onClick={() => scrollTo("#waitlist")}>
                Join the waitlist
              </Button>
            </Stack>
          </GlowCard>
          <Box h={{ base: "80px", md: "140px" }} />
        </Section>

        {/* FAQ */}
        <Section id="faq" bg="#030303" color="white" py={{ base: 16, md: 20 }}>
          <VStack align="start" spacing={8} maxW="4xl" mx="auto" w="100%">
            <Heading size="xl" fontWeight="extrabold" bgGradient="linear(to-r, #a5b4fc, rgba(255,255,255,0.9))" bgClip="text">
              Everything you need to know
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.700">
              Got questions? We've got answers. Everything about SwitchPay, explained.
            </Text>
            <Accordion allowToggle w="100%" borderColor="rgba(255,255,255,0.08)">
              {[
                { q: "What exactly does switchpay do?", a: 'switchpay intelligently routes every transaction to the most efficient PSP based on country, currency, fees, and device. Think of it as <strong>"Stripe + Adyen + Rapyd"</strong> behind one adaptive API.' },
                { q: "How do I try it right now?", a: null },
                { q: "Which PSPs are supported today?", a: "Currently integrated: <strong>Stripe</strong>, <strong>Adyen</strong>, <strong>Wise</strong>, and <strong>Rapyd</strong>. We're adding <strong>dLocal</strong> and <strong>Checkout.com</strong> next, each with country-specific routing logic." },
                { q: "Is switchpay live or just a prototype?", a: "The current build is a <strong>live sandbox environment</strong> running on FastAPI and React. It's built for testing: every transaction uses simulated data but real PSP logic. The goal is to demonstrate how a unified routing layer could simplify multi-PSP operations." },
                { q: "Can I integrate this into my own app right now?", a: "Yes, switchpay is designed as an API-first router. The same logic powering this demo can be embedded in your stack to automatically route payments, minimize fees, and improve success rates across markets." },
              ].map((item, i) => (
                <AccordionItem key={i} borderColor="rgba(255,255,255,0.08)">
                  <AccordionButton _expanded={{ bg: "rgba(255,255,255,0.05)" }} _hover={{ bg: "rgba(255,255,255,0.03)" }} px={4} py={3} borderRadius="lg" color="rgba(255,255,255,0.7)">
                    <Box flex="1" textAlign="left" fontWeight="semibold">{item.q}</Box>
                    <Box color="#a5b4fc"><AccordionIcon /></Box>
                  </AccordionButton>
                  <AccordionPanel pb={4} color="rgba(255,255,255,0.6)">
                    {i === 1 ? (
                      <>
                        Jump into the <strong>Sandbox</strong> section above.
                        <Box mt={3}>
                          <Button as={Link} to="/app" bgGradient="linear(to-r, #6366f1, #7c3aed)" color="white" borderRadius="full" size="sm" px={5} py={2} _hover={{ filter: "brightness(1.2)" }}>
                            Make a transaction
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: item.a }} />
                    )}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        </Section>

        {/* SOCIALS */}
        <Section id="socials" bg="rgba(255,255,255,0.02)">
          <GlowCard>
            <Flex align="center" gap={6} wrap="wrap" justify="space-between">
              <VStack align="start" spacing={1}>
                <Heading size="md">Let's connect</Heading>
                <Text color={subText}>Reach me on your favorite platform.</Text>
              </VStack>
              <HStack spacing={3} flexWrap="wrap">
                <Tooltip label="LinkedIn">
                  <Button as="a" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" leftIcon={<Icon as={FaLinkedin} />} bg="rgba(255,255,255,0.04)" border="1px solid" borderColor="rgba(255,255,255,0.1)" color="rgba(255,255,255,0.7)" borderRadius="full" backdropFilter="blur(8px)" _hover={{ bg: "rgba(99,102,241,0.15)", borderColor: "rgba(99,102,241,0.3)", color: "white" }}>LinkedIn</Button>
                </Tooltip>
                <Tooltip label="X / Twitter">
                  <Button as="a" href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" leftIcon={<Icon as={FaTwitter} />} bg="rgba(255,255,255,0.04)" border="1px solid" borderColor="rgba(255,255,255,0.1)" color="rgba(255,255,255,0.7)" borderRadius="full" backdropFilter="blur(8px)" _hover={{ bg: "rgba(99,102,241,0.15)", borderColor: "rgba(99,102,241,0.3)", color: "white" }}>X</Button>
                </Tooltip>
                <Tooltip label="Instagram">
                  <Button as="a" href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" leftIcon={<Icon as={SiInstagram} />} bg="rgba(255,255,255,0.04)" border="1px solid" borderColor="rgba(255,255,255,0.1)" color="rgba(255,255,255,0.7)" borderRadius="full" backdropFilter="blur(8px)" _hover={{ bg: "rgba(99,102,241,0.15)", borderColor: "rgba(99,102,241,0.3)", color: "white" }}>Instagram</Button>
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
                <Text color="rgba(255,255,255,0.35)">© {new Date().getFullYear()} SwitchPay</Text>
              </HStack>
              <Spacer />
              <HStack spacing={4} flexWrap="wrap">
                <ChakraLink as="a" href={SOCIAL_LINKS.twitter} isExternal color="rgba(255,255,255,0.4)" _hover={{ color: "#a5b4fc" }}>X</ChakraLink>
                <ChakraLink as="a" href={SOCIAL_LINKS.linkedin} isExternal color="rgba(255,255,255,0.4)" _hover={{ color: "#a5b4fc" }}>LinkedIn</ChakraLink>
                <ChakraLink as="a" href={SOCIAL_LINKS.substack} isExternal color="rgba(255,255,255,0.4)" _hover={{ color: "#a5b4fc" }}>Substack</ChakraLink>
              </HStack>
            </Flex>
          </Container>
        </Box>

        {/* FLOATING CTA */}
        {showFloatingCTA && (
          <Box position="fixed" bottom={{ base: "14px", md: "24px" }} left="50%" transform="translateX(-50%)" zIndex={200} w={{ base: "calc(100% - 24px)", sm: "auto" }} maxW="520px">
            <GlowCard p={3} borderRadius="full" bg="rgba(3,3,3,0.85)" backdropFilter="saturate(180%) blur(18px)" border="1px solid rgba(255,255,255,0.08)">
              <Stack direction={{ base: "column", sm: "row" }} spacing={3}>
                <Button onClick={() => navigate("/app")} w={{ base: "100%", sm: "auto" }} bgGradient="linear(to-r, #6366f1, #7c3aed)" color="white" borderRadius="full">Try the sandbox</Button>
                <Button variant="ghost" border="1px solid" borderColor="rgba(255,255,255,0.2)" color="rgba(255,255,255,0.7)" borderRadius="full" w={{ base: "100%", sm: "auto" }} _hover={{ bg: "rgba(255,255,255,0.05)", color: "white" }} onClick={() => scrollTo("#waitlist")}>Join waitlist</Button>
              </Stack>
            </GlowCard>
          </Box>
        )}
      </Box>
    </Layout>
  );
}
