"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { FormWrapper } from "@/components/form-wrapper";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const podcastSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  spotifyUrl: z.string()
    .min(1, "La URL de Spotify es obligatoria")
    .url("Debe ser una URL válida")
    .includes("spotify.com", "Debe ser una URL de Spotify"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
});

type PodcastFormValues = z.infer<typeof podcastSchema>;

export default function NewPodcastPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  // Obtener la fecha actual en formato YYYY-MM-DD para el valor por defecto
  const today = new Date().toISOString().split('T')[0];

  const defaultValues: PodcastFormValues = {
    titulo: "",
    spotifyUrl: "",
    fecha: today,
  };

  const onSubmit = async (data: PodcastFormValues) => {
    try {
      setIsPending(true);

      // Simular un proceso de guardado
      await new Promise(resolve => setTimeout(resolve, 1000));

      // En un escenario real, aquí se haría una petición a tu API de Express

      toast.success("Podcast creado correctamente");
      router.push("/dashboard/podcasts");
      router.refresh();
    } catch (error) {
      console.error("Error creating podcast:", error);
      toast.error("Error al crear el podcast");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Nuevo Podcast</h2>
          <p className="text-muted-foreground">
            Agregar un nuevo episodio de podcast
          </p>
        </div>
        <Link href="/dashboard/podcasts">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
      </div>

      <FormWrapper
        title="Datos del Podcast"
        description="Ingresa la información del episodio de podcast"
        schema={podcastSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        disabled={isPending}
        submitButtonLabel="Crear Podcast"
        onCancel={() => router.push("/dashboard/podcasts")}
      >
        <FormField
          name="titulo"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título del episodio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="spotifyUrl"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>URL de Spotify</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://open.spotify.com/episode/..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Pega la URL completa del episodio en Spotify
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="fecha"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Fecha de Publicación</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormWrapper>
    </div>
  );
}
