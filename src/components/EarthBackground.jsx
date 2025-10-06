// src/components/EarthBackground.jsx
import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function EarthBackground() {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
      overflow="hidden"
      zIndex={0}
      bgGradient="linear(to-b, #030712, #060e1a, #0a1224)"
    >
      {/* === Gradient central dynamique === */}
      <MotionBox
        position="absolute"
        top="40%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="1200px"
        h="1200px"
        borderRadius="full"
        bgGradient="radial(circle at 30% 30%, rgba(56,189,248,0.35), rgba(147,51,234,0.2), transparent 70%)"
        filter="blur(180px)"
        animate={{
          scale: [1, 1.05, 0.95, 1.02, 1],
          opacity: [0.4, 0.55, 0.35, 0.5, 0.4],
          rotate: [0, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* === Lignes d’énergie orbitale === */}
      {[...Array(4)].map((_, i) => (
        <MotionBox
          key={i}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w={`${600 + i * 200}px`}
          h={`${600 + i * 200}px`}
          border="1px solid"
          borderColor={
            i % 2
              ? "rgba(59,130,246,0.12)"
              : "rgba(147,51,234,0.1)"
          }
          borderRadius="full"
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 60 + i * 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* === Particules lumineuses (flux) === */}
      {[...Array(70)].map((_, i) => {
        const size = Math.random() * 3 + 1;
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const color =
          i % 3 === 0
            ? "rgba(56,189,248,0.8)"
            : i % 3 === 1
            ? "rgba(147,51,234,0.8)"
            : "rgba(255,255,255,0.5)";
        const duration = Math.random() * 10 + 8;

        return (
          <MotionBox
            key={i}
            position="absolute"
            left={left}
            top={top}
            w={`${size}px`}
            h={`${size}px`}
            borderRadius="full"
            bg={color}
            filter="blur(0.5px)"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        );
      })}

      {/* === Pulsation fintech centrale === */}
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="180px"
        h="180px"
        borderRadius="full"
        bgGradient="radial(circle at center, rgba(56,189,248,0.5), rgba(147,51,234,0.25), transparent)"
        filter="blur(30px)"
        animate={{
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.8, 0.4, 0.7, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* === Halo d’impact — le “bat-signal” fintech === */}
      <MotionBox
        position="absolute"
        bottom="-20%"
        right="-10%"
        w="700px"
        h="700px"
        borderRadius="full"
        bgGradient="radial(circle at center, rgba(59,130,246,0.35), transparent 70%)"
        filter="blur(150px)"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </Box>
  );
}
