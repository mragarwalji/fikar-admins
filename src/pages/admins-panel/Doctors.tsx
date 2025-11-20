import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase';
import { useEffect, useState } from "react";

interface Doctor {
  id: string;
  doctorId: string;
  name: string;
  specialization: string;
  hospital: string;
  email: string;
  phone: string;
  patients: number;
  status: string;
  availabilityStatus: string;
}

const columns = [
  { 
    key: "doctorId", 
    label: "Doctors ID",
    responsiveClass: "hidden lg:table-cell",
    render: (value: string) => (
      <div className="whitespace-nowrap text-xs font-mono">
        {value.substring(0, 8)}...
      </div>
    )
  },
  { 
    key: "name", 
    label: "Doctors Name",
    responsiveClass: "",
    render: (value: string) => (
      <div className="whitespace-nowrap">
        {value}
      </div>
    )
  },
  { 
    key: "specialization", 
    label: "Specialization",
    responsiveClass: "hidden md:table-cell",
    render: (value: string) => (
      <div className="whitespace-nowrap text-sm">
        {value}
      </div>
    )
  },
  { 
    key: "hospital", 
    label: "Hospitals/Clinics",
    responsiveClass: "hidden xl:table-cell",
    render: (value: string) => (
      <div className="whitespace-nowrap text-sm">
        {value}
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
  { 
    key: "patients", 
    label: "Patients",
    responsiveClass: "hidden md:table-cell",
    render: (value: number) => (
      <div className="text-center whitespace-nowrap font-medium">
        {value}
      </div>
    )
  },
  { 
    key: "availabilityStatus", 
    label: "Status",
    responsiveClass: "",
    render: (value: string) => {
      let badgeClass = "bg-gray-100 text-gray-800";
      let displayText = value;
      
      if (value === "available") {
        badgeClass = "bg-green-100 text-green-800 border-green-200";
        displayText = "Available";
      } else if (value === "unavailable") {
        badgeClass = "bg-red-100 text-red-800 border-red-200";
        displayText = "Unavailable";
      } else if (value === "busy") {
        badgeClass = "bg-yellow-100 text-yellow-800 border-yellow-200";
        displayText = "Busy";
      } else if (value === "on_break") {
        badgeClass = "bg-blue-100 text-blue-800 border-blue-200";
        displayText = "On Break";
      }
      
      return (
        <Badge variant="outline" className={`text-xs whitespace-nowrap ${badgeClass}`}>
          {displayText}
        </Badge>
      );
    }
  },
  {
    key: "actions",
    label: "Actions",
    responsiveClass: "",
    render: (_: any, row: any) => (
      <Button size="sm" variant="outline" className="text-xs whitespace-nowrap">
        View
      </Button>
    )
  }
];

// Function to add Dr. prefix to name if not already present
const formatDoctorName = (name: string): string => {
  if (!name) return "Dr. Unknown";
  
  // Check if name already starts with Dr. or Dr (case insensitive)
  const trimmedName = name.trim();
  const drPrefixRegex = /^dr\.?\s+/i;
  
  if (drPrefixRegex.test(trimmedName)) {
    // If already has Dr. prefix, return as is but with proper formatting
    return "Dr. " + trimmedName.replace(drPrefixRegex, '');
  }
  
  // Add Dr. prefix if not present
  return "Dr. " + trimmedName;
};

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "doctor_users"));
        const doctorsData: Doctor[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Determine hospital/clinic name based on practiceType
          let hospitalOrClinic = "";
          if (data.practiceInfo?.practiceType === "hospital") {
            hospitalOrClinic = data.practiceInfo?.hospitalName || "";
          } else if (data.practiceInfo?.practiceType === "clinic") {
            hospitalOrClinic = data.practiceInfo?.clinicSpecialization || "";
          } else {
            hospitalOrClinic = data.practiceInfo?.hospitalName || 
                             data.practiceInfo?.clinicSpecialization || 
                             "";
          }
          
          // Format doctor name with Dr. prefix
          const rawName = data.personalInfo?.name || "";
          const formattedName = formatDoctorName(rawName);
          
          doctorsData.push({
            id: doc.id,
            doctorId: data.uid || "N/A",
            name: formattedName,
            specialization: data.professionalInfo?.specialization || "",
            hospital: hospitalOrClinic,
            email: data.email || "",
            phone: data.phone || "",
            patients: data.patients || 0,
            status: data.status === "active" ? "Active" : "Inactive",
            availabilityStatus: data.availabilityStatus || "unavailable"
          });
        });
        
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          <p className="text-muted-foreground text-sm">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="space-y-6 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-2 sm:p-0">
          <div className="text-center sm:text-left space-y-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
              Doctors Management
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl">
              Manage and track all registered doctors in your healthcare system
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-sm sm:text-base py-2.5">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Doctor
          </Button>
        </div>

        {/* Stats Cards - Mobile First */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg border p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{doctors.length}</div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Doctors</div>
          </div>
          <div className="bg-white rounded-lg border p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
              {doctors.filter(d => d.availabilityStatus === 'available').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Available</div>
          </div>
          <div className="bg-white rounded-lg border p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
              {doctors.filter(d => d.availabilityStatus === 'unavailable').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Unavailable</div>
          </div>
          <div className="bg-white rounded-lg border p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">
              {doctors.reduce((sum, doctor) => sum + doctor.patients, 0)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Patients</div>
          </div>
        </div>

        {/* Mobile Compact View */}
        <div className="block sm:hidden">
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">All Doctors</h2>
              <p className="text-xs text-gray-600 mt-1">{doctors.length} doctors found</p>
            </div>
            <div className="divide-y">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 flex-1 pr-3">
                      <h3 className="text-sm font-normal text-gray-900 whitespace-nowrap truncate">
                        {doctor.name}
                      </h3>
                      <p className="text-xs text-gray-600 whitespace-nowrap truncate mt-0.5">
                        {doctor.specialization}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {doctor.hospital}
                      </p>
                    </div>
                    <Badge variant="outline" className={
                      doctor.availabilityStatus === 'available' ? "bg-green-100 text-green-800 border-green-200" :
                      doctor.availabilityStatus === 'unavailable' ? "bg-red-100 text-red-800 border-red-200" :
                      doctor.availabilityStatus === 'busy' ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                      "bg-blue-100 text-blue-800 border-blue-200"
                    }>
                      {doctor.availabilityStatus === 'available' ? 'Available' :
                       doctor.availabilityStatus === 'unavailable' ? 'Unavailable' :
                       doctor.availabilityStatus === 'busy' ? 'Busy' : 'On Break'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="truncate text-gray-700">{doctor.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="whitespace-nowrap text-gray-700">{doctor.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>ID: {doctor.doctorId.substring(0, 6)}...</span>
                      <span>Patients: {doctor.patients}</span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs whitespace-nowrap border-gray-300">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet and Desktop Table View */}
        <div className="hidden sm:block">
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <DataTable
              title="All Doctors"
              columns={columns}
              data={doctors}
              searchPlaceholder="Search by name, specialization, hospital..."
              responsive={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// PlusIcon component for the button
function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}