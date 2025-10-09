import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Code,
  Divider,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Badge,
  List,
  ListItem,
  ListIcon,
  Link as ChakraLink,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  WarningIcon,
  InfoIcon,
  ArrowLeftIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import GlowCard from "../components/GlowCard";
import EarthBackground from "../components/EarthBackground";

const MotionBox = motion(Box);

export default function DocsPage() {
  const codeBg = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  const fadeIn = {
    hidden: { opacity: 0,},
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <Layout>
      <Box
        py={24}
        position="relative"
        overflow="hidden"
        bg="linear-gradient(to-b, #030712, #0a1123, #0b1429)"
      >
        {/* === 3D Earth Background === */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          zIndex={0}
          opacity={0.3}
        >
          <EarthBackground />
        </Box>

        {/* ===== Main Container ===== */}
        <Container maxW="6xl" position="relative" zIndex={2}>
          <VStack align="start" spacing={16}>
            {/* ===== HEADER ===== */}
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              w="full"
            >
              <HStack justify="space-between" w="full">
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, brand.400, brand.100)"
                  bgClip="text"
                >
                  SwitchPay Developer Docs
                </Heading>
                <Button
  as={RouterLink}
  to="/"
  px={8}
  py={5}
  fontSize="md"
  fontWeight="600"
  letterSpacing="0.02em"
  borderRadius="full"
  color="whiteAlpha.900"
  bg="rgba(255, 255, 255, 0.05)"
  backdropFilter="blur(12px)"
  border="1px solid"
  borderColor="whiteAlpha.200"
  boxShadow="inset 0 0 12px rgba(255,255,255,0.05)"
  transition="all 0.35s ease"
  _hover={{
    bg: "rgba(255, 255, 255, 0.12)",
    boxShadow: "0 0 25px rgba(255, 255, 255, 0.2)",
    transform: "translateY(-2px) scale(1.03)",
  }}
  _active={{
    transform: "translateY(-1px) scale(1.01)",
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
  }}
>
  ← Back to Home
</Button>

              </HStack>

              <Text
                fontSize="lg"
                color={textColor}
                maxW="3xl"
                mt={6}
                lineHeight="1.8"
              >
                Integrate SwitchPay’s <b>smart payment routing engine</b> in
                minutes. Build resilient payment systems powered by intelligent
                routing across global PSPs. Below you’ll find every API endpoint,
                real-world context, and the philosophy behind our architecture.
              </Text>
            </MotionBox>

            {/* ===== WHY SWITCHPAY ===== */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4}>
                  🌍 The Global Payment Fragmentation Problem
                </Heading>
                <Text color={textColor} mb={4}>
                  The global payment ecosystem is divided between dozens of PSPs
                  (Payment Service Providers), each dominating specific
                  geographies, industries, or currencies. This fragmentation
                  leads to technical overhead, poor optimization, and lost
                  revenue opportunities.
                </Text>

                <Table variant="striped" color={textColor} mb={6} size="sm">
  <Tbody>
    {/* 🌍 Global & Developer-first */}
    <Tr>
      <Td>Stripe</Td>
      <Td>Developer-first APIs, SaaS billing, embedded payments</Td>
      <Td>US, Western Europe</Td>
    </Tr>
    <Tr>
      <Td>Adyen</Td>
      <Td>Enterprise-grade, unified commerce, direct acquiring</Td>
      <Td>Europe, North America</Td>
    </Tr>
    <Tr>
      <Td>Checkout.com</Td>
      <Td>Digital-native, crypto & marketplace support</Td>
      <Td>UK, Global</Td>
    </Tr>
    <Tr>
      <Td>Rapyd</Td>
      <Td>Global local-payment network, 900+ methods, fintech-as-a-service</Td>
      <Td>LATAM, APAC, MENA</Td>
    </Tr>
    <Tr>
      <Td>Airwallex</Td>
      <Td>FX optimization, global accounts, payouts</Td>
      <Td>APAC, expanding in EU & US</Td>
    </Tr>
    <Tr>
      <Td>Wise</Td>
      <Td>Cross-border FX, transparent B2B transfers</Td>
      <Td>Global</Td>
    </Tr>

    {/* 🌎 Emerging Market Specialists */}
    <Tr>
      <Td>dLocal</Td>
      <Td>Local payment rails & compliance for emerging markets</Td>
      <Td>LATAM, Africa, SEA</Td>
    </Tr>
    <Tr>
      <Td>PayU</Td>
      <Td>Alternative methods, BNPL, strong local acquiring</Td>
      <Td>India, LATAM, Eastern Europe</Td>
    </Tr>
    <Tr>
      <Td>Flutterwave</Td>
      <Td>Mobile money & cards infrastructure</Td>
      <Td>Africa</Td>
    </Tr>
    <Tr>
      <Td>Interswitch</Td>
      <Td>Domestic card rails, POS & online acquiring</Td>
      <Td>Nigeria, Africa</Td>
    </Tr>
    <Tr>
      <Td>Paystack</Td>
      <Td>SME online payments, developer-friendly APIs</Td>
      <Td>West Africa</Td>
    </Tr>
    <Tr>
      <Td>CCAvenue</Td>
      <Td>Local PSP with 200+ payment methods</Td>
      <Td>India</Td>
    </Tr>
    <Tr>
      <Td>Mollie</Td>
      <Td>SME & eCommerce focus, easy onboarding</Td>
      <Td>Benelux, DACH</Td>
    </Tr>

    {/* 💳 Enterprise & Retail Legacy PSPs */}
    <Tr>
      <Td>Worldpay (FIS)</Td>
      <Td>Legacy PSP, retail acquiring, enterprise infra</Td>
      <Td>North America, Europe</Td>
    </Tr>
    <Tr>
      <Td>Fiserv / Clover</Td>
      <Td>POS & merchant acquiring, legacy infra</Td>
      <Td>US, Global</Td>
    </Tr>
    <Tr>
      <Td>Global Payments</Td>
      <Td>Omnichannel acquiring, merchant network</Td>
      <Td>North America, EU</Td>
    </Tr>
    <Tr>
      <Td>Network International</Td>
      <Td>Acquiring + processing for GCC markets</Td>
      <Td>MENA</Td>
    </Tr>

    {/* 💡 New Orchestrators & Meta-Layers */}
    <Tr>
      <Td>Primer</Td>
      <Td>No-code orchestration, routing logic, analytics</Td>
      <Td>Europe, expanding US</Td>
    </Tr>
    <Tr>
      <Td>CellPoint Digital</Td>
      <Td>Airline/travel orchestration, FX optimization</Td>
      <Td>EMEA, Global</Td>
    </Tr>
    <Tr>
      <Td>BR-DGE</Td>
      <Td>Payment orchestration for retail</Td>
      <Td>UK, EU</Td>
    </Tr>
    <Tr>
      <Td>Rebilly</Td>
      <Td>Subscription & recurring payment orchestration</Td>
      <Td>North America</Td>
    </Tr>

    {/* 📱 Device- & Method-specific PSPs */}
    <Tr>
      <Td>Apple Pay / Google Pay</Td>
      <Td>Device-native tokenized payments</Td>
      <Td>Global, consumer-centric</Td>
    </Tr>
    <Tr>
      <Td>Alipay / WeChat Pay</Td>
      <Td>Mobile superapps, QR & social payments</Td>
      <Td>China, expanding APAC</Td>
    </Tr>
    <Tr>
      <Td>Paytm</Td>
      <Td>QR payments, wallet, merchant services</Td>
      <Td>India</Td>
    </Tr>
    <Tr>
      <Td>GrabPay / GCash</Td>
      <Td>Superapp wallets, BNPL integrations</Td>
      <Td>SEA (Singapore, Philippines)</Td>
    </Tr>
    <Tr>
      <Td>M-Pesa</Td>
      <Td>Telco-led mobile money ecosystem</Td>
      <Td>East Africa</Td>
    </Tr>

    {/* 🪙 Crypto & Alt-Rail PSPs */}
    <Tr>
      <Td>Unlimint</Td>
      <Td>Multi-rail PSP, cards + crypto + alt payments</Td>
      <Td>Global</Td>
    </Tr>
    <Tr>
      <Td>MoonPay</Td>
      <Td>Crypto on-ramp/off-ramp for fintechs</Td>
      <Td>Global</Td>
    </Tr>
    <Tr>
      <Td>Transak</Td>
      <Td>Fiat-crypto gateway for dApps</Td>
      <Td>Global</Td>
    </Tr>

    {/* 🧱 Infrastructure & Settlement */}
    <Tr>
      <Td>Thunes</Td>
      <Td>Cross-border settlement layer, mobile wallets</Td>
      <Td>Africa, APAC, Middle East</Td>
    </Tr>
    <Tr>
      <Td>Payoneer</Td>
      <Td>Marketplace payouts, SME cross-border B2B</Td>
      <Td>Global</Td>
    </Tr>
    <Tr>
      <Td>Nuvei</Td>
      <Td>Unified payments, gaming, high-risk sectors</Td>
      <Td>North America, EU</Td>
    </Tr>
    <Tr>
      <Td>Paddle</Td>
      <Td>SaaS billing, tax compliance, recurring payments</Td>
      <Td>UK, EU, North America</Td>
    </Tr>
  </Tbody>
</Table>

                <Text color={textColor}>
                  Each PSP offers distinct advantages — but no single one can
                  cover every geography efficiently. Businesses often integrate
                  multiple PSPs manually, a costly and time-consuming process.
                </Text>

                <Divider my={6} />

                <Heading size="md" mb={3}>
                  💡 SwitchPay’s Mission
                </Heading>
                <Text color={textColor}>
                  SwitchPay acts as a <b>meta-router</b> that sits between your
                  backend and your PSPs. We dynamically decide which provider
                  should process a payment based on:
                </Text>
                <List spacing={2} mt={2}>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.400" />
                    Country & currency optimization
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.400" />
                    Real-time latency & success rates
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.400" />
                    PSP uptime monitoring
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckCircleIcon} color="green.400" />
                    Cost efficiency per payment route
                  </ListItem>
                </List>

                <Text mt={4} color={textColor}>
                  Think of SwitchPay as the <b>Cloudflare of Payments</b> — we
                  don’t replace your PSPs, we make them smarter, faster, and
                  globally consistent.
                </Text>
              </GlowCard>
            </MotionBox>

            {/* ===== AUTHENTICATION ===== */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4}>
                   *Authentication
                </Heading>
                <Text color={textColor}>
                  All API calls require a valid <Code>API key</Code> included in
                  the <Code>Authorization</Code> header. Keys are environment
                  scoped (sandbox or production).
                </Text>

                <Box mt={4} bg={codeBg} p={4} borderRadius="md">
                  <Code whiteSpace="pre">
                    Authorization: Bearer YOUR_API_KEY
                  </Code>
                </Box>

                <Accordion mt={5} allowToggle reduceMotion>
                  <AccordionItem border="none">
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        🔍 Key Types & Security
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <List spacing={2}>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} color="green.400" />
                          <b>Sandbox key:</b> test payments only.
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} color="green.400" />
                          <b>Production key:</b> live transactions.
                        </ListItem>
                        <ListItem>
                          <ListIcon as={WarningIcon} color="orange.400" />
                          Keep keys server-side only.
                        </ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            {/* ===== TRANSACTIONS ===== */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4}>
                  Create a Transaction
                </Heading>
                <Text color={textColor}>
                  The <Code>POST /transaction</Code> endpoint routes each payment
                  through the most efficient PSP automatically.
                </Text>

                <Tabs mt={6} variant="enclosed" colorScheme="brand">
                  <TabList>
                    <Tab>Request</Tab>
                    <Tab>Response</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Box bg={codeBg} p={4} borderRadius="md">
                        <Code whiteSpace="pre">{`POST /transaction
{
  "amount": 125.50,
  "currency": "EUR",
  "country": "FR",
  "device": "mobile"
}`}</Code>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box bg={codeBg} p={4} borderRadius="md">
                        <Code whiteSpace="pre">{`{
  "transaction_id": "tx_9834ABC",
  "psp": "Stripe",
  "status": "success",
  "latency_ms": 214,
  "fees": 0.35
}`}</Code>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>

                <Accordion allowToggle mt={6}>
                  <AccordionItem border="none">
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        ⚙️ Use Cases
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <List spacing={3}>
                        <ListItem>
                          <ListIcon as={InfoIcon} color="blue.400" />
                          Web checkout: route via backend API to SwitchPay.
                        </ListItem>
                        <ListItem>
                          <ListIcon as={InfoIcon} color="blue.400" />
                          Mobile apps: real-time routing per transaction.
                        </ListItem>
                        <ListItem>
                          <ListIcon as={InfoIcon} color="blue.400" />
                          Failover: fallback to Adyen if Stripe fails.
                        </ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            {/* ===== METRICS ===== */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4}>
                  Retrieve Metrics
                </Heading>
                <Text color={textColor}>
                  Use <Code>GET /metrics</Code> to monitor live routing
                  performance and PSP utilization.
                </Text>

                <Box mt={4} bg={codeBg} p={4} borderRadius="md">
                  <Code whiteSpace="pre">{`GET /metrics
{
  "total_transactions": 487231,
  "total_volume": 12500000,
  "transactions_by_psp": {
    "Stripe": 238121,
    "Adyen": 132893,
    "Rapyd": 77320,
    "Wise": 3897
  }
}`}</Code>
                </Box>

                <Accordion mt={5} allowToggle>
                  <AccordionItem border="none">
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        📘 Field Definitions
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                        <Text>
                          <b>total_transactions:</b> Total number of processed
                          payments.
                        </Text>
                        <Text>
                          <b>total_volume:</b> Aggregate value of processed
                          payments.
                        </Text>
                        <Text>
                          <b>transactions_by_psp:</b> Breakdown by provider.
                        </Text>
                      </SimpleGrid>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            {/* ===== ADVANCED FEATURES ===== */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4}>
                  ⚡ Advanced Features
                </Heading>
                <Accordion allowMultiple>
                  <AccordionItem border="none">
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Idempotency Keys
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Text color={textColor}>
                        Prevent duplicate payments by using an
                        <Code>Idempotency-Key</Code>.
                      </Text>
                      <Box mt={3} bg={codeBg} p={3} borderRadius="md">
                        <Code whiteSpace="pre">{`Idempotency-Key: tx_2025_001`}</Code>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem border="none">
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Webhooks
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Text color={textColor}>
                        Receive transaction updates in real time with
                        webhooks.
                      </Text>
                      <Box mt={3} bg={codeBg} p={3} borderRadius="md">
                        <Code whiteSpace="pre">{`POST /webhook
{
  "event": "transaction.completed",
  "data": { "id": "tx_9834ABC", "status": "success" }
}`}</Code>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem border="none">
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Smart Routing Logic
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <List spacing={2} mt={2}>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} color="green.400" />
                          Live PSP latency and uptime monitoring
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} color="green.400" />
                          Transaction success rate analysis
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} color="green.400" />
                          Fee & FX-based route optimization
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CheckCircleIcon} color="green.400" />
                          Predictive AI routing recommendations
                        </ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            {/* ===== FOOTER ===== */}
            <Divider />
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
}
