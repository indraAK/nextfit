import { cn } from "@/lib/utils";
import React from "react";

type AlertProps = {
  title: string;
  description?: string;
  icon?: React.ReactElement;
  ctaButton?: React.ReactNode;
  className?: string;
};

export const Alert = ({ title, description, icon, ctaButton, className }: AlertProps) => {
  return (
    <div className={cn("flex flex-col items-center", className)} role="alert">
      {icon}
      <h2 className="mt-4 font-semibold text-xl text-slate-900">{title}</h2>
      {description ? <p className=" text-slate-600 mt-1">{description}</p> : null}
      {ctaButton}
    </div>
  );
};
