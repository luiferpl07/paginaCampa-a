"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthCheck from "@/app/dashboard/auth/auth-check";
import { DashboardHeader } from "@/app/dashboard/dashboard/dashboard-header";
import { DashboardNav } from "@/app/dashboard/dashboard/dashboard-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileEdit,
  ImageIcon,
  CalendarIcon,
  Users,
  ListTodo,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  // Verifica autenticación - puedes personalizarlo según tu lógica de autenticación
  const isAuthenticated =
    typeof window !== "undefined" &&
    localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    // Si no está autenticado, redirige al login
    if (!isAuthenticated) {
      router.push("/dashboard/login");
    }
  }, [isAuthenticated, router]);

  // Si no está autenticado, no muestra nada mientras redirecciona
  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Bienvenido al panel de administración del sitio web informativo.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Noticias
                  </CardTitle>
                  <FileEdit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Últimas noticias y actualizaciones
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Propuestas
                  </CardTitle>
                  <ListTodo className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    Propuestas y prioridades
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Galería</CardTitle>
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    Imágenes en la galería
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Eventos</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">
                    Eventos programados
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>
                    Las últimas actualizaciones del sitio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-sm font-medium">
                        Evento "Teatro Municipal" actualizado
                      </span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        13:45
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                      <span className="text-sm font-medium">
                        Nueva noticia publicada: "Avance en infraestructura"
                      </span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        10:23
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-orange-500"></span>
                      <span className="text-sm font-medium">
                        Propuesta "Protegiendo a los Mayores" editada
                      </span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        Ayer
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                      <span className="text-sm font-medium">
                        3 nuevas imágenes subidas a la galería
                      </span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        Ayer
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
                      <span className="text-sm font-medium">
                        Mensaje de contacto recibido
                      </span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        3 días
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Equipo</CardTitle>
                  <CardDescription>
                    Miembros del equipo de campaña
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Héctor Olimpo</p>
                        <p className="text-xs text-muted-foreground">
                          Candidato
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">María González</p>
                        <p className="text-xs text-muted-foreground">
                          Directora de Campaña
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">José Ramírez</p>
                        <p className="text-xs text-muted-foreground">
                          Coordinador de Eventos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Laura Pérez</p>
                        <p className="text-xs text-muted-foreground">
                          Responsable de Comunicación
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
