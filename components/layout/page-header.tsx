"use client";

import React, { memo } from "react";

type PageHeaderProps = {
  title?: string;
  backButton?: React.ReactNode;
  children?: React.ReactNode;
};

const PageHeader = memo(function PageHeader({ title, backButton, children }: PageHeaderProps) {
  return (
    <header className="bg-white fixed top-0 left-0 w-full h-[52px] z-[999] shadow">
      <div className="container px-4 h-full flex items-center gap-4">
        {backButton}
        {title ? <p className="text-slate-700 text-lg font-semibold capitalize tracking-normal truncate">{title}</p> : null}
        {children}
      </div>
    </header>
  );
});

export default PageHeader;
