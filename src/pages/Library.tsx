import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, TrendingUp, Lightbulb, Building2 } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "product-sense", label: "Product Sense", icon: Lightbulb },
  { id: "metrics", label: "Metrics", icon: TrendingUp },
  { id: "strategy", label: "Strategy", icon: Filter },
];

const companies = ["All", "Google", "Meta", "Amazon", "Uber", "Spotify", "Netflix"];

const questions = [
  {
    id: 1,
    title: "Design a feature to increase user engagement on Instagram Reels",
    category: "product-sense",
    company: "Meta",
    difficulty: "Medium",
    attempts: 1234,
    avgScore: 7.2,
  },
  {
    id: 2,
    title: "Define success metrics for Google Classroom",
    category: "metrics",
    company: "Google",
    difficulty: "Hard",
    attempts: 892,
    avgScore: 6.8,
  },
  {
    id: 3,
    title: "Should Uber launch a subscription service?",
    category: "strategy",
    company: "Uber",
    difficulty: "Hard",
    attempts: 756,
    avgScore: 7.5,
  },
  {
    id: 4,
    title: "How would you improve Spotify's podcast discovery?",
    category: "product-sense",
    company: "Spotify",
    difficulty: "Medium",
    attempts: 1089,
    avgScore: 7.1,
  },
  {
    id: 5,
    title: "Design metrics dashboard for Amazon Prime Video",
    category: "metrics",
    company: "Amazon",
    difficulty: "Medium",
    attempts: 634,
    avgScore: 6.9,
  },
  {
    id: 6,
    title: "Netflix's expansion strategy into gaming",
    category: "strategy",
    company: "Netflix",
    difficulty: "Hard",
    attempts: 445,
    avgScore: 7.8,
  },
  {
    id: 7,
    title: "Improve Google Maps for visually impaired users",
    category: "product-sense",
    company: "Google",
    difficulty: "Easy",
    attempts: 1567,
    avgScore: 7.4,
  },
  {
    id: 8,
    title: "Define KPIs for Uber Eats driver experience",
    category: "metrics",
    company: "Uber",
    difficulty: "Medium",
    attempts: 823,
    avgScore: 6.5,
  },
];

const difficultyColors = {
  Easy: "text-emerald-400 bg-emerald-400/10",
  Medium: "text-amber-400 bg-amber-400/10",
  Hard: "text-red-400 bg-red-400/10",
};

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = selectedCategory === "all" || q.category === selectedCategory;
    const matchesCompany = selectedCompany === "All" || q.company === selectedCompany;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCompany && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="min-h-screen px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight">Practice Library</h1>
          <p className="mt-1 text-muted-foreground">
            {questions.length} curated cases from top tech companies
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 border-border/50 bg-secondary/30 pl-11 text-base backdrop-blur-sm"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`chip ${selectedCategory === cat.id ? "chip-active" : ""}`}
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Company Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            {companies.map((company) => (
              <button
                key={company}
                onClick={() => setSelectedCompany(company)}
                className={`chip ${selectedCompany === company ? "chip-active" : ""}`}
              >
                {company}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Questions Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <Link to="/interview">
                  <GlassCard hover className="group h-full p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${difficultyColors[question.difficulty as keyof typeof difficultyColors]}`}>
                        {question.difficulty}
                      </span>
                      <span className="chip">{question.company}</span>
                    </div>
                    
                    <h3 className="mt-4 text-base font-medium leading-snug group-hover:text-primary transition-colors">
                      {question.title}
                    </h3>
                    
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="chip capitalize">{question.category.replace("-", " ")}</span>
                      <div className="flex items-center gap-3">
                        <span>{question.attempts.toLocaleString()} attempts</span>
                        <span className="font-medium text-primary">Avg: {question.avgScore}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredQuestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-muted-foreground">No cases match your filters</p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Library;
