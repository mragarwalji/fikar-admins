import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

const appointments = [
  { id: 1, patient: "John Smith", doctor: "Dr. Sarah Johnson", hospital: "City Medical Center", date: "2025-01-11", time: "10:00 AM", type: "Consultation", status: "Completed" },
  { id: 2, patient: "Emma Davis", doctor: "Dr. Michael Chen", hospital: "General Hospital", date: "2025-01-11", time: "11:30 AM", type: "Follow-up", status: "In-Queue" },
  { id: 3, patient: "Robert Wilson", doctor: "Dr. Sarah Johnson", hospital: "City Medical Center", date: "2025-01-11", time: "02:00 PM", type: "Emergency", status: "Pending" },
  { id: 4, patient: "Lisa Anderson", doctor: "Dr. James Brown", hospital: "Metro Clinic", date: "2025-01-11", time: "03:30 PM", type: "Consultation", status: "In-Queue" },
  { id: 5, patient: "Michael Brown", doctor: "Dr. Emily Wilson", hospital: "Children's Hospital", date: "2025-01-11", time: "09:00 AM", type: "Checkup", status: "Completed" },
  { id: 6, patient: "Sarah Taylor", doctor: "Dr. David Martinez", hospital: "Skin Care Clinic", date: "2025-01-10", time: "04:00 PM", type: "Treatment", status: "Completed" },
  { id: 7, patient: "James Wilson", doctor: "Dr. Lisa Anderson", hospital: "Cancer Center", date: "2025-01-12", time: "10:30 AM", type: "Consultation", status: "Pending" },
  { id: 8, patient: "Mary Johnson", doctor: "Dr. Michael Chen", hospital: "General Hospital", date: "2025-01-12", time: "01:00 PM", type: "Follow-up", status: "Pending" },
];

const columns = [
  { key: "patient", label: "Patient" },
  { key: "doctor", label: "Doctor" },
  { key: "hospital", label: "Hospital" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "type", label: "Type" },
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
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <Button size="sm" variant="outline">Manage</Button>
    )
  }
];

export default function Appointments() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [date, setDate] = useState<Date>();

  const filteredAppointments = appointments.filter(apt => {
    const statusMatch = statusFilter === "all" || apt.status === statusFilter;
    const dateMatch = !date || apt.date === format(date, "yyyy-MM-dd");
    return statusMatch && dateMatch;
  });

  const stats = {
    total: appointments.length,
    completed: appointments.filter(a => a.status === "Completed").length,
    inQueue: appointments.filter(a => a.status === "In-Queue").length,
    pending: appointments.filter(a => a.status === "Pending").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments Management</h1>
          <p className="text-muted-foreground mt-2">Track and manage all patient appointments</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Schedule Appointment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <p className="text-sm font-medium text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-foreground mt-2">{stats.total}</p>
        </Card>
        <Card className="p-4 border-l-4 border-success">
          <p className="text-sm font-medium text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-success mt-2">{stats.completed}</p>
        </Card>
        <Card className="p-4 border-l-4 border-info">
          <p className="text-sm font-medium text-muted-foreground">In-Queue</p>
          <p className="text-2xl font-bold text-info mt-2">{stats.inQueue}</p>
        </Card>
        <Card className="p-4 border-l-4 border-warning">
          <p className="text-sm font-medium text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-warning mt-2">{stats.pending}</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="In-Queue">In-Queue</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Button 
            variant="ghost" 
            onClick={() => {
              setStatusFilter("all");
              setDate(undefined);
            }}
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      <DataTable
        title={`Appointments (${filteredAppointments.length})`}
        columns={columns}
        data={filteredAppointments}
        searchPlaceholder="Search appointments..."
      />
    </div>
  );
}
