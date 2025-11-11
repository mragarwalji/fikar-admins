import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your admin panel preferences</p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Admin Name</Label>
            <Input id="name" defaultValue="John Admin" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="admin@healthcare.com" />
          </div>
          <Button className="bg-primary text-primary-foreground">Save Changes</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>New Registrations</Label>
              <p className="text-sm text-muted-foreground">Get notified when doctors, hospitals, or patients register</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Appointment Updates</Label>
              <p className="text-sm text-muted-foreground">Receive updates about appointment status changes</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>System Alerts</Label>
              <p className="text-sm text-muted-foreground">Important system notifications and alerts</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Display Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Real-time Updates</Label>
              <p className="text-sm text-muted-foreground">Automatically refresh data in the dashboard</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Compact View</Label>
              <p className="text-sm text-muted-foreground">Show more data in less space</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>
    </div>
  );
}
