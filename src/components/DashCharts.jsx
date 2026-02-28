import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from "recharts";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Badge,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

function groupByDay(transactions, days = 14) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - (days - 1));

  const map = new Map();
  for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    map.set(key, { date: key, volume: 0, count: 0, success: 0 });
  }

  for (const tx of transactions) {
    if (!tx.created_at) continue;
    const key = tx.created_at.slice(0, 10);
    if (!map.has(key)) continue;

    const b = map.get(key);
    b.volume += Number(tx.montant || 0);
    b.count += 1;
    if (tx.status === "success") b.success += 1;
  }

  return Array.from(map.values()).map((d) => ({
    ...d,
    successRate: d.count ? Math.round((d.success / d.count) * 100) : 0,
    label: format(parseISO(d.date + "T00:00:00Z"), "MMM d"),
  }));
}

function byPSP(transactions) {
  const map = new Map();
  for (const tx of transactions) {
    const k = tx.psp || "unknown";
    map.set(k, (map.get(k) || 0) + 1);
  }
  return Array.from(map.entries()).map(([psp, count]) => ({ psp, count }));
}

function latencyHistogram(transactions, step = 50) {
  const latencies = transactions
    .map((t) => Number(t.latency_ms))
    .filter((x) => Number.isFinite(x) && x >= 0);

  if (!latencies.length) return [];

  const max = Math.max(...latencies);
  const buckets = new Map();

  for (let edge = 0; edge <= max + step; edge += step) {
    buckets.set(`${edge}-${edge + step}`, 0);
  }

  for (const l of latencies) {
    const idx = Math.floor(l / step);
    const label = `${idx * step}-${(idx + 1) * step}`;
    buckets.set(label, (buckets.get(label) || 0) + 1);
  }

  return Array.from(buckets.entries()).map(([bucket, count]) => ({ bucket, count }));
}

function computeRoutingInsight(transactions) {
  const map = new Map();

  for (const tx of transactions) {
    if (!tx.psp || !tx.pays || !tx.devise) continue;
    const key = `${tx.psp}_${tx.pays}_${tx.devise}`;
    const bucket = map.get(key) || { psp: tx.psp, pays: tx.pays, devise: tx.devise, count: 0, success: 0 };
    bucket.count += 1;
    if (tx.status === "success") bucket.success += 1;
    map.set(key, bucket);
  }

  const stats = Array.from(map.values())
    .filter((b) => b.count >= 5)
    .map((b) => ({
      ...b,
      successRate: Math.round((b.success / b.count) * 100),
    }));

  if (stats.length < 2) return null;

  stats.sort((a, b) => b.successRate - a.successRate);
  const best = stats[0];
  const worst = stats[stats.length - 1];

  if (best.successRate - worst.successRate < 3) return null;

  const avgAmount =
    transactions.reduce((s, t) => s + Number(t.montant || 0), 0) /
    Math.max(transactions.length, 1);

  const estimatedGain =
    Math.round(((best.successRate - worst.successRate) / 100) * avgAmount * worst.count);

  return {
    from: worst,
    to: best,
    estimatedGain,
  };
}

export default function DashCharts({ transactions }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  const daily = useMemo(() => groupByDay(transactions), [transactions]);
  const pspDist = useMemo(() => byPSP(transactions), [transactions]);
  const latencyDist = useMemo(() => latencyHistogram(transactions), [transactions]);
  const insight = useMemo(() => computeRoutingInsight(transactions), [transactions]);

  const pieData = useMemo(() => {
    const success = transactions.filter((t) => t.status === "success").length;
    const failed = transactions.length - success;
    return [
      { name: "Success", value: success },
      { name: "Failed", value: failed },
    ];
  }, [transactions]);

  const colors = useColorModeValue(
    ["#2368f5", "#7ea0ff", "#1b52c4", "#99c2ff"],
    ["#7aa2ff", "#4a6bdc", "#90a4ff", "#2b3a80"]
  );

  return (
    <VStack spacing={6} align="stretch">

      {/*ROUTING INSIGHT */}
      {insight && (
        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={borderCol}
          borderRadius="2xl"
          p={6}
          shadow="lg"
        >
          <VStack align="start" spacing={3}>
            <Badge colorScheme="orange" variant="subtle" borderRadius="full">
              ⚠️ Routing opportunity detected
            </Badge>

            <Text fontSize="sm">
              <b>{insight.from.psp}</b> ({insight.from.pays}/{insight.from.devise}) success rate:{" "}
              <b>{insight.from.successRate}%</b>
            </Text>

            <Text fontSize="sm">
              <b>{insight.to.psp}</b> ({insight.to.pays}/{insight.to.devise}) success rate:{" "}
              <b>{insight.to.successRate}%</b>
            </Text>

            <Text fontWeight="semibold">
              → Switching would have saved approximately{" "}
              <b>€{insight.estimatedGain.toLocaleString()}</b> last week
            </Text>
          </VStack>
        </Box>
      )}

      {/* CHARTS */}
      <SimpleGrid columns={[1, 2]} spacing={6}>
        <ChartCard title="Daily Volume (14d)" cardBg={cardBg} borderCol={borderCol}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={daily}>
              <defs>
                <linearGradient id="gradVol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={colors[0]} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="volume" stroke={colors[0]} fill="url(#gradVol)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Success Rate (14d)" cardBg={cardBg} borderCol={borderCol}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="successRate" stroke={colors[1]} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Transactions by PSP" cardBg={cardBg} borderCol={borderCol}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={pspDist}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="psp" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={colors[2]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Latency Histogram (ms)" cardBg={cardBg} borderCol={borderCol}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={latencyDist}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="bucket" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={colors[3]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </SimpleGrid>
    </VStack>
  );
}

function ChartCard({ title, children, cardBg, borderCol }) {
  return (
    <Box bg={cardBg} p={4} borderRadius="md" shadow="md" border="1px solid" borderColor={borderCol}>
      <Heading size="sm" mb={3}>{title}</Heading>
      {children}
    </Box>
  );
}
