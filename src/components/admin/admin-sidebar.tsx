"use client";
import {
  CircleDollarSign,
  MessageSquareWarning,
  Presentation,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const sidebarItem = [
  {
    name: "Dashboard",
    icon: Presentation,
    section: "dashboard",
  },
  {
    name: "Reports",
    icon: MessageSquareWarning,
    section: "reports",
  },
  {
    name: "Payments",
    icon: CircleDollarSign,
    section: "payments",
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentSection = pathname.split("/").pop() || "dashboard";

  const handleSidebarItemClick = (section: string) => {
    router.replace(`/admin/${section}`);
  };
  return (
    <Sidebar className="mt-[62px] bg-muted">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1 px-3 py-1">
              {sidebarItem.map((item) => (
                <SidebarMenuItem
                  key={item.section}
                  className="cursor-pointer p-1"
                >
                  <SidebarMenuButton
                    asChild
                    className={twMerge(
                      currentSection === item.section
                        ? "bg-muted font-semibold"
                        : "",
                    )}
                    onClick={() => handleSidebarItemClick(item.section)}
                  >
                    <a className="flex gap-3">
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
