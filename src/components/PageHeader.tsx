
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 mb-6 border-b border-care-neutral-200">
      <div>
        <h1 className="text-2xl font-bold text-care-neutral-900">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-care-neutral-500">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center space-x-2">{children}</div>}
    </div>
  );
}
