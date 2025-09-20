import { useEffect, useMemo, useState } from "react";
import {
  Box, Heading, Button, Flex, Spacer, useColorMode,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Stat, StatLabel, StatNumber, SimpleGrid, useColorModeValue,
  HStack, Text, IconButton, Tooltip, useToast, Badge
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, DownloadIcon, RepeatIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import axios from "axios";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import MagneticButton from "./components/MagneticButton";
import Counter from "./components/Counter";
import DashCharts from "./components/DashCharts";

const MotionBox = motion(Box); // pour compatibilité Chakra + Framer

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const API_KEY = process.env.REACT_APP_API_KEY;
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const boxBg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("blackAlpha.150", "whiteAlpha.200");
  const tabSelectedBg = useColorModeValue("white", "gray.800");

  const fetchTransactions = async (silent = false) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/transactions`, {
        headers: {
          "x-api-key": API_KEY
        }
      });
      setTransactions(res.data || []);
      if (!silent) {
        toast({ title: "Transactions refreshed", status: "success", duration: 1500, isClosable: true });
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

  useEffect(() => {
    fetchTransactions(true);
  }, []);

  const handleNewTransaction = () => fetchTransactions(true);

  const totalAmount = useMemo(() => transactions.reduce((acc, tx) => acc + Number(tx.montant || 0), 0), [transactions]);
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

  return (
    <Box maxW="6xl" mx="auto" px={6} py={8}>
      <Flex mb={6} align="center">
        <Heading size="lg" fontWeight="extrabold">
          SwitchPay.&nbsp;
          <Box as="span" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text">
            Your Money Matters.
          </Box>
        </Heading>
        <Spacer />
        <HStack spacing={2}>
          <Tooltip label="Refresh">
            <IconButton aria-label="refresh" icon={<RepeatIcon />} onClick={() => fetchTransactions()} variant="ghost" />
          </Tooltip>
          <Button onClick={toggleColorMode} leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}>
            {colorMode === "light" ? "Dark" : "Light"} Mode
          </Button>
        </HStack>
      </Flex>

      <Tabs variant="enclosed" colorScheme="blue">
        <TabList mb={4} borderColor={borderCol}>
          {["New Transaction", "Transaction History", "Dashboard"].map(label => (
            <Tab key={label} _selected={{ color: "brand.600", borderColor: borderCol, bg: tabSelectedBg }}>
              {label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              maxW="xl"
              mx="auto"
              bg={boxBg}
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderCol}
              shadow="xl"
            >
              <Heading size="md" mb={2}>New Transaction</Heading>
              <Text color={useColorModeValue("gray.600", "gray.300")} mb={6}>
                Fill the fields and send — routing logic lives in your FastAPI backend.
              </Text>
              <TransactionForm onNewTransaction={handleNewTransaction} />
            </MotionBox>
          </TabPanel>

          <TabPanel>
            <Flex justify="space-between" align="center" mb={3} wrap="wrap" gap={3}>
              <HStack spacing={3}>
                <Badge colorScheme="blue" variant="subtle">Total: {count}</Badge>
                <Badge colorScheme="green" variant="subtle">Success: {successCount}</Badge>
                <Badge colorScheme="red" variant="subtle">Failed: {failCount}</Badge>
              </HStack>
              <MagneticButton onClick={exportCSV} leftIcon={<DownloadIcon />}>
                Download CSV
              </MagneticButton>
            </Flex>
            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <TransactionTable transactions={transactions} />
            </MotionBox>
          </TabPanel>

          <TabPanel>
            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <SimpleGrid columns={[1, 2, 4]} spacing={6} mt={1}>
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
              <Box mt={8} bg={boxBg} p={5} borderRadius="2xl" border="1px solid" borderColor={borderCol} shadow="xl">
                <Heading size="md" mb={4}>Analytics</Heading>
                <DashCharts transactions={transactions} />
              </Box>
            </MotionBox>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function KpiCard({ label, children }) {
  const boxBg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("blackAlpha.150", "whiteAlpha.200");
  return (
    <Box bg={boxBg} p={6} borderRadius="2xl" border="1px solid" borderColor={borderCol} shadow="xl">
      <Stat>
        <StatLabel>{label}</StatLabel>
        {children}
      </Stat>
    </Box>
  );
}
