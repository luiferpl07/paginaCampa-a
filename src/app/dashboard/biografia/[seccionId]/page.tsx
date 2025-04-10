"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { generateColumns, formatDate } from "@/components/data-table/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormModal } from "@/components/modals/form-modal";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import apiClient, { uploadFile } from "@/lib/api-client";
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
import { Button } from "@/components/ui/button";
import { Image, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Define the SeccionBiografia interface (parent model)
interface SeccionBiografia {
  id: number;
  titulo: string;
  descripcion: string | null;
}

// Define the HistoriaBio interface
interface HistoriaBio {
  id: number;
  titulo: string;
  contenido: string;
  imagenUrl: string | null;
  fecha: string | null;
  orden: number;
  seccionId: number;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  contenido: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
  imagenUrl: z.string().nullable().optional(),
  fecha: z.string().nullable().optional(),
  orden: z.number().min(1, "El orden debe ser un número mayor que 0"),
  seccionId: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

export default function HistoriasBioPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const seccionId = Number(params.seccionId);
  const [seccion, setSeccion] = useState<SeccionBiografia | null>(null);
  const [historias, setHistorias] = useState<HistoriaBio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedHistoria, setSelectedHistoria] = useState<HistoriaBio | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      contenido: "",
      imagenUrl: "",
      fecha: null,
      orden: 1,
      seccionId: seccionId,
    },
  });

  // Fetch seccion and historias on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch seccion details
        const seccionResponse = await apiClient.get<SeccionBiografia>(`/biografia/secciones/${seccionId}`);
        if (seccionResponse.data) {
          setSeccion(seccionResponse.data);
        } else {
          toast({
            title: "Error",
            description: seccionResponse.error || "No se pudo cargar la sección de biografía",
            variant: "destructive",
          });
          // If section doesn't exist, go back to main page
          return router.push('/dashboard/biografia');
        }

        // Fetch historias for this section
        const historiasResponse = await apiClient.get<HistoriaBio[]>(`/biografia/historias?seccionId=${seccionId}`);
        if (historiasResponse.data) {
          setHistorias(historiasResponse.data);
        } else {
          toast({
            title: "Error",
            description: historiasResponse.error || "No se pudieron cargar las historias",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar los datos",
          variant: "destructive",
        });
        router.push('/dashboard/biografia');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [seccionId, toast, router]);

  // Open form modal for creating a new historia
  const handleCreateNew = () => {
    setSelectedHistoria(null);

    // Calculate next order number
    const maxOrden = historias.length > 0
      ? Math.max(...historias.map(h => h.orden))
      : 0;

    form.reset({
      titulo: "",
      contenido: "",
      imagenUrl: "",
      fecha: "",
      orden: maxOrden + 1,
      seccionId: seccionId,
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a historia
  const handleEdit = (historia: HistoriaBio) => {
    setSelectedHistoria(historia);
    form.reset({
      titulo: historia.titulo,
      contenido: historia.contenido,
      imagenUrl: historia.imagenUrl || "",
      fecha: historia.fecha ? new Date(historia.fecha).toISOString().split("T")[0] : null,
      orden: historia.orden,
      seccionId: historia.seccionId,
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a historia
  const handleDelete = (historia: HistoriaBio) => {
    setSelectedHistoria(historia);
    setIsDeleteModalOpen(true);
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const response =  await uploadFile(file);
      if (response.data) {
        form.setValue('imagenUrl', response.data.url);
        toast({
          title: "Éxito",
          description: "Imagen subida correctamente",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo subir la imagen",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al subir la imagen",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle form submission for creating or updating a historia
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedHistoria) {
        // Update existing historia
        const response = await apiClient.put<HistoriaBio>(
          `/biografia/historias/${selectedHistoria.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Historia actualizada correctamente",
          });
          setHistorias(
            historias.map((h) =>
              h.id === selectedHistoria.id ? response.data! : h
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar la historia",
            variant: "destructive",
          });
        }
      } else {
        // Create new historia
        const response = await apiClient.post<HistoriaBio>('/biografia/historias', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Historia creada correctamente",
          });
          setHistorias([...historias, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear la historia",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar la historia",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle historia deletion
  const confirmDelete = async () => {
    if (!selectedHistoria) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/biografia/historias/${selectedHistoria.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Historia eliminada correctamente",
        });
        setHistorias(historias.filter(h => h.id !== selectedHistoria.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar la historia",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar la historia",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Define table columns
  const columns: ColumnDef<HistoriaBio>[] = [
    {
      accessorKey: "orden",
      header: "Orden",
    },
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "contenido",
      header: "Contenido",
      cell: ({ row }) => {
        const contenido = row.original.contenido;
        return contenido.length > 100
          ? `${contenido.substring(0, 100)}...`
          : contenido;
      },
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: ({ row }) => (row.original.fecha ? formatDate(row.original.fecha) : "-"),
    },
    {
      accessorKey: "imagenUrl",
      header: "Imagen",
      cell: ({ row }) => {
        const imagenUrl = row.original.imagenUrl;
        return (
          <div className="relative h-10 w-16">
            {imagenUrl ? (
              <img
                src={imagenUrl}
                alt={row.original.titulo}
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded">
                <Image className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // Add action buttons to columns
  const columnsWithActions = generateColumns<HistoriaBio>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando historias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/biografia" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Volver a secciones</span>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Historias: {seccion?.titulo}
        </h1>
        <p className="text-muted-foreground">
          Gestiona las historias de la sección "{seccion?.titulo}" de la biografía.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Historias</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={historias}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedHistoria ? "Editar Historia" : "Crear Nueva Historia"}
        description="Complete la información de la historia biográfica."
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
                    <Input placeholder="Ingrese el título de la historia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contenido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese el contenido de la historia"
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha (Opcional)</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value || null)}
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
                  <p className="text-xs text-muted-foreground">
                    Determina el orden de visualización. Números menores aparecen primero.
                  </p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imagenUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen (Opcional)</FormLabel>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="URL de la imagen"
                        readOnly
                      />
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          disabled={uploadingImage}
                        />
                        <Button type="button" disabled={uploadingImage}>
                          {uploadingImage ? "Subiendo..." : "Subir"}
                        </Button>
                      </div>
                    </div>
                    {field.value && (
                      <div className="relative h-32 w-full">
                        <img
                          src={field.value}
                          alt="Vista previa"
                          className="h-full w-auto object-contain rounded"
                        />
                      </div>
                    )}
                  </div>
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
        description={`¿Está seguro que desea eliminar la historia "${selectedHistoria?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
