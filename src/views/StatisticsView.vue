<template>
  <div class="stats-page">
    <!-- Header / Controls -->
    <div class="stats-header">
      <div>
        <h1 class="title">Statistics</h1>
        <p class="sub">Track income, expenses, and cashflow trends.</p>
      </div>

      <div class="controls">
        <select v-model="rangePreset" class="control">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>

        <select v-model="groupBy" class="control">
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
        </select>

        <button class="btn" @click="exportCSV">Export CSV</button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="kpis">
      <div class="kpi">
        <div class="kpi-label">Total Income</div>
        <div class="kpi-value">{{ money(totalIncome) }}</div>
        <div class="kpi-sub">Selected period</div>
      </div>

      <div class="kpi">
        <div class="kpi-label">Total Expense</div>
        <div class="kpi-value">{{ money(totalExpense) }}</div>
        <div class="kpi-sub">Selected period</div>
      </div>

      <div class="kpi">
        <div class="kpi-label">Net</div>
        <div class="kpi-value" :class="{ negative: net < 0 }">{{ money(net) }}</div>
        <div class="kpi-sub">Income − Expense</div>
      </div>

      <div class="kpi">
        <div class="kpi-label">Avg Daily Spend</div>
        <div class="kpi-value">{{ money(avgDailySpend) }}</div>
        <div class="kpi-sub">Expenses / days</div>
      </div>
    </div>

    <!-- Charts grid -->
    <div class="grid">
      <!-- Trend -->
      <div class="card span-2">
        <div class="card-head">
          <div>
            <div class="card-title">Income vs Expense</div>
            <div class="card-sub">Trend over time ({{ groupByLabel }})</div>
          </div>
        </div>
        <div class="chart-wrap">
          <canvas ref="trendCanvas"></canvas>
        </div>
      </div>

      <!-- Category donut -->
      <div class="card">
        <div class="card-head">
          <div>
            <div class="card-title">Expenses by Category</div>
            <div class="card-sub">Distribution in the selected period</div>
          </div>
        </div>
        <div class="chart-wrap donut">
          <canvas ref="categoryCanvas"></canvas>
        </div>

        <div class="legend">
          <div v-for="row in categoryLegend" :key="row.name" class="legend-row">
            <span class="dot" :style="{ background: row.color }"></span>
            <span class="legend-name">{{ row.name }}</span>
            <span class="legend-val">{{ money(row.value) }}</span>
          </div>
        </div>
      </div>

      <!-- Cashflow bars -->
      <div class="card">
        <div class="card-head">
          <div>
            <div class="card-title">Cashflow</div>
            <div class="card-sub">Total inflow, outflow, and net</div>
          </div>
        </div>
        <div class="chart-wrap">
          <canvas ref="cashflowCanvas"></canvas>
        </div>
      </div>

      <!-- Transactions table -->
      <div class="card span-2">
        <div class="card-head">
          <div>
            <div class="card-title">Transactions</div>
            <div class="card-sub">Filtered to selected period</div>
          </div>

          <div class="table-controls">
            <input v-model="search" class="control" placeholder="Search (title/category/member)..." />
            <select v-model="typeFilter" class="control">
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div class="table">
          <div class="t-head">
            <div>Date</div>
            <div>Title</div>
            <div>Category</div>
            <div>Member</div>
            <div class="right">Amount</div>
          </div>

          <div v-if="tableRows.length === 0" class="t-empty">
            No transactions found.
          </div>

          <div v-else class="t-row" v-for="t in tableRows" :key="t.id">
            <div>{{ formatDate(t.date) }}</div>
            <div>{{ t.title }}</div>
            <div>{{ t.category }}</div>
            <div>{{ t.member || "-" }}</div>
            <div class="right" :class="{ neg: t.type === 'expense' }">
              {{ t.type === 'expense' ? "-" : "+" }}{{ money(t.amount) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  DoughnutController,
  ArcElement,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

/* Register Chart.js pieces (required for tree-shaking builds) */
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  DoughnutController,
  ArcElement,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  Filler
);

/* ------------ Controls ------------ */
const rangePreset = ref("30"); // days
const groupBy = ref("day"); // day | week
const search = ref("");
const typeFilter = ref("all"); // all | income | expense

const groupByLabel = computed(() => (groupBy.value === "day" ? "daily" : "weekly"));

/* ------------ Mock “realistic” finance data ------------ */
function seedTransactions() {
  // You can replace this with API/store later.
  const categories = ["Salary", "Food", "Rent", "Transport", "Shopping", "Utilities", "Other"];
  const members = ["person1", "person2", "person3", "person4", null];

  const now = new Date();
  const daysBack = 120;
  const list = [];
  let id = 1;

  for (let i = daysBack; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);

    // Income: salary every ~14 days
    if (i % 14 === 0) {
      list.push({
        id: `t${id++}`,
        date: d.toISOString(),
        type: "income",
        title: "Salary",
        category: "Salary",
        member: null,
        amount: 3000 + Math.round(Math.random() * 500),
      });
    }

    // Random expense events
    const expenseCount = 1 + Math.floor(Math.random() * 3); // 1-3 expenses/day
    for (let k = 0; k < expenseCount; k++) {
      const cat = categories[1 + Math.floor(Math.random() * (categories.length - 1))];
      const base =
        cat === "Rent" ? 1200 :
        cat === "Shopping" ? 120 :
        cat === "Utilities" ? 80 :
        cat === "Transport" ? 25 :
        cat === "Food" ? 35 :
        40;

      list.push({
        id: `t${id++}`,
        date: d.toISOString(),
        type: "expense",
        title: cat === "Food" ? "Meal" : cat,
        category: cat,
        member: members[Math.floor(Math.random() * members.length)],
        amount: Math.max(5, Math.round(base + Math.random() * base)),
      });
    }
  }

  return list;
}

const allTx = ref(seedTransactions());

/* ------------ Date filtering ------------ */
const periodStart = computed(() => {
  const days = Number(rangePreset.value);
  const d = new Date();
  d.setDate(d.getDate() - (days - 1));
  d.setHours(0, 0, 0, 0);
  return d;
});

const filteredTx = computed(() => {
  return allTx.value.filter((t) => new Date(t.date) >= periodStart.value);
});

/* ------------ KPI calculations ------------ */
const totalIncome = computed(() =>
  filteredTx.value
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0)
);

const totalExpense = computed(() =>
  filteredTx.value
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0)
);

const net = computed(() => totalIncome.value - totalExpense.value);

const avgDailySpend = computed(() => {
  const days = Number(rangePreset.value);
  return days ? Math.round(totalExpense.value / days) : 0;
});

/* ------------ Grouping for trend chart ------------ */
function toDayKey(dateIso) {
  const d = new Date(dateIso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function startOfWeek(dateIso) {
  const d = new Date(dateIso);
  const day = d.getDay(); // 0 Sun..6 Sat
  const diff = (day + 6) % 7; // make Monday start
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const trendSeries = computed(() => {
  const map = new Map(); // key -> {income, expense}
  for (const t of filteredTx.value) {
    const key = groupBy.value === "day" ? toDayKey(t.date) : startOfWeek(t.date);
    if (!map.has(key)) map.set(key, { income: 0, expense: 0 });
    const row = map.get(key);
    if (t.type === "income") row.income += t.amount;
    else row.expense += t.amount;
  }

  // sort keys ascending
  const labels = [...map.keys()].sort((a, b) => new Date(a) - new Date(b));
  const income = labels.map((k) => map.get(k).income);
  const expense = labels.map((k) => map.get(k).expense);
  return { labels, income, expense };
});

/* ------------ Category breakdown ------------ */
const categoryBreakdown = computed(() => {
  const map = new Map();
  for (const t of filteredTx.value) {
    if (t.type !== "expense") continue;
    map.set(t.category, (map.get(t.category) || 0) + t.amount);
  }
  // sort desc
  return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
});

/* Colors for legend (simple stable palette) */
const palette = [
  "#1a73e8", "#34a853", "#fbbc04", "#ea4335", "#8e24aa", "#00acc1", "#5f6368"
];

const categoryLegend = computed(() => {
  return categoryBreakdown.value.map((row, idx) => ({
    ...row,
    color: palette[idx % palette.length],
  }));
});

/* ------------ Cashflow ------------ */
const cashflow = computed(() => ({
  inflow: totalIncome.value,
  outflow: totalExpense.value,
  net: net.value,
}));

/* ------------ Table filtering ------------ */
const tableRows = computed(() => {
  let rows = [...filteredTx.value];

  if (typeFilter.value !== "all") {
    rows = rows.filter((t) => t.type === typeFilter.value);
  }

  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase();
    rows = rows.filter((t) =>
      `${t.title} ${t.category} ${t.member || ""}`.toLowerCase().includes(q)
    );
  }

  // newest first
  rows.sort((a, b) => new Date(b.date) - new Date(a.date));
  return rows.slice(0, 40); // keep table light
});

/* ------------ Charts (Chart.js) ------------ */
const trendCanvas = ref(null);
const categoryCanvas = ref(null);
const cashflowCanvas = ref(null);

let trendChart = null;
let categoryChart = null;
let cashflowChart = null;

function buildCharts() {
  destroyCharts();

  // Trend line chart
  trendChart = new Chart(trendCanvas.value, {
    type: "line",
    data: {
      labels: trendSeries.value.labels,
      datasets: [
        {
          label: "Income",
          data: trendSeries.value.income,
          tension: 0.35,
          fill: true,
        },
        {
          label: "Expense",
          data: trendSeries.value.expense,
          tension: 0.35,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  // Category doughnut
  categoryChart = new Chart(categoryCanvas.value, {
    type: "doughnut",
    data: {
      labels: categoryLegend.value.map((x) => x.name),
      datasets: [
        {
          data: categoryLegend.value.map((x) => x.value),
          backgroundColor: categoryLegend.value.map((x) => x.color),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      cutout: "65%",
    },
  });

  // Cashflow bar
  cashflowChart = new Chart(cashflowCanvas.value, {
    type: "bar",
    data: {
      labels: ["Inflow", "Outflow", "Net"],
      datasets: [
        {
          label: "Amount",
          data: [cashflow.value.inflow, cashflow.value.outflow, cashflow.value.net],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });
}

function destroyCharts() {
  if (trendChart) trendChart.destroy();
  if (categoryChart) categoryChart.destroy();
  if (cashflowChart) cashflowChart.destroy();
  trendChart = categoryChart = cashflowChart = null;
}

/* rebuild charts when filters change */
watch([rangePreset, groupBy], () => {
  // small timeout ensures DOM canvas is stable
  setTimeout(buildCharts, 0);
});

/* ------------ Actions ------------ */
function money(v) {
  // you can change to ¥ or ৳
  return `¥${Number(v || 0).toLocaleString()}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString();
}

function exportCSV() {
  const rows = filteredTx.value;
  const header = ["date", "type", "title", "category", "member", "amount"];
  const csv = [
    header.join(","),
    ...rows.map((t) => [
      `"${t.date}"`,
      `"${t.type}"`,
      `"${t.title}"`,
      `"${t.category}"`,
      `"${t.member || ""}"`,
      `"${t.amount}"`
    ].join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `statistics_${rangePreset.value}days.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

onMounted(() => {
  buildCharts();
});

onBeforeUnmount(() => {
  destroyCharts();
});
</script>

<style scoped>


.stats-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 14px;
}
.title {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
}
.sub {
  margin: 6px 0 0;
  opacity: 0.7;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.control {
  border: 1px solid rgba(0,0,0,0.12);
  background: #fff;
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
}

.btn {
  border: 1px solid rgba(0,0,0,0.12);
  background: #111;
  color: #fff;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.kpis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 14px 0;
}

.kpi {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 14px;
  padding: 14px;
}
.kpi-label { opacity: 0.7; font-weight: 700; font-size: 13px; }
.kpi-value { font-size: 22px; font-weight: 900; margin-top: 8px; }
.kpi-sub { opacity: 0.6; margin-top: 6px; font-size: 12px; }
.negative { color: #b00020; }

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
}
.card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 14px;
  padding: 14px;
}
.span-2 { grid-column: span 2; }

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 10px;
}
.card-title { font-weight: 900; }
.card-sub { opacity: 0.65; margin-top: 4px; font-size: 12px; }

.chart-wrap {
  height: 280px;
}
.chart-wrap.donut {
  height: 220px;
}

.legend {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.legend-row {
  display: grid;
  grid-template-columns: 14px 1fr auto;
  gap: 10px;
  align-items: center;
  font-size: 13px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}
.legend-name { opacity: 0.85; }
.legend-val { font-weight: 800; }

.table-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.table {
  margin-top: 10px;
  border-top: 1px solid rgba(0,0,0,0.08);
}
.t-head, .t-row {
  display: grid;
  grid-template-columns: 140px 1.2fr 1fr 1fr 160px;
  gap: 10px;
  padding: 10px 0;
  align-items: center;
}
.t-head {
  font-weight: 900;
  opacity: 0.7;
}
.t-row {
  border-top: 1px solid rgba(0,0,0,0.06);
}
.right { text-align: right; font-weight: 900; }
.neg { color: #b00020; }

.t-empty {
  padding: 18px 0;
  opacity: 0.65;
}

/* Responsive */
@media (max-width: 980px) {
  .kpis { grid-template-columns: repeat(2, 1fr); }
  .grid { grid-template-columns: 1fr; }
  .span-2 { grid-column: span 1; }
  .t-head, .t-row { grid-template-columns: 120px 1fr 1fr 1fr 120px; }
}
</style>
