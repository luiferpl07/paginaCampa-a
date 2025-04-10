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
import { Button } from "@/components/ui/button";
import { FileImage, FileText } from "lucide-react";

// Define the Revista interface
interface Revista {
  id: number;
  titulo: string;
  edicion: string;
  portadaUrl: string | null;
  archivoUrl: string;
  fecha: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  edicion: z.string().min(1, "La edición es obligatoria"),
  portadaUrl: z.string().nullable().optional(),
  archivoUrl: z.string().min(1, "El archivo es obligatorio"),
  fecha: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RevistasPage() {
  const { toast } = useToast();
  const [revistas, setRevistas] = useState<Revista[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedRevista, setSelectedRevista] = useState<Revista | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadingPortada, setUploadingPortada] = useState(false);
  const [uploadingArchivo, setUploadingArchivo] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      edicion: "",
      portadaUrl: "",
      archivoUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    },
  });

  // Fetch revistas on component mount
  useEffect(() => {
    const fetchRevistas = async () => {
      try {
        const response = await apiClient.get<Revista[]>('/revistas');
        if (response.data) {
          setRevistas(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar las revistas",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar las revistas",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevistas();
  }, [toast]);

  // Open form modal for creating a new revista
  const handleCreateNew = () => {
    setSelectedRevista(null);
    form.reset({
      titulo: "",
      edicion: "",
      portadaUrl: "",
      archivoUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a revista
  const handleEdit = (revista: Revista) => {
    setSelectedRevista(revista);
    form.reset({
      titulo: revista.titulo,
      edicion: revista.edicion,
      portadaUrl: revista.portadaUrl || "",
      archivoUrl: revista.archivoUrl,
      fecha: new Date(revista.fecha).toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a revista
  const handleDelete = (revista: Revista) => {
    setSelectedRevista(revista);
    setIsDeleteModalOpen(true);
  };

  // Handle portada upload
  const handlePortadaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingPortada(true);
    try {
      const response = await uploadFile(file);
      if (response.data?.url) {
        form.setValue('portadaUrl', response.data.url);
        toast({
          title: "Éxito",
          description: "Portada subida correctamente",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo subir la portada",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al subir la portada",
        variant: "destructive",
      });
    } finally {
      setUploadingPortada(false);
    }
  };

  // Handle archivo upload
  const handleArchivoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingArchivo(true);
    try {
      const response = await uploadFile(file);
      if (response.data?.url) {
        form.setValue('archivoUrl', response.data.url);
        toast({
          title: "Éxito",
          description: "Archivo subido correctamente",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo subir el archivo",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al subir el archivo",
        variant: "destructive",
      });
    } finally {
      setUploadingArchivo(false);
    }
  };

  // Handle form submission for creating or updating a revista
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedRevista) {
        // Update existing revista
        const response = await apiClient.put<Revista>(
          `/revistas/${selectedRevista.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Revista actualizada correctamente",
          });
          setRevistas(
            revistas.map((r) =>
              r.id === selectedRevista.id ? response.data! : r
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar la revista",
            variant: "destructive",
          });
        }
      } else {
        // Create new revista
        const response = await apiClient.post<Revista>('/revistas', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Revista creada correctamente",
          });
          setRevistas([...revistas, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear la revista",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar la revista",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle revista deletion
  const confirmDelete = async () => {
    if (!selectedRevista) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/revistas/${selectedRevista.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Revista eliminada correctamente",
        });
        setRevistas(revistas.filter(r => r.id !== selectedRevista.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar la revista",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar la revista",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Extract filename from URL
  const getFileName = (url: string) => {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  // Define table columns
  const columns: ColumnDef<Revista>[] = [
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "edicion",
      header: "Edición",
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: ({ row }) => formatDate(row.original.fecha),
    },
    {
      accessorKey: "portadaUrl",
      header: "Portada",
      cell: ({ row }) => {
        const portadaUrl = row.original.portadaUrl;
        return (
          <div className="relative h-14 w-10">
            {portadaUrl ? (
              <img
                src={portadaUrl}
                alt={row.original.titulo}
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded">
                <FileImage className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "archivoUrl",
      header: "Archivo",
      cell: ({ row }) => {
        const archivoUrl = row.original.archivoUrl;
        return (
          <a
            href={archivoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FileText className="mr-1 h-4 w-4" />
            <span className="truncate max-w-[100px]">{getFileName(archivoUrl)}</span>
          </a>
        );
      },
    },
  ];

  // Add action buttons to columns
  const columnsWithActions = generateColumns<Revista>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando revistas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Revistas</h1>
        <p className="text-muted-foreground">
          Gestiona las revistas y publicaciones periódicas.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Revistas</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={revistas}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedRevista ? "Editar Revista" : "Crear Nueva Revista"}
        description="Complete la información de la revista."
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
                    <Input placeholder="Ingrese el título de la revista" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="edicion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edición</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Volumen 1, Número 3" {...field} />
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
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portadaUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portada (Opcional)</FormLabel>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="URL de la portada"
                        readOnly
                      />
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handlePortadaUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          disabled={uploadingPortada}
                        />
                        <Button type="button" disabled={uploadingPortada}>
                          {uploadingPortada ? "Subiendo..." : "Subir"}
                        </Button>
                      </div>
                    </div>
                    {field.value && (
                      <div className="relative h-40 w-32">
                        <img
                          src={field.value}
                          alt="Vista previa"
                          className="h-full w-full object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="archivoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Archivo PDF</FormLabel>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="URL del archivo PDF"
                        readOnly
                      />
                      <div className="relative">
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={handleArchivoUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          disabled={uploadingArchivo}
                        />
                        <Button type="button" disabled={uploadingArchivo}>
                          {uploadingArchivo ? "Subiendo..." : "Subir"}
                        </Button>
                      </div>
                    </div>
                    {field.value && (
                      <div className="flex items-center text-sm">
                        <FileText className="mr-2 h-4 w-4 text-blue-600" />
                        <span className="text-blue-600">{getFileName(field.value)}</span>
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
        description={`¿Está seguro que desea eliminar la revista "${selectedRevista?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
