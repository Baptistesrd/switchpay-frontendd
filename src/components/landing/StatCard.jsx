import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import GlowCard from "../GlowCard";

export default function StatCard({ label, value }) {
  return (
    <GlowCard>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
      </Stat>
    </GlowCard>
  );
}
