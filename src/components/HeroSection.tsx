import { ArrowRight, Eye, Users, Image, TrendingUp, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const { t } = useLanguage();
  const [views, setViews] = useState(322);

  useEffect(() => {
    // Read the persistent total views count
    const storedViews = localStorage.getItem("sourah_views");
    let currentTotal = storedViews ? parseInt(storedViews) : 322;

    // Check if we've already counted a view for this specific browser session
    const hasVisitedThisSession = sessionStorage.getItem("sourah_session_counted");

    if (!hasVisitedThisSession) {
      // It's a new session! Increment the total by a random amount (1-3)
      const increment = Math.floor(Math.random() * 3) + 1;
      currentTotal += increment;

      // Save the new total forever
      localStorage.setItem("sourah_views", currentTotal.toString());
      // Mark this session as counted so refreshing doesn't add more
      sessionStorage.setItem("sourah_session_counted", "true");
    }

    setViews(currentTotal);
  }, []);

  const stats = [
    { value: "2025", label: t("hero.founded") },
    { value: t("hero.local"), label: t("hero.localProduct") },
    { value: "24/7", label: t("hero.support") },
  ];

  const dashboardCards = [
    { icon: Eye, label: t("hero.views"), value: views.toLocaleString() },
    { icon: Users, label: t("hero.visitors"), value: "105" },
    { icon: Image, label: t("hero.photos"), value: "23" },
    { icon: TrendingUp, label: t("hero.growth"), value: "+23%" },
  ];

  return (
    <section id="home" className="section-padding pt-32 md:pt-40">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">{t("hero.title")}</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">{t("hero.subtitle")}</p>
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                {t("hero.cta")} <ArrowRight size={18} />
              </Button>
            </Link>

            <div className="flex gap-10 mt-12">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="animate-float"
          >
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary" />
                  <span className="font-semibold text-card-foreground">{t("hero.dashboard")}</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {dashboardCards.map((card) => (
                  <div key={card.label} className="rounded-xl border border-border bg-background/60 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <card.icon size={18} className="text-primary" />
                      <span className="text-xs text-muted-foreground">{card.label}</span>
                    </div>
                    <p className="text-xl font-bold text-card-foreground">{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Line Chart */}
              <div className="mb-6 rounded-xl border border-border bg-background/60 p-4">
                <svg viewBox="0 0 300 80" className="w-full h-20" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <motion.path
                    d="M0 70 Q30 65 60 55 Q90 45 120 50 Q150 55 180 35 Q210 15 240 25 Q270 35 300 20 L300 80 L0 80 Z"
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  {/* Line */}
                  <motion.path
                    d="M0 70 Q30 65 60 55 Q90 45 120 50 Q150 55 180 35 Q210 15 240 25 Q270 35 300 20"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
              </div>

              {/* Progress bars with colored dots */}
              <div className="space-y-3">
                {[
                  { w: 85, color: "bg-primary" },
                  { w: 65, color: "bg-primary/70" },
                  { w: 45, color: "bg-primary/40" },
                ].map((bar, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${bar.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${bar.w}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                      />
                    </div>
                    <div className={`w-4 h-4 rounded-full ${bar.color} shrink-0`} />
                  </div>
                ))}
              </div>

              {/* Animated cursor */}
              <motion.div
                className="absolute pointer-events-none"
                initial={{ top: "55%", left: "25%" }}
                animate={{
                  top: ["55%", "40%", "70%", "50%", "55%"],
                  left: ["25%", "55%", "65%", "35%", "25%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <MousePointer2 size={20} className="text-foreground/70 drop-shadow-md fill-background/80" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
