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

interface Relato {
  id: number;
  nombre: string;
  ocupacion: string;
  testimonio: string;
  imagenUrl: string | null;
}

export default function RelatosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [relatos, setRelatos] = useState<Relato[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRelato, setSelectedRelato] = useState<Relato | null>(null);

  const loadRelatos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/relatos");
      if (!response.ok) {
        throw new Error("Error fetching relatos");
      }
      const data = await response.json();
      setRelatos(data);
    } catch (error) {
      console.error("Error loading relatos:", error);
      toast.error("Error al cargar los relatos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/relatos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting relato");
      }

      toast.success("Relato eliminado correctamente");
      loadRelatos();
    } catch (error) {
      console.error("Error deleting relato:", error);
      toast.error("Error al eliminar el relato");
    }
  };

  useEffect(() => {
    loadRelatos();
  }, []);

  const columns: ColumnDef<Relato>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "ocupacion",
      header: "Ocupación",
    },
    {
      accessorKey: "testimonio",
      header: "Testimonio",
      cell: ({ row }) => {
        const texto = row.original.testimonio;
        return <span>{texto.length > 50 ? texto.substring(0, 50) + "..." : texto}</span>;
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const relato = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/relatos/${relato.id}/edit`}>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setSelectedRelato(relato);
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
          <h2 className="text-3xl font-bold tracking-tight">Relatos</h2>
          <p className="text-muted-foreground">
            Administra los relatos y testimonios
          </p>
        </div>
        <Link href="/dashboard/relatos/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Relato
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={relatos}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Eliminar Relato"
        description="¿Estás seguro que deseas eliminar este relato? Esta acción no se puede deshacer."
        onConfirm={() => selectedRelato && handleDelete(selectedRelato.id)}
        variant="destructive"
        confirmText="Eliminar"
      />
    </div>
  );
}
