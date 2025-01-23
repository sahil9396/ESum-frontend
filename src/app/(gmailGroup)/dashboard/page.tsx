import Dashboard from "@/components/dashboard/Dashboard";
import { authOptions } from "@/lib/auth";
import { getGmail } from "@/lib/mail-server-action";
// import { responseType } from "@/lib/types/custom";
import { getServerSession } from "next-auth";
import React from "react";


const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const data = await getGmail(session.user.accessToken, null);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return <Dashboard data={data} accessToken={session.user.accessToken} />;
};

export default DashboardPage;
