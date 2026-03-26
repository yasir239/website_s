import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";
import PendingPage from "./pages/PendingPage";
import NotFound from "./pages/NotFound";
import YasserProfile from "./pages/YasserProfile";

const queryClient = new QueryClient();

const App = () => {
  const isPhotographerSubdomain = window.location.hostname.includes("photographer.sourah-sa.com");

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={isPhotographerSubdomain ? <YasserProfile /> : <Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/pending" element={<PendingPage />} />
              <Route path="/photographer" element={<YasserProfile />} />
              <Route path="/yasser" element={<YasserProfile />} />
              <Route path="/yasir" element={<YasserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
