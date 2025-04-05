"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Pencil,
  Trash2,
  Info,
  Image
} from "lucide-react";
import { toast } from "sonner";

// Componente para crear/editar propuestas
const PropuestaForm = ({
  propuesta,
  onSave,
  onCancel
}: {
  propuesta?: any,
  onSave: (data: any) => void,
  onCancel: () => void
}) => {
  const [form, setForm] = useState({
    id: propuesta?.id || "",
    title: propuesta?.title || "",
    description: propuesta?.description || "",
    image: propuesta?.image || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!form.title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    if (!form.description.trim()) {
      toast.error("La descripción es obligatoria");
      return;
    }

    if (!form.image.trim()) {
      toast.error("La URL de la imagen es obligatoria");
      return;
    }

    // Si no hay ID, generarlo (en un sistema real esto lo haría el backend)
    if (!form.id) {
      form.id = form.title.toLowerCase().replace(/\s+/g, '-');
    }

    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ej: Protegiendo a los Mayores"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Breve descripción de la propuesta..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">URL de la imagen</Label>
        <Input
          id="image"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {propuesta ? "Actualizar" : "Crear"} Propuesta
        </Button>
      </DialogFooter>
    </form>
  );
};

// Componente de confirmación para eliminar
const DeleteConfirmation = ({
  propuesta,
  onConfirm,
  onCancel
}: {
  propuesta: any,
  onConfirm: () => void,
  onCancel: () => void
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        ¿Estás seguro de que deseas eliminar la propuesta <strong>{propuesta.title}</strong>? Esta acción no se puede deshacer.
      </p>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" variant="destructive" onClick={onConfirm}>
          Eliminar
        </Button>
      </DialogFooter>
    </div>
  );
};

// Datos de muestra (en un sistema real estos vendrían de una API)
const propuestasIniciales = [
  {
    id: 'protegiendo-a-los-mayores',
    title: 'Protegiendo a los Mayores',
    description: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec rutrum congue leo eget malesuada. Curabitur',
    image: 'https://ext.same-assets.com/77511177/2240474230.jpeg',
  },
  {
    id: 'protegiendo-medicare',
    title: 'Protegiendo Medicare',
    description: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus. Quisque velit nisi, pretium',
    image: 'https://ext.same-assets.com/77511177/1529725074.jpeg',
  },
  {
    id: 'creando-empleos',
    title: 'Creando Empleos',
    description: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit. Quisque velit',
    image: 'https://ext.same-assets.com/77511177/616072021.jpeg',
  },
  {
    id: 'creciendo-nuestra-economia',
    title: 'Creciendo Nuestra Economía',
    description: 'Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum',
    image: 'https://ext.same-assets.com/77511177/2446538560.jpeg',
  },
];

// Página principal de propuestas
export default function PropuestasPage() {
  const [propuestas, setPropuestas] = useState(propuestasIniciales);
  const [dialogType, setDialogType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedPropuesta, setSelectedPropuesta] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Función para abrir el diálogo
  const openDialog = (type: 'create' | 'edit' | 'delete', propuesta?: any) => {
    setDialogType(type);
    setSelectedPropuesta(propuesta || null);
    setDialogOpen(true);
  };

  // Función para guardar una propuesta (nueva o editada)
  const handleSavePropuesta = (data: any) => {
    if (dialogType === 'create') {
      // Añadir nueva propuesta
      setPropuestas([...propuestas, data]);
      toast.success('Propuesta creada correctamente');
    } else if (dialogType === 'edit') {
      // Actualizar propuesta existente
      setPropuestas(propuestas.map(p => p.id === data.id ? data : p));
      toast.success('Propuesta actualizada correctamente');
    }

    setDialogOpen(false);
  };

  // Función para eliminar una propuesta
  const handleDeletePropuesta = () => {
    if (selectedPropuesta) {
      setPropuestas(propuestas.filter(p => p.id !== selectedPropuesta.id));
      toast.success('Propuesta eliminada correctamente');
      setDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Propuestas</h1>
          <p className="text-muted-foreground">
            Gestiona las propuestas y prioridades de tu campaña.
          </p>
        </div>

        <Button onClick={() => openDialog('create')}>
          <Plus className="h-4 w-4 mr-2" />
          Añadir Propuesta
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas las propuestas</CardTitle>
          <CardDescription>
            Se muestran todas las propuestas activas de la campaña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Imagen</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {propuestas.map((propuesta) => (
                <TableRow key={propuesta.id}>
                  <TableCell className="font-medium">{propuesta.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{propuesta.description}</TableCell>
                  <TableCell>
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <img
                        src={propuesta.image}
                        alt={propuesta.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openDialog('edit', propuesta)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDialog('delete', propuesta)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo para crear/editar/eliminar */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'create' && 'Crear nueva propuesta'}
              {dialogType === 'edit' && 'Editar propuesta'}
              {dialogType === 'delete' && 'Eliminar propuesta'}
            </DialogTitle>
            <DialogDescription>
              {dialogType !== 'delete'
                ? 'Rellena los campos para gestionar la propuesta.'
                : 'Esta acción no se puede deshacer.'}
            </DialogDescription>
          </DialogHeader>

          {dialogType === 'delete' && selectedPropuesta ? (
            <DeleteConfirmation
              propuesta={selectedPropuesta}
              onConfirm={handleDeletePropuesta}
              onCancel={() => setDialogOpen(false)}
            />
          ) : (
            <PropuestaForm
              propuesta={dialogType === 'edit' ? selectedPropuesta : undefined}
              onSave={handleSavePropuesta}
              onCancel={() => setDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
