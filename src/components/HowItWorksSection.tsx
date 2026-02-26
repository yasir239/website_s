import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const steps = [
    { num: "01", title: t("how.step1Title"), desc: t("how.step1Desc") },
    { num: "02", title: t("how.step2Title"), desc: t("how.step2Desc") },
    { num: "03", title: t("how.step3Title"), desc: t("how.step3Desc") },
    { num: "04", title: t("how.step4Title"), desc: t("how.step4Desc") },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("how.title")} <span className="text-gradient">{t("how.titleHighlight")}</span> {t("how.titleEnd")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <span className="text-6xl font-bold text-primary/10 absolute -top-4 -left-2 rtl:-right-2 rtl:left-auto">{step.num}</span>
              <div className="pt-10">
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
