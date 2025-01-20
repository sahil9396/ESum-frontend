import EmailDataProvider from "@/providers/email-data";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashBoardLayout = ({ children }: Props) => {
  return <EmailDataProvider>{children}</EmailDataProvider>;
};

export default DashBoardLayout;
