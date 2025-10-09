import { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Input,
  Textarea,
  Button,
  Text,
  Icon,
  useToast,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaLock, FaGlobe, FaUsers } from "react-icons/fa";
import axios from "axios";

const MotionBox = motion(Box);

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!email || !message) {
      toast({
        title: "Missing fields",
        description: "Please fill in both email and message",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/contact`, {
        email,
        message,
      });

      toast({
        title: "Message sent 🎉",
        description: "We’ll get back to you within 24 hours.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const cardBg = useColorModeValue("rgba(255,255,255,0.08)", "rgba(20,20,30,0.75)");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      position="relative"
      minH="100vh"
      bg="radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08), rgba(0,0,0,0.85) 80%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
      py={20}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bgImage: "url('/mid-shot-woman-talking-phone-table.jpg')",
        bgSize: "cover",
        bgPos: "center",
        filter: "blur(4px) brightness(0.35)",
        zIndex: 0,
      }}
    >
      <MotionBox
        position="relative"
        maxW="4xl"
        w="100%"
        p={{ base: 8, md: 12 }}
        borderRadius="3xl"
        bg={cardBg}
        backdropFilter="blur(16px) saturate(120%)"
        boxShadow="inset 0 0 1px rgba(255,255,255,0.1)"
        zIndex={1}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <VStack spacing={8} align="stretch">
          {/* HEADER */}
          <VStack spacing={3} textAlign="center">
            <Heading
              size="2xl"
              fontWeight="extrabold"
              color="whiteAlpha.900"
              letterSpacing="-0.03em"
            >
              Losing conversions because your payments fail?
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="lg">
              Reach out: we’ll help you fix your routing strategy and improve
              your success rate instantly.
            </Text>
          </VStack>

          {/* FORM */}
          <VStack spacing={5} align="stretch">
            <Input
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              borderRadius="xl"
              border="1px solid"
              borderColor="whiteAlpha.200"
              bg="rgba(255,255,255,0.04)"
              color="whiteAlpha.900"
              _placeholder={{ color: "whiteAlpha.600" }}
              _focus={{
                borderColor: "whiteAlpha.400",
                boxShadow: "0 0 15px rgba(255,255,255,0.1)",
              }}
            />
            <Textarea
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              size="lg"
              borderRadius="xl"
              border="1px solid"
              borderColor="whiteAlpha.200"
              bg="rgba(255,255,255,0.04)"
              color="whiteAlpha.900"
              _placeholder={{ color: "whiteAlpha.600" }}
              _focus={{
                borderColor: "whiteAlpha.400",
                boxShadow: "0 0 15px rgba(255,255,255,0.1)",
              }}
            />
            <Button
              size="lg"
              borderRadius="full"
              px={10}
              py={6}
              color="whiteAlpha.900"
              fontWeight="bold"
              bg="rgba(255,255,255,0.1)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255,255,255,0.15)"
              _hover={{
                bg: "rgba(255,255,255,0.18)",
                transform: "translateY(-2px) scale(1.02)",
                boxShadow: "0 0 20px rgba(255,255,255,0.1)",
              }}
              _active={{
                transform: "translateY(-1px)",
              }}
              rightIcon={<FaPaperPlane />}
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Sending..."
            >
              Start the conversation
            </Button>

            {/* TRUST SIGNALS (resserrés juste sous le bouton) */}
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={2}
              pt={2}
              textAlign="center"
            >
              <VStack spacing={1}>
                <Icon as={FaLock} boxSize={5} color="whiteAlpha.700" />
                <Text fontSize="sm" color="whiteAlpha.900">
                  Secure by design
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Icon as={FaGlobe} boxSize={5} color="whiteAlpha.700" />
                <Text fontSize="sm" color="whiteAlpha.900">
                  Global coverage
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Icon as={FaUsers} boxSize={5} color="whiteAlpha.700" />
                <Text fontSize="sm" color="whiteAlpha.900">
                  Human-first support
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </VStack>
      </MotionBox>
    </Box>
  );
}
