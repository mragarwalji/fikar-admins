import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, ArrowLeft, Ban, Trash2, User, Calendar, Activity } from "lucide-react";
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

const patients = [
  { id: 1, name: "John Smith", age: 45, gender: "Male", email: "john.s@email.com", phone: "+1 234-567-7001", doctor: "Dr. Sarah Johnson", lastVisit: "2025-01-10", condition: "Cardiac Issue", status: "Active", bloodType: "O+", address: "123 Oak St, New York, NY", emergencyContact: "+1 234-567-7999", patientId: "PAT-2020-001" },
  { id: 2, name: "Emma Davis", age: 32, gender: "Female", email: "emma.d@email.com", phone: "+1 234-567-7002", doctor: "Dr. Michael Chen", lastVisit: "2025-01-11", condition: "Migraine", status: "Active", bloodType: "A+", address: "456 Pine Ave, Los Angeles, CA", emergencyContact: "+1 234-567-7998", patientId: "PAT-2019-002" },
  { id: 3, name: "Robert Wilson", age: 58, gender: "Male", email: "robert.w@email.com", phone: "+1 234-567-7003", doctor: "Dr. Sarah Johnson", lastVisit: "2025-01-09", condition: "Hypertension", status: "Follow-up Required", bloodType: "B+", address: "789 Elm Rd, Chicago, IL", emergencyContact: "+1 234-567-7997", patientId: "PAT-2018-003" },
  { id: 4, name: "Lisa Anderson", age: 28, gender: "Female", email: "lisa.a@email.com", phone: "+1 234-567-7004", doctor: "Dr. James Brown", lastVisit: "2025-01-08", condition: "Knee Pain", status: "Active", bloodType: "AB+", address: "321 Maple Dr, Houston, TX", emergencyContact: "+1 234-567-7996", patientId: "PAT-2021-004" },
  { id: 5, name: "Michael Brown", age: 67, gender: "Male", email: "michael.b@email.com", phone: "+1 234-567-7005", doctor: "Dr. Emily Wilson", lastVisit: "2025-01-11", condition: "Routine Checkup", status: "Active", bloodType: "O-", address: "654 Cedar Ln, Phoenix, AZ", emergencyContact: "+1 234-567-7995", patientId: "PAT-2017-005" },
  { id: 6, name: "Sarah Taylor", age: 41, gender: "Female", email: "sarah.t@email.com", phone: "+1 234-567-7006", doctor: "Dr. David Martinez", lastVisit: "2025-01-10", condition: "Skin Allergy", status: "Recovered", bloodType: "A-", address: "987 Birch St, Philadelphia, PA", emergencyContact: "+1 234-567-7994", patientId: "PAT-2019-006" },
];

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const patient = patients.find((p) => p.id === Number(id));

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Patient not found</h2>
        <Button onClick={() => navigate("/patients")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patients
        </Button>
      </div>
    );
  }

  const handleBlock = () => {
    setIsBlocked(!isBlocked);
    toast.success(isBlocked ? "Patient unblocked successfully" : "Patient blocked successfully");
    setShowBlockDialog(false);
  };

  const handleRemove = () => {
    toast.success("Patient removed successfully");
    setShowRemoveDialog(false);
    setTimeout(() => navigate("/patients"), 1500);
  };

  const getStatusColor = (status: string) => {
    if (isBlocked) return "bg-danger text-danger-foreground";
    if (status === "Active") return "bg-success text-success-foreground";
    if (status === "Recovered") return "bg-info text-info-foreground";
    return "bg-warning text-warning-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate("/patients")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patients
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowBlockDialog(true)}
            variant={isBlocked ? "secondary" : "outline"}
            className="gap-2"
          >
            <Ban className="h-4 w-4" />
            {isBlocked ? "Unblock" : "Block"} Patient
          </Button>
          <Button
            onClick={() => setShowRemoveDialog(true)}
            variant="destructive"
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Remove Patient
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
              <h1 className="text-3xl font-bold text-foreground">{patient.name}</h1>
              <p className="text-muted-foreground text-lg mt-1">{patient.age} years • {patient.gender}</p>
              <Badge className={`mt-2 ${getStatusColor(patient.status)}`}>
                {isBlocked ? "Blocked" : patient.status}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Patient ID</p>
            <p className="text-xl font-mono font-semibold text-primary">#{patient.id.toString().padStart(6, '0')}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Patient ID</p>
                  <p className="text-base font-medium text-foreground">{patient.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="text-base font-medium text-foreground">{patient.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-base font-medium text-foreground">{patient.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Emergency Contact</p>
                  <p className="text-base font-medium text-foreground">{patient.emergencyContact}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="text-base font-medium text-foreground">{patient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="text-base font-medium text-foreground">{patient.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Medical Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Current Condition</p>
                  <p className="text-base font-medium text-foreground">{patient.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Doctor</p>
                  <p className="text-base font-medium text-foreground">{patient.doctor}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Visit History
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                  <p className="text-base font-medium text-foreground">{patient.lastVisit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isBlocked ? "Unblock" : "Block"} Patient</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {isBlocked ? "unblock" : "block"} {patient.name}? {!isBlocked && "This will prevent them from accessing the system."}
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
            <AlertDialogTitle>Remove Patient</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently remove {patient.name}? This action cannot be undone.
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
