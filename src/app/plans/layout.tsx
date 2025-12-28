import { LandingHeaderLayout } from "@/components/layouts/landing-header";

export default function PlansLayout({
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
