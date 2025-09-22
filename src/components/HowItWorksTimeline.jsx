// src/components/HowItWorksTimeline.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
  Badge,
  useColorModeValue,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { AtSignIcon, RepeatIcon, CheckCircleIcon } from "@chakra-ui/icons";
import GlowCard from "./GlowCard";

// Safe motion wrappers
const MotionBox = motion(Box);
const MotionHStack = motion(HStack);

export default function HowItWorksTimeline() {
  const containerRef = useRef(null);
  const railRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const lineCol = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const dotBg = useColorModeValue("white", "gray.900");
  const labelCol = useColorModeValue("gray.600", "gray.300");
  const glow = useColorModeValue("rgba(35,104,245,0.35)", "rgba(122,162,255,0.45)");

  const brandFrom = useColorModeValue("#2368f5", "#7aa2ff");
  const brandTo = useColorModeValue("#66a3ff", "#4a6bdc");

  const steps = useMemo(
    () => [
      {
        n: 1,
        title: "Collect",
        desc: "Your frontend sends the payment request (amount, currency, country, device) secured with an API Key.",
        icon: AtSignIcon,
        badge: "Step 1",
      },
      {
        n: 2,
        title: "Route",
        desc: "Our smart router instantly selects the most efficient PSP (Stripe, Adyen, Wise, Rapyd…) to maximize performance and minimize costs.",
        icon: RepeatIcon,
        badge: "Step 2",
      },
      {
        n: 3,
        title: "Settle",
        desc: "The transaction is processed, stored, and your KPIs are automatically updated in real time.",
        icon: CheckCircleIcon,
        badge: "Step 3",
      },
    ],
    []
  );

  // ===== Scroll-driven progress on the vertical rail
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.4"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });

  const [railHeight, setRailHeight] = useState(0);
  useEffect(() => {
    const update = () => setRailHeight(railRef.current ? railRef.current.clientHeight : 0);
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const progressHeight = useTransform(eased, [0, 1], [0, railHeight]);
  const shineY = useTransform(eased, [0, 1], [0, railHeight - 140]);

  const heightValue = prefersReducedMotion ? "100%" : progressHeight;

  return (
    <Box ref={containerRef} position="relative" py={{ base: 2, md: 4 }}>
      {/* Vertical rail */}
      <Box
        ref={railRef}
        position="absolute"
        left={{ base: "26px", md: "44px" }}
        top={0}
        bottom={0}
        w="2px"
        bg={lineCol}
        overflow="hidden"
        borderRadius="full"
      >
        {/* Animated gradient progress */}
        <MotionBox
          style={{ height: heightValue }}
          w="100%"
          bgGradient={`linear(to-b, ${brandFrom}, ${brandTo})`}
          boxShadow={`0 0 24px ${glow}`}
        />

        {/* Subtle moving shine */}
        {!prefersReducedMotion && (
          <MotionBox
            position="absolute"
            insetX={-1}
            top={0}
            h="140px"
            bgGradient={`linear(to-b, ${brandFrom}, ${brandTo}, transparent)`}
            style={{ y: shineY }}
            opacity={0.85}
          />
        )}
      </Box>

      {/* Steps */}
      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
        {steps.map((s, i) => (
          <StepCard key={s.n} index={i} {...s} dotBg={dotBg} labelCol={labelCol} />
        ))}
      </VStack>
    </Box>
  );
}

function StepCard({ index, icon, badge, title, desc, hint, dotBg, labelCol }) {
  const itemRef = useRef(null);
  const inView = useInView(itemRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const initial = { opacity: 0, y: 18, rotateX: 6, filter: "blur(6px)" };
  const animate = inView
    ? {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        transition: { duration: 0.45, delay: index * 0.08, ease: "easeOut" },
      }
    : {};

  const hover = prefersReducedMotion ? {} : { translateY: -2, scale: 1.01 };
  const brandShadow = useColorModeValue(
    "0 12px 40px rgba(35,104,245,.18)",
    "0 12px 40px rgba(122,162,255,.22)"
  );

  return (
    <MotionBox
      ref={itemRef}
      position="relative"
      pl={{ base: 14, md: 24 }}
      initial={initial}
      animate={animate}
    >
      {/* Dot + Icon */}
      <MotionHStack
        spacing={4}
        align="start"
        position="absolute"
        left={0}
        top={1}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={
          inView
            ? { scale: 1, opacity: 1, transition: { delay: 0.05 + index * 0.08 } }
            : {}
        }
      >
        <Box position="relative">
          {!prefersReducedMotion && (
            <MotionBox
              position="absolute"
              inset={-4}
              borderRadius="full"
              bgGradient="radial(brand.500 1px, transparent 60%)"
              opacity={0.35}
              animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.15, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <Box
            w={{ base: "36px", md: "50px" }}
            h={{ base: "36px", md: "50px" }}
            borderRadius="full"
            bg={dotBg}
            border="2px solid"
            borderColor="brand.500"
            display="grid"
            placeItems="center"
            boxShadow="0 0 0 3px rgba(35,104,245,0.16)"
          >
            <Icon as={icon} color="brand.500" boxSize={{ base: 5, md: 6 }} />
          </Box>
        </Box>
      </MotionHStack>

      {/* Card */}
      <MotionBox whileHover={hover} transition={{ type: "spring", stiffness: 220, damping: 18 }}>
        <GlowCard p={{ base: 4, md: 6 }} boxShadow={brandShadow}>
          <HStack spacing={3} mb={2} flexWrap="wrap">
            <Badge colorScheme="blue" borderRadius="full">
              {badge}
            </Badge>
            {hint && (
              <Tooltip label={hint} hasArrow>
                <Badge variant="subtle" colorScheme="purple" borderRadius="full">
                  {hint}
                </Badge>
              </Tooltip>
            )}
          </HStack>
          <Heading size={{ base: "md", md: "lg" }} mb={1}>
            {title}
          </Heading>
          <Text color={labelCol}>{desc}</Text>
        </GlowCard>
      </MotionBox>
    </MotionBox>
  );
}

const BrandGradient = chakra("span", {
  baseStyle: {
    bgGradient: "linear(to-r, brand.500, brand.300)",
    bgClip: "text",
  },
});
