import React from "react";
import {
  Box,
  Heading,
  Text,
  Badge,
  VStack,
  HStack,
  Tooltip,
  Divider,
} from "@chakra-ui/react";

function authRateColor(rate) {
  if (rate >= 0.95) return "#38a169"; // green
  if (rate >= 0.85) return "#d69e2e"; // amber
  return "#e53e3e"; // red
}

function ConfidenceBar({ psp, stats }) {
  const rate = stats.authorization_rate || 0;
  const color = authRateColor(rate);

  return (
    <Box>
      <HStack justify="space-between" mb={1}>
        <Text fontSize="sm" fontWeight="semibold" textTransform="capitalize">
          {psp}
        </Text>
        <Text fontSize="xs" color="gray.400">
          {Math.round(rate * 100)}% auth rate
        </Text>
      </HStack>
      <Box bg="whiteAlpha.100" borderRadius="full" h="7px" overflow="hidden">
        <Box
          bg={color}
          h="100%"
          w={`${rate * 100}%`}
          borderRadius="full"
          transition="width 0.6s ease"
        />
      </Box>
      <Text fontSize="xs" color="gray.500" mt={1}>
        Score:{" "}
        {stats.score != null ? stats.score.toFixed(3) : "—"} — Confidence:{" "}
        {stats.confidence != null ? stats.confidence.toFixed(2) : "—"} — N:{" "}
        {stats.transaction_count ?? 0} transactions
      </Text>
    </Box>
  );
}

function ThompsonBar({ psp, params }) {
  const mean = params.mean || 0;
  const variance = params.variance || 0;
  // Relative uncertainty: Beta(1,1) uniform prior has variance 1/12 ≈ 0.083
  // Show uncertainty band width proportional to variance, capped at 20% of bar width
  const uncertaintyPct = Math.min(Math.sqrt(variance) * 100, 20);

  return (
    <Box>
      <HStack justify="space-between" mb={1}>
        <Text fontSize="sm" fontWeight="semibold" textTransform="capitalize">
          {psp}
        </Text>
        <Text fontSize="xs" color="gray.400" fontFamily="mono">
          α={params.alpha?.toFixed(1) ?? "—"} β={params.beta?.toFixed(1) ?? "—"} μ=
          {mean.toFixed(3)}
        </Text>
      </HStack>
      <Tooltip
        label={`Higher uncertainty = more exploration traffic. Variance: ${variance.toFixed(5)}. N_eff: ${params.n_eff?.toFixed(1) ?? "—"}`}
        hasArrow
        placement="top"
      >
        <Box
          bg="whiteAlpha.100"
          borderRadius="full"
          h="7px"
          overflow="hidden"
          position="relative"
          cursor="help"
        >
          {/* Mean bar */}
          <Box
            bg="purple.400"
            h="100%"
            w={`${mean * 100}%`}
            borderRadius="full"
            transition="width 0.6s ease"
          />
          {/* Uncertainty band — widens at the leading edge when variance is high */}
          {uncertaintyPct > 0 && (
            <Box
              position="absolute"
              top={0}
              left={`${Math.max(0, mean * 100 - uncertaintyPct / 2)}%`}
              w={`${uncertaintyPct}%`}
              h="100%"
              bg="purple.200"
              opacity={0.35}
              borderRadius="full"
            />
          )}
        </Box>
      </Tooltip>
      <Text fontSize="xs" color="gray.500" mt={1}>
        N_eff: {params.n_eff?.toFixed(1) ?? "—"} — Higher uncertainty = more
        exploration
      </Text>
    </Box>
  );
}

export default function RoutingEngine({ metricsData, strategy }) {
  const byPsp = metricsData?.by_psp || {};
  const thompson = metricsData?.thompson || {};
  const pspNames = Object.keys(byPsp);
  const thompsonNames = Object.keys(thompson);
  const hasData = pspNames.length > 0 || thompsonNames.length > 0;

  return (
    <VStack spacing={6} align="stretch">
      {/* Strategy badge */}
      <HStack spacing={3} align="center">
        <Heading size="sm" color="gray.200">
          Active Strategy
        </Heading>
        <Badge
          colorScheme={strategy === "thompson" ? "purple" : "blue"}
          variant="solid"
          borderRadius="full"
          px={3}
          py={1}
          textTransform="none"
          fontSize="xs"
          letterSpacing="wide"
        >
          {strategy || "weighted_score"}
        </Badge>
      </HStack>

      {!hasData && (
        <Text color="gray.500" fontSize="sm">
          No routing data yet: send some transactions to populate this panel.
        </Text>
      )}

      {/* Per-PSP authorization rate bars */}
      {pspNames.length > 0 && (
        <Box>
          <Text
            fontSize="xs"
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={4}
          >
            PSP Authorization Rates
          </Text>
          <VStack spacing={5} align="stretch">
            {pspNames.map((psp) => (
              <ConfidenceBar key={psp} psp={psp} stats={byPsp[psp]} />
            ))}
          </VStack>
        </Box>
      )}

      {/* Thompson Sampling posteriors */}
      {thompsonNames.length > 0 && (
        <>
          <Divider borderColor="whiteAlpha.200" />
          <Box>
            <HStack mb={4} spacing={2}>
              <Text
                fontSize="xs"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Thompson Sampling Posteriors
              </Text>
              <Tooltip
                label="Each PSP's success rate is modelled as a Beta(α, β) distribution updated with decay-weighted observations. μ = expected success rate. The shaded band shows uncertainty — wider = more exploration traffic directed to this PSP."
                hasArrow
                placement="top"
                maxW="300px"
              >
                <Badge
                  colorScheme="gray"
                  variant="outline"
                  cursor="help"
                  borderRadius="full"
                  fontSize="10px"
                  px={2}
                >
                  ?
                </Badge>
              </Tooltip>
            </HStack>
            <VStack spacing={5} align="stretch">
              {thompsonNames.map((psp) => (
                <ThompsonBar key={psp} psp={psp} params={thompson[psp]} />
              ))}
            </VStack>
          </Box>
        </>
      )}
    </VStack>
  );
}
