import { Flex, Image, Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const logos = [
  { alt: "Stripe", src: "https://upload.wikimedia.org/wikipedia/commons/0/01/Stripe_Logo%2C_revised_2016.svg" },
  { alt: "Adyen",  src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Adyen_logo.svg" },
  { alt: "Wise",   src: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Wise_Logo.svg" },
  { alt: "Rapyd",  src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Rapyd_logo.svg" }
];

const MotionBox = motion.create(Box);

export default function TrustLogos() {
  const opacity = useColorModeValue(0.7, 0.8);
  const cardBg = useColorModeValue("whiteAlpha.700", "whiteAlpha.100");
  const borderCol = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  return (
    <Flex gap={{ base: 6, md: 10 }} justify="center" align="center" wrap="wrap" opacity={opacity} mt={2}>
      {logos.map((l) => (
        <MotionBox
          key={l.alt}
          h="26px"
          px={3}
          py={2}
          bg={cardBg}
          borderRadius="md"
          border="1px solid"
          borderColor={borderCol}
          backdropFilter="saturate(140%) blur(6px)"
          whileHover={{ y: -2, boxShadow: "0 10px 24px rgba(35,104,245,0.25)" }}
        >
          <Image src={l.src} alt={l.alt} h="100%" filter="grayscale(1)" />
        </MotionBox>
      ))}
    </Flex>
  );
}
