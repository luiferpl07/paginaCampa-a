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
  Clock,
  MapPin
} from "lucide-react";
import { toast } from "sonner";

// Definición del tipo Evento
interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  direccion: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  destacado: boolean;
}

// Componente para crear/editar eventos
const EventoForm = ({
  evento,
  onSave,
  onCancel
}: {
  evento?: Evento,
  onSave: (data: Evento) => void,
  onCancel: () => void
}) => {
  const [form, setForm] = useState<Evento>({
    id: evento?.id || "",
    titulo: evento?.titulo || "",
    descripcion: evento?.descripcion || "",
    ubicacion: evento?.ubicacion || "",
    direccion: evento?.direccion || "",
    fecha: evento?.fecha || new Date().toISOString().split('T')[0],
    horaInicio: evento?.horaInicio || "10:00",
    horaFin: evento?.horaFin || "12:00",
    destacado: evento?.destacado || false,
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

    if (!form.ubicacion.trim()) {
      toast.error("La ubicación es obligatoria");
      return;
    }

    if (!form.fecha) {
      toast.error("La fecha es obligatoria");
      return;
    }

    if (!form.horaInicio || !form.horaFin) {
      toast.error("El horario es obligatorio");
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
        <Label htmlFor="titulo">Título del evento</Label>
        <Input
          id="titulo"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Ej: Encuentro comunitario"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Breve descripción del evento..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ubicacion">Ubicación</Label>
          <Input
            id="ubicacion"
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            placeholder="Ej: Teatro Municipal"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Ej: Calle Principal #123"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fecha">Fecha</Label>
          <Input
            id="fecha"
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="horaInicio">Hora de inicio</Label>
          <Input
            id="horaInicio"
            name="horaInicio"
            type="time"
            value={form.horaInicio}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="horaFin">Hora de finalización</Label>
          <Input
            id="horaFin"
            name="horaFin"
            type="time"
            value={form.horaFin}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="destacado"
          name="destacado"
          checked={form.destacado}
          onChange={handleCheckboxChange}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="destacado">Evento destacado</Label>
      </div>

      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {evento ? "Actualizar" : "Crear"} Evento
        </Button>
      </DialogFooter>
    </form>
  );
};

// Componente de confirmación para eliminar
const DeleteConfirmation = ({
  evento,
  onConfirm,
  onCancel
}: {
  evento: Evento,
  onConfirm: () => void,
  onCancel: () => void
}) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        ¿Estás seguro de que deseas eliminar el evento <strong>{evento.titulo}</strong>? Esta acción no se puede deshacer.
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
const eventosIniciales: Evento[] = [
  {
    id: 'teatro-municipal',
    titulo: 'Teatro Municipal',
    descripcion: 'Encuentro con la comunidad para discutir propuestas de la campaña.',
    ubicacion: 'Teatro Municipal',
    direccion: 'Calle Principal #123, Sincelejo, SUCRE',
    fecha: '2023-04-29',
    horaInicio: '10:00',
    horaFin: '17:00',
    destacado: true,
  },
  {
    id: 'plaza-majagual',
    titulo: 'Plaza Majagual',
    descripcion: 'Presentación del plan de gobierno con énfasis en propuestas para el sector agrícola.',
    ubicacion: 'Plaza Majagual',
    direccion: 'Plaza Principal, Sincelejo, SUCRE',
    fecha: '2023-05-21',
    horaInicio: '11:00',
    horaFin: '13:00',
    destacado: false,
  },
  {
    id: 'centro-comunitario-las-flores',
    titulo: 'Centro Comunitario Las Flores',
    descripcion: 'Diálogo ciudadano sobre seguridad comunitaria.',
    ubicacion: 'Centro Comunitario Las Flores',
    direccion: 'Barrio Las Flores, Calle 45 #23-12, Sincelejo',
    fecha: '2023-06-15',
    horaInicio: '09:00',
    horaFin: '12:00',
    destacado: false,
  },
];

// Formatear fecha para mostrar
const formatearFecha = (fecha: string): string => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Página principal de eventos
export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>(eventosIniciales);
  const [dialogType, setDialogType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Función para abrir el diálogo
  const openDialog = (type: 'create' | 'edit' | 'delete', evento?: Evento) => {
    setDialogType(type);
    setSelectedEvento(evento || null);
    setDialogOpen(true);
  };

  // Función para guardar un evento (nuevo o editado)
  const handleSaveEvento = (data: Evento) => {
    if (dialogType === 'create') {
      // Añadir nuevo evento
      setEventos([...eventos, data]);
      toast.success('Evento creado correctamente');
    } else if (dialogType === 'edit') {
      // Actualizar evento existente
      setEventos(eventos.map(e => e.id === data.id ? data : e));
      toast.success('Evento actualizado correctamente');
    }

    setDialogOpen(false);
  };

  // Función para eliminar un evento
  const handleDeleteEvento = () => {
    if (selectedEvento) {
      setEventos(eventos.filter(e => e.id !== selectedEvento.id));
      toast.success('Evento eliminado correctamente');
      setDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
          <p className="text-muted-foreground">
            Gestiona los eventos y actividades de la campaña.
          </p>
        </div>

        <Button onClick={() => openDialog('create')}>
          <Plus className="h-4 w-4 mr-2" />
          Añadir Evento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos los eventos</CardTitle>
          <CardDescription>
            Se muestran todos los eventos programados para la campaña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Destacado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventos.map((evento) => (
                <TableRow key={evento.id}>
                  <TableCell className="font-medium">{evento.titulo}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {evento.ubicacion}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {formatearFecha(evento.fecha)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      {evento.horaInicio} - {evento.horaFin}
                    </div>
                  </TableCell>
                  <TableCell>{evento.destacado ? "Sí" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openDialog('edit', evento)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDialog('delete', evento)}>
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
              {dialogType === 'create' && 'Crear nuevo evento'}
              {dialogType === 'edit' && 'Editar evento'}
              {dialogType === 'delete' && 'Eliminar evento'}
            </DialogTitle>
            <DialogDescription>
              {dialogType !== 'delete'
                ? 'Rellena los campos para gestionar el evento.'
                : 'Esta acción no se puede deshacer.'}
            </DialogDescription>
          </DialogHeader>

          {dialogType === 'delete' && selectedEvento ? (
            <DeleteConfirmation
              evento={selectedEvento}
              onConfirm={handleDeleteEvento}
              onCancel={() => setDialogOpen(false)}
            />
          ) : (
            <EventoForm
              evento={dialogType === 'edit' ? selectedEvento || undefined : undefined}
              onSave={handleSaveEvento}
              onCancel={() => setDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
