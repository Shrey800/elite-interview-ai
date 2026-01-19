import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Library, 
  Mic, 
  TrendingUp,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Library, label: "Practice Library", path: "/library" },
  { icon: Mic, label: "Voice Interview", path: "/interview" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-0 top-0 z-50 flex h-screen w-[72px] flex-col items-center border-r border-border/50 bg-sidebar py-6"
    >
      {/* Logo */}
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Sparkles className="h-5 w-5 text-primary" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="group relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
              </motion.div>
              
              {/* Tooltip */}
              <div className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-popover px-3 py-1.5 text-sm font-medium text-popover-foreground opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                {item.label}
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom indicator */}
      <div className="h-1 w-6 rounded-full bg-border" />
    </motion.aside>
  );
}
