import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, ArrowLeft, Ban, Trash2, User, Building2, Stethoscope, Users } from "lucide-react";
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

const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialization: "Cardiology", hospital: "City Medical Center", email: "sarah.j@hospital.com", phone: "+1 234-567-8901", patients: 145, status: "Active", experience: "15 years", education: "MD - Harvard Medical School", licenseNo: "DOC-2008-12345" },
  { id: 2, name: "Dr. Michael Chen", specialization: "Neurology", hospital: "General Hospital", email: "m.chen@hospital.com", phone: "+1 234-567-8902", patients: 132, status: "Active", experience: "12 years", education: "MD - Johns Hopkins", licenseNo: "DOC-2011-67890" },
  { id: 3, name: "Dr. James Brown", specialization: "Orthopedics", hospital: "Metro Clinic", email: "james.b@hospital.com", phone: "+1 234-567-8903", patients: 98, status: "Active", experience: "10 years", education: "MD - Stanford University", licenseNo: "DOC-2013-45678" },
  { id: 4, name: "Dr. Emily Wilson", specialization: "Pediatrics", hospital: "Children's Hospital", email: "e.wilson@hospital.com", phone: "+1 234-567-8904", patients: 201, status: "Active", experience: "18 years", education: "MD - Yale School of Medicine", licenseNo: "DOC-2005-98765" },
  { id: 5, name: "Dr. David Martinez", specialization: "Dermatology", hospital: "Skin Care Clinic", email: "d.martinez@hospital.com", phone: "+1 234-567-8905", patients: 87, status: "Active", experience: "8 years", education: "MD - UCLA", licenseNo: "DOC-2015-11223" },
  { id: 6, name: "Dr. Lisa Anderson", specialization: "Oncology", hospital: "Cancer Center", email: "l.anderson@hospital.com", phone: "+1 234-567-8906", patients: 156, status: "On Leave", experience: "20 years", education: "MD - Columbia University", licenseNo: "DOC-2003-55667" },
];

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const doctor = doctors.find((d) => d.id === Number(id));

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Doctor not found</h2>
        <Button onClick={() => navigate("/doctors")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Doctors
        </Button>
      </div>
    );
  }

  const handleBlock = () => {
    setIsBlocked(!isBlocked);
    toast.success(isBlocked ? "Doctor unblocked successfully" : "Doctor blocked successfully");
    setShowBlockDialog(false);
  };

  const handleRemove = () => {
    toast.success("Doctor removed successfully");
    setShowRemoveDialog(false);
    setTimeout(() => navigate("/doctors"), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate("/doctors")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Doctors
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowBlockDialog(true)}
            variant={isBlocked ? "secondary" : "outline"}
            className="gap-2"
          >
            <Ban className="h-4 w-4" />
            {isBlocked ? "Unblock" : "Block"} Doctor
          </Button>
          <Button
            onClick={() => setShowRemoveDialog(true)}
            variant="destructive"
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Remove Doctor
          </Button>
        </div>
      </div>

      <Card className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{doctor.name}</h1>
              <p className="text-muted-foreground text-lg mt-1">{doctor.specialization}</p>
              <Badge className={`mt-2 ${isBlocked ? "bg-danger text-danger-foreground" : doctor.status === "Active" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}`}>
                {isBlocked ? "Blocked" : doctor.status}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Doctor ID</p>
            <p className="text-xl font-mono font-semibold text-primary">#{doctor.id.toString().padStart(6, '0')}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                Professional Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">License Number</p>
                  <p className="text-base font-medium text-foreground">{doctor.licenseNo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="text-base font-medium text-foreground">{doctor.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Education</p>
                  <p className="text-base font-medium text-foreground">{doctor.education}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Hospital Assignment
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Current Hospital</p>
                  <p className="text-base font-medium text-foreground">{doctor.hospital}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="text-base font-medium text-foreground">{doctor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="text-base font-medium text-foreground">{doctor.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Patient Statistics
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-3xl font-bold text-primary">{doctor.patients}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isBlocked ? "Unblock" : "Block"} Doctor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {isBlocked ? "unblock" : "block"} {doctor.name}? {!isBlocked && "This will prevent them from accessing the system."}
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
            <AlertDialogTitle>Remove Doctor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently remove {doctor.name}? This action cannot be undone.
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
