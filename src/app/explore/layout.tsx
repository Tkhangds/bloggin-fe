import { LandingHeaderLayout } from "@/components/layouts/landing-header";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LandingHeaderLayout>
      <div className="px-7 py-6 lg:px-20">{children}</div>
    </LandingHeaderLayout>
  );
}
