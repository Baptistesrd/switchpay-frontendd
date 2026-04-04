import { useState } from "react";
import { Box, Text, Heading, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const STEPS = [
  {
    n: "01",
    icon: "💳",
    title: "Collect",
    desc: "Your frontend sends the payment request secured with an API key.",
  },
  {
    n: "02",
    icon: "⚡",
    title: "Route",
    desc: "Our smart router instantly selects the most efficient PSP.",
  },
  {
    n: "03",
    icon: "✅",
    title: "Settle",
    desc: "The transaction is processed and your KPIs are updated in real time.",
  },
];

export default function HowItWorksCards() {
  const [expandedIndex, setExpandedIndex] = useState(1);
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Box display="flex" flexDirection="column" gap={3}>
        {STEPS.map((step, i) => (
          <Box
            key={i}
            bg="rgba(255,255,255,0.03)"
            border="1px solid rgba(99,102,241,0.25)"
            borderRadius="2xl"
            p={6}
            h="160px"
            overflow="hidden"
            position="relative"
          >
            {/* Ghost watermark */}
            <Box
              position="absolute"
              bottom={2}
              right={4}
              fontSize="7xl"
              fontWeight="900"
              color="rgba(99,102,241,0.08)"
              lineHeight="1"
              userSelect="none"
              pointerEvents="none"
            >
              {step.n}
            </Box>
            <Box display="flex" alignItems="center" gap={4}>
              <Box
                w="48px"
                h="48px"
                borderRadius="full"
                bgGradient="linear(135deg, #6366f1, #7c3aed)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xl"
                flexShrink={0}
              >
                {step.icon}
              </Box>
              <Box>
                <Box
                  display="inline-block"
                  px={3}
                  py="2px"
                  bg="rgba(99,102,241,0.1)"
                  border="1px solid rgba(99,102,241,0.2)"
                  color="#a5b4fc"
                  borderRadius="full"
                  fontSize="xs"
                  mb={1}
                >
                  Step {step.n}
                </Box>
                <Heading size="sm" color="white" fontWeight="bold">
                  {step.title}
                </Heading>
              </Box>
            </Box>
            <Text color="rgba(255,255,255,0.5)" fontSize="sm" lineHeight="tall" mt={3}>
              {step.desc}
            </Text>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box display="flex" gap={3} h="320px" w="100%">
      {STEPS.map((step, i) => {
        const isExpanded = expandedIndex === i;
        return (
          <Box
            key={i}
            onClick={() => setExpandedIndex(i)}
            onMouseEnter={() => setExpandedIndex(i)}
            cursor="pointer"
            borderRadius="2xl"
            overflow="hidden"
            position="relative"
            bg="rgba(255,255,255,0.03)"
            border="1px solid"
            borderColor={
              isExpanded ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.08)"
            }
            boxShadow={
              isExpanded
                ? "inset 0 0 60px rgba(99,102,241,0.06), 0 0 40px rgba(99,102,241,0.08)"
                : "none"
            }
            p={isExpanded ? 8 : 4}
            style={{
              width: isExpanded ? "60%" : "20%",
              transition:
                "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              flexShrink: 0,
            }}
          >
            {/* Ghost watermark */}
            <Box
              position="absolute"
              bottom={2}
              right={4}
              fontSize="8xl"
              fontWeight="900"
              color="rgba(99,102,241,0.08)"
              lineHeight="1"
              userSelect="none"
              pointerEvents="none"
            >
              {step.n}
            </Box>

            {/* Collapsed: vertical step number */}
            {!isExpanded && (
              <Box
                h="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                  fontSize="xs"
                  letterSpacing="widest"
                  color="whiteAlpha.300"
                  textTransform="uppercase"
                  userSelect="none"
                >
                  {step.n}
                </Text>
              </Box>
            )}

            {/* Expanded: full content */}
            {isExpanded && (
              <MotionDiv
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                style={{ height: "100%", display: "flex", flexDirection: "column" }}
              >
                {/* Step pill */}
                <Box
                  display="inline-block"
                  px={3}
                  py="2px"
                  bg="rgba(99,102,241,0.1)"
                  border="1px solid rgba(99,102,241,0.2)"
                  color="#a5b4fc"
                  borderRadius="full"
                  fontSize="xs"
                  alignSelf="flex-start"
                >
                  Step {step.n}
                </Box>

                {/* Icon circle */}
                <Box
                  w="56px"
                  h="56px"
                  borderRadius="full"
                  bgGradient="linear(135deg, #6366f1, #7c3aed)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="2xl"
                  mt={6}
                >
                  {step.icon}
                </Box>

                {/* Title */}
                <Heading color="white" fontWeight="bold" fontSize="2xl" mt={4}>
                  {step.title}
                </Heading>

                {/* Description */}
                <Text
                  color="rgba(255,255,255,0.5)"
                  fontSize="sm"
                  lineHeight="tall"
                  mt={2}
                  maxW="260px"
                >
                  {step.desc}
                </Text>
              </MotionDiv>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
