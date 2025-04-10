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
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Define the SeccionBiografia interface
interface SeccionBiografia {
  id: number;
  titulo: string;
  descripcion: string | null;
  orden: number;
  historias: HistoriaBio[];
}

interface HistoriaBio {
  id: number;
  titulo: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  descripcion: z.string().optional(),
  orden: z.number().min(1, "El orden debe ser un número mayor que 0"),
});

type FormValues = z.infer<typeof formSchema>;

export default function BiografiaPage() {
  const { toast } = useToast();
  const [secciones, setSecciones] = useState<SeccionBiografia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedSeccion, setSelectedSeccion] = useState<SeccionBiografia | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      orden: 1,
    },
  });

  // Fetch biography sections on component mount
  useEffect(() => {
    const fetchSecciones = async () => {
      try {
        // El cliente API añadirá automáticamente '/api' al principio
        const response = await apiClient.get<SeccionBiografia[]>('/biografia/secciones');
        if (response.data) {
          setSecciones(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar las secciones de biografía",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar las secciones de biografía",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSecciones();
  }, [toast]);

  // Open form modal for creating a new section
  const handleCreateNew = () => {
    setSelectedSeccion(null);

    // Calculate next order number
    const maxOrden = secciones.length > 0
      ? Math.max(...secciones.map(s => s.orden))
      : 0;

    form.reset({
      titulo: "",
      descripcion: "",
      orden: maxOrden + 1,
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a section
  const handleEdit = (seccion: SeccionBiografia) => {
    setSelectedSeccion(seccion);
    form.reset({
      titulo: seccion.titulo,
      descripcion: seccion.descripcion || "",
      orden: seccion.orden,
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a section
  const handleDelete = (seccion: SeccionBiografia) => {
    setSelectedSeccion(seccion);
    setIsDeleteModalOpen(true);
  };

  // Handle form submission for creating or updating a section
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedSeccion) {
        // Update existing section
        const response = await apiClient.put<SeccionBiografia>(
          `/biografia/secciones/${selectedSeccion.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Sección actualizada correctamente",
          });
          setSecciones(
            secciones.map((s) =>
              s.id === selectedSeccion.id ? response.data! : s
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar la sección",
            variant: "destructive",
          });
        }
      } else {
        // Create new section
        const response = await apiClient.post<SeccionBiografia>('/biografia/secciones', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Sección creada correctamente",
          });
          setSecciones([...secciones, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear la sección",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar la sección",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle section deletion
  const confirmDelete = async () => {
    if (!selectedSeccion) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/biografia/secciones/${selectedSeccion.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Sección eliminada correctamente",
        });
        setSecciones(secciones.filter(s => s.id !== selectedSeccion.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar la sección",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar la sección",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Define table columns
  const columns: ColumnDef<SeccionBiografia>[] = [
    {
      accessorKey: "orden",
      header: "Orden",
    },
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
      cell: ({ row }) => {
        const descripcion = row.original.descripcion;
        return descripcion && descripcion.length > 50
          ? `${descripcion.substring(0, 50)}...`
          : (descripcion || "-");
      },
    },
    {
      accessorKey: "historias",
      header: "Historias",
      cell: ({ row }) => {
        const historias = row.original.historias;
        return historias?.length || 0;
      }
    },
    {
      id: "acciones",
      header: "Ver Historias",
      cell: ({ row }) => {
        return (
          <Link
            href={`/dashboard/biografia/${row.original.id}`}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <span className="mr-1">Ver historias</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        );
      },
    },
  ];

  // Add action buttons to columns
  const columnsWithActions = generateColumns<SeccionBiografia>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando secciones de biografía...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Secciones de Biografía</h1>
        <p className="text-muted-foreground">
          Gestiona las secciones principales de la biografía y sus historias.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Secciones</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={secciones}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedSeccion ? "Editar Sección" : "Crear Nueva Sección"}
        description="Complete la información de la sección biográfica."
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
                    <Input placeholder="Ej: Infancia, Vida Política, etc." {...field} />
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
                  <FormLabel>Descripción (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción introductoria de la sección"
                      rows={3}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orden"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orden</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
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
        description={`¿Está seguro que desea eliminar la sección "${selectedSeccion?.titulo}"? Esta acción eliminará todas las historias asociadas y no se puede deshacer.`}
      />
    </div>
  );
}
