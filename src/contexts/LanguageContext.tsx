import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.howItWorks": "How It Works",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact Us",
    "nav.login": "Login",
    "nav.getStarted": "Get Started",
    "nav.visitLinkedin": "Visit us on LinkedIn",

    // Hero
    "hero.title": "Sourah",
    "hero.subtitle": "Professional platform for photographers to build their digital portfolios",
    "hero.cta": "Get Started",
    "hero.founded": "Founded",
    "hero.localProduct": "Saudi Product",
    "hero.support": "24/7 Support",
    "hero.local": "Local",
    "hero.dashboard": "Dashboard",
    "hero.views": "Views",
    "hero.visitors": "Visitors",
    "hero.photos": "Photos",
    "hero.growth": "Growth",

    // Features
    "features.title": "Exceptional Features",
    "features.titleHighlight": "Features",
    "features.subtitle": "Everything you need to create a professional portfolio website that reflects the quality of your work and attracts new clients",
    "features.galleries": "Professional Galleries",
    "features.galleriesDesc": "Display your work in high quality with elegant design that fits all devices",
    "features.domain": "Custom Domain",
    "features.domainDesc": "Connect your own domain name or use a subdomain from Sourah",
    "features.primaryDomain": "Primary Domain",
    "features.customDomain": "Custom Domain",
    "features.responsive": "Responsive Design",
    "features.responsiveDesc": "Websites that work perfectly on all devices and screens",
    "features.fast": "Lightning Fast",
    "features.fastDesc": "Fast loading times using the latest cloud technologies",
    "features.security": "Advanced Security",
    "features.securityDesc": "Comprehensive protection for your data and work with automatic backups",
    "features.sslEncryption": "SSL Encryption",
    "features.autoBackup": "Auto Backup",
    "features.ddosProtection": "DDoS Protection",
    "features.analytics": "Detailed Analytics",
    "features.analyticsDesc": "Track your site visitors and their interaction with your work",
    "features.visits": "Visits",
    "features.pageViews": "Page Views",
    "features.average": "Average",

    // CTA
    "cta.title": "Ready to Build Your Professional Portfolio?",
    "cta.subtitle": "Join hundreds of photographers who trust Sourah to showcase their work",
    "cta.button": "Start Free Now",

    // How it works
    "how.title": "How",
    "how.titleHighlight": "Sourah",
    "how.titleEnd": "Works?",
    "how.step1Title": "Getting Started",
    "how.step1Desc": "We listen to understand your requirements, goals, and vision before jumping into solutions.",
    "how.step2Title": "Design & Development",
    "how.step2Desc": "We turn ideas into tangible reality through professional UI design and advanced technical solutions.",
    "how.step3Title": "Review & Testing",
    "how.step3Desc": "We ensure the quality of every detail through comprehensive testing and careful review.",
    "how.step4Title": "Launch & Support",
    "how.step4Desc": "We launch your project with confidence and provide continuous support for your success.",

    // Pricing
    "pricing.title": "Plans That Fit Your Needs",
    "pricing.titleHighlight": "Fit Your Needs",
    "pricing.subtitle": "Choose the right plan and start building your professional portfolio today",
    "pricing.monthly": "Monthly",
    "pricing.yearly": "Yearly",
    "pricing.yearlyOff": "20% Off",
    "pricing.free": "Free",
    "pricing.freeDesc": "To start and try",
    "pricing.pro": "Pro",
    "pricing.proDesc": "For independent photographers",
    "pricing.business": "Business",
    "pricing.businessDesc": "For studios and teams",
    "pricing.currency": "SAR",
    "pricing.perMonth": "/mo",
    "pricing.startFree": "Start Free",
    "pricing.subscribe": "Subscribe Now",
    "pricing.mostPopular": "Most Popular",
    "pricing.vatNote": "All prices include VAT • Cancel anytime",
    "pricing.oneWebsite": "One website",
    "pricing.10images": "10 images",
    "pricing.watermark": "Watermark",
    "pricing.contactForm": "Contact form",
    "pricing.analyticsFeature": "Analytics",
    "pricing.customDomain": "Custom domain",
    "pricing.unlimitedWebsites": "Unlimited websites",
    "pricing.100images": "Up to 100 images",
    "pricing.removeWatermark": "Remove watermark",
    "pricing.allTemplates": "All free templates",
    "pricing.contactClients": "Contact form & clients",
    "pricing.analyticsLikes": "Analytics & likes",
    "pricing.allProFeatures": "All Pro features",
    "pricing.unlimitedUploads": "Unlimited uploads",
    "pricing.teamMembers": "Team members",
    "pricing.chatCalendar": "Chat & calendar",
    "pricing.advancedAnalytics": "Advanced analytics",
    "pricing.prioritySupport": "Priority support",

    // Contact
    "contact.title": "Contact",
    "contact.titleHighlight": "Us",
    "contact.subtitle": "Have questions? Our team is ready to help you create your professional portfolio and achieve your goals.",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.comingSoon": "Coming Soon",
    "contact.comingSoonDesc": "Sourah platform will launch soon",
    "contact.followUs": "Follow Us",
    "contact.followUsDesc": "Follow the latest news and updates",
    "contact.sendMessage": "Send us a message",
    "contact.sendMessageDesc": "We will respond within 24 hours",
    "contact.firstName": "First Name",
    "contact.lastName": "Last Name",
    "contact.emailField": "Email",
    "contact.phone": "Phone Number",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",

    // Footer
    "footer.rights": "© 2025 Sourah. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Use",
    "footer.support": "Support",
    "footer.description": "An advanced Saudi platform for creating personal portfolio websites for professional photographers with ease and exceptional quality.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.contactInfo": "Contact Info",
    "footer.createGalleries": "Create Galleries",
    "footer.customDesign": "Custom Design",
    "footer.cloudHosting": "Cloud Hosting",
    "footer.customDomainService": "Custom Domain",
    "footer.technicalSupport": "Technical Support",
    "footer.location": "Riyadh, Saudi Arabia",

    // Dark Mode
    "darkMode.toggle": "Toggle Mode",

    // Features extra
    "features.subtitleLine2": "For Your Professional Website",

    // Auth
    "auth.platformDesc": "Platform for professional photographers",
    "auth.welcome": "Welcome to Sourah",
    "auth.welcomeDesc": "Sign in to access your dashboard",
    "auth.loginTitle": "Sign In",
    "auth.loginDesc": "Enter your credentials to access your dashboard",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.loginButton": "Sign In",
    "auth.or": "or",
    "auth.googleLogin": "Sign in with Google",
    "auth.noAccount": "Don't have an account?",
    "auth.createAccount": "Create New Account",
    "auth.hasAccount": "Already have an account?",
    "auth.registerWelcome": "Create New Account",
    "auth.registerWelcomeDesc": "Join Sourah platform for professional photographers",
    "auth.registerTitle": "Create Account",
    "auth.registerDesc": "Fill in the details below to create your new account",
    "auth.registerButton": "Create Account",
    "auth.approvalNotice": "After creating your account, you will need admin approval before you can sign in.",
    "auth.pendingTitle": "Account Pending Approval",
    "auth.pendingDesc": "Your account has been created successfully. Please wait for admin approval before signing in. You will receive an email notification once your account is approved.",
    "auth.backToHome": "Back to Home",
  },
  ar: {
    // Navbar
    "nav.home": "الرئيسية",
    "nav.features": "المميزات",
    "nav.howItWorks": "كيف يعمل",
    "nav.pricing": "الأسعار",
    "nav.contact": "تواصل معنا",
    "nav.login": "تسجيل الدخول",
    "nav.getStarted": "ابدأ الآن",
    "nav.visitLinkedin": "زورنا على لينكدإن",

    // Hero
    "hero.title": "صورة",
    "hero.subtitle": "منصة احترافية للمصورين لبناء معارض أعمالهم الرقمية",
    "hero.cta": "ابدأ الآن",
    "hero.founded": "تأسست",
    "hero.localProduct": "منتج سعودي",
    "hero.support": "دعم على مدار الساعة",
    "hero.local": "محلي",
    "hero.dashboard": "لوحة التحكم",
    "hero.views": "المشاهدات",
    "hero.visitors": "الزوار",
    "hero.photos": "الصور",
    "hero.growth": "النمو",

    // Features
    "features.title": "مميزات استثنائية",
    "features.titleHighlight": "استثنائية",
    "features.subtitle": "كل ما تحتاجه لإنشاء موقع معرض أعمال احترافي يعكس جودة عملك ويجذب عملاء جدد",
    "features.galleries": "معارض احترافية",
    "features.galleriesDesc": "اعرض أعمالك بجودة عالية وتصميم أنيق يناسب جميع الأجهزة",
    "features.domain": "نطاق مخصص",
    "features.domainDesc": "اربط اسم نطاقك الخاص أو استخدم نطاق فرعي من صورة",
    "features.primaryDomain": "النطاق الرئيسي",
    "features.customDomain": "نطاق مخصص",
    "features.responsive": "تصميم متجاوب",
    "features.responsiveDesc": "مواقع تعمل بشكل مثالي على جميع الأجهزة والشاشات",
    "features.fast": "سرعة فائقة",
    "features.fastDesc": "أوقات تحميل سريعة باستخدام أحدث تقنيات السحابة",
    "features.security": "أمان متقدم",
    "features.securityDesc": "حماية شاملة لبياناتك وأعمالك مع نسخ احتياطي تلقائي",
    "features.sslEncryption": "تشفير SSL",
    "features.autoBackup": "نسخ احتياطي تلقائي",
    "features.ddosProtection": "حماية DDoS",
    "features.analytics": "تحليلات تفصيلية",
    "features.analyticsDesc": "تتبع زوار موقعك وتفاعلهم مع أعمالك",
    "features.visits": "الزيارات",
    "features.pageViews": "مشاهدات الصفحات",
    "features.average": "المتوسط",

    // CTA
    "cta.title": "هل أنت مستعد لبناء معرض أعمالك الاحترافي؟",
    "cta.subtitle": "انضم إلى مئات المصورين الذين يثقون في صورة لعرض أعمالهم",
    "cta.button": "ابدأ مجاناً الآن",

    // How it works
    "how.title": "كيف تعمل",
    "how.titleHighlight": "صورة",
    "how.titleEnd": "؟",
    "how.step1Title": "البداية",
    "how.step1Desc": "نستمع لفهم متطلباتك وأهدافك ورؤيتك قبل البدء في الحلول.",
    "how.step2Title": "التصميم والتطوير",
    "how.step2Desc": "نحول الأفكار إلى واقع ملموس من خلال تصميم واجهات احترافية وحلول تقنية متقدمة.",
    "how.step3Title": "المراجعة والاختبار",
    "how.step3Desc": "نضمن جودة كل تفصيل من خلال اختبار شامل ومراجعة دقيقة.",
    "how.step4Title": "الإطلاق والدعم",
    "how.step4Desc": "نطلق مشروعك بثقة ونوفر دعمًا مستمرًا لضمان نجاحك.",

    // Pricing
    "pricing.title": "خطط تناسب احتياجاتك",
    "pricing.titleHighlight": "تناسب احتياجاتك",
    "pricing.subtitle": "اختر الخطة المناسبة وابدأ ببناء معرض أعمالك الاحترافي اليوم",
    "pricing.monthly": "شهري",
    "pricing.yearly": "سنوي",
    "pricing.yearlyOff": "خصم 20%",
    "pricing.free": "مجاني",
    "pricing.freeDesc": "للبدء والتجربة",
    "pricing.pro": "احترافي",
    "pricing.proDesc": "للمصورين المستقلين",
    "pricing.business": "أعمال",
    "pricing.businessDesc": "للاستوديوهات والفرق",
    "pricing.currency": "ر.س",
    "pricing.perMonth": "/شهر",
    "pricing.startFree": "ابدأ مجاناً",
    "pricing.subscribe": "اشترك الآن",
    "pricing.mostPopular": "الأكثر شعبية",
    "pricing.vatNote": "جميع الأسعار شاملة الضريبة • إلغاء في أي وقت",
    "pricing.oneWebsite": "موقع واحد",
    "pricing.10images": "10 صور",
    "pricing.watermark": "علامة مائية",
    "pricing.contactForm": "نموذج تواصل",
    "pricing.analyticsFeature": "تحليلات",
    "pricing.customDomain": "نطاق مخصص",
    "pricing.unlimitedWebsites": "مواقع غير محدودة",
    "pricing.100images": "حتى 100 صورة",
    "pricing.removeWatermark": "إزالة العلامة المائية",
    "pricing.allTemplates": "جميع القوالب المجانية",
    "pricing.contactClients": "نموذج تواصل وعملاء",
    "pricing.analyticsLikes": "تحليلات وإعجابات",
    "pricing.allProFeatures": "جميع مميزات الاحترافي",
    "pricing.unlimitedUploads": "رفع غير محدود",
    "pricing.teamMembers": "أعضاء الفريق",
    "pricing.chatCalendar": "محادثة وتقويم",
    "pricing.advancedAnalytics": "تحليلات متقدمة",
    "pricing.prioritySupport": "دعم أولوية",

    // Contact
    "contact.title": "تواصل",
    "contact.titleHighlight": "معنا",
    "contact.subtitle": "لديك أسئلة؟ فريقنا جاهز لمساعدتك في إنشاء معرض أعمالك الاحترافي وتحقيق أهدافك.",
    "contact.email": "البريد الإلكتروني",
    "contact.linkedin": "لينكدإن",
    "contact.comingSoon": "قريباً",
    "contact.comingSoonDesc": "منصة صورة ستطلق قريباً",
    "contact.followUs": "تابعنا",
    "contact.followUsDesc": "تابع آخر الأخبار والتحديثات",
    "contact.sendMessage": "أرسل لنا رسالة",
    "contact.sendMessageDesc": "سنرد خلال 24 ساعة",
    "contact.firstName": "الاسم الأول",
    "contact.lastName": "الاسم الأخير",
    "contact.emailField": "البريد الإلكتروني",
    "contact.phone": "رقم الهاتف",
    "contact.subject": "الموضوع",
    "contact.message": "الرسالة",
    "contact.send": "إرسال الرسالة",

    // Footer
    "footer.rights": "© 2025 صورة. جميع الحقوق محفوظة.",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الاستخدام",
    "footer.support": "الدعم",
    "footer.description": "منصة سعودية متطورة لإنشاء مواقع معرض الأعمال الشخصية للمصورين المحترفين بسهولة وجودة استثنائية.",
    "footer.quickLinks": "روابط سريعة",
    "footer.services": "الخدمات",
    "footer.contactInfo": "معلومات التواصل",
    "footer.createGalleries": "إنشاء المعارض",
    "footer.customDesign": "تصميم مخصص",
    "footer.cloudHosting": "استضافة سحابية",
    "footer.customDomainService": "نطاق مخصص",
    "footer.technicalSupport": "دعم فني",
    "footer.location": "الرياض، المملكة العربية السعودية",

    // Dark Mode
    "darkMode.toggle": "تبديل الوضع",

    // Features extra
    "features.subtitleLine2": "لموقعك الاحترافي",

    // Auth
    "auth.platformDesc": "منصة المصورين المحترفين",
    "auth.welcome": "مرحباً بك في صورة",
    "auth.welcomeDesc": "قم بتسجيل الدخول للوصول إلى لوحة التحكم",
    "auth.loginTitle": "تسجيل الدخول",
    "auth.loginDesc": "ادخل بياناتك للوصول إلى لوحة التحكم",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.loginButton": "تسجيل الدخول",
    "auth.or": "أو",
    "auth.googleLogin": "تسجيل الدخول باستخدام جوجل",
    "auth.noAccount": "ليس لديك حساب؟",
    "auth.createAccount": "إنشاء حساب جديد",
    "auth.hasAccount": "لديك حساب بالفعل؟",
    "auth.registerWelcome": "إنشاء حساب جديد",
    "auth.registerWelcomeDesc": "انضم إلى منصة صورة للمصورين المحترفين",
    "auth.registerTitle": "إنشاء حساب",
    "auth.registerDesc": "املأ البيانات أدناه لإنشاء حسابك الجديد",
    "auth.registerButton": "إنشاء الحساب",
    "auth.approvalNotice": "بعد إنشاء الحساب، ستحتاج إلى موافقة الإدارة قبل التمكن من الدخول.",
    "auth.pendingTitle": "الحساب قيد المراجعة",
    "auth.pendingDesc": "تم إنشاء حسابك بنجاح. يرجى انتظار موافقة الإدارة قبل تسجيل الدخول. ستتلقى إشعاراً عبر البريد الإلكتروني عند الموافقة على حسابك.",
    "auth.backToHome": "العودة للرئيسية",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("ar");
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
