import { HStack, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function RoadmapItem({ text }) {
  return (
    <HStack align="start" spacing={3}>
      <CheckCircleIcon color="#a5b4fc" mt="2px" />
      <Text color="rgba(255,255,255,0.7)">{text}</Text>
    </HStack>
  );
}
