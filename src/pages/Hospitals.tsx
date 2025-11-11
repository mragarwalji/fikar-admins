import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";

const hospitals = [
  { id: 1, name: "City Medical Center", location: "123 Main St, New York, NY", phone: "+1 234-567-1000", doctors: 45, patients: 892, beds: 250, status: "Operational" },
  { id: 2, name: "General Hospital", location: "456 Oak Ave, Los Angeles, CA", phone: "+1 234-567-2000", doctors: 38, patients: 756, beds: 200, status: "Operational" },
  { id: 3, name: "Metro Clinic", location: "789 Pine Rd, Chicago, IL", phone: "+1 234-567-3000", doctors: 22, patients: 445, beds: 120, status: "Operational" },
  { id: 4, name: "Children's Hospital", location: "321 Elm St, Houston, TX", phone: "+1 234-567-4000", doctors: 31, patients: 623, beds: 180, status: "Operational" },
  { id: 5, name: "Skin Care Clinic", location: "654 Maple Dr, Phoenix, AZ", phone: "+1 234-567-5000", doctors: 12, patients: 234, beds: 50, status: "Operational" },
  { id: 6, name: "Cancer Center", location: "987 Cedar Ln, Philadelphia, PA", phone: "+1 234-567-6000", doctors: 28, patients: 567, beds: 150, status: "Under Renovation" },
];

const columns = [
  { key: "name", label: "Hospital Name" },
  { 
    key: "location", 
    label: "Location",
    render: (value: string) => (
      <div className="flex items-start gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <span className="text-sm">{value}</span>
      </div>
    )
  },
  { 
    key: "phone", 
    label: "Contact",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <Phone className="h-3 w-3 text-muted-foreground" />
        <span className="text-sm">{value}</span>
      </div>
    )
  },
  { key: "doctors", label: "Doctors" },
  { key: "patients", label: "Patients" },
  { key: "beds", label: "Total Beds" },
  { 
    key: "status", 
    label: "Status",
    render: (value: string) => (
      <Badge className={value === "Operational" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}>
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

export default function Hospitals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hospitals Management</h1>
          <p className="text-muted-foreground mt-2">Manage and track all registered hospitals</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Add New Hospital
        </Button>
      </div>

      <DataTable
        title="All Hospitals"
        columns={columns}
        data={hospitals}
        searchPlaceholder="Search hospitals by name, location..."
      />
    </div>
  );
}
