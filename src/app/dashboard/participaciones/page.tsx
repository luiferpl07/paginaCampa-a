"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { generateColumns } from "@/components/data-table/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormModal } from "@/components/modals/form-modal";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import apiClient from "@/lib/api-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define the Participacion interface
interface Participacion {
  id: number;
  titulo: string;
  descripcion: string;
  iconoNombre: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  iconoNombre: z.string().min(1, "El nombre del icono es obligatorio"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ParticipacionesPage() {
  const { toast } = useToast();
  const [participaciones, setParticipaciones] = useState<Participacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedParticipacion, setSelectedParticipacion] = useState<Participacion | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      iconoNombre: "",
    },
  });

  // Fetch participaciones on component mount
  useEffect(() => {
    const fetchParticipaciones = async () => {
      try {
        const response = await apiClient.get<Participacion[]>('/participaciones');
        if (response.data) {
          setParticipaciones(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar las participaciones",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar las participaciones",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipaciones();
  }, [toast]);

  // Open form modal for creating a new participacion
  const handleCreateNew = () => {
    setSelectedParticipacion(null);
    form.reset({
      titulo: "",
      descripcion: "",
      iconoNombre: "",
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a participacion
  const handleEdit = (participacion: Participacion) => {
    setSelectedParticipacion(participacion);
    form.reset({
      titulo: participacion.titulo,
      descripcion: participacion.descripcion,
      iconoNombre: participacion.iconoNombre,
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a participacion
  const handleDelete = (participacion: Participacion) => {
    setSelectedParticipacion(participacion);
    setIsDeleteModalOpen(true);
  };

  // Handle form submission for creating or updating a participacion
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedParticipacion) {
        // Update existing participacion
        const response = await apiClient.put<Participacion>(
          `/participaciones/${selectedParticipacion.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Participación actualizada correctamente",
          });
          setParticipaciones(
            participaciones.map((p) =>
              p.id === selectedParticipacion.id ? response.data! : p
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar la participación",
            variant: "destructive",
          });
        }
      } else {
        // Create new participacion
        const response = await apiClient.post<Participacion>('/participaciones', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Participación creada correctamente",
          });
          setParticipaciones([...participaciones, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear la participación",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar la participación",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle participacion deletion
  const confirmDelete = async () => {
    if (!selectedParticipacion) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/participaciones/${selectedParticipacion.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Participación eliminada correctamente",
        });
        setParticipaciones(participaciones.filter(p => p.id !== selectedParticipacion.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar la participación",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar la participación",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Define table columns
  const columns: ColumnDef<Participacion>[] = [
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
      cell: ({ row }) => {
        const descripcion = row.original.descripcion;
        return descripcion.length > 100
          ? `${descripcion.substring(0, 100)}...`
          : descripcion;
      },
    },
    {
      accessorKey: "iconoNombre",
      header: "Icono",
    },
  ];

  // Add action buttons to columns
  const columnsWithActions = generateColumns<Participacion>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando participaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Participaciones</h1>
        <p className="text-muted-foreground">
          Gestiona las participaciones y formas de involucrarse en la campaña.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Participaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={participaciones}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedParticipacion ? "Editar Participación" : "Crear Nueva Participación"}
        description="Complete la información de participación en la campaña."
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={form.handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      >
        <Form {...form}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese la descripción"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconoNombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Icono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Hands, Heart, Users, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </FormModal>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Confirmar eliminación"
        description={`¿Está seguro que desea eliminar la participación "${selectedParticipacion?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
