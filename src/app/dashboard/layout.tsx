"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookOpenText, Calendar, FileText, Film, LayoutDashboard,
  Menu, Mic, MessageSquare, Users2, X, Image, FileImage,
  FileSpreadsheet, FileBox, type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  title: string;
  isActive?: boolean;
}

const NavItem = ({ href, icon: Icon, title, isActive }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
        isActive ? "bg-zinc-100 text-zinc-900 font-medium" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </Link>
  );
};

const SideNavigation = () => {
  const pathname = usePathname();

  // Define main navigation items
  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, title: "Dashboard" },
    { href: "/dashboard/relatos", icon: MessageSquare, title: "Relatos" },
    { href: "/dashboard/propuestas", icon: FileText, title: "Propuestas" },
    { href: "/dashboard/perfiles", icon: Users2, title: "Perfiles" },
    { href: "/dashboard/participaciones", icon: Users2, title: "Participaciones" },
    { href: "/dashboard/banners", icon: Image, title: "Banners" },
    { href: "/dashboard/eventos", icon: Calendar, title: "Eventos" },
    { href: "/dashboard/biografia", icon: BookOpenText, title: "Biografía" },
    { href: "/dashboard/trayectoria", icon: FileSpreadsheet, title: "Trayectoria" },
    { href: "/dashboard/noticias", icon: FileText, title: "Noticias" },
    { href: "/dashboard/podcasts", icon: Mic, title: "Podcasts" },
    { href: "/dashboard/videos", icon: Film, title: "Videos" },
    { href: "/dashboard/blogs", icon: FileText, title: "Blogs" },
    { href: "/dashboard/libros", icon: BookOpenText, title: "E-libros" },
    { href: "/dashboard/revistas", icon: FileImage, title: "Revistas" },
    { href: "/dashboard/documentos", icon: FileBox, title: "Documentos" },
    { href: "/dashboard/miembros", icon: Users2, title: "Miembros" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 border-r bg-white z-10">
      <div className="flex flex-col h-full py-6">
        <div className="px-6 mb-6">
          <h1 className="text-xl font-bold text-zinc-900">Admin Panel</h1>
        </div>

        <div className="flex-1 px-3 space-y-1 overflow-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={item.title}
              isActive={
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href)
              }
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    
    <div className="relative min-h-screen">
      
      <SideNavigation />

      <div className="pl-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
