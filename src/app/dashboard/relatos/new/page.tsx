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

const relatoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  ocupacion: z.string().min(1, "La ocupación es obligatoria"),
  testimonio: z.string().min(1, "El testimonio es obligatorio"),
  imagenUrl: z.string().optional(),
});

type RelatoFormValues = z.infer<typeof relatoSchema>;

export default function NewRelatoPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const defaultValues: RelatoFormValues = {
    nombre: "",
    ocupacion: "",
    testimonio: "",
    imagenUrl: "",
  };

  const onSubmit = async (data: RelatoFormValues) => {
    try {
      setIsPending(true);
      const response = await fetch("/api/relatos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear el relato");
      }

      toast.success("Relato creado correctamente");
      router.push("/dashboard/relatos");
      router.refresh();
    } catch (error) {
      console.error("Error creating relato:", error);
      toast.error("Error al crear el relato");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Nuevo Relato</h2>
          <p className="text-muted-foreground">
            Agregar un nuevo relato o testimonio
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
        description="Ingresa la información del relato o testimonio"
        schema={relatoSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        disabled={isPending}
        submitButtonLabel="Crear Relato"
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
                <Input placeholder="URL de la imagen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormWrapper>
    </div>
  );
}
