import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { db } from "@/firebase"; // Adjust import path as needed
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  patientId: string;
  // doctor: string;
  // lastVisit: string;
  // condition: string;
  // status: string;
}

const columns = [
   { 
    key: "patientId", 
    label: "Patients ID",
    responsiveClass: "hidden lg:table-cell",
    render: (value: string) => (
      <div className="whitespace-nowrap text-xs font-mono">
        {value.substring(0, 8)}...
      </div>
    )
  },
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
  // { key: "doctor", label: "Assigned Doctor" },
  // { key: "lastVisit", label: "Last Visit" },
  // { key: "condition", label: "Condition" },
  // { 
  //   key: "status", 
  //   label: "Status",
  //   render: (value: string) => {
  //     const variant = 
  //       value === "Active" ? "bg-success text-success-foreground" :
  //       value === "Recovered" ? "bg-info text-info-foreground" :
  //       "bg-warning text-warning-foreground";
  //     return <Badge className={variant}>{value}</Badge>;
  //   }
  // },
  {
    key: "actions",
    label: "Actions",
    render: (_: any, row: any) => (
      <Button size="sm" variant="outline" onClick={() => window.location.href = `/patients/${row.id}`}>
        View Details
      </Button>
    )
  }
];

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const patientsData: Patient[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          patientsData.push({
            id: doc.id,
            name: data.name || "",
            age: data.age || 0,
            gender: data.gender || "",
            email: data.email || "",
            phone: data.phone || "",
            patientId : data.uid || "",
            // doctor: data.doctor || "",
            // lastVisit: data.lastVisit || "",
            // condition: data.condition || "",
            // status: data.status || "Active"
          });
        });
        
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading patients...</div>
      </div>
    );
  }


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
