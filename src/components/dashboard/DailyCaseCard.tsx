import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function DailyCaseCard() {
  return (
    <GlassCard
      hover
      className="relative overflow-hidden p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Glow effect */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      
      <div className="relative">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-primary">Daily Prime Case</span>
        </div>
        
        <h3 className="mb-2 text-xl font-semibold tracking-tight">
          Design a feature to increase Uber driver retention
        </h3>
        
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          You're a PM at Uber. Driver churn has increased 15% YoY. Design a feature to improve driver retention and satisfaction.
        </p>
        
        <div className="mb-6 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>25 min</span>
          </div>
          <div className="chip chip-active">Product Sense</div>
          <div className="chip">Uber</div>
        </div>
        
        <Link to="/interview">
          <Button className="group w-full gap-2">
            Start Today's Case
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
}
