"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { FormWrapper } from "@/components/form-wrapper";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface RelatoEditPageProps {
  params: {
    id: string;
  };
}

const relatoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  ocupacion: z.string().min(1, "La ocupación es obligatoria"),
  testimonio: z.string().min(1, "El testimonio es obligatorio"),
  imagenUrl: z.string().optional(),
});

type RelatoFormValues = z.infer<typeof relatoSchema>;

export default function EditRelatoPage({ params }: RelatoEditPageProps) {
  const router = useRouter();
  const [relato, setRelato] = useState<RelatoFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchRelato = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/relatos/${params.id}`);

        if (!response.ok) {
          if (response.status === 404) {
            toast.error("Relato no encontrado");
            router.push("/dashboard/relatos");
            return;
          }
          throw new Error("Error al cargar el relato");
        }

        const data = await response.json();
        setRelato(data);
      } catch (error) {
        console.error("Error fetching relato:", error);
        toast.error("Error al cargar el relato");
      } finally {
        setLoading(false);
      }
    };

    fetchRelato();
  }, [params.id, router]);

  const onSubmit = async (data: RelatoFormValues) => {
    try {
      setIsPending(true);
      const response = await fetch(`/api/relatos/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el relato");
      }

      toast.success("Relato actualizado correctamente");
      router.push("/dashboard/relatos");
      router.refresh();
    } catch (error) {
      console.error("Error updating relato:", error);
      toast.error("Error al actualizar el relato");
    } finally {
      setIsPending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!relato) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Relato no encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Editar Relato</h2>
          <p className="text-muted-foreground">
            Actualizar la información del relato
          </p>
        </div>
        <Link href="/dashboard/relatos">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
      </div>

      <FormWrapper
        title="Datos del Relato"
        description="Actualiza la información del relato o testimonio"
        schema={relatoSchema}
        defaultValues={relato}
        onSubmit={onSubmit}
        disabled={isPending}
        submitButtonLabel="Actualizar Relato"
        onCancel={() => router.push("/dashboard/relatos")}
      >
        <FormField
          name="nombre"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la persona" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="ocupacion"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Ocupación</FormLabel>
              <FormControl>
                <Input placeholder="Ocupación o profesión" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="testimonio"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Testimonio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Testimonio completo"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="imagenUrl"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>URL de la imagen (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="URL de la imagen" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormWrapper>
    </div>
  );
}
