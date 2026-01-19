import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { MasteryRadarChart } from "@/components/dashboard/MasteryRadarChart";
import { DailyCaseCard } from "@/components/dashboard/DailyCaseCard";
import { RecentAttempts } from "@/components/dashboard/RecentAttempts";
import { StatsGrid } from "@/components/dashboard/StatsGrid";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="min-h-screen px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-sm font-medium text-muted-foreground">
            Welcome back
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Product <span className="text-gradient">Forge</span>
          </h1>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-8">
          <StatsGrid />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Daily Case & Radar */}
          <div className="space-y-6 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <DailyCaseCard />
              <MasteryRadarChart />
            </div>
            <RecentAttempts />
          </div>

          {/* Right Column - Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Leaderboard Preview */}
            <div className="glass-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Weekly Leaderboard</h3>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Alex Chen", score: 847, avatar: "🏆" },
                  { rank: 2, name: "Sarah Kim", score: 823, avatar: "🥈" },
                  { rank: 3, name: "You", score: 798, avatar: "🥉", isYou: true },
                ].map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-3 rounded-lg p-3 ${
                      user.isYou ? "bg-primary/10 border border-primary/20" : "bg-secondary/30"
                    }`}
                  >
                    <span className="text-xl">{user.avatar}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${user.isYou ? "text-primary" : ""}`}>
                        {user.name}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">{user.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="glass-card p-6">
              <h3 className="mb-3 text-lg font-semibold">Pro Tip 💡</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Use the CIRCLES framework for product sense questions: Comprehend, Identify, Report, Cut, List, Evaluate, Summarize.
              </p>
            </div>

            {/* Upcoming Session */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">Live Session</span>
              </div>
              <h3 className="mb-2 font-semibold">Mock Interview Practice</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join 23 others practicing with AI interviewer
              </p>
              <button className="w-full rounded-lg bg-emerald-500/10 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20">
                Join Session
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
