"use client";

import classNames from "classnames";
import { Dumbbell, Heart, Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavigationItem = {
  name: string;
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  href: string;
};

const navLinks: NavigationItem[] = [
  {
    name: "Home",
    icon: Home,
    href: "/",
  },
  {
    name: "Search",
    icon: Search,
    href: "/search",
  },
  {
    name: "Exercises",
    icon: Dumbbell,
    href: "/exercises",
  },
  {
    name: "Liked",
    icon: Heart,
    href: "/liked-exercises",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-slate-300 z-[1000]">
      <ul className="h-full container px-4 flex items-center justify-between gap-4">
        {navLinks.map((navItem) => (
          <li key={navItem.name}>
            <Link
              href={navItem.href}
              className={classNames("flex flex-col items-center gap-1.5", pathname === navItem.href ? "text-blue-500" : "text-slate-700")}
            >
              <navItem.icon className="w-6 h-6" />
              <span className="text-xs sm:text-sm font-medium">{navItem.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
