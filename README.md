switchpay
Smart payment routing infrastructure, built to maximize authorization rates across PSPs.

What it does
switchpay routes each transaction to the optimal Payment Service Provider based on observed performance. The routing engine scores PSPs in real time using a weighted combination of success rate (60%) and latency (40%) computed over recent transaction history. When data is insufficient, it falls back to geographic heuristics by country and currency.

Architecture
Backend : FastAPI with idempotency handling, exponential backoff failover, and a SQLite store (WAL mode)
Routing engine : dynamic scoring over a configurable history window (HISTORY_WINDOW = 200), with static geo-fallback at cold start
PSP layer : simulated providers (Stripe, Adyen, Wise, Rapyd) with differentiated performance profiles: success rates from 82% to 97%, latency from 80ms to 800ms
Dashboard : real-time KPIs, PSP distribution, latency histogram, and routing opportunity detection
Frontend : React + Chakra UI, deployed on Render
Known limits
The current scoring assumes PSP performance is stationary over the history window — which real-world data would not guarantee. Handling non-stationarity (concept drift, seasonality) and quantifying estimation uncertainty are open problems that motivated further study.

Stack
Python · FastAPI · SQLite · React · Chakra UI · Recharts · Render
