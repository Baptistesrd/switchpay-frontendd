// src/components/ChatbotWidget.jsx
import { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  VStack,
  HStack,
  Input,
  Text,
  useColorModeValue,
  Divider,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { ChatIcon, CloseIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m SwitchPay Assistant. How can I help you today?" },
  ]);

  const scrollRef = useRef(null);

  // 🎨 Styles
  const bg = useColorModeValue("whiteAlpha.900", "gray.800");
  const headerBg = useColorModeValue("whiteAlpha.700", "gray.900");
  const border = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const userBubble = useColorModeValue("brand.500", "brand.400");
  const botBubble = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("white", "gray.700");

  // 📜 Auto-scroll vers le bas à chaque nouveau message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Mock IA
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "🤖 (Demo mode) Thanks! I’ll be a real AI tomorrow." },
      ]);
    }, 600);

    setInput("");
  };

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex="99999999999">
      {/* Bouton flottant quand le chat est fermé */}
      {!isOpen && (
        <MotionBox
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <IconButton
            icon={<ChatIcon />}
            aria-label="Open chat"
            borderRadius="full"
            size="lg"
            bgGradient="linear(to-r, brand.500, brand.300)"
            color="white"
            shadow="xl"
            onClick={toggleChat}
          />
        </MotionBox>
      )}

      {/* Fenêtre du chatbot */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 36, scale: 0.96 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <Box
              w={{ base: "92vw", sm: "360px" }}
              h="500px"
              bg={bg}
              border="1px solid"
              borderColor={border}
              borderRadius="2xl"
              shadow="2xl"
              display="flex"
              flexDirection="column"
              overflow="hidden"
              backdropFilter="blur(12px) saturate(150%)"
            >
              {/* Header */}
              <HStack
                px={4}
                py={3}
                bg={headerBg}
                borderBottom="1px solid"
                borderColor={border}
                justify="space-between"
              >
                <HStack>
                  <Avatar size="sm" name="SwitchPay Bot" bg="brand.500" />
                  <VStack spacing={0} align="start">
                    <Text fontWeight="bold" fontSize="sm">
                      SwitchPay Assistant
                    </Text>
                    <Badge colorScheme="green" fontSize="0.6em">
                      Online
                    </Badge>
                  </VStack>
                </HStack>
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={toggleChat}
                  aria-label="Close chat"
                />
              </HStack>

              {/* Messages */}
              <VStack
                ref={scrollRef}
                flex="1"
                spacing={3}
                align="stretch"
                px={4}
                py={3}
                overflowY="auto"
                css={{
                  "&::-webkit-scrollbar": { display: "none" },
                  "-ms-overflow-style": "none",
                  "scrollbar-width": "none",
                }}
              >
                {messages.map((msg, i) => (
                  <MotionBox
                    key={i}
                    alignSelf={msg.from === "user" ? "flex-end" : "flex-start"}
                    bg={msg.from === "user" ? userBubble : botBubble}
                    color={msg.from === "user" ? "white" : "whiteAlpha.900"}
                    px={4}
                    py={2}
                    borderRadius="xl"
                    maxW="80%"
                    shadow="md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {msg.text}
                  </MotionBox>
                ))}
              </VStack>

              <Divider />

              {/* Input */}
              <HStack p={3} spacing={2}>
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  borderRadius="full"
                  bg={inputBg}
                />
                <IconButton
                  icon={<ArrowForwardIcon />}
                  colorScheme="blue"
                  borderRadius="full"
                  onClick={handleSend}
                  aria-label="Send message"
                />
              </HStack>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
