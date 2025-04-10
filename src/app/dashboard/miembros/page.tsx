"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, Plus, User, Facebook, Instagram } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MiembroCampaña {
  id: number;
  nombre: string;
  cargo: string;
  area: string | null;
  fotoUrl: string | null;
  facebook: string | null;
  instagram: string | null;
  x: string | null;
  tiktok: string | null;
  youtube: string | null;
  whatsapp: string | null;
  orden: number | null;
  creadoEn: string;
}

export default function MiembrosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [miembros, setMiembros] = useState<MiembroCampaña[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMiembro, setSelectedMiembro] = useState<MiembroCampaña | null>(null);

  // Simulación de carga de datos
  useEffect(() => {
    // En un caso real, aquí se haría una petición a tu API de Express
    const demoMiembros = [
      {
        id: 1,
        nombre: "Ana García",
        cargo: "Coordinadora General",
        area: "Dirección",
        fotoUrl: null,
        facebook: "https://facebook.com/anagarcia",
        instagram: "https://instagram.com/anagarcia",
        x: null,
        tiktok: null,
        youtube: null,
        whatsapp: "+573001234567",
        orden: 1,
        creadoEn: new Date().toISOString(),
      },
      {
        id: 2,
        nombre: "Carlos Rodríguez",
        cargo: "Jefe de Comunicaciones",
        area: "Comunicación",
        fotoUrl: null,
        facebook: "https://facebook.com/carlosrodriguez",
        instagram: null,
        x: "https://x.com/carlosrodriguez",
        tiktok: null,
        youtube: "https://youtube.com/@carlosrodriguez",
        whatsapp: null,
        orden: 2,
        creadoEn: new Date().toISOString(),
      },
    ];

    setMiembros(demoMiembros);
    setLoading(false);
  }, []);

  const handleDelete = async (id: number) => {
    // Simulación de eliminación
    try {
      // En un caso real, aquí se haría una petición a tu API de Express
      // await fetch(`tu-api-express/miembros/${id}`, { method: "DELETE" });

      setMiembros(miembros.filter(miembro => miembro.id !== id));
      toast.success("Miembro eliminado correctamente");
    } catch (error) {
      console.error("Error deleting miembro:", error);
      toast.error("Error al eliminar el miembro");
    }
  };

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Función para contar redes sociales activas
  const countSocialNetworks = (miembro: MiembroCampaña) => {
    return [
      miembro.facebook,
      miembro.instagram,
      miembro.x,
      miembro.tiktok,
      miembro.youtube,
      miembro.whatsapp
    ].filter(Boolean).length;
  };

  const columns: ColumnDef<MiembroCampaña>[] = [
    {
      id: "foto",
      header: "Foto",
      cell: ({ row }) => {
        const miembro = row.original;
        return (
          <Avatar>
            {miembro.fotoUrl ? (
              <AvatarImage src={miembro.fotoUrl} alt={miembro.nombre} />
            ) : null}
            <AvatarFallback>{getInitials(miembro.nombre)}</AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "cargo",
      header: "Cargo",
    },
    {
      accessorKey: "area",
      header: "Área",
      cell: ({ row }) => row.original.area || "N/A",
    },
    {
      id: "redes",
      header: "Redes Sociales",
      cell: ({ row }) => {
        const count = countSocialNetworks(row.original);
        return (
          <div className="flex items-center gap-1">
            {count > 0 ? (
              <>
                {row.original.facebook && <Facebook className="h-4 w-4 text-blue-600" />}
                {row.original.instagram && <Instagram className="h-4 w-4 text-pink-600" />}
                {count > 2 && <span className="text-xs text-gray-500">+{count - 2} más</span>}
              </>
            ) : (
              <span className="text-gray-400 text-sm">Sin redes</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "orden",
      header: "Orden",
      cell: ({ row }) => row.original.orden || "N/A",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const miembro = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/miembros/${miembro.id}/edit`}>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setSelectedMiembro(miembro);
                setDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Miembros del Equipo</h2>
          <p className="text-muted-foreground">
            Administra los miembros de la campaña
          </p>
        </div>
        <Link href="/dashboard/miembros/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Miembro
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={miembros}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Eliminar Miembro"
        description="¿Estás seguro que deseas eliminar este miembro del equipo? Esta acción no se puede deshacer."
        onConfirm={() => selectedMiembro && handleDelete(selectedMiembro.id)}
        variant="destructive"
        confirmText="Eliminar"
      />
    </div>
  );
}
