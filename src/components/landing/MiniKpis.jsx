import { Box, Heading, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";

function Kpi({ label, value }) {
  return (
    <Box
      p={3}
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "whiteAlpha.100")}
      textAlign="center"
    >
      <Text fontSize="xs" opacity={0.7}>
        {label}
      </Text>
      <Heading size="md">{value}</Heading>
    </Box>
  );
}

export default function MiniKpis({ metrics }) {
  return (
    <SimpleGrid columns={3} spacing={3}>
      <Kpi
        label="Volume"
        value={`${Number(metrics.total_volume ?? 0).toLocaleString("fr-FR", {
          maximumFractionDigits: 0,
        })}€`}
      />
      <Kpi label="Tx" value={metrics.total_transactions ?? 0} />
      <Kpi label="PSPs" value={Object.keys(metrics.transactions_by_psp || {}).length} />
    </SimpleGrid>
  );
}
