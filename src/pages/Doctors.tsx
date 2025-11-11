import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialization: "Cardiology", hospital: "City Medical Center", email: "sarah.j@hospital.com", phone: "+1 234-567-8901", patients: 145, status: "Active" },
  { id: 2, name: "Dr. Michael Chen", specialization: "Neurology", hospital: "General Hospital", email: "m.chen@hospital.com", phone: "+1 234-567-8902", patients: 132, status: "Active" },
  { id: 3, name: "Dr. James Brown", specialization: "Orthopedics", hospital: "Metro Clinic", email: "james.b@hospital.com", phone: "+1 234-567-8903", patients: 98, status: "Active" },
  { id: 4, name: "Dr. Emily Wilson", specialization: "Pediatrics", hospital: "Children's Hospital", email: "e.wilson@hospital.com", phone: "+1 234-567-8904", patients: 201, status: "Active" },
  { id: 5, name: "Dr. David Martinez", specialization: "Dermatology", hospital: "Skin Care Clinic", email: "d.martinez@hospital.com", phone: "+1 234-567-8905", patients: 87, status: "Active" },
  { id: 6, name: "Dr. Lisa Anderson", specialization: "Oncology", hospital: "Cancer Center", email: "l.anderson@hospital.com", phone: "+1 234-567-8906", patients: 156, status: "On Leave" },
];

const columns = [
  { key: "name", label: "Doctor Name" },
  { key: "specialization", label: "Specialization" },
  { key: "hospital", label: "Hospital" },
  { 
    key: "email", 
    label: "Contact",
    render: (value: string, row: any) => (
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs">{value}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs">{row.phone}</span>
        </div>
      </div>
    )
  },
  { key: "patients", label: "Total Patients" },
  { 
    key: "status", 
    label: "Status",
    render: (value: string) => (
      <Badge className={value === "Active" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}>
        {value}
      </Badge>
    )
  },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <Button size="sm" variant="outline">View Details</Button>
    )
  }
];

export default function Doctors() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Doctors Management</h1>
          <p className="text-muted-foreground mt-2">Manage and track all registered doctors</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Add New Doctor
        </Button>
      </div>

      <DataTable
        title="All Doctors"
        columns={columns}
        data={doctors}
        searchPlaceholder="Search doctors by name, specialization..."
      />
    </div>
  );
}
