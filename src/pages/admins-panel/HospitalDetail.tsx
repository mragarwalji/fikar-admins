import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, ArrowLeft, Ban, Trash2, Building2, Users, Bed, Stethoscope } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const hospitals = [
  { id: 1, name: "City Medical Center", location: "123 Main St, New York, NY", phone: "+1 234-567-1000", doctors: 45, patients: 892, beds: 250, status: "Operational", type: "General Hospital", established: "1985", registrationNo: "HOSP-1985-001" },
  { id: 2, name: "General Hospital", location: "456 Oak Ave, Los Angeles, CA", phone: "+1 234-567-2000", doctors: 38, patients: 756, beds: 200, status: "Operational", type: "General Hospital", established: "1990", registrationNo: "HOSP-1990-002" },
  { id: 3, name: "Metro Clinic", location: "789 Pine Rd, Chicago, IL", phone: "+1 234-567-3000", doctors: 22, patients: 445, beds: 120, status: "Operational", type: "Specialty Clinic", established: "2005", registrationNo: "HOSP-2005-003" },
  { id: 4, name: "Children's Hospital", location: "321 Elm St, Houston, TX", phone: "+1 234-567-4000", doctors: 31, patients: 623, beds: 180, status: "Operational", type: "Pediatric Hospital", established: "1995", registrationNo: "HOSP-1995-004" },
  { id: 5, name: "Skin Care Clinic", location: "654 Maple Dr, Phoenix, AZ", phone: "+1 234-567-5000", doctors: 12, patients: 234, beds: 50, status: "Operational", type: "Specialty Clinic", established: "2010", registrationNo: "HOSP-2010-005" },
  { id: 6, name: "Cancer Center", location: "987 Cedar Ln, Philadelphia, PA", phone: "+1 234-567-6000", doctors: 28, patients: 567, beds: 150, status: "Under Renovation", type: "Specialty Hospital", established: "2000", registrationNo: "HOSP-2000-006" },
];

export default function HospitalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const hospital = hospitals.find((h) => h.id === Number(id));

  if (!hospital) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Hospital not found</h2>
        <Button onClick={() => navigate("/hospitals")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hospitals
        </Button>
      </div>
    );
  }

  const handleBlock = () => {
    setIsBlocked(!isBlocked);
    toast.success(isBlocked ? "Hospital unblocked successfully" : "Hospital blocked successfully");
    setShowBlockDialog(false);
  };

  const handleRemove = () => {
    toast.success("Hospital removed successfully");
    setShowRemoveDialog(false);
    setTimeout(() => navigate("/hospitals"), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate("/hospitals")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hospitals
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowBlockDialog(true)}
            variant={isBlocked ? "secondary" : "outline"}
            className="gap-2"
          >
            <Ban className="h-4 w-4" />
            {isBlocked ? "Unblock" : "Block"} Hospital
          </Button>
          <Button
            onClick={() => setShowRemoveDialog(true)}
            variant="destructive"
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Remove Hospital
          </Button>
        </div>
      </div>

      <Card className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="h-24 w-24 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{hospital.name}</h1>
              <p className="text-muted-foreground text-lg mt-1">{hospital.type}</p>
              <Badge className={`mt-2 ${isBlocked ? "bg-danger text-danger-foreground" : hospital.status === "Operational" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}`}>
                {isBlocked ? "Blocked" : hospital.status}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Hospital ID</p>
            <p className="text-xl font-mono font-semibold text-primary">#{hospital.id.toString().padStart(6, '0')}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Hospital Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Registration Number</p>
                  <p className="text-base font-medium text-foreground">{hospital.registrationNo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Established</p>
                  <p className="text-base font-medium text-foreground">{hospital.established}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hospital Type</p>
                  <p className="text-base font-medium text-foreground">{hospital.type}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location & Contact
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-base font-medium text-foreground">{hospital.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="text-base font-medium text-foreground">{hospital.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-accent border-primary/20">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{hospital.doctors}</p>
                      <p className="text-sm text-muted-foreground">Doctors</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-accent border-primary/20">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{hospital.patients}</p>
                      <p className="text-sm text-muted-foreground">Patients</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-accent border-primary/20 col-span-2">
                  <div className="flex items-center gap-3">
                    <Bed className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{hospital.beds}</p>
                      <p className="text-sm text-muted-foreground">Total Beds</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isBlocked ? "Unblock" : "Block"} Hospital</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {isBlocked ? "unblock" : "block"} {hospital.name}? {!isBlocked && "This will prevent them from operating in the system."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlock}>
              {isBlocked ? "Unblock" : "Block"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Hospital</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently remove {hospital.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
