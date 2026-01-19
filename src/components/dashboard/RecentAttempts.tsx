import { motion } from "framer-motion";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const attempts = [
  {
    id: 1,
    title: "Improve Instagram's Explore page",
    category: "Product Sense",
    company: "Meta",
    score: 8.2,
    time: "22 min",
    date: "Today",
  },
  {
    id: 2,
    title: "Define success metrics for Google Maps",
    category: "Metrics",
    company: "Google",
    score: 7.5,
    time: "18 min",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Launch strategy for Spotify in India",
    category: "Strategy",
    company: "Spotify",
    score: 8.8,
    time: "30 min",
    date: "2 days ago",
  },
];

export function RecentAttempts() {
  return (
    <GlassCard
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Recent Attempts</h3>
        <button className="text-sm font-medium text-primary hover:underline">
          View all
        </button>
      </div>
      
      <div className="space-y-3">
        {attempts.map((attempt, index) => (
          <motion.div
            key={attempt.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="group flex items-center gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4 transition-all hover:border-primary/30 hover:bg-secondary/50"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{attempt.title}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="chip">{attempt.category}</span>
                <span>{attempt.company}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                <TrendingUp className="h-3.5 w-3.5" />
                {attempt.score}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {attempt.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
