import { Heading, Text, useColorModeValue } from "@chakra-ui/react";
import GlowCard from "../GlowCard";

export default function ValueCard({ title, text }) {
  return (
    <GlowCard>
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>{text}</Text>
    </GlowCard>
  );
}
