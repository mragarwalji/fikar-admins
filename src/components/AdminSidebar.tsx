import { useEffect, useState } from "react";
import { LayoutDashboard, Users, Building2, UserSquare2, Calendar, Settings } from "lucide-react";
import { NavLink } from "@/components/Navigation/NavLink";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// MENU ITEMS
const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Doctors", url: "/admin/doctors", icon: UserSquare2 },
  { title: "Hospitals", url: "/admin/hospitals", icon: Building2 },
  { title: "Patients", url: "/admin/patients", icon: Users },
  { title: "Appointments", url: "/admin/appointments", icon: Calendar },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { open } = useSidebar();

  // STATE for admin details
  const [admin, setAdmin] = useState({ name: "", email: "" });

  // Fetch admin info from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/auth/admin-info")
      .then((res) => res.json())
      .then((data) => setAdmin(data))
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="flex flex-col h-full">

         {/* Admin Info Section */}
        <div className="border-t border-sidebar-border p-6 mt-auto">
          <div
            className={`flex items-center gap-3 transition-all duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">
                {admin.name ? admin.name.charAt(0).toUpperCase() : "A"}
              </span>
            </div>

            {open && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {admin.name || "Loading..."}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {admin.email || "Loading..."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel
              className={`text-xs font-semibold text-muted-foreground uppercase tracking-wider transition-all duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-2">
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        end={item.url === "/admin"}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
