import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const DELAY_AFTER_USER_MESSAGE_MS = 1000;
const DELAY_AI_THINKING_MS = 1800;

function ThinkingPulse() {
  return (
    <motion.div
      style={{
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #63b3ed, #805ad5, #f687b3)",
        boxShadow: "0 0 15px rgba(128,90,213,0.6)",
        marginTop: 6,
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    />
  );
}

export default function SwitchPayAIPremiumChat() {
  const [messages, setMessages] = useState([]);
  const [aiThinking, setAiThinking] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const chatRef = useRef(null);
  const hasRun = useRef(false);

  const assistantBg = useColorModeValue("whiteAlpha.700", "whiteAlpha.100");
  const userBg = useColorModeValue("blue.500", "blue.600");
  const textColor = useColorModeValue("gray.800", "white");
  const borderCol = useColorModeValue("whiteAlpha.300", "whiteAlpha.200");

  const conversation = [
    {
      sender: "user",
      text: "Which PSP gives me the best rate for € payments in Germany?",
    },
    {
      sender: "assistant",
      text: "✅ Adyen currently offers ~0.5% lower fees than Stripe for EUR. I'll alert you instantly if that changes.",
    },
    {
      sender: "user",
      text: "And what about USD payments in the UK?",
    },
    {
      sender: "assistant",
      text: "💡 Wise is your best option for USD in the UK — lowest conversion fees, and direct settlement support.",
    },
  ];

  const showConversation = useCallback(async () => {
    let i = 0;
    while (i < conversation.length) {
      const msg = conversation[i];
      if (msg.sender === "user") {
        setMessages((prev) => [...prev, msg]);
        i++;
        await new Promise((res) => setTimeout(res, DELAY_AFTER_USER_MESSAGE_MS));
      } else {
        setAiThinking(true);
        await new Promise((res) => setTimeout(res, DELAY_AI_THINKING_MS));
        setAiThinking(false);
        setMessages((prev) => [...prev, msg]);
        i++;
        await new Promise((res) => setTimeout(res, 800));
      }
    }
  // conversation is a static constant defined outside the render cycle
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const node = chatRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasPlayed) {
          setHasPlayed(true);
        }
      },
      { threshold: 0.4 }
    );

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasPlayed]);

  useEffect(() => {
    if (hasPlayed && !hasRun.current) {
      hasRun.current = true;
      showConversation();
    }
  }, [hasPlayed, showConversation]);

  return (
    <Box
      ref={chatRef}
      position="relative"
      w="100%"
      maxW="4xl"
      mx="auto"
      p={8}
      rounded="2xl"
      border="1px solid"
      borderColor={borderCol}
      boxShadow="0 0 40px rgba(0,0,0,0.25)"
      overflow="hidden"
      bgGradient="linear(to-br, rgba(14,18,33,0.9), rgba(25,35,75,0.9))"
      backdropFilter="blur(20px) saturate(180%)"
      fontFamily="Inter, sans-serif"
    >
      {/* Gradient background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        zIndex={-1}
        bgGradient="linear(to-br, #2b6cb0, #6b46c1, #3182ce)"
        backgroundSize="200% 200%"
        animation="gradientShift 10s ease infinite"
        opacity={0.18}
        sx={{
          "@keyframes gradientShift": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      />

      {/* Header */}
      <HStack
        spacing={2}
        px={3}
        py={1}
        position="absolute"
        top="10px"
        left="0"
        right="0"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box w={3} h={3} rounded="full" bg="red.400" ml={3} />
        <Box w={3} h={3} rounded="full" bg="yellow.400" />
        <Box w={3} h={3} rounded="full" bg="green.400" />
        <Text fontSize="sm" ml={3} fontWeight="semibold" color="whiteAlpha.900">
          switchpayAI
        </Text>
      </HStack>


      {/* Conversation */}
      <VStack spacing={4} align="stretch">
        {messages.map((msg, idx) => (
          <MotionBox
            key={idx}
            alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
            bg={msg.sender === "user" ? userBg : assistantBg}
            px={5}
            py={3}
            borderRadius="2xl"
            color={msg.sender === "user" ? "white" : textColor}
            maxW="75%"
            boxShadow="lg"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {msg.text}
          </MotionBox>
        ))}

        {aiThinking && (
          <HStack alignSelf="flex-start" spacing={3}>
            <ThinkingPulse />
            <Text color="whiteAlpha.700" fontSize="sm">
              switchpayAI is analyzing market rates...
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
