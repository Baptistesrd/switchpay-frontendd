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
import FeatureChip from "./components/FeatureChip";
import Landing from "./pages/Landing";

const MotionBox = motion(Box);

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

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
    () => transactions.reduce((acc, tx) => acc + Number(tx.montant || 0), 0),
    [transactions]
  );

  const count = transactions.length;
  const successCount = transactions.filter((tx) => tx.status === "success").length;
  const failCount = count - successCount;
  const successRate = count > 0 ? Math.round((successCount / count) * 100) : 0;
  console.log("Components:", { FeatureChip, GlowCard, Landing });


  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* --- Background premium --- */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-br, #0f172a, #1e1b4b, #312e81)"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          bg: "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25), transparent 40%)",
        }}
        _after={{
          content: '""',
          position: "absolute",
          inset: 0,
          bg: "radial-gradient(circle at 80% 70%, rgba(236,72,153,0.2), transparent 50%)",
        }}
      />
      <BackgroundFX fixed />

      <Navbar />

      <Box position="relative" zIndex={1} maxW="7xl" mx="auto" px={6} py={16}>
        {/* --- Hero section --- */}
        <MotionBox
          textAlign="center"
          mb={16}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "5xl", md: "7xl", lg: "8xl" }}
            fontWeight="extrabold"
            lineHeight="1.1"
          >
            Start a transaction{" "}
            <Box as="span" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text">
              now.
            </Box>
          </Heading>
          <HStack spacing={4} justify="center" mt={10}>
            <GhostMagneticButton type="button" onClick={() => navigate("/contact")}>
              Contact Us
            </GhostMagneticButton>
          </HStack>
        </MotionBox>

        {/* --- Tabs navigation --- */}
        <Tabs variant="soft-rounded" colorScheme="purple" isFitted>
          <TabList mb={8}>
            {["New Transaction", "Transaction History", "Dashboard"].map((label) => (
              <Tab
                key={label}
                fontWeight="semibold"
                _selected={{
                  color: "white",
                  bgGradient: "linear(to-r, brand.500, brand.300)",
                }}
                _hover={{ bg: "whiteAlpha.100" }}
              >
                {label}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {/* --- New Transaction --- */}
            <TabPanel>
              <GlowCard p={8} interactive={false}>
                <Heading size="md" mb={2}>
                  New Transaction
                </Heading>
                <Text mb={6} color="gray.400">
                  Fill the form and send — routing happens in your FastAPI backend.
                </Text>
                <TransactionForm onNewTransaction={fetchTransactions} />
              </GlowCard>
            </TabPanel>

            {/* --- Transaction History --- */}
            <TabPanel>
              <GlowCard p={6}>
                <HStack justify="space-between" mb={4} wrap="wrap" spacing={3}>
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

            {/* --- Dashboard --- */}
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

/* --- KPI Card --- */
function KpiCard({ label, children }) {
  return (
    <GlowCard p={6}>
      <Stat>
        <StatLabel color="gray.400" fontWeight="medium">
          {label}
        </StatLabel>
        {children}
      </Stat>
    </GlowCard>
  );
}
