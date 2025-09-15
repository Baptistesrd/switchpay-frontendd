// src/components/DashCharts.jsx
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from "recharts";
import { Box, SimpleGrid, Heading, useColorModeValue } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

function groupByDay(transactions, days = 14) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - (days - 1));

  const map = new Map(); // yyyy-mm-dd -> {date, volume, count, success, failed}
  for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    map.set(key, { date: key, volume: 0, count: 0, success: 0, failed: 0 });
  }

  for (const tx of transactions) {
    if (!tx.created_at) continue;
    const key = tx.created_at.slice(0, 10);
    if (!map.has(key)) continue;
    const bucket = map.get(key);
    bucket.volume += Number(tx.montant || 0);
    bucket.count += 1;
    if (tx.status === "success") bucket.success += 1;
    else bucket.failed += 1;
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

function latencyHistogram(transactions, binSize = 50, bins = 12) {
  // retourne des bins {bucket, count}
  const latencies = transactions
    .map((t) => Number(t.latency_ms))
    .filter((x) => Number.isFinite(x) && x >= 0);

  if (!latencies.length) return [];

  const max = Math.max(...latencies);
  const step = binSize || Math.ceil(max / bins) || 50;
  const buckets = new Map();

  for (let edge = 0; edge <= max + step; edge += step) {
    const label = `${edge}-${edge + step}`;
    buckets.set(label, 0);
  }
  for (const l of latencies) {
    const idx = Math.floor(l / step);
    const label = `${idx * step}-${(idx + 1) * step}`;
    buckets.set(label, (buckets.get(label) || 0) + 1);
  }
  return Array.from(buckets.entries()).map(([bucket, count]) => ({ bucket, count }));
}

export default function DashCharts({ transactions }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  const daily = useMemo(() => groupByDay(transactions, 14), [transactions]);
  const pspDist = useMemo(() => byPSP(transactions), [transactions]);
  const latencyDist = useMemo(() => latencyHistogram(transactions), [transactions]);

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
    <SimpleGrid columns={[1, 2]} spacing={6}>
      {/* Daily Volume (Area) */}
      <ChartCard title="Daily Volume (14d)" cardBg={cardBg} borderCol={borderCol}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={daily}>
            <defs>
              <linearGradient id="gradVol" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.6}/>
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0.05}/>
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

      {/* Success Rate (Line) */}
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

      {/* Transactions by PSP (Bar) */}
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

      {/* Success vs Failed (Pie) */}
      <ChartCard title="Success vs Failed" cardBg={cardBg} borderCol={borderCol}>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90}>
              {pieData.map((entry, i) => (
                <Cell key={`slice-${i}`} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Latency Histogram (Bar) — visible si latency persistée */}
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

