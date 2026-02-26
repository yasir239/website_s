import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";

const RegisterPage = () => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError(lang === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError(lang === "ar" ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
        } else {
            navigate("/pending");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-secondary/30 flex flex-col items-center pt-12 px-4">
            {/* Header */}
            <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <img src="/sourah-logo.svg" alt="Sourah" className="w-9 h-9" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gradient">{lang === "ar" ? "صورة" : "Sourah"}</h1>
                        <p className="text-xs text-muted-foreground">{t("auth.platformDesc")}</p>
                    </div>
                </Link>
                <h2 className="text-2xl font-bold text-foreground mt-6">{t("auth.registerWelcome")}</h2>
                <p className="text-muted-foreground text-sm mt-1">{t("auth.registerWelcomeDesc")}</p>
            </div>

            {/* Register Card */}
            <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-lg p-8">
                <h3 className="text-xl font-bold text-center text-card-foreground mb-2">{t("auth.registerTitle")}</h3>
                <p className="text-sm text-muted-foreground text-center mb-6">{t("auth.registerDesc")}</p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-card-foreground block mb-1.5 text-end">
                            {t("auth.email")}
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="example@domain.com"
                                className="ps-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-card-foreground block mb-1.5 text-end">
                            {t("auth.password")}
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="ps-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-card-foreground block mb-1.5 text-end">
                            {t("auth.confirmPassword")}
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="ps-10"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-destructive text-center">{error}</p>}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "..." : t("auth.registerButton")}
                    </Button>
                </form>

                <div className="mt-4 p-3 rounded-xl border border-border bg-secondary/50 text-center">
                    <p className="text-xs text-muted-foreground">{t("auth.approvalNotice")}</p>
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground mb-2">{t("auth.hasAccount")}</p>
                    <Link to="/auth">
                        <Button variant="outline" className="w-full">{t("auth.loginButton")}</Button>
                    </Link>
                </div>

                <div className="text-center mt-4">
                    <Link to="/">
                        <Button variant="ghost" className="w-full text-muted-foreground">{t("auth.backToHome")}</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
