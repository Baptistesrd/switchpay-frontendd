import { useEffect, useMemo, useState } from "react";
import {
  Box, Heading, Button, Flex, Spacer, useColorMode,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Stat, StatLabel, StatNumber, SimpleGrid, useColorModeValue,
  HStack, Text, IconButton, Tooltip, useToast, Badge, VStack, Divider
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, DownloadIcon, RepeatIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import axios from "axios";

import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import MagneticButton from "./components/MagneticButton";
import Counter from "./components/Counter";
import DashCharts from "./components/DashCharts";

import GlowCard from "./components/GlowCard";
import BackgroundFX from "./components/BackgroundFX";
const MotionBox = motion(Box);



export default function App() {
  const [transactions, setTransactions] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const API_KEY = process.env.REACT_APP_API_KEY;
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const boxBg = useColorModeValue("rgba(255,255,255,0.8)", "rgba(15,23,42,0.8)");
  const borderCol = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const tabSelectedBg = useColorModeValue("white", "gray.800");

  const fetchTransactions = async (silent = false) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/transactions`, {
        headers: { "x-api-key": API_KEY }
      });
      setTransactions(res.data || []);
      if (!silent) {
        toast({
          title: "Transactions refreshed",
          status: "success",
          duration: 1500,
          isClosable: true
        });
      }
    } catch (err) {
      console.error("❌ Error fetching transactions:", err);
      toast({
        title: "Error loading transactions",
        description: err.response?.data?.detail || "Unknown error",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  useEffect(() => { fetchTransactions(true); }, []);
  const handleNewTransaction = () => fetchTransactions(true);

  const totalAmount = useMemo(() =>
    transactions.reduce((acc, tx) => acc + Number(tx.montant || 0), 0),
    [transactions]
  );

  const count = transactions.length;
  const successCount = transactions.filter(tx => tx.status === "success").length;
  const failCount = count - successCount;
  const successRate = count > 0 ? Math.round((successCount / count) * 100) : 0;

  const exportCSV = () => {
    const csvHeader = "ID,Amount,Currency,Country,PSP,Status\n";
    const csvRows = transactions
      .map(tx => `${tx.id},${tx.montant},${tx.devise},${tx.pays},${tx.psp},${tx.status}`)
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  {/* ✅ NAVBAR sticky */}
<Box
  position="sticky"
  top="0"
  zIndex="1000"
  bg={useColorModeValue("rgba(255,255,255,0.75)", "rgba(15,23,42,0.7)")}
  backdropFilter="saturate(200%) blur(15px)"
  borderBottom="1px solid"
  borderColor={borderCol}
>
  <Flex align="center" px={6} py={4} maxW="7xl" mx="auto">
    <Heading size="md" fontWeight="black">
      SwitchPay.&nbsp;
      <Box as="span" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text">
        Your Money Matters.
      </Box>
    </Heading>
    <Spacer />
    <HStack spacing={2}>
      <Tooltip label="Refresh">
        <IconButton
          aria-label="refresh"
          icon={<RepeatIcon />}
          onClick={() => fetchTransactions()}
          variant="ghost"
        />
      </Tooltip>
      <Button
        onClick={toggleColorMode}
        leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        variant="outline"
        borderRadius="full"
      >
        {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
    </HStack>
  </Flex>
</Box>


  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Background global */}
      <BackgroundFX fixed />

      <Box position="relative" zIndex={1} maxW="7xl" mx="auto" px={6} py={10}>
        {/* Header */}
        

        {/* Tabs */}
        <Tabs variant="enclosed" colorScheme="purple" isFitted>
          <TabList mb={6} borderColor={borderCol}>
            {["New Transaction", "Transaction History", "Dashboard"].map(label => (
              <Tab
                key={label}
                fontWeight="semibold"
                _selected={{
                  color: "brand.500",
                  borderColor: borderCol,
                  bg: tabSelectedBg,
                  borderTop: "3px solid",
                  borderTopColor: "brand.500"
                }}
              >
                {label}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {/* New Transaction */}
            <TabPanel>
              <GlowCard p={8}>
                <Heading size="md" mb={2}>New Transaction</Heading>
                <Text color={useColorModeValue("gray.600", "gray.300")} mb={6}>
                  Fill the form and send — routing happens in your FastAPI backend.
                </Text>
                <TransactionForm onNewTransaction={handleNewTransaction} />
              </GlowCard>
            </TabPanel>

            {/* Transaction History */}
            <TabPanel>
              <GlowCard p={6}>
                <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={3}>
                  <HStack spacing={3}>
                    <Badge colorScheme="blue" variant="subtle">Total: {count}</Badge>
                    <Badge colorScheme="green" variant="subtle">Success: {successCount}</Badge>
                    <Badge colorScheme="red" variant="subtle">Failed: {failCount}</Badge>
                  </HStack>
                  <MagneticButton onClick={exportCSV} leftIcon={<DownloadIcon />}>
                    Download CSV
                  </MagneticButton>
                </Flex>
                <TransactionTable transactions={transactions} />
              </GlowCard>
            </TabPanel>

            {/* Dashboard */}
            <TabPanel>
              <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={8}>
                <KpiCard label="Total Volume">
                  <StatNumber><Counter to={totalAmount} isMoney decimals={2} /></StatNumber>
                </KpiCard>
                <KpiCard label="# Transactions">
                  <StatNumber><Counter to={count} /></StatNumber>
                </KpiCard>
                <KpiCard label="Success Rate">
                  <StatNumber>{successRate}%</StatNumber>
                </KpiCard>
                <KpiCard label="Failures">
                  <StatNumber><Counter to={failCount} /></StatNumber>
                </KpiCard>
              </SimpleGrid>

              <GlowCard p={6}>
                <Heading size="md" mb={4}>Analytics</Heading>
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

/* KPI Cards uniformisées */
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
