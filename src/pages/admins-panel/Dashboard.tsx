import { Users, Building2, UserSquare2, Calendar } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";

// Mock data - in real app, this would come from API
const recentRegistrations = [
  { id: 1, name: "Dr. Sarah Johnson", type: "Doctor", specialization: "Cardiology", date: "2025-01-10", status: "Active" },
  { id: 2, name: "City Medical Center", type: "Hospital", location: "New York", date: "2025-01-10", status: "Active" },
  { id: 3, name: "John Smith", type: "Patient", age: 45, date: "2025-01-11", status: "Active" },
  { id: 4, name: "Dr. Michael Chen", type: "Doctor", specialization: "Neurology", date: "2025-01-11", status: "Active" },
  { id: 5, name: "Emma Davis", type: "Patient", age: 32, date: "2025-01-11", status: "Active" },
];

const recentAppointments = [
  { id: 1, patient: "John Smith", doctor: "Dr. Sarah Johnson", hospital: "City Medical", date: "2025-01-11", time: "10:00 AM", status: "Completed" },
  { id: 2, patient: "Emma Davis", doctor: "Dr. Michael Chen", hospital: "General Hospital", date: "2025-01-11", time: "11:30 AM", status: "In-Queue" },
  { id: 3, patient: "Robert Wilson", doctor: "Dr. Sarah Johnson", hospital: "City Medical", date: "2025-01-11", time: "02:00 PM", status: "Pending" },
  { id: 4, patient: "Lisa Anderson", doctor: "Dr. James Brown", hospital: "Metro Clinic", date: "2025-01-11", time: "03:30 PM", status: "In-Queue" },
];

const registrationColumns = [
  { key: "name", label: "Name" },
  { 
    key: "type", 
    label: "Type",
    render: (value: string) => (
      <Badge variant={value === "Doctor" ? "default" : value === "Hospital" ? "secondary" : "outline"}>
        {value}
      </Badge>
    )
  },
  { key: "specialization", label: "Details", render: (value: any, row: any) => value || row.location || `Age: ${row.age}` },
  { key: "date", label: "Registration Date" },
  { 
    key: "status", 
    label: "Status",
    render: (value: string) => (
      <Badge className="bg-success text-success-foreground">{value}</Badge>
    )
  },
];

const appointmentColumns = [
  { key: "patient", label: "Patient" },
  { key: "doctor", label: "Doctor" },
  { key: "hospital", label: "Hospital" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { 
    key: "status", 
    label: "Status",
    render: (value: string) => {
      const variant = 
        value === "Completed" ? "bg-success text-success-foreground" :
        value === "In-Queue" ? "bg-info text-info-foreground" :
        "bg-warning text-warning-foreground";
      return <Badge className={variant}>{value}</Badge>;
    }
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Doctors"
          value="156"
          icon={UserSquare2}
          trend={{ value: "12%", isPositive: true }}
          description="from last month"
        />
        <StatsCard
          title="Total Hospitals"
          value="42"
          icon={Building2}
          trend={{ value: "5%", isPositive: true }}
          description="from last month"
        />
        <StatsCard
          title="Total Patients"
          value="2,847"
          icon={Users}
          trend={{ value: "23%", isPositive: true }}
          description="from last month"
        />
        <StatsCard
          title="Appointments Today"
          value="64"
          icon={Calendar}
          description="12 completed, 52 pending"
        />
      </div>

      <DataTable
        title="Recent Registrations"
        columns={registrationColumns}
        data={recentRegistrations}
        searchPlaceholder="Search registrations..."
      />

      <DataTable
        title="Recent Appointments"
        columns={appointmentColumns}
        data={recentAppointments}
        searchPlaceholder="Search appointments..."
      />
    </div>
  );
}
