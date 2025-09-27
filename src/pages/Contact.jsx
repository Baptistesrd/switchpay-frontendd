// src/pages/Contact.jsx
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
  Divider,
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
        description: "We’ll get back to you within 24h.",
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

  // 🎨 THEME COLORS
  const cardBg = useColorModeValue("whiteAlpha.900", "blackAlpha.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      position="relative"
      minH="100vh"
      bgImage="url('/mid-shot-woman-talking-phone-table.jpg')" // ✅ ta photo
      bgSize="cover"
      bgPos="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
      py={20}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bg: "blackAlpha.600", // ✅ overlay sombre pour lisibilité
      }}
    >
      <MotionBox
        position="relative"
        maxW="4xl"
        w="100%"
        p={12}
        borderRadius="3xl"
        shadow="2xl"
        bg={cardBg}
        backdropFilter="blur(10px) saturate(140%)" // ✅ effet glassmorphism
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <VStack spacing={10} align="stretch">
          {/* HEADER */}
          <VStack spacing={3} textAlign="center">
            <Heading
              size="2xl"
              fontWeight="extrabold"
              bgGradient="linear(to-r, brand.500, brand.300)"
              bgClip="text"
            >
              Let’s build the future of payments
            </Heading>
            <Text fontSize="lg" color={textColor}>
              Drop us your email and message. A member of our team will get back
              within <b>24 hours</b>.
            </Text>
          </VStack>

          {/* FORM */}
          <VStack spacing={6} align="stretch">
            <Input
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              borderRadius="xl"
              shadow="sm"
              _focus={{
                borderColor: "brand.500",
                boxShadow: "0 0 0 2px #2368f5",
              }}
            />
            <Textarea
              placeholder="Tell us how we can help..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              size="lg"
              borderRadius="xl"
              shadow="sm"
              _focus={{
                borderColor: "brand.500",
                boxShadow: "0 0 0 2px #2368f5",
              }}
            />
            <Button
              size="lg"
              borderRadius="full"
              px={10}
              py={6}
              color="white"
              fontWeight="bold"
              bgGradient="linear(to-r, brand.500, brand.300)"
              rightIcon={<FaPaperPlane />}
              _hover={{
                filter: "brightness(1.1)",
                transform: "translateY(-2px)",
              }}
              onClick={handleSubmit}
              isLoading={loading}
              loadingText="Sending..."
            >
              Send Message
            </Button>
          </VStack>

          {/* TRUST SIGNALS */}
          <Divider my={6} />
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={8}
            textAlign="center"
          >
            <VStack>
              <Icon as={FaLock} boxSize={6} color="brand.500" />
              <Text fontWeight="semibold">Secure by design</Text>
              <Text fontSize="sm" color={textColor}>
                Messages stored safely in our database.
              </Text>
            </VStack>
            <VStack>
              <Icon as={FaGlobe} boxSize={6} color="brand.500" />
              <Text fontWeight="semibold">Global coverage</Text>
              <Text fontSize="sm" color={textColor}>
                Supporting merchants worldwide with top PSPs.
              </Text>
            </VStack>
            <VStack>
              <Icon as={FaUsers} boxSize={6} color="brand.500" />
              <Text fontWeight="semibold">Human-first support</Text>
              <Text fontSize="sm" color={textColor}>
                Talk directly to our product team.
              </Text>
            </VStack>
          </SimpleGrid>
        </VStack>
      </MotionBox>
    </Box>
  );
}
