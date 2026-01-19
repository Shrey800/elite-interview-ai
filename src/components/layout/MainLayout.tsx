import { ReactNode, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-[72px] min-h-screen">
        {children}
      </main>
    </div>
  );
}
