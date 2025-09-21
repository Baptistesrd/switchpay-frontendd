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

// --- Utils robustes pour lire la position de scroll où qu'elle soit
function getScrollTop() {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}
function getDocHeight() {
  const body = document.body;
  const html = document.documentElement;
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m SwitchPay Assistant. How can I help you today?" },
  ]);

  const scrollRef = useRef(null);
  const hasAutoOpened = useRef(false);   // évite d’ouvrir plusieurs fois
  const rafId = useRef(0);               // throttle via rAF
  const userManuallyClosed = useRef(false); // si l’utilisateur ferme, on ne ré-ouvre pas

  // Threshholds : ouvre si 200px scrollés OU >12% de la page
  const PX_THRESHOLD = 200;
  const RATIO_THRESHOLD = 0.12;

  // 🎨 Styles (respect des hooks en haut)
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

  // 🧠 Logique d’ouverture auto au scroll — robuste
  useEffect(() => {
    function checkOpenCriteria() {
      if (hasAutoOpened.current || userManuallyClosed.current) return;

      const y = getScrollTop();
      const docH = getDocHeight();
      const maxScrollable = Math.max(1, docH - window.innerHeight);
      const ratio = y / maxScrollable;

      if (y > PX_THRESHOLD || ratio > RATIO_THRESHOLD) {
        hasAutoOpened.current = true;
        setIsOpen(true);
        setMessages(prev => [
          ...prev,
          { from: "bot", text: "👋 Hello there! Need help with SwitchPay? 🚀" },
        ]);
      }
    }

    function onScroll() {
      // throttle avec requestAnimationFrame
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(checkOpenCriteria);
    }

    // Écouteurs multiples pour couvrir desktop + mobile + wrappers
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("keydown", (e) => {
      if (["PageDown", "ArrowDown", "End", " "].includes(e.key)) onScroll();
    });

    // Vérifie au montage (au cas où l’utilisateur arrive déjà scrolé)
    setTimeout(onScroll, 0);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("keydown", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const toggleChat = () => {
    const next = !isOpen;
    if (!next) {
      // s’il ferme manuellement, on évite de ré-ouvrir automatiquement plus tard
      userManuallyClosed.current = true;
    }
    setIsOpen(next);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    // Mock IA (remplacer demain par un appel à ton backend /chat)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "🤖 (Demo mode) Thanks! I’ll be a real AI tomorrow." },
      ]);
    }, 600);

    setInput("");
  };

  return (
    <Box position="fixed" bottom="5" right="5" zIndex="9999">
      {/* Bouton flottant (visible si la fenêtre est fermée) */}
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
