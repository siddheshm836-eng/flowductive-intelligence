import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-auto lg:pl-0 pl-0">
        <div className="max-w-7xl mx-auto p-4 lg:p-6 pt-14 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
