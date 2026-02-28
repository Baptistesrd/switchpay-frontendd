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

export default function HowItWorksTimeline() {
  const brandFrom = useColorModeValue("#06b6d4", "#7aa2ff");
  const brandTo = useColorModeValue("#ec4899", "#9f7aea");
  const glow = useColorModeValue(
    "rgba(35,104,245,0.25)",
    "rgba(122,162,255,0.3)"
  );
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
    <Box position="relative" py={{ base: 10, md: 16 }} px={{ base: 4, md: 10 }}>
      <MotionBox
        position="absolute"
        zIndex={0}
        borderRadius="full"
        bgGradient={`linear(to-r, ${brandFrom}, ${brandTo})`}
        bgSize="200% 100%"
        filter={`drop-shadow(0 0 8px ${glow})`}
        style={{ willChange: "background-position, transform", transform: "translateZ(0)" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        top={{ base: "56px", md: "50%" }}
        left={{ base: "32px", md: 0 }}
        right={{ base: "auto", md: 0 }}
        width={{ base: "3px", md: "100%" }}
        height={{ base: "calc(100% - 56px)", md: "3px" }}
        transform={{
          base: "none",
          md: "translateY(-50%)",
        }}
      />
      <Box position="relative" zIndex={1}>
        <HStack
          spacing={{ base: 6, md: 14 }}
          align="stretch"
          justify={{ base: "flex-start", md: "center" }}
          flexDir={{ base: "column", md: "row" }}
          pl={{ base: 10, md: 0 }}
        >
          {steps.map((s, i) => (
            <StepCard key={i} index={i} {...s} labelCol={labelCol} />
          ))}
        </HStack>
      </Box>
    </Box>
  );
}

function StepCard({ index, icon, title, desc, labelCol }) {
  const brandShadow = useColorModeValue(
    "0 8px 24px rgba(35,104,245,0.15)",
    "0 8px 24px rgba(122,162,255,0.2)"
  );
  const delay = index * 0.12;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.35, ease: "easeOut" },
      }}
      whileHover={{
        y: -3,
        scale: 1.01,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      viewport={{ once: true, amount: 0.25 }}
      style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
    >
      <HStack
        spacing={4}
        align="flex-start"
        flexDir={{ base: "row", md: "column" }}
        textAlign={{ base: "left", md: "center" }}
      >
        <Box
          flexShrink={0}
          position="relative"
          w={{ base: "44px", md: "64px" }}
          h={{ base: "44px", md: "64px" }}
          borderRadius="full"
          display="grid"
          placeItems="center"
          bg="rgba(255,255,255,0.06)"
          border="2px solid transparent"
          bgGradient="linear(to-r, cyan.400, purple.500)"
          backgroundClip="padding-box"
          boxShadow="0 0 0 4px rgba(255,255,255,0.05)"
          transition="transform 0.3s ease, box-shadow 0.3s ease"
          style={{ willChange: "transform" }}
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "0 0 20px rgba(122,162,255,0.35)",
          }}
          ml={{ base: "-44px", md: 0 }}
        >
          <Icon as={icon} boxSize={{ base: 5, md: 6 }} color="white" zIndex="1" />
        </Box>

        <GlowCard
          p={{ base: 4, md: 6 }}
          boxShadow={brandShadow}
          transition="transform 0.3s ease, box-shadow 0.3s ease"
          w={{ base: "100%", md: "280px" }}
          maxW={{ base: "520px", md: "280px" }}
          minH={{ base: "auto", md: "220px" }}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
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
            lineHeight="1.15"
          >
            {title}
          </Heading>

          <Text color={labelCol} fontSize={{ base: "sm", md: "md" }} mt={2}>
            {desc}
          </Text>
        </GlowCard>
      </HStack>
    </MotionBox>
  );
}
