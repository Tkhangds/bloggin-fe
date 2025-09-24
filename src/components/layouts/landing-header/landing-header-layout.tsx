import { ReactNode } from "react";
import { Header } from "@/components/layouts/landing/header";

export const LandingHeaderLayout = ({
  children,
  showSearchBar = true,
}: {
  children: ReactNode;
  showSearchBar?: boolean;
}) => {
  return (
    <div className="relative">
      <Header showSearchBar={showSearchBar} />
      <div className="">{children}</div>
    </div>
  );
};
