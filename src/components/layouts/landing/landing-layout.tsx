import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type LandingLayoutProps = {
  children: ReactNode;
};

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div>
      <Header />
      <div className="mt-[52px]">{children}</div>
      <Footer />
    </div>
  );
};
