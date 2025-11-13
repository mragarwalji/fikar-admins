import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/LandingPage/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import DoctorDetail from "./pages/DoctorDetail";
import Hospitals from "./pages/Hospitals";
import HospitalDetail from "./pages/HospitalDetail";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import Appointments from "./pages/Appointments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/:id" element={<DoctorDetail />} />
            <Route path="hospitals" element={<Hospitals />} />
            <Route path="hospitals/:id" element={<HospitalDetail />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientDetail />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
