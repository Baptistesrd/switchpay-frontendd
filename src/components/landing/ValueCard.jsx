import { Heading, Text } from "@chakra-ui/react";
import GlowCard from "../GlowCard";

export default function ValueCard({ title, text }) {
  return (
    <GlowCard>
      <Heading size="md" mb={2} color="white">
        {title}
      </Heading>
      <Text color="rgba(255,255,255,0.5)">{text}</Text>
    </GlowCard>
  );
}
