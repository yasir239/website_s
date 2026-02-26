import { Image, Globe, Monitor, Zap, Shield, BarChart3, Lock, HardDrive, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t, lang } = useLanguage();

  const features = [
    {
      icon: Image,
      title: t("features.galleries"),
      description: t("features.galleriesDesc"),
      demo: null,
    },
    {
      icon: Globe,
      title: t("features.domain"),
      description: t("features.domainDesc"),
      demo: "domain",
    },
    {
      icon: Monitor,
      title: t("features.responsive"),
      description: t("features.responsiveDesc"),
      demo: null,
    },
    {
      icon: Zap,
      title: t("features.fast"),
      description: t("features.fastDesc"),
      demo: null,
    },
    {
      icon: Shield,
      title: t("features.security"),
      description: t("features.securityDesc"),
      demo: "security",
    },
    {
      icon: BarChart3,
      title: t("features.analytics"),
      description: t("features.analyticsDesc"),
      demo: "analytics",
    },
  ];

  const DomainDemo = () => (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-xs text-muted-foreground">{t("features.primaryDomain")}</span>
        <span className="text-xs font-mono text-card-foreground ms-auto">photographer.sourah-sa.com</span>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2">
        <div className="w-2 h-2 rounded-full bg-primary/60" />
        <span className="text-xs text-muted-foreground">{t("features.customDomain")}</span>
        <span className="text-xs font-mono text-card-foreground ms-auto">www.mysite.com</span>
      </div>
    </div>
  );

  const SecurityDemo = () => (
    <div className="mt-4 flex flex-wrap gap-2">
      {[
        { icon: Lock, label: t("features.sslEncryption") },
        { icon: HardDrive, label: t("features.autoBackup") },
        { icon: ShieldCheck, label: t("features.ddosProtection") },
      ].map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-1.5 text-xs rounded-full border border-border bg-background/60 text-card-foreground px-3 py-1.5 font-medium"
        >
          <item.icon size={12} />
          {item.label}
        </span>
      ))}
    </div>
  );

  const AnalyticsDemo = () => (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {[
        { label: t("features.visits"), value: "322" },
        { label: t("features.pageViews"), value: "1.1K" },
        { label: t("hero.growth"), value: "+23%" },
        { label: t("features.average"), value: "2.4m" },
      ].map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-background/60 px-3 py-2 text-center">
          <p className="text-sm font-bold text-card-foreground">{stat.value}</p>
          <p className="text-[10px] text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );

  const renderDemo = (type: string | null) => {
    switch (type) {
      case "domain":
        return <DomainDemo />;
      case "security":
        return <SecurityDemo />;
      case "analytics":
        return <AnalyticsDemo />;
      default:
        return null;
    }
  };

  return (
    <section id="features" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t("features.title")}
          </h2>
          <p className="text-lg text-primary font-semibold mb-2">{t("features.subtitleLine2")}</p>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("features.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              {renderDemo(f.demo)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
