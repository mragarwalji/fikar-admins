import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/LandingPage/Home";
import Login from "./pages/admins-panel/Login";
import Signup from "./pages/admins-panel/Signup";
import AdminDashboard from "./pages/admins-panel/AdminDashboard";
import Dashboard from "./pages/admins-panel/Dashboard";
import Doctors from "./pages/admins-panel/Doctors";
import DoctorDetail from "./pages/admins-panel/DoctorDetail";
import Hospitals from "./pages/admins-panel/Hospitals";
import HospitalDetail from "./pages/admins-panel/HospitalDetail";
import Patients from "./pages/admins-panel/Patients";
import PatientDetail from "./pages/admins-panel/PatientDetail";
import Appointments from "./pages/admins-panel/Appointments";
import Settings from "../Settings";
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
