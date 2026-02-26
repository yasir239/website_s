import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";

const AuthPage = () => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(lang === "ar" ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Invalid email or password");
        } else {
            navigate("/dashboard");
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: window.location.origin + "/dashboard" },
        });
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
                <h2 className="text-2xl font-bold text-foreground mt-6">{t("auth.welcome")}</h2>
                <p className="text-muted-foreground text-sm mt-1">{t("auth.welcomeDesc")}</p>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-lg p-8">
                <h3 className="text-xl font-bold text-center text-card-foreground mb-2">{t("auth.loginTitle")}</h3>
                <p className="text-sm text-muted-foreground text-center mb-6">{t("auth.loginDesc")}</p>

                <form onSubmit={handleLogin} className="space-y-4">
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

                    {error && <p className="text-sm text-destructive text-center">{error}</p>}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "..." : t("auth.loginButton")}
                    </Button>
                </form>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground">{t("auth.or")}</span>
                    <div className="flex-1 h-px bg-border" />
                </div>

                <Button variant="outline" className="w-full gap-2" onClick={handleGoogleLogin}>
                    {t("auth.googleLogin")}
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                </Button>

                <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground mb-2">{t("auth.noAccount")}</p>
                    <Link to="/register">
                        <Button variant="outline" className="w-full">{t("auth.createAccount")}</Button>
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

export default AuthPage;
