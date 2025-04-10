"use client";

import { useState } from "react";
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

const propuestaSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  iconoNombre: z.string().min(1, "El nombre del icono es obligatorio"),
});

type PropuestaFormValues = z.infer<typeof propuestaSchema>;

export default function NewPropuestaPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const defaultValues: PropuestaFormValues = {
    titulo: "",
    descripcion: "",
    iconoNombre: "",
  };

  const onSubmit = async (data: PropuestaFormValues) => {
    try {
      setIsPending(true);
      const response = await fetch("/api/propuestas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear la propuesta");
      }

      toast.success("Propuesta creada correctamente");
      router.push("/dashboard/propuestas");
      router.refresh();
    } catch (error) {
      console.error("Error creating propuesta:", error);
      toast.error("Error al crear la propuesta");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Nueva Propuesta</h2>
          <p className="text-muted-foreground">
            Agregar una nueva propuesta
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
        description="Ingresa la información de la propuesta"
        schema={propuestaSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        disabled={isPending}
        submitButtonLabel="Crear Propuesta"
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
