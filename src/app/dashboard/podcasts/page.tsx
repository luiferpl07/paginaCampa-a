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
import { Mic } from "lucide-react";

// Define the Podcast interface
interface Podcast {
  id: number;
  titulo: string;
  spotifyUrl: string;
  fecha: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  spotifyUrl: z.string().url("Debe ser una URL válida de Spotify"),
  fecha: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PodcastsPage() {
  const { toast } = useToast();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      spotifyUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    },
  });

  // Fetch podcasts on component mount
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await apiClient.get<Podcast[]>('/podcasts');
        if (response.data) {
          setPodcasts(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar los podcasts",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar los podcasts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, [toast]);

  // Open form modal for creating a new podcast
  const handleCreateNew = () => {
    setSelectedPodcast(null);
    form.reset({
      titulo: "",
      spotifyUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a podcast
  const handleEdit = (podcast: Podcast) => {
    setSelectedPodcast(podcast);
    form.reset({
      titulo: podcast.titulo,
      spotifyUrl: podcast.spotifyUrl,
      fecha: new Date(podcast.fecha).toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a podcast
  const handleDelete = (podcast: Podcast) => {
    setSelectedPodcast(podcast);
    setIsDeleteModalOpen(true);
  };

  // Handle form submission for creating or updating a podcast
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedPodcast) {
        // Update existing podcast
        const response = await apiClient.put<Podcast>(
          `/podcasts/${selectedPodcast.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Podcast actualizado correctamente",
          });
          setPodcasts(
            podcasts.map((p) =>
              p.id === selectedPodcast.id ? response.data! : p
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar el podcast",
            variant: "destructive",
          });
        }
      } else {
        // Create new podcast
        const response = await apiClient.post<Podcast>('/podcasts', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Podcast creado correctamente",
          });
          setPodcasts([...podcasts, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear el podcast",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar el podcast",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle podcast deletion
  const confirmDelete = async () => {
    if (!selectedPodcast) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/podcasts/${selectedPodcast.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Podcast eliminado correctamente",
        });
        setPodcasts(podcasts.filter(p => p.id !== selectedPodcast.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar el podcast",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar el podcast",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Function to extract Spotify ID from URL
  const getSpotifyEmbedUrl = (spotifyUrl: string): string => {
    try {
      // Extract the Spotify ID from various possible Spotify URLs
      let spotifyId = spotifyUrl;

      if (spotifyUrl.includes('spotify.com')) {
        // Handle different Spotify URL formats
        if (spotifyUrl.includes('/episode/')) {
          spotifyId = spotifyUrl.split('/episode/')[1].split('?')[0];
          return `https://open.spotify.com/embed/episode/${spotifyId}`;
        } else if (spotifyUrl.includes('/show/')) {
          spotifyId = spotifyUrl.split('/show/')[1].split('?')[0];
          return `https://open.spotify.com/embed/show/${spotifyId}`;
        }
      }

      return spotifyUrl; // Return original if not recognized
    } catch (error) {
      return spotifyUrl; // Return original on error
    }
  };

  // Define table columns
  const columns: ColumnDef<Podcast>[] = [
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
      accessorKey: "spotifyUrl",
      header: "Vista previa",
      cell: ({ row }) => {
        const spotifyUrl = row.original.spotifyUrl;
        return (
          <div className="flex items-center">
            {spotifyUrl ? (
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-800"
              >
                <Mic className="mr-1 h-4 w-4" />
                <span>Ver en Spotify</span>
              </a>
            ) : (
              <span className="text-gray-400">Sin enlace</span>
            )}
          </div>
        );
      },
    },
  ];

  // Add action buttons to columns
  const columnsWithActions = generateColumns<Podcast>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando podcasts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Podcasts</h1>
        <p className="text-muted-foreground">
          Gestiona los episodios de podcast relacionados con la campaña.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Podcasts</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={podcasts}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedPodcast ? "Editar Podcast" : "Crear Nuevo Podcast"}
        description="Complete la información del episodio de podcast."
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
                    <Input placeholder="Ingrese el título del podcast" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="spotifyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Spotify</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: https://open.spotify.com/episode/..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {field.value && (
                    <div className="mt-2 border rounded-md overflow-hidden h-32">
                      <iframe
                        src={getSpotifyEmbedUrl(field.value)}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="encrypted-media"
                      ></iframe>
                    </div>
                  )}
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
        description={`¿Está seguro que desea eliminar el podcast "${selectedPodcast?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
