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
import { ChevronLeft, Upload } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaWhatsapp, FaX } from 'react-icons/fa6';

const miembroSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  cargo: z.string().min(1, "El cargo es obligatorio"),
  area: z.string().optional(),
  fotoUrl: z.string().optional(),
  facebook: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  instagram: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  x: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  tiktok: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  youtube: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  whatsapp: z.string().optional(),
  orden: z.number().int().positive().optional().or(z.literal("")),
});

type MiembroFormValues = z.infer<typeof miembroSchema>;

export default function NewMiembroPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");

  const defaultValues: MiembroFormValues = {
    nombre: "",
    cargo: "",
    area: "",
    fotoUrl: "",
    facebook: "",
    instagram: "",
    x: "",
    tiktok: "",
    youtube: "",
    whatsapp: "",
    orden: "",
  };

  const onSubmit = async (data: MiembroFormValues) => {
    try {
      setIsPending(true);

      // Simulación de guardado de datos
      await new Promise(resolve => setTimeout(resolve, 1000));

      // En un escenario real, aquí se conectaría con tu API de Express

      toast.success("Miembro creado correctamente");
      router.push("/dashboard/miembros");
      router.refresh();
    } catch (error) {
      console.error("Error creating miembro:", error);
      toast.error("Error al crear el miembro");
    } finally {
      setIsPending(false);
    }
  };

  // Simulación de carga de imagen
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold tracking-tight">Nuevo Miembro</h2>
          <p className="text-muted-foreground">
            Agregar un nuevo miembro al equipo de campaña
          </p>
        </div>
        <Link href="/dashboard/miembros">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
      </div>

      <FormWrapper
        title="Datos del Miembro"
        description="Ingresa la información del miembro del equipo"
        schema={miembroSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        disabled={isPending}
        submitButtonLabel="Crear Miembro"
        onCancel={() => router.push("/dashboard/miembros")}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Personal</h3>

            <FormField
              name="nombre"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre y apellidos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="cargo"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder="Cargo en la campaña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="area"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Área</FormLabel>
                  <FormControl>
                    <Input placeholder="Área o departamento (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="orden"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Orden de aparición</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Orden (opcional)"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : parseInt(value));
                      }}
                      value={field.value === "" ? "" : field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    Número para controlar el orden de aparición en la web
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="fotoUrl"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Foto</FormLabel>
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
                            className="max-w-[100px] h-auto rounded-md border"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Sube una foto del miembro del equipo (opcional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium">Redes Sociales</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="facebook"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FaFacebook className="h-4 w-4 text-blue-600" />
                      Facebook
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://facebook.com/usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="instagram"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FaInstagram className="h-4 w-4 text-pink-600" />
                      Instagram
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://instagram.com/usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="x"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FaX className="h-4 w-4" />
                      X (Twitter)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://x.com/usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="tiktok"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FaTiktok className="h-4 w-4" />
                      TikTok
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://tiktok.com/@usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="youtube"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FaYoutube className="h-4 w-4 text-red-600" />
                      YouTube
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/@usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="whatsapp"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FaWhatsapp className="h-4 w-4 text-green-600" />
                      WhatsApp
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="+573001234567" {...field} />
                    </FormControl>
                    <FormDescription>
                      Formato internacional: +57XXXXXXXXXX
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
