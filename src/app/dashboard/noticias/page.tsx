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
import { Image } from "lucide-react";

// Define the Noticia interface
interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  imagenUrl: string | null;
  fecha: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  resumen: z.string().min(10, "El resumen debe tener al menos 10 caracteres"),
  contenido: z.string().min(20, "El contenido debe tener al menos 20 caracteres"),
  imagenUrl: z.string().nullable().optional(),
  fecha: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NoticiasPage() {
  const { toast } = useToast();
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      resumen: "",
      contenido: "",
      imagenUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    },
  });

  // Fetch noticias on component mount
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await apiClient.get<Noticia[]>('/noticias');
        if (response.data) {
          setNoticias(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar las noticias",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar las noticias",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNoticias();
  }, [toast]);

  // Open form modal for creating a new noticia
  const handleCreateNew = () => {
    setSelectedNoticia(null);
    form.reset({
      titulo: "",
      resumen: "",
      contenido: "",
      imagenUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a noticia
  const handleEdit = (noticia: Noticia) => {
    setSelectedNoticia(noticia);
    form.reset({
      titulo: noticia.titulo,
      resumen: noticia.resumen,
      contenido: noticia.contenido,
      imagenUrl: noticia.imagenUrl || "",
      fecha: new Date(noticia.fecha).toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a noticia
  const handleDelete = (noticia: Noticia) => {
    setSelectedNoticia(noticia);
    setIsDeleteModalOpen(true);
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    setUploadingImage(true);
    try {
      // Usamos el nuevo método uploadFile que solo requiere el archivo
      const response = await uploadFile(file);
      
      if (response.data?.url) {
        // Ahora obtenemos la URL de la respuesta en response.data.url
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
  // Handle form submission for creating or updating a noticia
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedNoticia) {
        // Update existing noticia
        const response = await apiClient.put<Noticia>(
          `/noticias/${selectedNoticia.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Noticia actualizada correctamente",
          });
          setNoticias(
            noticias.map((n) =>
              n.id === selectedNoticia.id ? response.data! : n
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar la noticia",
            variant: "destructive",
          });
        }
      } else {
        // Create new noticia
        const response = await apiClient.post<Noticia>('/noticias', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Noticia creada correctamente",
          });
          setNoticias([...noticias, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear la noticia",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar la noticia",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle noticia deletion
  const confirmDelete = async () => {
    if (!selectedNoticia) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/noticias/${selectedNoticia.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Noticia eliminada correctamente",
        });
        setNoticias(noticias.filter(n => n.id !== selectedNoticia.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar la noticia",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar la noticia",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Define table columns
  const columns: ColumnDef<Noticia>[] = [
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "resumen",
      header: "Resumen",
      cell: ({ row }) => {
        const resumen = row.original.resumen;
        return resumen.length > 50
          ? `${resumen.substring(0, 50)}...`
          : resumen;
      },
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: ({ row }) => formatDate(row.original.fecha),
    },
    {
      accessorKey: "imagenUrl",
      header: "Imagen",
      cell: ({ row }) => {
        const imagenUrl = row.original.imagenUrl;
        return (
          <div className="relative h-10 w-20">
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
  const columnsWithActions = generateColumns<Noticia>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando noticias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Noticias</h1>
        <p className="text-muted-foreground">
          Gestiona las noticias y actualizaciones de la campaña.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Noticias</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={noticias}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedNoticia ? "Editar Noticia" : "Crear Nueva Noticia"}
        description="Complete la información de la noticia."
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
                    <Input placeholder="Ingrese el título de la noticia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resumen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumen</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese un breve resumen de la noticia"
                      rows={2}
                      {...field}
                    />
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
                      placeholder="Ingrese el contenido completo de la noticia"
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
              name="imagenUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
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
        description={`¿Está seguro que desea eliminar la noticia "${selectedNoticia?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
