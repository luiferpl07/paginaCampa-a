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

interface PropuestaEditPageProps {
  params: {
    id: string;
  };
}

const propuestaSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  iconoNombre: z.string().min(1, "El nombre del icono es obligatorio"),
});

type PropuestaFormValues = z.infer<typeof propuestaSchema>;

export default function EditPropuestaPage({ params }: PropuestaEditPageProps) {
  const router = useRouter();
  const [propuesta, setPropuesta] = useState<PropuestaFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchPropuesta = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/propuestas/${params.id}`);

        if (!response.ok) {
          if (response.status === 404) {
            toast.error("Propuesta no encontrada");
            router.push("/dashboard/propuestas");
            return;
          }
          throw new Error("Error al cargar la propuesta");
        }

        const data = await response.json();
        setPropuesta(data);
      } catch (error) {
        console.error("Error fetching propuesta:", error);
        toast.error("Error al cargar la propuesta");
      } finally {
        setLoading(false);
      }
    };

    fetchPropuesta();
  }, [params.id, router]);

  const onSubmit = async (data: PropuestaFormValues) => {
    try {
      setIsPending(true);
      const response = await fetch(`/api/propuestas/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la propuesta");
      }

      toast.success("Propuesta actualizada correctamente");
      router.push("/dashboard/propuestas");
      router.refresh();
    } catch (error) {
      console.error("Error updating propuesta:", error);
      toast.error("Error al actualizar la propuesta");
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

  if (!propuesta) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Propuesta no encontrada</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Editar Propuesta</h2>
          <p className="text-muted-foreground">
            Actualizar la información de la propuesta
          </p>
        </div>
        <Link href="/dashboard/propuestas">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
      </div>

      <FormWrapper
        title="Datos de la Propuesta"
        description="Actualiza la información de la propuesta"
        schema={propuestaSchema}
        defaultValues={propuesta}
        onSubmit={onSubmit}
        disabled={isPending}
        submitButtonLabel="Actualizar Propuesta"
        onCancel={() => router.push("/dashboard/propuestas")}
      >
        <FormField
          name="titulo"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título de la propuesta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="descripcion"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción detallada de la propuesta"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="iconoNombre"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Nombre del Icono</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del icono a utilizar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormWrapper>
    </div>
  );
}
