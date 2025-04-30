
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import CareAssessment from "./pages/CareAssessment";
import CareMatch from "./pages/CareMatch";
import ClientSearch from "./pages/ClientSearch";
import ClientDetail from "./pages/ClientDetail";
import NotFound from "./pages/NotFound";
import FacilitySearch from "./pages/FacilitySearch";
import Appointments from "./pages/Appointments";
import Inbox from "./pages/Inbox";
import Invoices from "./pages/Invoices";
import Bio from "./pages/Bio";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/care-assessment" element={
            <MainLayout>
              <CareAssessment />
            </MainLayout>
          } />
          <Route path="/care-match" element={
            <MainLayout>
              <CareMatch />
            </MainLayout>
          } />
          <Route path="/clients" element={
            <MainLayout>
              <ClientSearch />
            </MainLayout>
          } />
          <Route path="/clients/:id" element={
            <MainLayout>
              <ClientDetail />
            </MainLayout>
          } />
          <Route path="/facilities" element={
            <MainLayout>
              <FacilitySearch />
            </MainLayout>
          } />
          <Route path="/appointments" element={
            <MainLayout>
              <Appointments />
            </MainLayout>
          } />
          <Route path="/inbox" element={
            <MainLayout>
              <Inbox />
            </MainLayout>
          } />
          <Route path="/invoices" element={
            <MainLayout>
              <Invoices />
            </MainLayout>
          } />
          <Route path="/bio" element={
            <MainLayout>
              <Bio />
            </MainLayout>
          } />
          <Route path="/reports" element={
            <MainLayout>
              <Reports />
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout>
              <Settings />
            </MainLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
