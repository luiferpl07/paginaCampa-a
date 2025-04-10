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

// Define the BlogPost interface
interface BlogPost {
  id: number;
  titulo: string;
  contenido: string;
  autor: string;
  imagenUrl: string | null;
  fecha: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  contenido: z.string().min(20, "El contenido debe tener al menos 20 caracteres"),
  autor: z.string().min(2, "El autor debe tener al menos 2 caracteres"),
  imagenUrl: z.string().nullable().optional(),
  fecha: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BlogsPage() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      contenido: "",
      autor: "",
      imagenUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    },
  });

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get<BlogPost[]>('/blogs');
        if (response.data) {
          setBlogs(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar los blogs",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar los blogs",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [toast]);

  // Open form modal for creating a new blog
  const handleCreateNew = () => {
    setSelectedBlog(null);
    form.reset({
      titulo: "",
      contenido: "",
      autor: "",
      imagenUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a blog
  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    form.reset({
      titulo: blog.titulo,
      contenido: blog.contenido,
      autor: blog.autor,
      imagenUrl: blog.imagenUrl || "",
      fecha: new Date(blog.fecha).toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a blog
  const handleDelete = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const response =  await uploadFile(file);
      if (response.data?.url) {
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

  // Handle form submission for creating or updating a blog
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedBlog) {
        // Update existing blog
        const response = await apiClient.put<BlogPost>(
          `/blogs/${selectedBlog.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Blog actualizado correctamente",
          });
          setBlogs(
            blogs.map((b) =>
              b.id === selectedBlog.id ? response.data! : b
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar el blog",
            variant: "destructive",
          });
        }
      } else {
        // Create new blog
        const response = await apiClient.post<BlogPost>('/blogs', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Blog creado correctamente",
          });
          setBlogs([...blogs, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear el blog",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar el blog",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle blog deletion
  const confirmDelete = async () => {
    if (!selectedBlog) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/blogs/${selectedBlog.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Blog eliminado correctamente",
        });
        setBlogs(blogs.filter(b => b.id !== selectedBlog.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar el blog",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar el blog",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Define table columns
  const columns: ColumnDef<BlogPost>[] = [
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
  const columnsWithActions = generateColumns<BlogPost>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
        <p className="text-muted-foreground">
          Gestiona los artículos de blog y publicaciones de la campaña.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={blogs}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedBlog ? "Editar Blog" : "Crear Nuevo Blog"}
        description="Complete la información del artículo de blog."
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
                    <Input placeholder="Ingrese el título del blog" {...field} />
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
              name="contenido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese el contenido del blog"
                      rows={10}
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
        description={`¿Está seguro que desea eliminar el blog "${selectedBlog?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
