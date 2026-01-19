import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";

const data = [
  { skill: "Product Sense", score: 78, fullMark: 100 },
  { skill: "Metrics", score: 65, fullMark: 100 },
  { skill: "Strategy", score: 82, fullMark: 100 },
  { skill: "Execution", score: 71, fullMark: 100 },
  { skill: "Leadership", score: 68, fullMark: 100 },
  { skill: "Technical", score: 55, fullMark: 100 },
];

export function MasteryRadarChart() {
  return (
    <GlassCard
      hover
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Skill Mastery</h3>
          <p className="text-2xl font-semibold tracking-tight">Radar Analysis</p>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          +12% this week
        </div>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid 
              stroke="hsl(228 12% 25%)" 
              strokeDasharray="3 3"
            />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }}
              tickLine={false}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: "hsl(215 15% 45%)", fontSize: 10 }}
              tickCount={5}
              axisLine={false}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="hsl(217 91% 60%)"
              fill="hsl(217 91% 60%)"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
