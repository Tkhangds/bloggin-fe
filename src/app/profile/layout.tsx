import { LandingHeaderLayout } from "@/components/layouts/landing-header";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LandingHeaderLayout>{children}</LandingHeaderLayout>
    </div>
  );
}
