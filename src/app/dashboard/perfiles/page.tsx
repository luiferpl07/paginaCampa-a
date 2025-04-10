"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { generateColumns, formatDate } from "@/components/data-table/columns";
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

// Define the Perfil interface
export interface Perfil {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  subtitulo: z.string().min(2, "El subtítulo debe tener al menos 2 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  fechaInicio: z.string(),
  fechaFin: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PerfilesPage() {
  const { toast } = useToast();
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedPerfil, setSelectedPerfil] = useState<Perfil | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      subtitulo: "",
      descripcion: "",
      fechaInicio: new Date().toISOString().split("T")[0],
      fechaFin: new Date().toISOString().split("T")[0],
    },
  });

  // Fetch perfiles on component mount
  useEffect(() => {
    const fetchPerfiles = async () => {
      try {
        const response = await apiClient.get<Perfil[]>('/perfiles');
        if (response.data) {
          setPerfiles(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar los perfiles",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar los perfiles",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerfiles();
  }, [toast]);

  // Open form modal for creating a new perfil
  const handleCreateNew = () => {
    setSelectedPerfil(null);
    form.reset({
      titulo: "",
      subtitulo: "",
      descripcion: "",
      fechaInicio: new Date().toISOString().split("T")[0],
      fechaFin: new Date().toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a perfil
  const handleEdit = (perfil: Perfil) => {
    setSelectedPerfil(perfil);
    form.reset({
      titulo: perfil.titulo,
      subtitulo: perfil.subtitulo,
      descripcion: perfil.descripcion,
      fechaInicio: new Date(perfil.fechaInicio).toISOString().split("T")[0],
      fechaFin: new Date(perfil.fechaFin).toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a perfil
  const handleDelete = (perfil: Perfil) => {
    setSelectedPerfil(perfil);
    setIsDeleteModalOpen(true);
  };

  // Handle form submission for creating or updating a perfil
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedPerfil) {
        // Update existing perfil
        const response = await apiClient.put<Perfil>(`/perfiles/${selectedPerfil.id}`, data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Perfil actualizado correctamente",
          });
          setPerfiles(perfiles.map(p => p.id === selectedPerfil.id ? response.data! : p));
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar el perfil",
            variant: "destructive",
          });
        }
      } else {
        // Create new perfil
        const response = await apiClient.post<Perfil>('/perfiles', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Perfil creado correctamente",
          });
          setPerfiles([...perfiles, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear el perfil",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar el perfil",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle perfil deletion
  const confirmDelete = async () => {
    if (!selectedPerfil) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/perfiles/${selectedPerfil.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Perfil eliminado correctamente",
        });
        setPerfiles(perfiles.filter(p => p.id !== selectedPerfil.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar el perfil",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar el perfil",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Define table columns
  const columns: ColumnDef<Perfil>[] = [
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "subtitulo",
      header: "Subtítulo",
    },
    {
      accessorKey: "fechaInicio",
      header: "Fecha Inicio",
      cell: ({ row }) => formatDate(row.original.fechaInicio),
    },
    {
      accessorKey: "fechaFin",
      header: "Fecha Fin",
      cell: ({ row }) => formatDate(row.original.fechaFin),
    },
  ];

  // Add action buttons to columns
  const columnsWithActions = generateColumns<Perfil>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando perfiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Perfiles</h1>
        <p className="text-muted-foreground">
          Gestiona la información de perfiles para la campaña.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Perfiles</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={perfiles}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedPerfil ? "Editar Perfil" : "Crear Nuevo Perfil"}
        description="Complete la información del perfil para la campaña."
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
              name="subtitulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtítulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el subtítulo" {...field} />
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fechaInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fechaFin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Fin</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
        description={`¿Está seguro que desea eliminar el perfil "${selectedPerfil?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
