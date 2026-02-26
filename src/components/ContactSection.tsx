import { Mail, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t("contact.title")} <span className="text-gradient">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-primary font-semibold mb-2">{t("contact.subtitle").split(".")[0]}.</p>
          <p className="text-muted-foreground">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Mail size={20} className="text-primary" />
                <h3 className="font-semibold text-card-foreground">{t("contact.email")}</h3>
              </div>
              <p className="text-sm text-muted-foreground">sourah.business@gmail.com</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Linkedin size={20} className="text-primary" />
                <h3 className="font-semibold text-card-foreground">{t("contact.linkedin")}</h3>
              </div>
              <p className="text-sm text-muted-foreground">linkedin.com/company/sourah-sa</p>
            </div>

            <div className="glass-card rounded-2xl p-6 bg-primary/5">
              <h3 className="font-semibold text-card-foreground mb-2">{t("contact.comingSoon")}</h3>
              <p className="text-sm text-muted-foreground">{t("contact.comingSoonDesc")}</p>
            </div>

            {/* Follow Us card */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-card-foreground mb-2">{t("contact.followUs")}</h3>
              <p className="text-sm text-muted-foreground mb-3">{t("contact.followUsDesc")}</p>
              <a
                href="https://linkedin.com/company/sourah-sa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Send us a message header */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Send size={18} className="text-primary" />
                {t("contact.sendMessage")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{t("contact.sendMessageDesc")}</p>
            </div>

            <form
              className="glass-card rounded-2xl p-6 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder={t("contact.firstName")} />
                <Input placeholder={t("contact.lastName")} />
              </div>
              <Input type="email" placeholder={t("contact.emailField")} />
              <Input placeholder={t("contact.phone")} />
              <Input placeholder={t("contact.subject")} />
              <Textarea placeholder={t("contact.message")} rows={4} />
              <Button className="w-full">{t("contact.send")}</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
