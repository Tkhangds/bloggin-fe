import { ReactNode } from "react";
import { Header } from "@/components/layouts/landing/header";

type LandingLayoutProps = {
  children: ReactNode;
};

export const LandingHeaderLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="relative">
      <Header />
      <div className="">{children}</div>
    </div>
  );
};
