import React from "react";
import {
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  Icon,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AtSignIcon, RepeatIcon, CheckCircleIcon } from "@chakra-ui/icons";
import GlowCard from "./GlowCard";

const MotionBox = motion(Box);
const MotionHStack = motion(HStack);

export default function HowItWorksTimeline() {
  const brandFrom = useColorModeValue("#06b6d4", "#7aa2ff");
  const brandTo = useColorModeValue("#ec4899", "#9f7aea");
  const glow = useColorModeValue("rgba(35,104,245,0.25)", "rgba(122,162,255,0.3)");
  const labelCol = useColorModeValue("gray.600", "gray.300");

  const steps = [
    {
      n: 1,
      title: "Collect",
      desc: "Your frontend sends the payment request (amount, currency, country, device) secured with an API key.",
      icon: AtSignIcon,
    },
    {
      n: 2,
      title: "Route",
      desc: "Our smart router instantly selects the most efficient PSP to maximize performance and minimize costs.",
      icon: RepeatIcon,
    },
    {
      n: 3,
      title: "Settle",
      desc: "The transaction is processed and your KPIs are updated in real time.",
      icon: CheckCircleIcon,
    },
  ];

  return (
    <Box position="relative" py={{ base: 8, md: 16 }} overflowX="auto">
      {/* Animated flow line */}
      <MotionBox
        position="absolute"
        top="50%"
        left="0"
        right="0"
        height="3px"
        bgGradient={`linear(to-r, ${brandFrom}, ${brandTo})`}
        bgSize="200% 100%"
        borderRadius="full"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        filter={`drop-shadow(0 0 10px ${glow})`}
      />

      {/* Steps horizontally */}
      <HStack
        spacing={{ base: 6, md: 16 }}
        align="flex-start"
        justify="center"
        position="relative"
        zIndex="1"
        px={{ base: 4, md: 10 }}
      >
        {steps.map((s, i) => (
          <StepCard key={i} index={i} {...s} labelCol={labelCol} />
        ))}
      </HStack>
    </Box>
  );
}

function StepCard({ index, icon, title, desc, labelCol }) {
  const brandShadow = useColorModeValue(
    "0 8px 30px rgba(35,104,245,0.2)",
    "0 8px 30px rgba(122,162,255,0.25)"
  );
  const delay = index * 0.2;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { delay, duration: 0.5, ease: "easeOut" },
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <VStack spacing={4} align="center" textAlign="center" maxW="sm">
        {/* Icon circle */}
        <Box
          position="relative"
          w={{ base: "50px", md: "64px" }}
          h={{ base: "50px", md: "64px" }}
          borderRadius="full"
          display="grid"
          placeItems="center"
          bg="rgba(255,255,255,0.06)"
          border="2px solid transparent"
          bgGradient="linear(to-r, cyan.400, purple.500)"
          backgroundClip="padding-box"
          boxShadow="0 0 0 4px rgba(255,255,255,0.05)"
          _after={{
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "full",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 70%)",
          }}
        >
          <Icon as={icon} boxSize={6} color="white" zIndex="1" />
        </Box>

        {/* GlowCard for content */}
        <GlowCard
          p={{ base: 4, md: 6 }}
          textAlign="center"
          boxShadow={brandShadow}
          transition="all 0.3s ease"
        >
          <Badge
            colorScheme="blue"
            borderRadius="full"
            mb={2}
            variant="subtle"
            px={3}
          >
            Step {index + 1}
          </Badge>
          <Heading
            size={{ base: "md", md: "lg" }}
            bgGradient="linear(to-r, cyan.400, purple.400)"
            bgClip="text"
          >
            {title}
          </Heading>
          <Text color={labelCol} fontSize={{ base: "sm", md: "md" }}>
            {desc}
          </Text>
        </GlowCard>
      </VStack>
    </MotionBox>
  );
}
