import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  useColorModeValue,
  Divider,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import MagneticButton from "./components/MagneticButton";
import GhostMagneticButton from "./components/GhostMagneticButton";
import Counter from "./components/Counter";
import DashCharts from "./components/DashCharts";
import GlowCard from "./components/GlowCard";
import BackgroundFX from "./components/BackgroundFX";
import Navbar from "./components/Navbar";

const MotionBox = motion(Box);

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate(); // ✅ navigation React Router

  const boxBg = useColorModeValue(
    "rgba(255,255,255,0.8)",
    "rgba(15,23,42,0.8)"
  );
  const borderCol = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const tabSelectedBg = useColorModeValue("white", "gray.800");

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/transactions`, {
        headers: { "x-api-key": API_KEY },
      });
      setTransactions(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totalAmount = useMemo(
    () =>
      transactions.reduce((acc, tx) => acc + Number(tx.montant || 0), 0),
    [transactions]
  );

  const count = transactions.length;
  const successCount = transactions.filter(
    (tx) => tx.status === "success"
  ).length;
  const failCount = count - successCount;
  const successRate =
    count > 0 ? Math.round((successCount / count) * 100) : 0;

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      <BackgroundFX fixed />
      <Navbar />

      <Box
        position="relative"
        zIndex={1}
        maxW="7xl"
        mx="auto"
        px={6}
        py={16}
      >
        {/* Hero */}
        <Box textAlign="center" mb={16}>
          <Heading
            as="h1"
            fontSize={{ base: "5xl", md: "7xl", lg: "8xl" }}
            fontWeight="extrabold"
            lineHeight="1.1"
          >
            Start a transaction{" "}
            <Box as="span" color="brand.500">
              now.
            </Box>
          </Heading>
          <Heading
            as="h2"
            mt={4}
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, brand.500, brand.300)"
            bgClip="text"
          ></Heading>
          <HStack spacing={4} justify="center" mt={8}>
            <MagneticButton type="button">Get Started</MagneticButton>
            <GhostMagneticButton
              type="button"
              onClick={() => navigate("/contact")}
            >
              Contact us
            </GhostMagneticButton>
          </HStack>
        </Box>

        {/* Tabs */}
        <Tabs variant="enclosed" colorScheme="purple" isFitted>
          <TabList mb={6} borderColor={borderCol}>
            {["New Transaction", "Transaction History", "Dashboard"].map(
              (label) => (
                <Tab
                  key={label}
                  fontWeight="semibold"
                  _selected={{
                    color: "brand.500",
                    borderColor: borderCol,
                    bg: tabSelectedBg,
                    borderTop: "3px solid",
                    borderTopColor: "brand.500",
                  }}
                >
                  {label}
                </Tab>
              )
            )}
          </TabList>

          <TabPanels>
            <TabPanel>
              <GlowCard p={8} interactive={false}>
                <Heading size="md" mb={2}>
                  New Transaction
                </Heading>
                <Text mb={6} color={useColorModeValue("gray.600", "gray.300")}>
                  Fill the form and send — routing happens in your FastAPI backend.
                </Text>
                <TransactionForm onNewTransaction={fetchTransactions} />
              </GlowCard>

            </TabPanel>

            <TabPanel>
              <GlowCard p={6}>
                <HStack
                  justify="space-between"
                  mb={4}
                  wrap="wrap"
                  spacing={3}
                >
                  <HStack spacing={3}>
                    <Badge colorScheme="blue">Total: {count}</Badge>
                    <Badge colorScheme="green">Success: {successCount}</Badge>
                    <Badge colorScheme="red">Failed: {failCount}</Badge>
                  </HStack>
                  <MagneticButton type="button">Download CSV</MagneticButton>
                </HStack>
                <TransactionTable transactions={transactions} />
              </GlowCard>
            </TabPanel>

            <TabPanel>
              <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={8}>
                <KpiCard label="Total Volume">
                  <StatNumber>
                    <Counter to={totalAmount} isMoney decimals={2} />
                  </StatNumber>
                </KpiCard>
                <KpiCard label="# Transactions">
                  <StatNumber>
                    <Counter to={count} />
                  </StatNumber>
                </KpiCard>
                <KpiCard label="Success Rate">
                  <StatNumber>{successRate}%</StatNumber>
                </KpiCard>
                <KpiCard label="Failures">
                  <StatNumber>
                    <Counter to={failCount} />
                  </StatNumber>
                </KpiCard>
              </SimpleGrid>

              <GlowCard p={6}>
                <Heading size="md" mb={4}>
                  Analytics
                </Heading>
                <Divider mb={4} />
                <DashCharts transactions={transactions} />
              </GlowCard>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

function KpiCard({ label, children }) {
  return (
    <GlowCard p={6}>
      <Stat>
        <StatLabel>{label}</StatLabel>
        {children}
      </Stat>
    </GlowCard>
  );
}
