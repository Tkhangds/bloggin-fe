"use client";
import { BarChart3, Presentation } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

const sidebarItem = [
  {
    name: "Dashboard",
    icon: Presentation,
    section: "dashboard",
  },
  {
    name: "Statistics",
    icon: BarChart3,
    section: "statistics",
  },
];

export const AdminSidebar = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const router = useRouter();

  const handleSidebarItemClick = (section: string) => {
    setCurrentSection(section);
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
