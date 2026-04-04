import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";

const MotionDiv = motion.div;

const LOGOS = [
  { name: "Stripe",     src: "/Stripe_Logo,_revised_2016.svg.png" },
  { name: "Adyen",      src: "/Adyen_Corporate_Logo.svg.png" },
  { name: "PayPal",     src: "/PayPal.svg.png" },
  { name: "Wise",       src: "/Wise2020.svg" },
  { name: "Rapyd",      src: "/Rapyd-logo-768x236.webp" },
  { name: "Airwallex",  src: "/Airwallex_Logo_-_Black.png" },
];

const tripled = [...LOGOS, ...LOGOS, ...LOGOS];

export default function PspCarousel() {
  const controls = useAnimation();

  const startScroll = () => {
    controls.start({
      x: ["0%", "-33.333%"],
      transition: { duration: 22, ease: "linear", repeat: Infinity },
    });
  };

  useEffect(() => {
    startScroll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box py={6} overflow="hidden" position="relative">
      {/* Scrolling track */}
      <Box
        position="relative"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={startScroll}
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <MotionDiv
          animate={controls}
          style={{ display: "flex", gap: "12px", width: "max-content" }}
        >
          {tripled.map((logo, i) => (
            <Box
              key={i}
              display="flex"
              alignItems="center"
              justifyContent="center"
              px={6}
              py={4}
              bg="rgba(255,255,255,0.04)"
              border="1px solid rgba(255,255,255,0.07)"
              borderRadius="xl"
              flexShrink={0}
              w="160px"
              h="72px"
              _hover={{ bg: "rgba(255,255,255,0.07)" }}
              transition="background 0.2s"
            >
              <img
                src={logo.src}
                alt={logo.name}
                style={{
                  height: "32px",
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1) opacity(0.7)",
                  transition: "filter 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.filter =
                    "brightness(0) invert(1) opacity(1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.filter =
                    "brightness(0) invert(1) opacity(0.7)")
                }
              />
            </Box>
          ))}
        </MotionDiv>
      </Box>
    </Box>
  );
}
