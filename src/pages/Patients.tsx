import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const patients = [
  { id: 1, name: "John Smith", age: 45, gender: "Male", email: "john.s@email.com", phone: "+1 234-567-7001", doctor: "Dr. Sarah Johnson", lastVisit: "2025-01-10", condition: "Cardiac Issue", status: "Active" },
  { id: 2, name: "Emma Davis", age: 32, gender: "Female", email: "emma.d@email.com", phone: "+1 234-567-7002", doctor: "Dr. Michael Chen", lastVisit: "2025-01-11", condition: "Migraine", status: "Active" },
  { id: 3, name: "Robert Wilson", age: 58, gender: "Male", email: "robert.w@email.com", phone: "+1 234-567-7003", doctor: "Dr. Sarah Johnson", lastVisit: "2025-01-09", condition: "Hypertension", status: "Follow-up Required" },
  { id: 4, name: "Lisa Anderson", age: 28, gender: "Female", email: "lisa.a@email.com", phone: "+1 234-567-7004", doctor: "Dr. James Brown", lastVisit: "2025-01-08", condition: "Knee Pain", status: "Active" },
  { id: 5, name: "Michael Brown", age: 67, gender: "Male", email: "michael.b@email.com", phone: "+1 234-567-7005", doctor: "Dr. Emily Wilson", lastVisit: "2025-01-11", condition: "Routine Checkup", status: "Active" },
  { id: 6, name: "Sarah Taylor", age: 41, gender: "Female", email: "sarah.t@email.com", phone: "+1 234-567-7006", doctor: "Dr. David Martinez", lastVisit: "2025-01-10", condition: "Skin Allergy", status: "Recovered" },
];

const columns = [
  { key: "name", label: "Patient Name" },
  { 
    key: "age", 
    label: "Age/Gender",
    render: (value: number, row: any) => `${value} / ${row.gender}`
  },
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
  { key: "doctor", label: "Assigned Doctor" },
  { key: "lastVisit", label: "Last Visit" },
  { key: "condition", label: "Condition" },
  { 
    key: "status", 
    label: "Status",
    render: (value: string) => {
      const variant = 
        value === "Active" ? "bg-success text-success-foreground" :
        value === "Recovered" ? "bg-info text-info-foreground" :
        "bg-warning text-warning-foreground";
      return <Badge className={variant}>{value}</Badge>;
    }
  },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <Button size="sm" variant="outline">View Details</Button>
    )
  }
];

export default function Patients() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patients Management</h1>
          <p className="text-muted-foreground mt-2">Manage and track all registered patients</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Add New Patient
        </Button>
      </div>

      <DataTable
        title="All Patients"
        columns={columns}
        data={patients}
        searchPlaceholder="Search patients by name, condition..."
      />
    </div>
  );
}
