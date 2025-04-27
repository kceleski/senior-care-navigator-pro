
import { ReactNode } from "react";
import { EmrSidebar } from "@/components/EmrSidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-care-neutral-50">
      <EmrSidebar />
      <main className="pl-20 lg:pl-64 pt-4 px-4">
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
}
