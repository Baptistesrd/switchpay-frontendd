import React, { useEffect, useState } from "react";
import {
  Box, Container, Flex, HStack, VStack, Stack, Spacer, Button, IconButton,
  Heading, Text, Badge, SimpleGrid, Stat, StatLabel, StatNumber, useColorMode,
  useColorModeValue, Link as ChakraLink, Divider, Icon, Tooltip,
  AspectRatio, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
  Modal, ModalOverlay, ModalContent, useDisclosure
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, LockIcon, CheckCircleIcon, TimeIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
import { motion, useMotionValue, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import BackgroundFX from "../components/BackgroundFX";
import AnimatedParticles from "../components/AnimatedParticles";
import GlowBlob from "../components/GlowBlob";
import GlowCard from "../components/GlowCard";
import HowItWorksTimeline from "../components/HowItWorksTimeline";
import ChatbotWidget from "../components/ChatbotWidget";

const MotionBox = motion.create ? motion.create(Box) : motion(Box);

const Section = ({ children, id, bg }) => (
  <Box as="section" id={id} py={{ base: 14, md: 18 }} bg={bg}>
    <Container maxW="6xl" position="relative" zIndex={1}>
      {children}
    </Container>
  </Box>
);

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

  const pageBg = useColorModeValue(
    "linear(to-b, #f7faff, #eef3ff, #eaf0ff)",
    "linear(to-b, #0a0f1f, #0f172a, #0b1220)"
  );
  const subText = useColorModeValue("gray.600", "gray.300");
  const borderCol = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  const [metrics, setMetrics] = useState({ total_transactions: 0, total_volume: 0, transactions_by_psp: {} });
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/metrics`);
        setMetrics(res.data);
      } catch {/* silent */}
    };
    fetchMetrics();
    const id = setInterval(fetchMetrics, 8000);
    return () => clearInterval(id);
  }, []);

  // Scroll detection for floating CTA
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box position="relative" overflowX="hidden" bgGradient={pageBg} minH="100vh">
      {/* BACKGROUND FX */}
      <BackgroundFX />


      {/* NAVBAR */}
      <Box
        position="sticky"
        top="0"
        zIndex="100"
        bg={useColorModeValue("rgba(255,255,255,0.75)", "rgba(10,15,31,0.65)")}
        backdropFilter="saturate(250%) blur(15px)"
        borderBottom="1px solid"
        borderColor={borderCol}
      >
        <Container maxW="6xl">
          <Flex h={16} align="center">
            <HStack spacing={3}>
              <Box w="10px" h="10px" borderRadius="full" bgGradient="linear(to-br, brand.400, brand.600)" />
              <Heading fontSize="2xl" fontWeight="black">SwitchPay</Heading>
            </HStack>
            <Spacer />
            <HStack spacing={6} display={{ base: "none", md: "flex" }}>
              <ChakraLink as="button" onClick={() => scrollTo("#how")} _hover={{ color: "brand.500" }}>How it works</ChakraLink>
              <ChakraLink as="button" onClick={() => scrollTo("#why")} _hover={{ color: "brand.500" }}>Why SwitchPay</ChakraLink>
              <ChakraLink as="button" onClick={() => scrollTo("#metrics")} _hover={{ color: "brand.500" }}>Live Metrics</ChakraLink>
              <ChakraLink as="button" onClick={() => scrollTo("#security")} _hover={{ color: "brand.500" }}>Security</ChakraLink>
              <ChakraLink as="button" onClick={() => scrollTo("#pricing")} _hover={{ color: "brand.500" }}>Pricing</ChakraLink>
              <ChakraLink as="button" onClick={() => scrollTo("#contact")} _hover={{ color: "brand.500" }}>Contact</ChakraLink>
            </HStack>
            <HStack spacing={3} ml={4}>
              <IconButton
                aria-label="toggle color mode"
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                variant="ghost"
              />
              <Magnetic>
                <BrandButton onClick={() => navigate("/app")}>Make a transaction</BrandButton>
              </Magnetic>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* HERO */}
      <Box as="header" position="relative" py={30}>
        <Box position="absolute" inset={0} zIndex={0}>
          <AnimatedParticles />
          <GlowBlob top="6%" left="65%" size="520px" delay={0.2} />
          <GlowBlob top="58%" left="10%" size="460px" delay={0.6} />
        </Box>
        <Section id="hero">
          <Stack direction={{ base: "column", md: "row" }} spacing={10} align="center">
            <VStack align="start" spacing={6} maxW="xl">
              <Heading as="h1" size="2xl" lineHeight="1" fontWeight="extrabold">
                Welcome to SwitchPay.
                <br />
                <Box as="span" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text" className="shimmer">
                  Your money matters.
                </Box>
              </Heading>
              <Text fontSize="lg" color={subText}>
                Automatically route each payment to the best PSP (Stripe, Adyen, Wise, Rapyd) based on country, currency,
                fees, and device. More conversions. Lower costs.
              </Text>
              <HStack spacing={4}>
                <Magnetic>
                  <BrandButton onClick={() => navigate("/app")}>Get started</BrandButton>
                </Magnetic>
                <Button
                  variant="outline"
                  borderColor="brand.400"
                  color="brand.400"
                  rightIcon={<ExternalLinkIcon />}
                  onClick={() => scrollTo("#how")}
                  _hover={{ bg: "brand.50" }}
                >
                  See how it works
                </Button>
              </HStack>
              <HStack spacing={6} pt={2}>
                <HStack spacing={2}>
                  <CheckCircleIcon color="green.400" />
                  <Text color={subText}>95%+ success (simulated)</Text>
                </HStack>
                <HStack spacing={2}>
                  <TimeIcon color="blue.400" />
                  <Text color={subText}>Latency-aware routing</Text>
                </HStack>
              </HStack>
            </VStack>

            <GlowCard flex="1" p={6}>
              <VStack align="stretch" spacing={5}>
                <Heading size="md">What SwitchPay optimizes</Heading>
                <SimpleGrid columns={2} spacing={3}>
                  <Feature label="Higher auth rates" />
                  <Feature label="Lower fees" />
                  <Feature label="Geo coverage" />
                  <Feature label="Failover routing" />
                </SimpleGrid>
                <Divider />
                <VStack spacing={3} align="center">
                  <Text fontWeight="bold" fontSize="md">Integrated PSPs</Text>
                  <HStack spacing={8} wrap="wrap" justify="center">
                    <Box as="img" src="/Stripe_Logo,_revised_2016.svg.png" alt="Stripe" h="40px" maxW="100px" objectFit="contain" />
                    <Box as="img" src="/Adyen_Corporate_Logo.svg.png" alt="Adyen" h="40px" maxW="100px" objectFit="contain" />
                    <Box as="img" src="/Airwallex_Logo_-_Black.png" alt="Airwallex" h="40px" maxW="100px" objectFit="contain" />
                    <Box as="img" src="/Wise2020.svg" alt="Wise" h="40px" maxW="100px" objectFit="contain" />
                    <Box as="img" src="/Rapyd-logo-768x236.webp" alt="Rapyd" h="40px" maxW="100px" objectFit="contain" />
                    <Box as="img" src="/PayPal.svg.png" alt="PayPal" h="40px" maxW="100px" objectFit="contain" />
                  </HStack>
                </VStack>
              </VStack>
            </GlowCard>
          </Stack>
        </Section>
      </Box>

      {/* HOW IT WORKS */}
      <Section id="how">
        <VStack align="start" spacing={8}>
          <Heading size="xl">How it works</Heading>
          <HowItWorksTimeline />
        </VStack>
      </Section>

      {/* PRODUCT DEMO */}
      <Section id="demo" bg={useColorModeValue("linear(to-r, white, blue.50)", "linear(to-r, gray.900, gray.800)")}>
        <VStack spacing={8} align="center" textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Heading size="2xl" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text">
              Product Demo
            </Heading>
            <Text mt={3} fontSize="lg" color={subText}>
              See SwitchPay in action — routing payments in real time.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotateX: 3, rotateY: -3 }}
            style={{
              width: "100%",
              maxWidth: "900px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 0 40px rgba(35, 104, 245, 0.4)",
              position: "relative",
            }}
          >
            <AspectRatio ratio={16 / 9} w="100%">
              <iframe
                src="https://www.youtube.com/embed/JE_LsFrjcAA?controls=0"
                title="SwitchPay Demo"
                allowFullScreen
                style={{ borderRadius: "20px", zIndex: 1 }}
              />
            </AspectRatio>

            <Flex
              position="absolute"
              inset={0}
              justify="center"
              align="center"
              bg="blackAlpha.500"
              opacity={0}
              _hover={{ opacity: 1 }}
              transition="all 0.3s ease"
              zIndex={2}
              direction="column"
            >
              <Button
                size="lg"
                mb={3}
                bgGradient="linear(to-r, brand.500, brand.300)"
                color="white"
                _hover={{ filter: "brightness(1.1)" }}
                onClick={onOpen}
              >
                ▶ Play Demo
              </Button>
              <Button
                variant="outline"
                color="white"
                borderColor="whiteAlpha.600"
                leftIcon={<ExternalLinkIcon />}
                onClick={() => window.open("https://www.youtube.com/watch?v=JE_LsFrjcAA", "_blank")}
              >
                Open on YouTube
              </Button>
            </Flex>
          </motion.div>
        </VStack>

        {/* Modal video */}
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
          <ModalOverlay />
          <ModalContent borderRadius="lg" overflow="hidden">
            <AspectRatio ratio={16 / 9} w="100%">
              <iframe
                src="https://www.youtube.com/embed/JE_LsFrjcAA?autoplay=1"
                title="SwitchPay Demo"
                allowFullScreen
              />
            </AspectRatio>
          </ModalContent>
        </Modal>
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

      {/* LIVE METRICS */}
      <Section id="metrics" bg={useColorModeValue("linear(to-r, blue.50, white)", "linear(to-r, gray.800, gray.700)")}>
        <VStack align="start" spacing={6}>
          <Heading size="xl">Track the best KPIs</Heading>
          <Text color={subText}>Real data from your local instance via <code>/metrics</code>.</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={2}>
            <StatCard
              label="Total Volume"
              value={`${Number(metrics.total_volume ?? 0).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} €`}
            />
            <StatCard label="# Transactions" value={metrics.total_transactions ?? 0} />
            <GlowCard>
              <Stat>
                <StatLabel>By PSP</StatLabel>
                <StatNumber fontSize="lg">
                  {Object.entries(metrics.transactions_by_psp || {}).map(([k, v]) => (
                    <Badge key={k} mr={2} colorScheme="blue" variant="subtle">
                      {k}:{v}
                    </Badge>
                  ))}
                </StatNumber>
              </Stat>
            </GlowCard>
          </SimpleGrid>
        </VStack>
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
      <Section id="pricing" bg={useColorModeValue("linear(to-b, white, gray.50)", "linear(to-b, gray.900, gray.800)")}>
        <VStack spacing={10} align="center" textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Heading size="2xl" fontWeight="extrabold" mb={3}>
              Simple, transparent pricing.
            </Heading>
            <Text fontSize="lg" color={subText}>
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
              },
              {
                title: "Growth",
                price: "€99/mo",
                desc: "For scaling teams optimizing conversion.",
                features: ["10k tx/month", "Smart routing", "Failover & retries", "Advanced dashboard"],
                highlight: true,
              },
              {
                title: "Enterprise",
                price: "Custom",
                desc: "For global players needing reliability at scale.",
                features: ["Unlimited tx", "Dedicated PSP mix", "24/7 support", "SLAs & compliance"],
                highlight: false,
              },
            ].map((tier, i) => (
              <GlowCard
                key={i}
                p={8}
                borderWidth={tier.highlight ? "2px" : "1px"}
                borderColor={tier.highlight ? "brand.400" : borderCol}
                transition="all 0.35s ease"
                _hover={{
                  transform: "scale(1.06)",
                  boxShadow:
                    tier.highlight
                      ? "0 0 40px rgba(123, 63, 252, 0.6), 0 0 80px rgba(123, 63, 252, 0.3)"
                      : "0 0 25px rgba(35,104,245,0.3)",
                }}
                display="flex"
                flexDirection="column"
              >
                <VStack spacing={4} flex="1" align="stretch">
                  <Badge
                    alignSelf="center"
                    colorScheme={tier.highlight ? "purple" : "gray"}
                    variant={tier.highlight ? "solid" : "subtle"}
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {tier.title}
                  </Badge>
                  <Heading size="2xl" textAlign="center">{tier.price}</Heading>
                  <Text color={subText} mb={4} textAlign="center">{tier.desc}</Text>

                  <VStack spacing={2} align="start" flex="1">
                    {tier.features.map((f, idx) => (
                      <HStack key={idx} spacing={2}>
                        <CheckCircleIcon color="green.400" />
                        <Text>{f}</Text>
                      </HStack>
                    ))}
                  </VStack>

                  <Spacer />

                  <Magnetic>
                    <BrandButton mt={6} w="100%">
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

      {/* CONTACT */}
      <Section id="contact" bg={useColorModeValue("linear(to-r, white, gray.50)", "linear(to-r, gray.800, gray.900)")}>
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
      <ChatbotWidget />
    </Box>
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
