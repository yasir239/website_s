import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CtaBanner = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-primary p-12 md:p-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            {t("cta.subtitle")}
          </p>
          <Button size="lg" variant="secondary" className="gap-2">
            {t("cta.button")} <ArrowRight size={18} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;
