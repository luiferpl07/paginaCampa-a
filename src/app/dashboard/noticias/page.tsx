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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

// Definición del tipo Noticia
interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fecha: string;
  destacada: boolean;
}

// Componente para crear/editar noticias
const NoticiaForm = ({
  noticia,
  onSave,
  onCancel
}: {
  noticia?: Noticia,
  onSave: (data: Noticia) => void,
  onCancel: () => void
}) => {
  const [form, setForm] = useState<Noticia>({
    id: noticia?.id || "",
    titulo: noticia?.titulo || "",
    resumen: noticia?.resumen || "",
    contenido: noticia?.contenido || "",
    imagen: noticia?.imagen || "",
    fecha: noticia?.fecha || new Date().toISOString().split('T')[0],
    destacada: noticia?.destacada || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!form.titulo.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    if (!form.resumen.trim()) {
      toast.error("El resumen es obligatorio");
      return;
    }

    if (!form.contenido.trim()) {
      toast.error("El contenido es obligatorio");
      return;
    }

    if (!form.imagen.trim()) {
      toast.error("La URL de la imagen es obligatoria");
      return;
    }

    // Si no hay ID, generarlo (en un sistema real esto lo haría el backend)
    if (!form.id) {
      form.id = form.titulo.toLowerCase().replace(/\s+/g, '-');
    }

    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="titulo">Título</Label>
        <Input
          id="titulo"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Título de la noticia"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resumen">Resumen</Label>
        <Textarea
          id="resumen"
          name="resumen"
          value={form.resumen}
          onChange={handleChange}
          placeholder="Breve resumen de la noticia..."
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contenido">Contenido</Label>
        <Textarea
          id="contenido"
          name="contenido"
          value={form.contenido}
          onChange={handleChange}
          placeholder="Contenido completo de la noticia..."
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imagen">URL de la imagen</Label>
        <Input
          id="imagen"
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fecha">Fecha de publicación</Label>
        <Input
          id="fecha"
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="destacada"
          name="destacada"
          checked={form.destacada}
          onChange={handleCheckboxChange}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="destacada">Noticia destacada</Label>
      </div>

      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {noticia ? "Actualizar" : "Crear"} Noticia
        </Button>
      </DialogFooter>
    </form>
  );
};

// Componente de confirmación para eliminar
const DeleteConfirmation = ({
  noticia,
  onConfirm,
  onCancel
}: {
  noticia: Noticia,
  onConfirm: () => void,
  onCancel: () => void
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        ¿Estás seguro de que deseas eliminar la noticia <strong>{noticia.titulo}</strong>? Esta acción no se puede deshacer.
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
const noticiasIniciales: Noticia[] = [
  {
    id: 'avance-en-infraestructura',
    titulo: 'Avance en infraestructura',
    resumen: 'Se anuncia un nuevo plan de inversión en infraestructura para la región.',
    contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales eget ipsum eu aliquam. Integer malesuada diam et arcu condimentum, at vestibulum felis tincidunt. Sed auctor lectus id arcu ultricies, eget efficitur velit tincidunt. Etiam quis auctor arcu.',
    imagen: 'https://ext.same-assets.com/77511177/1863026383.jpeg',
    fecha: '2023-12-10',
    destacada: true,
  },
  {
    id: 'reunion-con-lideres-comunitarios',
    titulo: 'Reunión con líderes comunitarios',
    resumen: 'Héctor Olimpo se reunió con líderes comunitarios para escuchar sus propuestas.',
    contenido: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales eget ipsum eu aliquam.',
    imagen: 'https://ext.same-assets.com/77511177/2240474230.jpeg',
    fecha: '2023-11-25',
    destacada: false,
  },
  {
    id: 'propuesta-para-el-sector-educativo',
    titulo: 'Propuesta para el sector educativo',
    resumen: 'Nuevas propuestas para mejorar la calidad educativa en la región.',
    contenido: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Sed porttitor lectus nibh. Sed porttitor lectus nibh.',
    imagen: 'https://ext.same-assets.com/77511177/616072021.jpeg',
    fecha: '2023-11-15',
    destacada: false,
  },
];

// Página principal de noticias
export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>(noticiasIniciales);
  const [dialogType, setDialogType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Función para abrir el diálogo
  const openDialog = (type: 'create' | 'edit' | 'delete', noticia?: Noticia) => {
    setDialogType(type);
    setSelectedNoticia(noticia || null);
    setDialogOpen(true);
  };

  // Función para guardar una noticia (nueva o editada)
  const handleSaveNoticia = (data: Noticia) => {
    if (dialogType === 'create') {
      // Añadir nueva noticia
      setNoticias([data, ...noticias]);
      toast.success('Noticia creada correctamente');
    } else if (dialogType === 'edit') {
      // Actualizar noticia existente
      setNoticias(noticias.map(n => n.id === data.id ? data : n));
      toast.success('Noticia actualizada correctamente');
    }

    setDialogOpen(false);
  };

  // Función para eliminar una noticia
  const handleDeleteNoticia = () => {
    if (selectedNoticia) {
      setNoticias(noticias.filter(n => n.id !== selectedNoticia.id));
      toast.success('Noticia eliminada correctamente');
      setDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Noticias</h1>
          <p className="text-muted-foreground">
            Gestiona las noticias y actualizaciones de la campaña.
          </p>
        </div>

        <Button onClick={() => openDialog('create')}>
          <Plus className="h-4 w-4 mr-2" />
          Añadir Noticia
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas las noticias</CardTitle>
          <CardDescription>
            Se muestran todas las noticias y actualizaciones de la campaña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Resumen</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Destacada</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {noticias.map((noticia) => (
                <TableRow key={noticia.id}>
                  <TableCell className="font-medium">{noticia.titulo}</TableCell>
                  <TableCell className="max-w-xs truncate">{noticia.resumen}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {new Date(noticia.fecha).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{noticia.destacada ? "Sí" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openDialog('edit', noticia)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDialog('delete', noticia)}>
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
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'create' && 'Crear nueva noticia'}
              {dialogType === 'edit' && 'Editar noticia'}
              {dialogType === 'delete' && 'Eliminar noticia'}
            </DialogTitle>
            <DialogDescription>
              {dialogType !== 'delete'
                ? 'Rellena los campos para gestionar la noticia.'
                : 'Esta acción no se puede deshacer.'}
            </DialogDescription>
          </DialogHeader>

          {dialogType === 'delete' && selectedNoticia ? (
            <DeleteConfirmation
              noticia={selectedNoticia}
              onConfirm={handleDeleteNoticia}
              onCancel={() => setDialogOpen(false)}
            />
          ) : (
            <NoticiaForm
              noticia={dialogType === 'edit' ? selectedNoticia || undefined : undefined}
              onSave={handleSaveNoticia}
              onCancel={() => setDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
