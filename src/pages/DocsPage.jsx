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

export default function DocsPage() {
  const codeBg = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <Layout>
      <Box
        py={24}
        bg="linear-gradient(to-b, #030712, #0a1123, #0b1429)"
        minH="100vh"
      >
        <Container maxW="6xl">
          <VStack align="start" spacing={16}>
            <MotionBox initial="hidden" animate="visible" variants={fadeIn} w="full">
              <HStack justify="space-between" w="full">
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, brand.400, brand.100)"
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
                  color="whiteAlpha.900"
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  backdropFilter="blur(12px)"
                  transition="all 0.35s ease"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 0 25px rgba(255, 255, 255, 0.2)",
                    transform: "translateY(-2px) scale(1.03)",
                  }}
                >
                  ← Back to Home
                </Button>
              </HStack>

              <Text fontSize="lg" color={textColor} maxW="3xl" mt={6} lineHeight="1.8">
                Build resilient, borderless payment systems with <b>switchpay’s Routing API</b>.
                This documentation covers every endpoint, architectural concept, and real-world
                use case you need to scale from <b>0 → global</b>.
              </Text>
            </MotionBox>

            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4}>
                  🌍 Why Payment Routing Matters
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
  borderColor="whiteAlpha.200"
  borderRadius="2xl"
  overflow="hidden"
  backdropFilter="blur(8px)"
  boxShadow="0 0 24px rgba(255,255,255,0.05)"
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
          background:
            "linear-gradient(to right, rgba(46,55,90,0.9), rgba(20,24,38,0.9))",
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <tr>
          <th
            style={{
              padding: "14px 16px",
              textAlign: "left",
              color: "white",
              fontWeight: "600",
              letterSpacing: "0.03em",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            PSP / Network
          </th>
          <th
            style={{
              padding: "14px 16px",
              textAlign: "left",
              color: "white",
              fontWeight: "600",
              letterSpacing: "0.03em",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Core Strength
          </th>
          <th
            style={{
              padding: "14px 16px",
              textAlign: "left",
              color: "white",
              fontWeight: "600",
              letterSpacing: "0.03em",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Primary Region
          </th>
        </tr>
      </thead>

      <tbody>
        {PSP_TABLE.map(([psp, desc, region], i) => (
          <tr
            key={i}
            style={{
              backgroundColor:
                i % 2 === 0
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(255,255,255,0.04)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                i % 2 === 0
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(255,255,255,0.04)")
            }
          >
            <td style={{ padding: "12px 16px", color: "#fff", fontWeight: 500 }}>
              {psp}
            </td>
            <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.8)" }}>
              {desc}
            </td>
            <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.7)" }}>
              {region}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
</Box>


                <Divider my={6} />

                <Heading size="md" mb={3}>
                 The switchpay Approach
                </Heading>
                <Text color={textColor}>
                  switchpay acts as a <b>meta-router</b> that intelligently selects which PSP should
                  process a given payment based on:
                </Text>
                <List spacing={2} mt={2} color={textColor}>
                  <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> Country & currency fit</ListItem>
                  <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> Real-time latency & uptime</ListItem>
                  <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> Cost-per-route optimization</ListItem>
                  <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> AI-based routing predictions</ListItem>
                </List>

                <Text mt={4} color={textColor}>
                  Think of it as the <b>Cloudflare of Payments</b> making your PSP stack smarter,
                  faster, and globally consistent.
                </Text>
              </GlowCard>
            </MotionBox>

            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4}>🔐 Authentication</Heading>
                <Text color={textColor}>
                  Every request must include an <Code>Authorization</Code> header with your API key.
                  Keys are environment-specific (<b>Sandbox</b> / <b>Production</b>).
                </Text>

                <Box mt={4} bg={codeBg} p={4} borderRadius="md">
                  <Code whiteSpace="pre">Authorization: Bearer YOUR_API_KEY</Code>
                </Box>

                <Accordion mt={5} allowToggle>
                  <AccordionItem border="none">
                    <AccordionButton>
                      <Box flex="1" textAlign="left">🔍 Key Types</Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <List spacing={2}>
                        <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> Sandbox — test payments only</ListItem>
                        <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> Production — live transactions</ListItem>
                        <ListItem><ListIcon as={WarningIcon} color="orange.400" /> Keep keys server-side only</ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4}>💳 Create a Transaction</Heading>
                <Text color={textColor}>
                  The <Code>POST /transaction</Code> endpoint automatically routes each payment
                  through the most efficient PSP.
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
                      <Box flex="1" textAlign="left">⚙️ Use Cases</Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <List spacing={3}>
                        <ListItem><ListIcon as={InfoIcon} color="blue.400" /> Web checkout → route via backend API</ListItem>
                        <ListItem><ListIcon as={InfoIcon} color="blue.400" /> Mobile apps → real-time routing</ListItem>
                        <ListItem><ListIcon as={InfoIcon} color="blue.400" /> Failover → fallback to Adyen if Stripe fails</ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4}>📈 Retrieve Metrics</Heading>
                <Text color={textColor}>
                  Use <Code>GET /metrics</Code> to monitor routing performance and PSP utilization.
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
                      <Box flex="1" textAlign="left">📘 Field Definitions</Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
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

            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              w="full"
            >
              <GlowCard p={10}>
                <Heading size="lg" mb={4}>⚡ Advanced Features</Heading>
                <Accordion allowMultiple>
                  <AccordionItem border="none">
                    <AccordionButton>
                      <Box flex="1" textAlign="left">Idempotency Keys</Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Text color={textColor}>
                        Prevent duplicate payments by including an <Code>Idempotency-Key</Code> in requests.
                      </Text>
                      <Box mt={3} bg={codeBg} p={3} borderRadius="md">
                        <Code whiteSpace="pre">Idempotency-Key: tx_2025_001</Code>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem border="none">
                    <AccordionButton>
                      <Box flex="1" textAlign="left">Webhooks</Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Text color={textColor}>
                        Receive live transaction updates via webhooks.
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
                      <Box flex="1" textAlign="left">Smart Routing Logic</Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <List spacing={2} mt={2} color={textColor}>
                        <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> Live PSP latency & uptime tracking</ListItem>
                        <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> Route success rate optimization</ListItem>
                        <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> Fee & FX-based decision-making</ListItem>
                        <ListItem><ListIcon as={CheckCircleIcon} color="green.400" /> Predictive AI-driven routing</ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GlowCard>
            </MotionBox>

            <Divider />
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
}
