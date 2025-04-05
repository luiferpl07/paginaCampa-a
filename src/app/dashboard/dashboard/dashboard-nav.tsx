"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileEdit,
  ImageIcon,
  CalendarIcon,
  ListTodo,
  Users,
  MessageCircle,
  Settings
} from "lucide-react";

interface DashboardNavProps extends React.HTMLAttributes<HTMLElement> {}

export function DashboardNav({ className, ...props }: DashboardNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4 mr-2" />
    },
    {
      title: "Noticias",
      href: "/dashboard/noticias",
      icon: <FileEdit className="h-4 w-4 mr-2" />
    },
    {
      title: "Propuestas",
      href: "/dashboard/propuestas",
      icon: <ListTodo className="h-4 w-4 mr-2" />
    },
    {
      title: "Galería",
      href: "/dashboard/galeria",
      icon: <ImageIcon className="h-4 w-4 mr-2" />
    },
    {
      title: "Eventos",
      href: "/dashboard/eventos",
      icon: <CalendarIcon className="h-4 w-4 mr-2" />
    },
    {
      title: "Equipo",
      href: "/dashboard/equipo",
      icon: <Users className="h-4 w-4 mr-2" />
    },
    {
      title: "Mensajes",
      href: "/dashboard/mensajes",
      icon: <MessageCircle className="h-4 w-4 mr-2" />
    },
    {
      title: "Configuración",
      href: "/dashboard/configuracion",
      icon: <Settings className="h-4 w-4 mr-2" />
    }
  ];

  return (
    <nav className={cn("flex flex-col space-y-1 p-2", className)} {...props}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted text-primary"
              : "hover:bg-transparent hover:text-primary",
            "justify-start flex items-center"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
