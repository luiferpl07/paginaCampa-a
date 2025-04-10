"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Propuesta {
  id: number;
  titulo: string;
  descripcion: string;
  iconoNombre: string;
}

export default function PropuestasPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPropuesta, setSelectedPropuesta] = useState<Propuesta | null>(null);

  const loadPropuestas = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/propuestas");
      if (!response.ok) {
        throw new Error("Error fetching propuestas");
      }
      const data = await response.json();
      setPropuestas(data);
    } catch (error) {
      console.error("Error loading propuestas:", error);
      toast.error("Error al cargar las propuestas");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/propuestas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting propuesta");
      }

      toast.success("Propuesta eliminada correctamente");
      loadPropuestas();
    } catch (error) {
      console.error("Error deleting propuesta:", error);
      toast.error("Error al eliminar la propuesta");
    }
  };

  useEffect(() => {
    loadPropuestas();
  }, []);

  const columns: ColumnDef<Propuesta>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
      cell: ({ row }) => {
        const texto = row.original.descripcion;
        return <span>{texto.length > 50 ? texto.substring(0, 50) + "..." : texto}</span>;
      },
    },
    {
      accessorKey: "iconoNombre",
      header: "Icono",
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const propuesta = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/propuestas/${propuesta.id}/edit`}>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setSelectedPropuesta(propuesta);
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
          <h2 className="text-3xl font-bold tracking-tight">Propuestas</h2>
          <p className="text-muted-foreground">
            Administra las propuestas
          </p>
        </div>
        <Link href="/dashboard/propuestas/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nueva Propuesta
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={propuestas}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Eliminar Propuesta"
        description="¿Estás seguro que deseas eliminar esta propuesta? Esta acción no se puede deshacer."
        onConfirm={() => selectedPropuesta && handleDelete(selectedPropuesta.id)}
        variant="destructive"
        confirmText="Eliminar"
      />
    </div>
  );
}
