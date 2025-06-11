import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LandingHeaderLayout } from "@/components/layouts/landing-header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LandingHeaderLayout>
      <SidebarProvider>
        <AdminSidebar />
        <main className="flex w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </LandingHeaderLayout>
  );
}
