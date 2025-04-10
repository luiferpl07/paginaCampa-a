"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { generateColumns } from "@/components/data-table/columns";
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
import { Image } from "lucide-react";

// Define the Banner interface
interface Banner {
  id: number;
  titulo: string;
  subtitulo: string;
  imagenUrl: string;
  textoBoton: string;
  enlaceBoton: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  subtitulo: z.string().min(2, "El subtítulo debe tener al menos 2 caracteres"),
  imagenUrl: z.string().min(1, "La imagen es obligatoria"),
  textoBoton: z.string().min(1, "El texto del botón es obligatorio"),
  enlaceBoton: z.string().min(1, "El enlace del botón es obligatorio"),
});

type FormValues = z.infer<typeof formSchema>;

export default function BannersPage() {
  const { toast } = useToast();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      subtitulo: "",
      imagenUrl: "",
      textoBoton: "",
      enlaceBoton: "",
    },
  });

  // Fetch banners on component mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await apiClient.get<Banner[]>('/banners');
        // Guardar la respuesta cruda
        setApiResponse(response);
        
        if (response.data) {
          setBanners(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar los banners",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar los banners",
          variant: "destructive",
        });
        setApiResponse({ error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, [toast]);

  // Open form modal for creating a new banner
  const handleCreateNew = () => {
    setSelectedBanner(null);
    form.reset({
      titulo: "",
      subtitulo: "",
      imagenUrl: "",
      textoBoton: "",
      enlaceBoton: "",
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a banner
  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner);
    form.reset({
      titulo: banner.titulo,
      subtitulo: banner.subtitulo,
      imagenUrl: banner.imagenUrl,
      textoBoton: banner.textoBoton,
      enlaceBoton: banner.enlaceBoton,
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a banner
  const handleDelete = (banner: Banner) => {
    setSelectedBanner(banner);
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
  // Handle form submission for creating or updating a banner
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedBanner) {
        // Update existing banner
        const response = await apiClient.put<Banner>(
          `/banners/${selectedBanner.id}`,
          data
        );
        
        // Check if response.data exists and is a valid Banner object
        if (response.data && typeof response.data === 'object' && 'id' in response.data) {
          const updatedBanner = response.data as Banner;
          toast({
            title: "Éxito",
            description: "Banner actualizado correctamente",
          });
          
          // Now we're sure updatedBanner is a valid Banner object
          setBanners(
            banners.map((b) => b.id === selectedBanner.id ? updatedBanner : b)
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar el banner",
            variant: "destructive",
          });
        }
      } else {
        // Similar changes for creating a new banner...
        const response = await apiClient.post<Banner>('/banners', data);
        if (response.data && typeof response.data === 'object' && 'id' in response.data) {
          const newBanner = response.data as Banner;
          toast({
            title: "Éxito",
            description: "Banner creado correctamente",
          });
          setBanners([...banners, newBanner]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear el banner",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar el banner",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle banner deletion
  const confirmDelete = async () => {
    if (!selectedBanner) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/banners/${selectedBanner.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Banner eliminado correctamente",
        });
        setBanners(banners.filter(b => b.id !== selectedBanner.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar el banner",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar el banner",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Define table columns
  const columns: ColumnDef<Banner>[] = [
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "subtitulo",
      header: "Subtítulo",
      cell: ({ row }) => {
        const subtitulo = row.original.subtitulo;
        return subtitulo.length > 50
          ? `${subtitulo.substring(0, 50)}...`
          : subtitulo;
      },
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
    {
      accessorKey: "textoBoton",
      header: "Texto Botón",
    },
  ];

  // Add action buttons to columns
  const columnsWithActions = generateColumns<Banner>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando banners...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Banners Principales</h1>
        <p className="text-muted-foreground">
          Gestiona los banners principales que aparecen en la página de inicio.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Banners</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={banners}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedBanner ? "Editar Banner" : "Crear Nuevo Banner"}
        description="Complete la información del banner principal."
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
              name="imagenUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input {...field} placeholder="URL de la imagen" readOnly />
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
            <FormField
              control={form.control}
              name="textoBoton"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto del Botón</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Leer más, Ver detalles, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enlaceBoton"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enlace del Botón</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: /propuestas, /eventos, etc." {...field} />
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
        description={`¿Está seguro que desea eliminar el banner "${selectedBanner?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
