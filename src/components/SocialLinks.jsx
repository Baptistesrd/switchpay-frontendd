import { HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/baptiste-sardou-789114288/",
    svg: (
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5V24H0V8zm7.5 0h4.8v2.2h.07c.67-1.3 2.3-2.67 4.73-2.67 5.06 0 6 3.33 6 7.67V24h-5v-7.1c0-1.7-.03-3.9-2.37-3.9-2.37 0-2.73 1.85-2.73 3.77V24h-5V8z" />
    ),
    viewBox: "0 0 24 24",
  },
  {
    label: "X",
    href: "https://x.com/BatouS8",
    svg: (
      <path d="M18.244 2H21.5l-7.5 8.573L22.5 22h-6.188l-4.83-5.59L5.8 22H2.5l8.107-9.267L1.5 2h6.312l4.36 5.02L18.244 2zm-1.086 18h1.695L7.89 4H6.14l11.018 16z" />
    ),
    viewBox: "0 0 24 24",
  },
  {
    label: "Substack",
    href: "https://substack.com/@baptistesardou?utm_source=user-menu",
    svg: (
      <>
        <path d="M3 3h18v3H3z" />
        <path d="M3 8h18v3H3z" />
        <path d="M3 13h18v8l-9-5-9 5z" />
      </>
    ),
    viewBox: "0 0 24 24",
  },
];

const MotionIconButton = motion.create(IconButton);

export default function SocialLinks() {
  return (
    <HStack spacing={4}>
      {links.map((l) => (
        <Tooltip key={l.label} label={l.label} hasArrow>
          <MotionIconButton
            as="a"
            href={l.href}
            target="_blank"
            rel="noreferrer"
            aria-label={l.label}
            icon={
              <svg width="20" height="20" viewBox={l.viewBox} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                {l.svg}
              </svg>
            }
            variant="ghost"
            _hover={{ color: "brand.500", bg: "blackAlpha.50" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          />
        </Tooltip>
      ))}
    </HStack>
  );
}
