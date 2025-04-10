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
import { BookOpen, FileText, Image } from "lucide-react";

// Define the ELibro interface
interface ELibro {
  id: number;
  titulo: string;
  descripcion: string;
  autor: string;
  portadaUrl: string | null;
  archivoUrl: string;
  fecha: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  autor: z.string().min(2, "El autor debe tener al menos 2 caracteres"),
  portadaUrl: z.string().nullable().optional(),
  archivoUrl: z.string().min(1, "El archivo es obligatorio"),
  fecha: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LibrosPage() {
  const { toast } = useToast();
  const [libros, setLibros] = useState<ELibro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedLibro, setSelectedLibro] = useState<ELibro | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadingPortada, setUploadingPortada] = useState(false);
  const [uploadingArchivo, setUploadingArchivo] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      autor: "",
      portadaUrl: "",
      archivoUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    },
  });

  // Fetch libros on component mount
  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await apiClient.get<ELibro[]>('/libros');
        if (response.data) {
          setLibros(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar los e-libros",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar los e-libros",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibros();
  }, [toast]);

  // Open form modal for creating a new libro
  const handleCreateNew = () => {
    setSelectedLibro(null);
    form.reset({
      titulo: "",
      descripcion: "",
      autor: "",
      portadaUrl: "",
      archivoUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a libro
  const handleEdit = (libro: ELibro) => {
    setSelectedLibro(libro);
    form.reset({
      titulo: libro.titulo,
      descripcion: libro.descripcion,
      autor: libro.autor,
      portadaUrl: libro.portadaUrl || "",
      archivoUrl: libro.archivoUrl,
      fecha: new Date(libro.fecha).toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a libro
  const handleDelete = (libro: ELibro) => {
    setSelectedLibro(libro);
    setIsDeleteModalOpen(true);
  };

  // Handle portada upload
  const handlePortadaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingPortada(true);
    try {
      const response =  await uploadFile(file);
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

  // Handle form submission for creating or updating a libro
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedLibro) {
        // Update existing libro
        const response = await apiClient.put<ELibro>(
          `/libros/${selectedLibro.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "E-libro actualizado correctamente",
          });
          setLibros(
            libros.map((l) =>
              l.id === selectedLibro.id ? response.data! : l
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar el e-libro",
            variant: "destructive",
          });
        }
      } else {
        // Create new libro
        const response = await apiClient.post<ELibro>('/libros', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "E-libro creado correctamente",
          });
          setLibros([...libros, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear el e-libro",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar el e-libro",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle libro deletion
  const confirmDelete = async () => {
    if (!selectedLibro) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/libros/${selectedLibro.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "E-libro eliminado correctamente",
        });
        setLibros(libros.filter(l => l.id !== selectedLibro.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar el e-libro",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar el e-libro",
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
  const columns: ColumnDef<ELibro>[] = [
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "autor",
      header: "Autor",
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
          <div className="relative h-12 w-10">
            {portadaUrl ? (
              <img
                src={portadaUrl}
                alt={row.original.titulo}
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded">
                <BookOpen className="h-5 w-5 text-gray-400" />
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
  const columnsWithActions = generateColumns<ELibro>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando e-libros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">E-Libros</h1>
        <p className="text-muted-foreground">
          Gestiona los libros electrónicos disponibles para descarga.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de E-Libros</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={libros}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedLibro ? "Editar E-Libro" : "Crear Nuevo E-Libro"}
        description="Complete la información del libro electrónico."
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
                    <Input placeholder="Ingrese el título del libro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="autor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el nombre del autor" {...field} />
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
                      placeholder="Ingrese una descripción del libro"
                      rows={4}
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
                      <div className="relative h-32 w-24">
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
        description={`¿Está seguro que desea eliminar el e-libro "${selectedLibro?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
