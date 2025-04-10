"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { FormWrapper } from "@/components/form-wrapper";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface EventoEditPageProps {
  params: {
    id: string;
  };
}

const eventoSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  ubicacion: z.string().min(1, "La ubicación es obligatoria"),
  horaInicio: z.string().optional(),
  horaFin: z.string().optional()
});

type EventoFormValues = z.infer<typeof eventoSchema>;

export default function EditEventoPage({ params }: EventoEditPageProps) {
  const router = useRouter();
  const [evento, setEvento] = useState<EventoFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);

        // Simulación de carga de datos
        // En un caso real, aquí se haría una petición a tu API de Express
        // const response = await fetch(`tu-api-express/eventos/${params.id}`);
        // const data = await response.json();

        // Datos simulados para la demo
        await new Promise(resolve => setTimeout(resolve, 500));
        const eventoDemo = {
          titulo: "Evento de Prueba",
          fecha: new Date().toISOString().split('T')[0],
          ubicacion: "Centro de Convenciones",
          horaInicio: "10:00",
          horaFin: "12:00"
        };

        setEvento(eventoDemo);
      } catch (error) {
        console.error("Error fetching evento:", error);
        toast.error("Error al cargar el evento");
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [params.id]);

  const onSubmit = async (data: EventoFormValues) => {
    try {
      setIsPending(true);

      // Aquí se conectaría con tu API de Express
      // const response = await fetch(`tu-api-express/eventos/${params.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data)
      // });

      // Simulamos un proceso exitoso
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Evento actualizado correctamente");
      router.push("/dashboard/eventos");
      router.refresh();
    } catch (error) {
      console.error("Error updating evento:", error);
      toast.error("Error al actualizar el evento");
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

  if (!evento) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Evento no encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Editar Evento</h2>
          <p className="text-muted-foreground">
            Actualizar la información del evento
          </p>
        </div>
        <Link href="/dashboard/eventos">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
      </div>

      <FormWrapper
        title="Datos del Evento"
        description="Actualiza la información del evento"
        schema={eventoSchema}
        defaultValues={evento}
        onSubmit={onSubmit}
        disabled={isPending}
        submitButtonLabel="Actualizar Evento"
        onCancel={() => router.push("/dashboard/eventos")}
      >
        <FormField
          name="titulo"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título del evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="fecha"
          render={({ field, formState }) => (
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
          name="ubicacion"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input placeholder="Ubicación del evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="horaInicio"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Hora de Inicio</FormLabel>
                <FormControl>
                  <Input type="time" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="horaFin"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Hora de Fin</FormLabel>
                <FormControl>
                  <Input type="time" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </FormWrapper>
    </div>
  );
}
