import React from "react";
import { Protect, RedirectToSignIn } from "@clerk/nextjs";
import { Toaster } from "sonner";
import LeftSideBar from "@/components/layout/left-side-bar";
import { TopBar } from "@/components/layout/top-bar";
// import { LeftSideBar } from "@/components/custom-ui/layout/left-side-bar";
// import TopBar from "@/components/custom-ui/layout/top-bar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // A state or condition to detect if the user has logged out
  const isSignedOut = false; // Replace this with your actual sign-out detection logic

  if (isSignedOut) {
    return <RedirectToSignIn redirectUrl="/sign-in" />;
  }

  return (
    <Protect
      fallback={
        <RedirectToSignIn
          redirectUrl="/dashboard" // Redirect back to /dashboard after sign-in
        />
      }
    >
      <div className="flex h-screen">
      <LeftSideBar />
        <div className="flex flex-col flex-1">
          <TopBar />
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </Protect>
  );
};

export default DashboardLayout;
