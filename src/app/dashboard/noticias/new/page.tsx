"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { FormWrapper } from "@/components/form-wrapper";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload } from "lucide-react";

const noticiaSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  resumen: z.string().min(1, "El resumen es obligatorio"),
  contenido: z.string().min(1, "El contenido es obligatorio"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  imagenUrl: z.string().optional(),
});

type NoticiaFormValues = z.infer<typeof noticiaSchema>;

export default function NewNoticiaPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");

  // Obtener la fecha actual en formato YYYY-MM-DD para el valor por defecto
  const today = new Date().toISOString().split('T')[0];

  const defaultValues: NoticiaFormValues = {
    titulo: "",
    resumen: "",
    contenido: "",
    fecha: today,
    imagenUrl: "",
  };

  const onSubmit = async (data: NoticiaFormValues) => {
    try {
      setIsPending(true);

      // Simular carga
      await new Promise(resolve => setTimeout(resolve, 1000));

      // En un escenario real, aquí se conectaría con tu API de Express

      toast.success("Noticia creada correctamente");
      router.push("/dashboard/noticias");
      router.refresh();
    } catch (error) {
      console.error("Error creating noticia:", error);
      toast.error("Error al crear la noticia");
    } finally {
      setIsPending(false);
    }
  };

  // Función para manejar la imagen seleccionada (simulación de subida)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name);

    // Crear una vista previa de la imagen
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // En un escenario real, aquí se subiría la imagen a tu servidor
    // y luego se actualizaría el campo imagenUrl con la URL retornada
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Nueva Noticia</h2>
          <p className="text-muted-foreground">
            Agregar una nueva noticia o comunicado
          </p>
        </div>
        <Link href="/dashboard/noticias">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
      </div>

      <FormWrapper
        title="Datos de la Noticia"
        description="Ingresa la información de la noticia"
        schema={noticiaSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        disabled={isPending}
        submitButtonLabel="Crear Noticia"
        onCancel={() => router.push("/dashboard/noticias")}
      >
        <FormField
          name="titulo"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título de la noticia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="resumen"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Resumen</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción breve de la noticia"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Un resumen corto que aparecerá en la vista previa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="contenido"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Contenido</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Contenido completo de la noticia"
                  rows={8}
                  {...field}
                />
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
          name="imagenUrl"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex h-10 cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Seleccionar imagen
                    </label>
                    {imageName && (
                      <span className="text-sm text-gray-500 truncate max-w-[200px]">
                        {imageName}
                      </span>
                    )}
                  </div>

                  {imagePreview && (
                    <div className="mt-2">
                      <p className="text-sm mb-2">Vista previa:</p>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full h-auto max-h-[200px] rounded-md border"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Sube una imagen para la noticia (opcional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormWrapper>
    </div>
  );
}
