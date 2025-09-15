import React from "react";
import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge,
  Box, Heading, Text, useColorModeValue, Button, useToast, HStack
} from "@chakra-ui/react";
import axios from "axios";

// Bouton de simulation
function SimulateWebhookButton({ transactionId }) {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const simulateWebhook = async () => {
    setLoading(true);
    const status = Math.random() > 0.5 ? "success" : "failed";
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/webhook/stripe`, { tx_id: transactionId, status });
      toast({
        title: `Transaction ${status}`,
        description: `Transaction ${transactionId} updated to ${status}.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error simulating the webhook.",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button colorScheme="blue" onClick={simulateWebhook} isLoading={loading} loadingText="Updating" variant="outline">
      Simulate Webhook
    </Button>
  );
}

export default function TransactionTable({ transactions }) {
  // 🔧 Tous les hooks en haut, pas dans des conditions
  const cardBg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("blackAlpha.150", "whiteAlpha.200");
  const headerBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const pspColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box bg={cardBg} p={5} borderRadius="2xl" border="1px solid" borderColor={borderCol} shadow="xl">
      <Heading size="md" textAlign="left" fontWeight="semibold" fontFamily="'DM Sans', sans-serif">
        💸 Transaction History
      </Heading>

      {transactions.length === 0 ? (
        <Text textAlign="left" mt={4} color="gray.500" fontStyle="italic">
          No transactions yet. Send your first transaction to get started.
        </Text>
      ) : (
        <TableContainer mt={5} overflowX="auto" borderRadius="xl" border="1px solid" borderColor={borderCol}>
          <Table variant="simple" size="md">
            <Thead bg={headerBg}>
              <Tr>
                <Th>ID</Th>
                <Th isNumeric>Amount</Th>
                <Th>Currency</Th>
                <Th>Country</Th>
                <Th>PSP</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((tx) => (
                <Tr key={tx.id}>
                  <Td fontFamily="mono">{tx.id.slice(0, 6)}…</Td>
                  <Td isNumeric>
                    {new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(tx.montant)}
                  </Td>
                  <Td>{tx.devise}</Td>
                  <Td>{tx.pays}</Td>
                  <Td fontStyle="italic" color={pspColor}>{tx.psp}</Td>
                  <Td>
                    <Badge
                      colorScheme={tx.status === "success" ? "green" : "red"}
                      variant="subtle"
                      borderRadius="md"
                      px={2}
                      py={1}
                      textTransform="capitalize"
                    >
                      {tx.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack>
                      <SimulateWebhookButton transactionId={tx.id} />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
