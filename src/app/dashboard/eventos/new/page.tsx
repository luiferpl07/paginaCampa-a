"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { FormWrapper } from "@/components/form-wrapper";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const eventoSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  ubicacion: z.string().min(1, "La ubicación es obligatoria"),
  horaInicio: z.string().optional(),
  horaFin: z.string().optional()
});

type EventoFormValues = z.infer<typeof eventoSchema>;

export default function NewEventoPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  // Obtener la fecha actual en formato YYYY-MM-DD para el valor por defecto
  const today = new Date().toISOString().split('T')[0];

  const defaultValues: EventoFormValues = {
    titulo: "",
    fecha: today,
    ubicacion: "",
    horaInicio: "",
    horaFin: ""
  };

  const onSubmit = async (data: EventoFormValues) => {
    try {
      setIsPending(true);

     
      // const response = await fetch("tu-api-express/eventos", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data)
      // });

      // Simulamos un proceso exitoso
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Evento creado correctamente");
      router.push("/dashboard/eventos");
      router.refresh();
    } catch (error) {
      console.error("Error creating evento:", error);
      toast.error("Error al crear el evento");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Nuevo Evento</h2>
          <p className="text-muted-foreground">
            Agregar un nuevo evento o actividad
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
        description="Ingresa la información del evento"
        schema={eventoSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        disabled={isPending}
        submitButtonLabel="Crear Evento"
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
                  <Input type="time" {...field} />
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
                  <Input type="time" {...field} />
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
