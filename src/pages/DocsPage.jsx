import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Code,
  Divider,
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
  List,
  ListItem,
  ListIcon,
  Button,
  HStack,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  WarningIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import GlowCard from "../components/GlowCard";
import { PSP_TABLE } from "../data/pspData";

const MotionBox = motion(Box);

const textColor = "rgba(255,255,255,0.55)";

const codeBoxProps = {
  bg: "rgba(0,0,0,0.4)",
  border: "1px solid",
  borderColor: "rgba(255,255,255,0.08)",
  borderLeftWidth: "3px",
  borderLeftColor: "rgba(99,102,241,0.5)",
  borderRadius: "xl",
  p: 4,
};

const accordionButtonProps = {
  color: "rgba(255,255,255,0.7)",
  _hover: { color: "white", bg: "rgba(255,255,255,0.04)" },
  borderRadius: "lg",
};

export default function DocsPage() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <Layout>
      <Helmet>
        <title>Developer Docs — switchpay</title>
        <meta name="description" content="switchpay API documentation: authentication, transaction routing, webhooks, and advanced features for borderless payment systems." />
      </Helmet>
      <Box py={24} bg="#030303" minH="100vh">
        <Container maxW="6xl">
          <VStack align="start" spacing={16}>

            {/* Header */}
            <MotionBox initial="hidden" animate="visible" variants={fadeIn} w="full">
              <HStack justify="space-between" w="full" wrap="wrap" gap={4}>
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, #a5b4fc, rgba(255,255,255,0.9), #fda4af)"
                  bgClip="text"
                >
                  switchpay Developer Docs
                </Heading>
                <Button
                  as={RouterLink}
                  to="/"
                  px={8}
                  py={5}
                  fontSize="md"
                  fontWeight="600"
                  borderRadius="full"
                  color="rgba(255,255,255,0.7)"
                  bg="rgba(255,255,255,0.04)"
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.1)"
                  backdropFilter="blur(12px)"
                  transition="all 0.35s ease"
                  _hover={{
                    bg: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(99,102,241,0.4)",
                    color: "white",
                    transform: "translateY(-2px) scale(1.03)",
                  }}
                >
                  ←
                </Button>
              </HStack>

              <Text fontSize="lg" color={textColor} maxW="3xl" mt={6} lineHeight="1.8">
                Build resilient, borderless payment systems with <b>switchpay's Routing API</b>.
                This documentation covers every endpoint, architectural concept, and real-world
                use case you need to scale from <b>0 → global</b>.
              </Text>
            </MotionBox>

            {/* Why Payment Routing Matters */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4} color="white">
                  <span role="img" aria-label="globe">🌍</span> Why Payment Routing Matters
                </Heading>
                <Text color={textColor} mb={4}>
                  The payment stack is a maze of APIs, acquirers, and local constraints. switchpay abstracts the complexity into one adaptive, intelligent routing layer.
                </Text>

                <Text color={textColor} mb={4}>
                  Below is a non-exhaustive overview of the current payment landscape:
                </Text>

                <Box
                  mt={8}
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.08)"
                  borderRadius="2xl"
                  overflow="hidden"
                  style={{ backdropFilter: "blur(12px)" }}
                  boxShadow="0 0 24px rgba(0,0,0,0.4)"
                >
                  <Box
                    maxH="70vh"
                    overflowY="auto"
                    overflowX="auto"
                    css={{
                      "&::-webkit-scrollbar": { height: "6px", width: "6px" },
                      "&::-webkit-scrollbar-thumb": {
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.95rem",
                      }}
                    >
                      <thead
                        style={{
                          position: "sticky",
                          top: 0,
                          background: "rgba(255,255,255,0.05)",
                          backdropFilter: "blur(12px)",
                          zIndex: 10,
                        }}
                      >
                        <tr>
                          {["PSP / Network", "Core Strength", "Primary Region"].map((col) => (
                            <th
                              key={col}
                              scope="col"
                              style={{
                                padding: "14px 16px",
                                textAlign: "left",
                                color: "rgba(255,255,255,0.6)",
                                fontWeight: "600",
                                fontSize: "0.72rem",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {PSP_TABLE.map(([psp, desc, region], i) => (
                          <tr
                            key={i}
                            style={{
                              backgroundColor:
                                i % 2 === 0
                                  ? "rgba(255,255,255,0.015)"
                                  : "rgba(255,255,255,0.03)",
                              transition: "background-color 0.2s ease",
                              borderBottom: "1px solid rgba(255,255,255,0.06)",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                i % 2 === 0
                                  ? "rgba(255,255,255,0.015)"
                                  : "rgba(255,255,255,0.03)")
                            }
                          >
                            <td style={{ padding: "12px 16px", color: "#fff", fontWeight: 500 }}>
                              {psp}
                            </td>
                            <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.65)" }}>
                              {desc}
                            </td>
                            <td style={{ padding: "12px 16px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "2px 10px",
                                  borderRadius: "9999px",
                                  background: "rgba(99,102,241,0.12)",
                                  border: "1px solid rgba(99,102,241,0.25)",
                                  color: "#a5b4fc",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {region}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </Box>

                <Divider my={6} borderColor="rgba(255,255,255,0.08)" />

                <Heading size="md" mb={3} color="white">
                  The switchpay Approach
                </Heading>
                <Text color={textColor}>
                  switchpay acts as a <b>meta-router</b> that intelligently selects which PSP should
                  process a given payment based on:
                </Text>
                <List spacing={2} mt={2} color={textColor}>
                  <ListItem><ListIcon as={CheckCircleIcon} color="#a5b4fc" /> Country & currency fit</ListItem>
                  <ListItem><ListIcon as={CheckCircleIcon} color="#a5b4fc" /> Real-time latency & uptime</ListItem>
                  <ListItem><ListIcon as={CheckCircleIcon} color="#a5b4fc" /> Cost-per-route optimization</ListItem>
                  <ListItem><ListIcon as={CheckCircleIcon} color="#a5b4fc" /> AI-based routing predictions</ListItem>
                </List>

                <Text mt={4} color={textColor}>
                  Think of it as the <b>Cloudflare of Payments</b> making your PSP stack smarter,
                  faster, and globally consistent.
                </Text>
              </GlowCard>
            </MotionBox>

            {/* Authentication */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4} color="white"><span role="img" aria-label="lock">🔐</span> Authentication</Heading>
                <Text color={textColor}>
                  Every request must include an{" "}
                  <Code bg="rgba(99,102,241,0.15)" color="#a5b4fc" px={1.5} borderRadius="md">
                    Authorization
                  </Code>{" "}
                  header with your API key.
                  Keys are environment-specific (<b>Sandbox</b> / <b>Production</b>).
                </Text>

                <Box {...codeBoxProps} mt={4}>
                  <Code whiteSpace="pre" bg="transparent" color="#67e8f9">
                    Authorization: Bearer YOUR_API_KEY
                  </Code>
                </Box>

                <Accordion mt={5} allowToggle>
                  <AccordionItem border="none">
                    <AccordionButton {...accordionButtonProps}>
                      <Box flex="1" textAlign="left">🔍 Key Types</Box>
                      <Box color="#a5b4fc"><AccordionIcon /></Box>
                    </AccordionButton>
                    <AccordionPanel bg="rgba(255,255,255,0.02)" borderRadius="lg">
                      <List spacing={2}>
                        <ListItem color={textColor}><ListIcon as={CheckCircleIcon} color="#a5b4fc" /> Sandbox — test payments only</ListItem>
                        <ListItem color={textColor}><ListIcon as={CheckCircleIcon} color="#a5b4fc" /> Production — live transactions</ListItem>
                        <ListItem color={textColor}><ListIcon as={WarningIcon} color="orange.400" /> Keep keys server-side only</ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            {/* Create a Transaction */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4} color="white"><span role="img" aria-label="credit card">💳</span> Create a Transaction</Heading>
                <Text color={textColor}>
                  The{" "}
                  <Code bg="rgba(99,102,241,0.15)" color="#a5b4fc" px={1.5} borderRadius="md">
                    POST /transaction
                  </Code>{" "}
                  endpoint automatically routes each payment
                  through the most efficient PSP.
                </Text>

                <Tabs mt={6} variant="enclosed" colorScheme="brand">
                  <TabList borderColor="rgba(255,255,255,0.1)">
                    <Tab
                      color="rgba(255,255,255,0.5)"
                      _selected={{ color: "white", borderColor: "rgba(255,255,255,0.2)", bg: "rgba(255,255,255,0.05)" }}
                    >
                      Request
                    </Tab>
                    <Tab
                      color="rgba(255,255,255,0.5)"
                      _selected={{ color: "white", borderColor: "rgba(255,255,255,0.2)", bg: "rgba(255,255,255,0.05)" }}
                    >
                      Response
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Box {...codeBoxProps}>
                        <Code whiteSpace="pre" bg="transparent" color="#67e8f9">{`POST /transaction
{
  "amount": 125.50,
  "currency": "EUR",
  "country": "FR",
  "device": "mobile"
}`}</Code>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box {...codeBoxProps}>
                        <Code whiteSpace="pre" bg="transparent" color="#67e8f9">{`{
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
                    <AccordionButton {...accordionButtonProps}>
                      <Box flex="1" textAlign="left"><span role="img" aria-label="settings">⚙️</span> Use Cases</Box>
                      <Box color="#a5b4fc"><AccordionIcon /></Box>
                    </AccordionButton>
                    <AccordionPanel bg="rgba(255,255,255,0.02)" borderRadius="lg">
                      <List spacing={3}>
                        <ListItem color={textColor}><ListIcon as={InfoIcon} color="#a5b4fc" /> Web checkout → route via backend API</ListItem>
                        <ListItem color={textColor}><ListIcon as={InfoIcon} color="#a5b4fc" /> Mobile apps → real-time routing</ListItem>
                        <ListItem color={textColor}><ListIcon as={InfoIcon} color="#a5b4fc" /> Failover → fallback to Adyen if Stripe fails</ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            {/* Retrieve Metrics */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4} color="white"><span role="img" aria-label="chart">📈</span> Retrieve Metrics</Heading>
                <Text color={textColor}>
                  Use{" "}
                  <Code bg="rgba(99,102,241,0.15)" color="#a5b4fc" px={1.5} borderRadius="md">
                    GET /metrics
                  </Code>{" "}
                  to monitor routing performance and PSP utilization.
                </Text>

                <Box {...codeBoxProps} mt={4}>
                  <Code whiteSpace="pre" bg="transparent" color="#67e8f9">{`GET /metrics
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
                    <AccordionButton {...accordionButtonProps}>
                      <Box flex="1" textAlign="left"><span role="img" aria-label="book">📘</span> Field Definitions</Box>
                      <Box color="#a5b4fc"><AccordionIcon /></Box>
                    </AccordionButton>
                    <AccordionPanel bg="rgba(255,255,255,0.02)" borderRadius="lg">
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} color={textColor}>
                        <Text><b>total_transactions:</b> Total number of processed payments.</Text>
                        <Text><b>total_volume:</b> Aggregate transaction value.</Text>
                        <Text><b>transactions_by_psp:</b> Volume breakdown by provider.</Text>
                      </SimpleGrid>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            {/* Advanced Features */}
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4} color="white"><span role="img" aria-label="lightning bolt">⚡</span> Advanced Features</Heading>
                <Accordion allowMultiple>
                  <AccordionItem border="none">
                    <AccordionButton {...accordionButtonProps}>
                      <Box flex="1" textAlign="left">Idempotency Keys</Box>
                      <Box color="#a5b4fc"><AccordionIcon /></Box>
                    </AccordionButton>
                    <AccordionPanel bg="rgba(255,255,255,0.02)" borderRadius="lg">
                      <Text color={textColor}>
                        Prevent duplicate payments by including an{" "}
                        <Code bg="rgba(99,102,241,0.15)" color="#a5b4fc" px={1.5} borderRadius="md">
                          Idempotency-Key
                        </Code>{" "}
                        in requests.
                      </Text>
                      <Box {...codeBoxProps} mt={3}>
                        <Code whiteSpace="pre" bg="transparent" color="#67e8f9">
                          Idempotency-Key: tx_2025_001
                        </Code>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem border="none">
                    <AccordionButton {...accordionButtonProps}>
                      <Box flex="1" textAlign="left">Webhooks</Box>
                      <Box color="#a5b4fc"><AccordionIcon /></Box>
                    </AccordionButton>
                    <AccordionPanel bg="rgba(255,255,255,0.02)" borderRadius="lg">
                      <Text color={textColor}>
                        Receive live transaction updates via webhooks.
                      </Text>
                      <Box {...codeBoxProps} mt={3}>
                        <Code whiteSpace="pre" bg="transparent" color="#67e8f9">{`POST /webhook
{
  "event": "transaction.completed",
  "data": { "id": "tx_9834ABC", "status": "success" }
}`}</Code>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem border="none">
                    <AccordionButton {...accordionButtonProps}>
                      <Box flex="1" textAlign="left">Smart Routing Logic</Box>
                      <Box color="#a5b4fc"><AccordionIcon /></Box>
                    </AccordionButton>
                    <AccordionPanel bg="rgba(255,255,255,0.02)" borderRadius="lg">
                      <List spacing={2} mt={2} color={textColor}>
                        <ListItem><ListIcon as={CheckCircleIcon} color="#a5b4fc" /> Live PSP latency & uptime tracking</ListItem>
                        <ListItem><ListIcon as={CheckCircleIcon} color="#a5b4fc" /> Route success rate optimization</ListItem>
                        <ListItem><ListIcon as={CheckCircleIcon} color="#a5b4fc" /> Fee & FX-based decision-making</ListItem>
                        <ListItem><ListIcon as={CheckCircleIcon} color="#a5b4fc" /> Predictive AI-driven routing</ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            <Divider borderColor="rgba(255,255,255,0.08)" />
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
}
