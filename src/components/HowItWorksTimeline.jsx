// src/components/HowItWorksTimeline.jsx
import {
  Box, VStack, HStack, Heading, Text, Icon, useColorModeValue, Badge
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AtSignIcon, RepeatIcon, CheckCircleIcon } from "@chakra-ui/icons";
import GlowCard from "./GlowCard";

const MotionBox = motion.create(Box);

export default function HowItWorksTimeline() {
  const lineCol = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const dotBg = useColorModeValue("white", "gray.900");
  const brandFrom = useColorModeValue("#2368f5", "#7aa2ff");
  const brandTo = useColorModeValue("#66a3ff", "#4a6bdc");

  const steps = [
    {
      n: 1,
      title: "Collect",
      desc: "Front envoie (montant, devise, pays, device) avec API Key.",
      icon: AtSignIcon,
      badge: "Step 1",
    },
    {
      n: 2,
      title: "Route",
      desc: "Smart router choisit le PSP optimal (Stripe/Adyen/Wise/Rapyd…).",
      icon: RepeatIcon,
      badge: "Step 2",
    },
    {
      n: 3,
      title: "Settle",
      desc: "Paiement traité, stocké en base, KPIs mis à jour.",
      icon: CheckCircleIcon,
      badge: "Step 3",
    },
  ];

  return (
    <Box position="relative" py={2}>
      {/* Ligne verticale */}
      <Box
        position="absolute"
        left={{ base: "24px", md: "40px" }}
        top="0"
        bottom="0"
        width="2px"
        bg={lineCol}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: -1,
          right: -1,
          height: "120px",
          bgGradient: `linear(to-b, ${brandFrom}, ${brandTo}, transparent)`,
          borderRadius: "full",
        }}
      />
      {/* Steps */}
      <VStack spacing={8} align="stretch">
        {steps.map((s, i) => (
          <TimelineItem
            key={s.n}
            index={i}
            icon={s.icon}
            badge={s.badge}
            title={s.title}
            desc={s.desc}
            dotBg={dotBg}
          />
        ))}
      </VStack>
    </Box>
  );
}

function TimelineItem({ index, icon, badge, title, desc, dotBg }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      position="relative"
      pl={{ base: 12, md: 20 }}
    >
      {/* Dot + Icon */}
      <HStack spacing={4} align="start" position="absolute" left={0} top={0}>
        <Box
          w={{ base: "32px", md: "44px" }}
          h={{ base: "32px", md: "44px" }}
          borderRadius="full"
          bg={dotBg}
          border="2px solid"
          borderColor="brand.500"
          display="grid"
          placeItems="center"
          boxShadow="0 0 0 3px rgba(35,104,245,0.15)"
        >
          <Icon as={icon} color="brand.500" boxSize={{ base: 4, md: 5 }} />
        </Box>
      </HStack>

      {/* Card content */}
      <GlowCard p={{ base: 4, md: 6 }}>
        <Badge colorScheme="blue" borderRadius="full" mb={2}>
          {badge}
        </Badge>
        <Heading size="md" mb={1}>
          {title}
        </Heading>
        <Text color={useColorModeValue("gray.600", "gray.300")}>{desc}</Text>
      </GlowCard>
    </MotionBox>
  );
}
