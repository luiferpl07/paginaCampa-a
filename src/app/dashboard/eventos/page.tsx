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
import { formatDate } from "@/lib/utils";

interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  ubicacion: string;
  horaInicio: string | null;
  horaFin: string | null;
  createdAt: string;
}

export default function EventosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

  // Aquí normalmente se cargarían los datos desde tu API en Express
  // Para este ejemplo, simularemos algunos datos
  useEffect(() => {
    // Simulación de carga de datos
    const demoEventos = [
      {
        id: 1,
        titulo: "Evento de Lanzamiento",
        fecha: new Date().toISOString(),
        ubicacion: "Centro de Convenciones",
        horaInicio: "10:00",
        horaFin: "12:00",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        titulo: "Reunión Comunitaria",
        fecha: new Date(Date.now() + 86400000).toISOString(), // mañana
        ubicacion: "Plaza Principal",
        horaInicio: "16:00",
        horaFin: "18:00",
        createdAt: new Date().toISOString()
      }
    ];

    setEventos(demoEventos);
    setLoading(false);
  }, []);

  const handleDelete = async (id: number) => {
    // Esta función se conectaría a tu API en Express
    try {
      // Simular eliminación exitosa
      setEventos(eventos.filter(evento => evento.id !== id));
      toast.success("Evento eliminado correctamente");
    } catch (error) {
      console.error("Error deleting evento:", error);
      toast.error("Error al eliminar el evento");
    }
  };

  const columns: ColumnDef<Evento>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: ({ row }) => formatDate(row.original.fecha)
    },
    {
      accessorKey: "ubicacion",
      header: "Ubicación",
    },
    {
      accessorKey: "horaInicio",
      header: "Hora Inicio",
      cell: ({ row }) => row.original.horaInicio || "N/A"
    },
    {
      accessorKey: "horaFin",
      header: "Hora Fin",
      cell: ({ row }) => row.original.horaFin || "N/A"
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const evento = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/eventos/${evento.id}/edit`}>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setSelectedEvento(evento);
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
          <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
          <p className="text-muted-foreground">
            Administra los eventos y actividades
          </p>
        </div>
        <Link href="/dashboard/eventos/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Evento
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={eventos}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Eliminar Evento"
        description="¿Estás seguro que deseas eliminar este evento? Esta acción no se puede deshacer."
        onConfirm={() => selectedEvento && handleDelete(selectedEvento.id)}
        variant="destructive"
        confirmText="Eliminar"
      />
    </div>
  );
}
