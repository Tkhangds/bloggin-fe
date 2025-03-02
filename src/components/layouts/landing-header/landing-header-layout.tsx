import { ReactNode } from "react";
import { Header } from "@/components/layouts/landing/header";

type LandingLayoutProps = {
  children: ReactNode;
};

export const LandingHeaderLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div>
      <Header />
      <div className="mt-[52px]">{children}</div>
    </div>
  );
};
