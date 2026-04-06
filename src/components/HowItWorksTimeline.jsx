import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";

const STEPS = [
  {
    number: "01",
    label: "Collect",
    accent: "#06b6d4",
    desc: "Your frontend sends the payment request — amount, currency, country, device — secured with your API key.",
  },
  {
    number: "02",
    label: "Route",
    accent: "#7c3aed",
    desc: "Our smart router instantly selects the most efficient PSP to maximize authorization rates and minimize costs.",
  },
  {
    number: "03",
    label: "Settle",
    accent: "#f43f5e",
    desc: "The transaction is processed and your KPIs are updated in real time — no manual rules, no lock-in.",
  },
];

function StepCard({ step }) {
  return (
    <Box
      flex="1"
      position="relative"
      overflow="hidden"
      bg="rgba(255,255,255,0.03)"
      border="1px solid rgba(255,255,255,0.08)"
      borderRadius="2xl"
      p={8}
      backdropFilter="blur(12px)"
      transition="border-color 0.22s ease, transform 0.22s ease"
      _hover={{
        borderColor: `${step.accent}66`,
        transform: "translateY(-4px)",
      }}
      sx={{
        _before: {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(to right, transparent, ${step.accent}99, transparent)`,
        },
      }}
    >
      {/* Giant background number */}
      <Box
        as="span"
        position="absolute"
        top="-10px"
        left="8px"
        fontSize="8xl"
        fontWeight="black"
        color="white"
        lineHeight="1"
        userSelect="none"
        pointerEvents="none"
        opacity={0.06}
      >
        {step.number}
      </Box>

      {/* Title */}
      <Heading
        fontSize="xl"
        fontWeight="bold"
        color="white"
        mb={3}
      >
        {step.label}
      </Heading>

      {/* Description */}
      <Text
        fontSize="sm"
        color="gray.400"
        lineHeight="tall"
      >
        {step.desc}
      </Text>
    </Box>
  );
}

function Connector() {
  return (
    <Box
      display={{ base: "none", md: "flex" }}
      alignItems="center"
      flexShrink={0}
      w="40px"
    >
      <Box
        w="100%"
        borderTop="1px dashed"
        borderColor="whiteAlpha.200"
      />
    </Box>
  );
}

export default function HowItWorksTimeline() {
  return (
    <Box as="section" pt={{ base: 8, md: 10 }} pb={{ base: 12, md: 16 }} px={{ base: 6, md: 16 }} bg="transparent" position="relative" zIndex={1}>
      {/* Section header */}
      <Box textAlign="center" mb={{ base: 10, md: 14 }} position="relative" zIndex={2}>
        <Text
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="widest"
          textTransform="uppercase"
          color="cyan.400"
          mb={3}
        >
          How it works
        </Text>
        <Heading
          as="h2"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="black"
          color="white"
          lineHeight="1.1"
          mb={4}
        >
          Three steps to smarter payments
        </Heading>
        <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
          No PSP lock-in. No manual rules. Just results.
        </Text>
      </Box>

      {/* Cards row */}
      <Container maxW="6xl" px={0}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "stretch" }}
          gap={{ base: 4, md: 0 }}
        >
          {STEPS.map((step, i) => (
            <React.Fragment key={step.number}>
              <StepCard step={step} index={i} />
              {i < STEPS.length - 1 && <Connector />}
            </React.Fragment>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
