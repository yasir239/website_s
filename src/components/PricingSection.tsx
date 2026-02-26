import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [yearly, setYearly] = useState(false);
  const { t } = useLanguage();

  const plans = [
    {
      name: t("pricing.free"),
      desc: t("pricing.freeDesc"),
      price: { monthly: 0, yearly: 0 },
      features: [
        { label: t("pricing.oneWebsite"), included: true },
        { label: t("pricing.10images"), included: true },
        { label: t("pricing.watermark"), included: true },
        { label: t("pricing.contactForm"), included: true },
        { label: t("pricing.analyticsFeature"), included: false },
        { label: t("pricing.customDomain"), included: false },
      ],
      popular: false,
      cta: t("pricing.startFree"),
    },
    {
      name: t("pricing.pro"),
      desc: t("pricing.proDesc"),
      price: { monthly: 29, yearly: 23 },
      features: [
        { label: t("pricing.unlimitedWebsites"), included: true },
        { label: t("pricing.100images"), included: true },
        { label: t("pricing.removeWatermark"), included: true },
        { label: t("pricing.allTemplates"), included: true },
        { label: t("pricing.analyticsLikes"), included: true },
        { label: t("pricing.customDomain"), included: true },
      ],
      popular: true,
      cta: t("pricing.subscribe"),
    },
    {
      name: t("pricing.business"),
      desc: t("pricing.businessDesc"),
      price: { monthly: 99, yearly: 79 },
      features: [
        { label: t("pricing.allProFeatures"), included: true },
        { label: t("pricing.unlimitedUploads"), included: true },
        { label: t("pricing.teamMembers"), included: true },
        { label: t("pricing.chatCalendar"), included: true },
        { label: t("pricing.advancedAnalytics"), included: true },
        { label: t("pricing.prioritySupport"), included: true },
      ],
      popular: false,
      cta: t("pricing.subscribe"),
    },
  ];

  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("pricing.title")}</h2>
          <p className="text-muted-foreground mb-8">{t("pricing.subtitle")}</p>

          <div className="inline-flex items-center gap-3 bg-secondary rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              {t("pricing.monthly")}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              {t("pricing.yearly")} <span className="text-xs opacity-80">{t("pricing.yearlyOff")}</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-6 relative ${plan.popular ? "ring-2 ring-primary" : ""}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {t("pricing.mostPopular")}
                </span>
              )}
              <h3 className="text-xl font-bold text-card-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-card-foreground">
                  {yearly ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className="text-muted-foreground text-sm">
                  {" "}{t("pricing.currency")}{plan.price.monthly > 0 ? t("pricing.perMonth") : ""}
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-2 text-sm">
                    {f.included ? (
                      <Check size={16} className="text-primary shrink-0" />
                    ) : (
                      <X size={16} className="text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={f.included ? "text-card-foreground" : "text-muted-foreground/50"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/auth" className="w-full">
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">{t("pricing.vatNote")}</p>
      </div>
    </section>
  );
};

export default PricingSection;
