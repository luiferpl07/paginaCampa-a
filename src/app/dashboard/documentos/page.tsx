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
import { FileBox, FileText } from "lucide-react";

// Define the DocumentoPDF interface
interface DocumentoPDF {
  id: number;
  titulo: string;
  descripcion: string | null;
  archivoUrl: string;
  fecha: string;
}

// Define the form schema with Zod
const formSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  descripcion: z.string().nullable().optional(),
  archivoUrl: z.string().min(1, "El archivo es obligatorio"),
  fecha: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function DocumentosPage() {
  const { toast } = useToast();
  const [documentos, setDocumentos] = useState<DocumentoPDF[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState<DocumentoPDF | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadingArchivo, setUploadingArchivo] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      archivoUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    },
  });

  // Fetch documentos on component mount
  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await apiClient.get<DocumentoPDF[]>('/documentos');
        if (response.data) {
          setDocumentos(response.data);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudieron cargar los documentos",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al cargar los documentos",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocumentos();
  }, [toast]);

  // Open form modal for creating a new documento
  const handleCreateNew = () => {
    setSelectedDocumento(null);
    form.reset({
      titulo: "",
      descripcion: "",
      archivoUrl: "",
      fecha: new Date().toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open form modal for editing a documento
  const handleEdit = (documento: DocumentoPDF) => {
    setSelectedDocumento(documento);
    form.reset({
      titulo: documento.titulo,
      descripcion: documento.descripcion || "",
      archivoUrl: documento.archivoUrl,
      fecha: new Date(documento.fecha).toISOString().split("T")[0],
    });
    setIsFormModalOpen(true);
  };

  // Open confirm modal for deleting a documento
  const handleDelete = (documento: DocumentoPDF) => {
    setSelectedDocumento(documento);
    setIsDeleteModalOpen(true);
  };

  // Handle archivo upload
  const handleArchivoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingArchivo(true);
    try {
      const response =  await uploadFile(file);
      if (response.data?.url) {
        form.setValue('archivoUrl', response.data.url);
        toast({
          title: "Éxito",
          description: "Archivo subido correctamente",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo subir el archivo",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al subir el archivo",
        variant: "destructive",
      });
    } finally {
      setUploadingArchivo(false);
    }
  };

  // Handle form submission for creating or updating a documento
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedDocumento) {
        // Update existing documento
        const response = await apiClient.put<DocumentoPDF>(
          `/documentos/${selectedDocumento.id}`,
          data
        );
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Documento actualizado correctamente",
          });
          setDocumentos(
            documentos.map((d) =>
              d.id === selectedDocumento.id ? response.data! : d
            )
          );
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo actualizar el documento",
            variant: "destructive",
          });
        }
      } else {
        // Create new documento
        const response = await apiClient.post<DocumentoPDF>('/documentos', data);
        if (response.data) {
          toast({
            title: "Éxito",
            description: "Documento creado correctamente",
          });
          setDocumentos([...documentos, response.data]);
        } else {
          toast({
            title: "Error",
            description: response.error || "No se pudo crear el documento",
            variant: "destructive",
          });
        }
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar el documento",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle documento deletion
  const confirmDelete = async () => {
    if (!selectedDocumento) return;

    setDeleteLoading(true);
    try {
      const response = await apiClient.delete(`/documentos/${selectedDocumento.id}`);
      if (!response.error) {
        toast({
          title: "Éxito",
          description: "Documento eliminado correctamente",
        });
        setDocumentos(documentos.filter(d => d.id !== selectedDocumento.id));
        setIsDeleteModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: response.error || "No se pudo eliminar el documento",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar el documento",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Extract filename from URL
  const getFileName = (url: string) => {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  // Format file size (future feature)
  const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  // Define table columns
  const columns: ColumnDef<DocumentoPDF>[] = [
    {
      accessorKey: "titulo",
      header: "Título",
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
      cell: ({ row }) => {
        const descripcion = row.original.descripcion;
        return descripcion && descripcion.length > 50
          ? `${descripcion.substring(0, 50)}...`
          : (descripcion || "-");
      },
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      cell: ({ row }) => formatDate(row.original.fecha),
    },
    {
      accessorKey: "archivoUrl",
      header: "Archivo",
      cell: ({ row }) => {
        const archivoUrl = row.original.archivoUrl;
        return (
          <a
            href={archivoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FileText className="mr-1 h-4 w-4" />
            <span className="truncate max-w-[150px]">{getFileName(archivoUrl)}</span>
          </a>
        );
      },
    },
  ];

  // Add action buttons to columns
  const columnsWithActions = generateColumns<DocumentoPDF>(
    columns,
    handleEdit,
    handleDelete
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando documentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
        <p className="text-muted-foreground">
          Gestiona los documentos PDF disponibles para descarga.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columnsWithActions}
            data={documentos}
            searchKey="titulo"
            searchPlaceholder="Buscar por título..."
            onCreateNew={handleCreateNew}
          />
        </CardContent>
      </Card>

      {/* Form Modal */}
      <FormModal
        title={selectedDocumento ? "Editar Documento" : "Crear Nuevo Documento"}
        description="Complete la información del documento PDF."
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={form.handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      >
        <Form {...form}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el título del documento" {...field} />
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
                  <FormLabel>Descripción (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese una descripción del documento"
                      rows={3}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
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
              control={form.control}
              name="archivoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Archivo PDF</FormLabel>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="URL del archivo PDF"
                        readOnly
                      />
                      <div className="relative">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                          onChange={handleArchivoUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          disabled={uploadingArchivo}
                        />
                        <Button type="button" disabled={uploadingArchivo}>
                          {uploadingArchivo ? "Subiendo..." : "Subir"}
                        </Button>
                      </div>
                    </div>
                    {field.value && (
                      <div className="flex items-center text-sm">
                        <FileBox className="mr-2 h-4 w-4 text-blue-600" />
                        <span className="text-blue-600">{getFileName(field.value)}</span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Formatos aceptados: PDF, Word, Excel, PowerPoint
                    </p>
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
        description={`¿Está seguro que desea eliminar el documento "${selectedDocumento?.titulo}"? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
