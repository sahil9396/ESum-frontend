"use client";
import { signOut } from "next-auth/react";
import DashboardCard from "./DashboardCard";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { useEmailData } from "@/providers/email-data";

const Dashboard = () => {
  const { posts, setPostCount, isBackendProcessing, setIsBackendProcessing } =
    useEmailData();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => signOut();

  const handleLoadMore = () => {
    setPostCount((prev) => prev + 5);
    setIsBackendProcessing(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-3">
      <nav
        className={`w-full rounded-b-lg py-4 px-6 flex flex-col justify-between bg-card/80 fixed duration-500 transition-all z-[100] `}
        style={{
          height: menuOpen ? "100%" : "auto",
          backdropFilter: menuOpen ? "blur(100px)" : "none",
          alignItems: menuOpen ? "flex-start" : "center",
          borderBottomRightRadius: menuOpen ? "0" : "1rem",
          borderBottomLeftRadius: menuOpen ? "0" : "1rem",
          transition: "100% 0.15s ease-out",
          maxHeight: "auto",
        }}
      >
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            // className="btn btn-secondary"
          >
            <MenuIcon size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="flex flex-col mt-4 w-full">
            <button onClick={handleClick} className="btn btn-secondary">
              Sign Out
            </button>
          </div>
        )}
      </nav>

      <main className="container mx-auto px-6 py-24 ">
        {posts.length === 0 ? (
          <>No Post</>
        ) : (
          <>
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
              {posts.map((post, index) => (
                <DashboardCard key={index} {...post} />
              ))}
              <button
                disabled={isBackendProcessing}
                onClick={handleLoadMore}
                className="btn btn-secondary"
              >
                Load More
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
