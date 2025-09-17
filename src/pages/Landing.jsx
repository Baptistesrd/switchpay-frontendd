import React, { useEffect, useState } from "react";
import {
  Box, Container, Flex, HStack, VStack, Stack, Spacer, Button, IconButton,
  Heading, Text, Badge, SimpleGrid, Stat, StatLabel, StatNumber, useColorMode,
  useColorModeValue, Link as ChakraLink, Divider, Tag, TagLeftIcon, TagLabel, Icon, Tooltip,
  AspectRatio
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, LockIcon, CheckCircleIcon, TimeIcon, ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
import { motion, useMotionValue, animate } from "framer-motion";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

import AnimatedParticles from "../components/AnimatedParticles";
import GlowBlob from "../components/GlowBlob";
import GlowCard from "../components/GlowCard";
import HowItWorksTimeline from "../components/HowItWorksTimeline";

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

  const pageBg = useColorModeValue(
    "linear(to-b, #f7faff, #eef3ff, #eaf0ff)",
    "linear(to-b, #0a0f1f, #0f172a, #0b1220)"
  );
  const subText = useColorModeValue("gray.600", "gray.300");
  const borderCol = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  const [metrics, setMetrics] = useState({ total_transactions: 0, total_volume: 0, transactions_by_psp: {} });
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

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box position="relative" overflow="hidden" bgGradient={pageBg} minH="100vh">
      {/* NAVBAR */}
      <Box
        position="sticky"
        top="0"
        zIndex="100"
        bg={useColorModeValue("rgba(255,255,255,0.75)", "rgba(10,15,31,0.65)")}
        backdropFilter="saturate(180%) blur(10px)"
        borderBottom="1px solid"
        borderColor={borderCol}
      >
        <Container maxW="6xl">
          <Flex h={16} align="center">
            <HStack spacing={3}>
              <Box w="10px" h="10px" borderRadius="full" bgGradient="linear(to-br, brand.400, brand.600)" />
              <Heading size="md">SwitchPay</Heading>
              <Tag size="sm" variant="subtle" colorScheme="purple" ml={2}>
                <TagLeftIcon as={StarIcon} />
                <TagLabel>Fintech Infra</TagLabel>
              </Tag>
            </HStack>
            <Spacer />
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
              <ChakraLink as="button" onClick={() => scrollTo("#contact")} _hover={{ color: "brand.500" }}>
                Contact
              </ChakraLink>
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
      <Box as="header" position="relative">
        <Box position="absolute" inset={0} zIndex={0}>
          <AnimatedParticles />
          <GlowBlob top="6%" left="65%" size="520px" delay={0.2} />
          <GlowBlob top="58%" left="10%" size="460px" delay={0.6} />
        </Box>

        <Section id="hero">
          <Stack direction={{ base: "column", md: "row" }} spacing={10} align="center">
            <VStack align="start" spacing={6} maxW="xl">
              <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>
                Smart Payment Routing
              </Badge>
              <Heading as="h1" size="2xl" lineHeight="1.1">
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
                <MiniKpis metrics={metrics} />
                <Text fontSize="sm" color={subText}>
                  Local demo: connected to your FastAPI backend (endpoints <code>/transaction</code> &{" "}
                  <code>/metrics</code>).
                </Text>
              </VStack>
            </GlowCard>
          </Stack>
        </Section>
      </Box>

      <SoftSeparator />

      {/* HOW IT WORKS */}
      <Section id="how">
        <VStack align="start" spacing={8}>
          <Heading size="xl">How it works</Heading>
          <HowItWorksTimeline />
        </VStack>
      </Section>

      <SoftSeparator />

      {/* DEMO VIDEO */}
      <Section id="demo" bg={useColorModeValue("linear(to-r, white, blue.50)", "linear(to-r, gray.900, gray.800)")}>
        <VStack spacing={6} align="center">
          <Heading size="xl">Product Demo</Heading>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ width: "100%", maxWidth: "800px" }}
          >
            <AspectRatio ratio={16 / 9} w="100%">
              <iframe
                src="https://www.youtube.com/embed/JE_LsFrjcAA"
                title="SwitchPay Demo"
                allowFullScreen
              />
            </AspectRatio>
          </motion.div>
        </VStack>
      </Section>

      <SoftSeparator />

      {/* WHY SWITCHPAY */}
      <Section
        id="why"
        bg={useColorModeValue("linear(to-b, white, purple.50)", "linear(to-b, gray.800, gray.900)")}
      >
        <VStack align="start" spacing={8}>
          <Heading size="xl">Why SwitchPay</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <ValueCard title="Plug & Play" text="Integrate in minutes. A ready-to-use backend (FastAPI) and frontend (React) built for fast iteration and seamless scaling." />
            <ValueCard title="Idempotency by design" text="Never lose sleep over duplicate payments. Every request is safe: same key for same response, always." />
            <ValueCard title="Observability" text="Track what matters. Get real-time KPIs, transaction volumes, and PSP distribution straight from metrics" />
          </SimpleGrid>
        </VStack>
      </Section>

      <SoftSeparator />

      {/* LIVE METRICS */}
      <Section
        id="metrics"
        bg={useColorModeValue("linear(to-r, blue.50, white)", "linear(to-r, gray.800, gray.700)")}
      >
        <VStack align="start" spacing={6}>
          <Heading size="xl">Live Metrics</Heading>
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

      <SoftSeparator />

      {/* SECURITY */}
      <Section
        id="security"
        bg={useColorModeValue("linear(to-r, gray.50, white)", "linear(to-r, gray.900, gray.800)")}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
          <VStack align="start" spacing={6}>
            <Heading size="xl">Security & Reliability</Heading>
            <Text color={subText}>
              Start with simulated PSPs and switch seamlessly to real providers (Stripe, Adyen, Wise…) when you’re ready.
            </Text>
            <HStack spacing={4}>
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

      <SoftSeparator />

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

      <SoftSeparator />

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
              <Tooltip label="Substack">
                <Button
                  as="a"
                  href="https://substack.com/@baptistesardou?utm_source=user-menu"
                  target="_blank"
                  rel="noreferrer"
                  leftIcon={<Icon as={SiSubstack} />}
                  variant="outline"
                >
                  Substack
                </Button>
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
              <ChakraLink as="a" href="https://x.com/baptiste_sardou" isExternal>
                X
              </ChakraLink>
              <ChakraLink as="a" href="https://www.linkedin.com/in/baptiste-sardou-789114288/" isExternal>
                LinkedIn
              </ChakraLink>
              <ChakraLink as="a" href="https://substack.com/@baptistesardou?utm_source=user-menu" isExternal>
                Substack
              </ChakraLink>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

/* === Helpers === */
function SoftSeparator() {
  const sep = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  return (
    <Container maxW="6xl">
      <Box mt={{ base: 2, md: 4 }} mb={{ base: 2, md: 4 }} h="1px" bgGradient={`linear(to-r, transparent, ${sep}, transparent)`} />
    </Container>
  );
}

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
