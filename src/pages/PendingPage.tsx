import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const PendingPage = () => {
    const { t, lang } = useLanguage();

    return (
        <div className="min-h-screen bg-secondary/30 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md text-center">
                <Link to="/" className="inline-flex items-center gap-3 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <img src="/sourah-logo.svg" alt="Sourah" className="w-9 h-9" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gradient">{lang === "ar" ? "صورة" : "Sourah"}</h1>
                    </div>
                </Link>

                <div className="bg-card rounded-2xl border border-border shadow-lg p-10">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <Clock size={32} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-card-foreground mb-3">{t("auth.pendingTitle")}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t("auth.pendingDesc")}</p>
                    <Link to="/">
                        <Button variant="outline" className="w-full">{t("auth.backToHome")}</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PendingPage;
