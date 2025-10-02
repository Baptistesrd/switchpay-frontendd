import { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  VStack,
  HStack,
  Input,
  Text,
  useColorModeValue,
  Avatar,
  Badge,
  Button,
} from "@chakra-ui/react";
import { ChatIcon, CloseIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I’m your SwitchPay Assistant. Ask me about payments, pricing, or integrations.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  // Styles fintech premium
  const bg = useColorModeValue("rgba(255,255,255,0.8)", "rgba(20,25,45,0.8)");
  const headerBg = useColorModeValue("rgba(255,255,255,0.6)", "rgba(10,12,20,0.7)");
  const border = useColorModeValue("rgba(200,200,200,0.4)", "rgba(255,255,255,0.15)");
  const userBubble = useColorModeValue(
    "linear-gradient(135deg, #2368f5, #7b3ffc)",
    "linear-gradient(135deg, #5a7dff, #a076ff)"
  );
  const botBubble = useColorModeValue("whiteAlpha.800", "gray.700");
  const inputBg = useColorModeValue("rgba(255,255,255,0.9)", "rgba(30,35,55,0.9)");

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "⚠️ Sorry, I couldn’t get a reply. Try again later." },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "❌ Error connecting to AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="fixed" bottom="24px" right="24px" zIndex="9999">
      {/* Bouton flottant */}
      {!isOpen && (
        <MotionBox
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
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
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Box
              w={{ base: "90vw", sm: "380px" }}
              h="540px"
              bg={bg}
              border="1px solid"
              borderColor={border}
              borderRadius="2xl"
              shadow="2xl"
              backdropFilter="blur(20px) saturate(180%)"
              display="flex"
              flexDirection="column"
              overflow="hidden"
            >
              {/* Header */}
              <HStack
                px={4}
                py={3}
                bg={headerBg}
                justify="space-between"
                borderBottom="1px solid"
                borderColor={border}
                backdropFilter="blur(16px)"
              >
                <HStack spacing={3}>
                  <Avatar size="sm" name="SwitchPay Bot" bg="brand.500" />
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">
                      SwitchPay Assistant
                    </Text>
                    <Badge colorScheme="green" fontSize="0.65em" mt={-1}>
                      Online
                    </Badge>
                  </Box>
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
                  "&::-webkit-scrollbar": { width: "6px" },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(120,120,120,0.4)",
                    borderRadius: "6px",
                  },
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
                    borderRadius="lg"
                    maxW="80%"
                    fontSize="sm"
                    shadow="md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {msg.text}

                    {/* Exemple de CTA intégré dans le bot */}
                    {msg.from === "bot" && msg.text.includes("demo") && (
                      <Button
                        size="xs"
                        mt={2}
                        colorScheme="blue"
                        onClick={() =>
                          window.open("https://calendly.com/your-link/demo", "_blank")
                        }
                      >
                        🚀 Book a demo
                      </Button>
                    )}
                  </MotionBox>
                ))}

                {loading && (
                  <HStack spacing={2}>
                    <Box className="typing-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </Box>
                    <Text fontSize="xs" color="gray.400">
                      Bot is typing...
                    </Text>
                  </HStack>
                )}
              </VStack>

              {/* Input */}
              <HStack p={3} spacing={2} borderTop="1px solid" borderColor={border}>
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
                  bgGradient="linear(to-r, brand.500, brand.300)"
                  color="white"
                  borderRadius="full"
                  _hover={{ opacity: 0.9 }}
                  onClick={handleSend}
                  aria-label="Send message"
                  isLoading={loading}
                />
              </HStack>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
