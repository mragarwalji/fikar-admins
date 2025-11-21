import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; 
import { useEffect, useState } from "react";

interface Hospital {
  id: string;
  name: string;
  location: string;
  phone: string;
  doctors: number;
  patients: number;
  email: string;
  hospitalId: string;
  address : {
    street: string;
    city: string;
    state: string;
    pincode: string;
  }
 
  // beds: number;
  // status: string;
}

const columns = [
   { 
    key: "hospitalId", 
    label: "Hospital ID",
    responsiveClass: "hidden lg:table-cell",
    render: (value: string) => (
      <div className="whitespace-nowrap text-xs font-mono">
        {value.substring(0, 8)}...
      </div>
    )
  },
  { key: "name", label: "Hospital Name" },
  { 
    key: "address", 
    label: "Address",
    render: (value: any) => (
      <div className="flex items-start gap-2 max-w-[200px]">
        {/* <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" /> */}
        <div className="text-sm">
          <div className="font-medium">{value.street}</div>
          <div className="text-muted-foreground">
            {value.city}, {value.state} - {value.pincode}
          </div>
        </div>
      </div>
    )
  },
   { 
    key: "email", 
    label: "Contacts",
    responsiveClass: "hidden sm:table-cell",
    render: (value: string, row: any) => (
      <div className="space-y-1 min-w-[160px]">
        <div className="flex items-center gap-2 text-sm whitespace-nowrap">
          <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
          <span className="text-xs truncate">{value}</span>
        </div>
        <div className="flex items-center gap-2 text-sm whitespace-nowrap">
          <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
          <span className="text-xs">{row.phone}</span>
        </div>
      </div>
    )
  },
  { key: "doctors", label: "Doctors" },
  { key: "patients", label: "Patients" },
  // { key: "beds", label: "Total Beds" },
  // { 
  //   key: "status", 
  //   label: "Status",
  //   render: (value: string) => (
  //     <Badge className={value === "Operational" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}>
  //       {value}
  //     </Badge>
  //   )
  // },
  {
    key: "actions",
    label: "Actions",
    render: (_: any, row: any) => (
      <Button size="sm" variant="outline" onClick={() => window.location.href = `/hospitals/${row.id}`}>
        View Details
      </Button>
    )
  }
];
export default function Hospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "addhospital"));
        const hospitalsData: Hospital[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          hospitalsData.push({
            id: doc.id,
            hospitalId: data.uid || "",
            name: data.name || "",
            location: data.location || "",
            phone: data.phone || "",
            doctors: data.doctors || 0,
            patients: data.patients || 0,
            email: data.email || "",
            address: {
              street: data.address?.street || "",
              city: data.address?.city || "",
              state: data.address?.state || "",
              pincode: data.address?.pincode || ""
            },
            // beds: data.beds || 0,
            // status: data.status || "Operational"
          });
        });
        
        setHospitals(hospitalsData);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading hospitals...</div>
      </div>
    );
  }

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
