import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import WorkDetail from "./pages/WorkDetail";
import ArticlesDetail from "./pages/ArticlesDetail";
import Articles from "./pages/Articles";
import Developer from "./pages/Developer";
import NotFound from "./pages/NotFound";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { HelmetProvider } from 'react-helmet-async';
import { useAnalytics } from "./hooks/useAnalytics";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import { CustomCursor } from "./components/ui/CustomCursor";

const queryClient = new QueryClient();

const AppContent = () => {
  useSmoothScroll();
  useAnalytics();

  return (
    <TooltipProvider>
      <CustomCursor />
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticlesDetail />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
// Force refresh
