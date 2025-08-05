"use client";

import { type FC, type ReactNode } from "react";
import { ChevronRight } from "@untitledui/icons";

interface BreadcrumbsProps {
  type?: "button";
  maxVisibleItems?: number;
  className?: string;
  children: ReactNode;
}

interface BreadcrumbsItemProps {
  href?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Breadcrumbs: FC<BreadcrumbsProps> & {
  Item: FC<BreadcrumbsItemProps>;
} = ({ className, children }) => {
  return (
    <nav className={`flex items-center space-x-2 ${className || ""}`}>
      {children}
    </nav>
  );
};

const BreadcrumbsItem: FC<BreadcrumbsItemProps> = ({ href, icon, children }) => {
  const content = (
    <>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
        {content}
        <ChevronRight className="ml-2 h-4 w-4" />
      </a>
    );
  }

  return (
    <span className="text-sm text-gray-900 flex items-center">
      {content}
      <ChevronRight className="ml-2 h-4 w-4" />
    </span>
  );
};

BreadcrumbsItem.displayName = "BreadcrumbsItem";

Breadcrumbs.Item = BreadcrumbsItem; 