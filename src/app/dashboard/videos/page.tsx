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
import { Film, Image } from "lucide-react";

// Define the Video interface
interface Video {
  id: number;
  titulo: string;
  youtubeUrl: string;
  thumbnail: string | null;
  fecha: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  youtubeUrl: z.string().url("Debe ser una URL válida de YouTube"),
  thumbnail: z.string().nullable().optional(),
  fecha: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function VideosPage() {
  const { toast } = useToast();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      youtubeUrl: "",
      thumbnail: "",
      fecha: new Date().toISOString().split("T")[0],
    },
  });

  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await apiClient.get<Video[]>('/videos');
        if (response.data) {
          setVideos(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar los videos",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar los videos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [toast]);

  // Open form modal for creating a new video
  const handleCreateNew = () => {
    setSelectedVideo(null);
    form.reset({
      titulo: "",
      youtubeUrl: "",
      thumbnail: "",
      fecha: new Date().toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a video
  const handleEdit = (video: Video) => {
    setSelectedVideo(video);
    form.reset({
      titulo: video.titulo,
      youtubeUrl: video.youtubeUrl,
      thumbnail: video.thumbnail || "",
      fecha: new Date(video.fecha).toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a video
  const handleDelete = (video: Video) => {
    setSelectedVideo(video);
    setIsDeleteModalOpen(true);
  };

  // Handle thumbnail upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const response = await uploadFile(file);
      if (response.data?.url) {
        form.setValue('thumbnail', response.data.url);
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

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  // Handle form submission for creating or updating a video
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedVideo) {
        // Update existing video
        const response = await apiClient.put<Video>(
          `/videos/${selectedVideo.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Video actualizado correctamente",
          });
          setVideos(
            videos.map((v) =>
              v.id === selectedVideo.id ? response.data! : v
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar el video",
            variant: "destructive",
          });
        }
      } else {
        // Create new video
        const response = await apiClient.post<Video>('/videos', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Video creado correctamente",
          });
          setVideos([...videos, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear el video",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar el video",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle video deletion
  const confirmDelete = async () => {
    if (!selectedVideo) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/videos/${selectedVideo.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Video eliminado correctamente",
        });
        setVideos(videos.filter(v => v.id !== selectedVideo.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar el video",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar el video",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Define table columns
  const columns: ColumnDef<Video>[] = [
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: ({ row }) => formatDate(row.original.fecha),
    },
    {
      accessorKey: "thumbnail",
      header: "Miniatura",
      cell: ({ row }) => {
        const thumbnail = row.original.thumbnail;
        return (
          <div className="relative h-12 w-20">
            {thumbnail ? (
              <img
                src={thumbnail}
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
      accessorKey: "youtubeUrl",
      header: "YouTube",
      cell: ({ row }) => {
        const youtubeUrl = row.original.youtubeUrl;
        return (
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <Film className="mr-1 h-4 w-4" />
            <span>Ver en YouTube</span>
          </a>
        );
      },
    },
  ];

  // Add action buttons to columns
  const columnsWithActions = generateColumns<Video>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
        <p className="text-muted-foreground">
          Gestiona los videos y contenido multimedia de la campaña.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={videos}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedVideo ? "Editar Video" : "Crear Nuevo Video"}
        description="Complete la información del video."
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
                    <Input placeholder="Ingrese el título del video" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de YouTube</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: https://www.youtube.com/watch?v=..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {field.value && (
                    <div className="mt-2 border rounded-md overflow-hidden aspect-video">
                      <iframe
                        src={getYouTubeEmbedUrl(field.value)}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miniatura (Opcional)</FormLabel>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="URL de la miniatura"
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
                    <p className="text-xs text-muted-foreground">
                      Si no se proporciona una miniatura, se utilizará la miniatura por defecto de YouTube.
                    </p>
                  </div>
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
        description={`¿Está seguro que desea eliminar el video "${selectedVideo?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
