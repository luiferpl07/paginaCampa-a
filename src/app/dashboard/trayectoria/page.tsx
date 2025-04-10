"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { generateColumns, formatDate } from "@/components/data-table/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormModal } from "@/components/modals/form-modal";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import apiClient, { uploadFile } from "@/lib/api-client";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Image } from "lucide-react";

// Define the TrayectoriaPolitica interface
interface TrayectoriaPolitica {
  id: number;
  cargo: string;
  institucion: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string | null;
  imagenUrl: string | null;
  orden: number;
}

// Define the form schema with Zod
const formSchema = z.object({
  cargo: z.string().min(2, "El cargo debe tener al menos 2 caracteres"),
  institucion: z.string().min(2, "La institución debe tener al menos 2 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  fechaInicio: z.string(),
  fechaFin: z.string().nullable().optional(),
  imagenUrl: z.string().nullable().optional(),
  orden: z.number().min(1, "El orden debe ser un número mayor que 0"),
});

type FormValues = z.infer<typeof formSchema>;

export default function TrayectoriaPage() {
  const { toast } = useToast();
  const [trayectorias, setTrayectorias] = useState<TrayectoriaPolitica[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedTrayectoria, setSelectedTrayectoria] = useState<TrayectoriaPolitica | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cargoActual, setCargoActual] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargo: "",
      institucion: "",
      descripcion: "",
      fechaInicio: new Date().toISOString().split("T")[0],
      fechaFin: null,
      imagenUrl: "",
      orden: 1,
    },
  });

  // Fetch trayectorias on component mount
  useEffect(() => {
    const fetchTrayectorias = async () => {
      try {
        const response = await apiClient.get<TrayectoriaPolitica[]>('/trayectoria');
        if (response.data) {
          setTrayectorias(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar las trayectorias",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar las trayectorias",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrayectorias();
  }, [toast]);

  // Toggle cargo actual
  useEffect(() => {
    if (cargoActual) {
      form.setValue('fechaFin', null);
    } else if (form.getValues('fechaFin') === null) {
      form.setValue('fechaFin', new Date().toISOString().split("T")[0]);
    }
  }, [cargoActual, form]);

  // Open form modal for creating a new trayectoria
  const handleCreateNew = () => {
    setSelectedTrayectoria(null);
    setCargoActual(false);

    // Calculate next order number
    const maxOrden = trayectorias.length > 0
      ? Math.max(...trayectorias.map(t => t.orden))
      : 0;

    form.reset({
      cargo: "",
      institucion: "",
      descripcion: "",
      fechaInicio: new Date().toISOString().split("T")[0],
      fechaFin: new Date().toISOString().split("T")[0],
      imagenUrl: "",
      orden: maxOrden + 1,
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a trayectoria
  const handleEdit = (trayectoria: TrayectoriaPolitica) => {
    setSelectedTrayectoria(trayectoria);
    setCargoActual(trayectoria.fechaFin === null);
    form.reset({
      cargo: trayectoria.cargo,
      institucion: trayectoria.institucion,
      descripcion: trayectoria.descripcion,
      fechaInicio: new Date(trayectoria.fechaInicio).toISOString().split("T")[0],
      fechaFin: trayectoria.fechaFin
        ? new Date(trayectoria.fechaFin).toISOString().split("T")[0]
        : null,
      imagenUrl: trayectoria.imagenUrl || "",
      orden: trayectoria.orden,
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a trayectoria
  const handleDelete = (trayectoria: TrayectoriaPolitica) => {
    setSelectedTrayectoria(trayectoria);
    setIsDeleteModalOpen(true);
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const response = await uploadFile(file, '/upload/imagen');
      if (response.data) {
        form.setValue('imagenUrl', response.data);
        toast({
          title: "Éxito",
          description: "Imagen subida correctamente",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo subir la imagen",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al subir la imagen",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle form submission for creating or updating a trayectoria
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedTrayectoria) {
        // Update existing trayectoria
        const response = await apiClient.put<TrayectoriaPolitica>(
          `/trayectoria/${selectedTrayectoria.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Trayectoria actualizada correctamente",
          });
          setTrayectorias(
            trayectorias.map((t) =>
              t.id === selectedTrayectoria.id ? response.data! : t
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar la trayectoria",
            variant: "destructive",
          });
        }
      } else {
        // Create new trayectoria
        const response = await apiClient.post<TrayectoriaPolitica>('/trayectoria', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Trayectoria creada correctamente",
          });
          setTrayectorias([...trayectorias, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear la trayectoria",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar la trayectoria",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle trayectoria deletion
  const confirmDelete = async () => {
    if (!selectedTrayectoria) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/trayectoria/${selectedTrayectoria.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Trayectoria eliminada correctamente",
        });
        setTrayectorias(trayectorias.filter(t => t.id !== selectedTrayectoria.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar la trayectoria",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar la trayectoria",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Format date range for display
  const formatDateRange = (fechaInicio: string, fechaFin: string | null) => {
    const inicio = formatDate(fechaInicio);
    if (!fechaFin) {
      return `${inicio} - Actual`;
    }
    return `${inicio} - ${formatDate(fechaFin)}`;
  };

  // Define table columns
  const columns: ColumnDef<TrayectoriaPolitica>[] = [
    {
      accessorKey: "orden",
      header: "Orden",
    },
    {
      accessorKey: "cargo",
      header: "Cargo",
    },
    {
      accessorKey: "institucion",
      header: "Institución",
    },
    {
      id: "fechas",
      header: "Período",
      cell: ({ row }) => {
        const trayectoria = row.original;
        return formatDateRange(trayectoria.fechaInicio, trayectoria.fechaFin);
      },
    },
    {
      accessorKey: "imagenUrl",
      header: "Imagen",
      cell: ({ row }) => {
        const imagenUrl = row.original.imagenUrl;
        return (
          <div className="relative h-10 w-16">
            {imagenUrl ? (
              <img
                src={imagenUrl}
                alt={row.original.cargo}
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded">
                <Image className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const fechaFin = row.original.fechaFin;
        return (
          <div className={`flex items-center ${fechaFin ? 'text-gray-500' : 'text-green-600'}`}>
            {fechaFin ? (
              <>
                <Clock className="mr-1 h-4 w-4" />
                <span>Pasado</span>
              </>
            ) : (
              <>
                <CheckCircle className="mr-1 h-4 w-4" />
                <span>Actual</span>
              </>
            )}
          </div>
        );
      },
    },
  ];

  // Add action buttons to columns
  const columnsWithActions = generateColumns<TrayectoriaPolitica>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando trayectoria política...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trayectoria Política</h1>
        <p className="text-muted-foreground">
          Gestiona la información sobre cargos, roles e hitos en la trayectoria política.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Trayectoria</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={trayectorias}
            searchKey="cargo"
            searchPlaceholder="Buscar por cargo..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedTrayectoria ? "Editar Trayectoria" : "Crear Nueva Trayectoria"}
        description="Complete la información del cargo político."
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={form.handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      >
        <Form {...form}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Gobernador de Sucre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institucion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institución</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Gobernación de Sucre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explique los logros, contexto o detalles de este cargo"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fechaInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <div className="flex items-center h-5 mt-1.5 mb-2">
                  <input
                    id="cargo-actual"
                    type="checkbox"
                    checked={cargoActual}
                    onChange={(e) => setCargoActual(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="cargo-actual" className="ml-2 text-sm text-gray-600">
                    Es cargo actual
                  </label>
                </div>
                {!cargoActual && (
                  <FormField
                    control={form.control}
                    name="fechaFin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Fin</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            <FormField
              control={form.control}
              name="orden"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orden</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">
                    Determina el orden de visualización. Números menores aparecen primero.
                  </p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imagenUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen (Opcional)</FormLabel>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="URL de la imagen"
                        readOnly
                      />
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          disabled={uploadingImage}
                        />
                        <Button type="button" disabled={uploadingImage}>
                          {uploadingImage ? "Subiendo..." : "Subir"}
                        </Button>
                      </div>
                    </div>
                    {field.value && (
                      <div className="relative h-32 w-full">
                        <img
                          src={field.value}
                          alt="Vista previa"
                          className="h-full w-auto object-contain rounded"
                        />
                      </div>
                    )}
                  </div>
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
        description={`¿Está seguro que desea eliminar el cargo "${selectedTrayectoria?.cargo}" en ${selectedTrayectoria?.institucion}? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
