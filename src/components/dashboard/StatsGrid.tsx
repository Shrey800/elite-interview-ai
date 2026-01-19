import { motion } from "framer-motion";
import { Target, Flame, Trophy, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const stats = [
  {
    icon: Target,
    label: "Total Cases",
    value: "47",
    change: "+5",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Flame,
    label: "Day Streak",
    value: "12",
    change: "+1",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    icon: Trophy,
    label: "Avg Score",
    value: "7.8",
    change: "+0.3",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    icon: Zap,
    label: "Voice Sessions",
    value: "23",
    change: "+2",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <GlassCard
          key={stat.label}
          hover
          className="p-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <div className="flex items-start justify-between">
            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
              {stat.change}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
