import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MainLayout } from "@/components/layout/MainLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { TrendingUp, Target, Clock, Award } from "lucide-react";

const weeklyData = [
  { day: "Mon", score: 6.5, attempts: 3 },
  { day: "Tue", score: 7.2, attempts: 4 },
  { day: "Wed", score: 6.8, attempts: 2 },
  { day: "Thu", score: 7.8, attempts: 5 },
  { day: "Fri", score: 8.1, attempts: 4 },
  { day: "Sat", score: 7.5, attempts: 3 },
  { day: "Sun", score: 8.4, attempts: 6 },
];

const categoryData = [
  { category: "Product Sense", score: 78, color: "hsl(217 91% 60%)" },
  { category: "Metrics", score: 65, color: "hsl(45 93% 47%)" },
  { category: "Strategy", score: 82, color: "hsl(142 76% 36%)" },
];

const progressData = [
  { week: "W1", score: 5.8 },
  { week: "W2", score: 6.2 },
  { week: "W3", score: 6.5 },
  { week: "W4", score: 7.1 },
  { week: "W5", score: 7.4 },
  { week: "W6", score: 7.8 },
  { week: "W7", score: 8.1 },
  { week: "W8", score: 7.9 },
];

const Analytics = () => {
  return (
    <MainLayout>
      <div className="min-h-screen px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight">Progress Analytics</h1>
          <p className="mt-1 text-muted-foreground">
            Track your PM interview preparation journey
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            { icon: TrendingUp, label: "Avg Score Trend", value: "+18%", sub: "vs. last month", color: "text-emerald-400" },
            { icon: Target, label: "Accuracy Rate", value: "73%", sub: "correct frameworks", color: "text-primary" },
            { icon: Clock, label: "Avg Response Time", value: "18m", sub: "per case", color: "text-amber-400" },
            { icon: Award, label: "Cases Mastered", value: "12", sub: "scored 8+", color: "text-purple-400" },
          ].map((stat, index) => (
            <GlassCard
              key={stat.label}
              hover
              className="p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg bg-secondary/50 p-2 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Weekly Performance */}
          <GlassCard
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-6 text-lg font-semibold">Weekly Performance</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 12% 20%)" />
                  <XAxis dataKey="day" stroke="hsl(215 15% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 15% 55%)" fontSize={12} domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(228 15% 11%)",
                      border: "1px solid hsl(228 12% 20%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(217 91% 60%)"
                    strokeWidth={2}
                    fill="url(#scoreGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Score Progression */}
          <GlassCard
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-6 text-lg font-semibold">8-Week Score Progression</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 12% 20%)" />
                  <XAxis dataKey="week" stroke="hsl(215 15% 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215 15% 55%)" fontSize={12} domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(228 15% 11%)",
                      border: "1px solid hsl(228 12% 20%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(142 76% 36%)"
                    strokeWidth={2}
                    dot={{ fill: "hsl(142 76% 36%)", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Category Breakdown */}
          <GlassCard
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="mb-6 text-lg font-semibold">Category Mastery</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 12% 20%)" />
                  <XAxis type="number" stroke="hsl(215 15% 55%)" fontSize={12} domain={[0, 100]} />
                  <YAxis dataKey="category" type="category" stroke="hsl(215 15% 55%)" fontSize={12} width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(228 15% 11%)",
                      border: "1px solid hsl(228 12% 20%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {categoryData.map((entry, index) => (
                      <motion.rect
                        key={index}
                        fill={entry.color}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Insights */}
          <GlassCard
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="mb-6 text-lg font-semibold">AI Insights</h3>
            <div className="space-y-4">
              {[
                {
                  type: "strength",
                  title: "Strong Strategy Skills",
                  description: "Your market analysis and competitive positioning answers score consistently above 8.0",
                  color: "border-l-emerald-400",
                },
                {
                  type: "improve",
                  title: "Metrics Need Work",
                  description: "Focus on defining clearer success metrics and KPI hierarchies in your answers",
                  color: "border-l-amber-400",
                },
                {
                  type: "tip",
                  title: "Recommended Focus",
                  description: "Practice 3 more Metrics cases this week to reach your goal of 7.5 avg",
                  color: "border-l-primary",
                },
              ].map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`rounded-lg border-l-4 bg-secondary/30 p-4 ${insight.color}`}
                >
                  <h4 className="font-medium">{insight.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
