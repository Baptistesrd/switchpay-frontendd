import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function TypingDots({ color }) {
  return (
    <HStack spacing={1}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: color,
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </HStack>
  );
}

export default function AnimatedChat() {
  const [step, setStep] = useState(0);

  const assistantBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const userBg = useColorModeValue("blue.500", "brand.500");
  const textColor = useColorModeValue("gray.800", "white");
  const userText = "white";
  const chatBg = useColorModeValue("white", "gray.900");
  const borderCol = useColorModeValue("gray.200", "whiteAlpha.200");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1200), // assistant typing
      setTimeout(() => setStep(2), 3000), // user question
      setTimeout(() => setStep(3), 5200), // assistant typing
      setTimeout(() => setStep(4), 7000), // assistant answer
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Box
      w="100%"
      maxW="4xl"
      mx="auto"
      p={6}
      rounded="2xl"
      bg={chatBg}
      border="1px solid"
      borderColor={borderCol}
      boxShadow="xl"
      backdropFilter="blur(12px) saturate(180%)"
      overflow="hidden"
    >
      {/* Header style app */}
      <HStack
        spacing={2}
        mb={4}
        px={2}
        py={1}
        borderBottom="1px solid"
        borderColor={borderCol}
      >
        <Box w={3} h={3} rounded="full" bg="red.400" />
        <Box w={3} h={3} rounded="full" bg="yellow.400" />
        <Box w={3} h={3} rounded="full" bg="green.400" />
        <Text fontSize="sm" ml={3} fontWeight="semibold" color={textColor}>
          switchpayAI
        </Text>
      </HStack>

      <VStack spacing={4} align="stretch">
        {/* Assistant intro */}
        {step >= 0 && (
          <MotionBox
            alignSelf="flex-start"
            bg={assistantBg}
            px={5}
            py={3}
            borderRadius="2xl"
            color={textColor}
            maxW="75%"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            boxShadow="md"
          >
            {step === 0 ? (
              <TypingDots color={textColor} />
            ) : (
              "👋 Hi! I’m switchpayAI. How can I help?"
            )}
          </MotionBox>
        )}

        {/* User message */}
        {step >= 2 && (
          <MotionBox
            alignSelf="flex-end"
            bg={userBg}
            px={5}
            py={3}
            borderRadius="2xl"
            color={userText}
            maxW="75%"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            boxShadow="lg"
          >
            What’s the cheapest PSP for € payments in Germany?
          </MotionBox>
        )}

        {/* Assistant answer */}
        {step >= 3 && (
          <MotionBox
            alignSelf="flex-start"
            bg={assistantBg}
            px={5}
            py={3}
            borderRadius="2xl"
            color={textColor}
            maxW="75%"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            boxShadow="md"
          >
            {step === 3 ? (
              <TypingDots color={textColor} />
            ) : (
              "✅ Adyen is 0.5% cheaper vs Stripe in EUR. You will know ASAP if it changes."
            )}
          </MotionBox>
        )}
      </VStack>
    </Box>
  );
}
