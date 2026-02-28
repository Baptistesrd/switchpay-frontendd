import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import GlowCard from "./GlowCard";

const MotionBox = motion(Box);

export default function PaymentStackMap() {
  const muted = useColorModeValue("gray.500", "gray.400");

  return (
    <VStack spacing={10} w="100%" maxW="6xl" mx="auto">
      <VStack spacing={2} textAlign="center">
        <Heading
          size="lg"
          bgGradient="linear(to-r, cyan.400, purple.400)"
          bgClip="text"
        >
          Where switchpay sits in the payment stack
        </Heading>
        <Text color={muted} maxW="3xl">
          One decision layer. Multiple providers. Same global card rails.
        </Text>
      </VStack>

      <HStack
        spacing={{ base: 3, md: 5 }}
        align="center"
        justify="center"
        flexWrap="wrap"
      >
        <StackNode title="Customer" />
        <Arrow />
        <StackNode title="Your Shop" />
        <Arrow />

        <MotionBox
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.3 }}
        >
          <GlowCard
            px={6}
            py={5}
            border="2px solid"
            borderColor="brand.400"
            boxShadow="0 0 40px rgba(123,63,252,0.5)"
          >
            <VStack spacing={1}>
              <Badge colorScheme="purple">Decision Layer</Badge>
              <Heading size="md">switchpay</Heading>
              <Text fontSize="sm" color={muted} textAlign="center">
                Routing · Retries · Failover · Idempotency · Metrics
              </Text>
            </VStack>
          </GlowCard>
        </MotionBox>

        <Arrow />

        <StackNode title="PSPs" subtitle="Stripe · Adyen · Rapyd · Wise" />
        <Arrow />
        <StackNode title="Acquirer" />
        <Arrow />
        <StackNode title="Card Network" subtitle="Visa · Mastercard" />
        <Arrow />
        <StackNode title="Issuer" />
      </HStack>

      <MotionBox
        mt={4}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <GlowCard px={6} py={4}>
          <Text fontSize="sm" color={muted} textAlign="center">
  Routing decisions are continuously optimized for the highest authorization rate, 
  maximizing successful payments and aligning merchant revenue with customer intent.
</Text>

        </GlowCard>
      </MotionBox>
    </VStack>
  );
}


function StackNode({ title, subtitle }) {
  const muted = useColorModeValue("gray.500", "gray.400");

  return (
    <GlowCard px={5} py={4}>
      <VStack spacing={1} textAlign="center">
        <Heading size="sm">{title}</Heading>
        {subtitle && (
          <Text fontSize="xs" color={muted}>
            {subtitle}
          </Text>
        )}
      </VStack>
    </GlowCard>
  );
}

function Arrow() {
  return (
    <Box
      w="28px"
      h="2px"
      bgGradient="linear(to-r, cyan.400, purple.400)"
      opacity={0.6}
      borderRadius="full"
    />
  );
}
