import { LandingHeaderLayout } from "@/components/layouts/landing-header";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LandingHeaderLayout>
        <main className="px-4 pt-5 sm:px-6 lg:px-20">{children}</main>
      </LandingHeaderLayout>
    </div>
  );
}
