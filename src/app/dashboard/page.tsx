"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Users2, MessageSquare, CalendarDays, FileText, Mic, Film, BookOpen, FileImage } from "lucide-react";
import axios from "axios";

// Define interfaces for your data models
interface ContentItem {
  id: number;
  titulo: string;
  fecha?: string;
  createdAt?: string;
  [key: string]: any; // For any additional properties
}

// Dashboard statistics interface
interface DashboardStats {
  relatos: number;
  propuestas: number;
  perfiles: number;
  participaciones: number;
  banners: number;
  eventos: number;
  biografias: number;
  trayectorias: number;
  noticias: number;
  podcasts: number;
  videos: number;
  blogs: number;
  libros: number;
  revistas: number;
  documentos: number;
  miembros: number;
}

// Recent activity interface
interface Activity {
  id: number;
  type: string;
  title: string;
  date: string;
  model: string;
}

// Base API URL - replace with your actual API URL
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${process.env.PREFIJO_API || '/api'}`;
console.log(API_BASE_URL)



export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    relatos: 0,
    propuestas: 0,
    perfiles: 0,
    participaciones: 0,
    banners: 0,
    eventos: 0,
    biografias: 0,
    trayectorias: 0,
    noticias: 0,
    podcasts: 0,
    videos: 0,
    blogs: 0,
    libros: 0,
    revistas: 0,
    documentos: 0,
    miembros: 0
  });

  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to check endpoint status and log results
  const checkEndpoint = async <T,>(name: string, url: string): Promise<T[]> => {
    console.log(`Checking endpoint ${name}: ${url}`);
    try {
      const response = await axios.get<T[]>(url);
      console.log(`✅ Endpoint ${name} is working, received ${response.data?.length || 0} items`);
      return response.data || [];
    } catch (error: any) {
      console.error(`❌ Endpoint ${name} failed with error:`, error.message);
      return [];
    }
  };

  // Fetch data from API
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      
      try {
        // Fetch counts from all endpoints with individual error handling
        const [
          relatos,
          propuestas,
          perfiles,
          participaciones,
          banners,
          eventos,
          biografias,
          trayectorias,
          noticias,
          podcasts,
          videos,
          blogs,
          libros,
          revistas,
          documentos,
          miembros
        ] = await Promise.all([
          checkEndpoint<ContentItem>('relatos', `${API_BASE_URL}/relatos`),
          checkEndpoint<ContentItem>('propuestas', `${API_BASE_URL}/propuestas`),
          checkEndpoint<ContentItem>('perfiles', `${API_BASE_URL}/perfiles`),
          checkEndpoint<ContentItem>('participaciones', `${API_BASE_URL}/participaciones`),
          checkEndpoint<ContentItem>('banners', `${API_BASE_URL}/banners`),
          checkEndpoint<ContentItem>('eventos', `${API_BASE_URL}/eventos`),
          checkEndpoint<ContentItem>('biografias', `${API_BASE_URL}/biografia/secciones`),
          checkEndpoint<ContentItem>('trayectorias', `${API_BASE_URL}/trayectoria`),
          checkEndpoint<ContentItem>('noticias', `${API_BASE_URL}/noticias`),
          checkEndpoint<ContentItem>('podcasts', `${API_BASE_URL}/podcasts`),
          checkEndpoint<ContentItem>('videos', `${API_BASE_URL}/videos`),
          checkEndpoint<ContentItem>('blogs', `${API_BASE_URL}/blogs`),
          checkEndpoint<ContentItem>('libros', `${API_BASE_URL}/libros`),
          checkEndpoint<ContentItem>('revistas', `${API_BASE_URL}/revistas`),
          checkEndpoint<ContentItem>('documentos', `${API_BASE_URL}/documentos`),
          checkEndpoint<ContentItem>('miembros', `${API_BASE_URL}/miembros`)
        ]);

        // Update statistics based on array lengths
        setStats({
          relatos: relatos.length || 0,
          propuestas: propuestas.length || 0,
          perfiles: perfiles.length || 0,
          participaciones: participaciones.length || 0,
          banners: banners.length || 0,
          eventos: eventos.length || 0,
          biografias: biografias.length || 0,
          trayectorias: trayectorias.length || 0,
          noticias: noticias.length || 0,
          podcasts: podcasts.length || 0,
          videos: videos.length || 0,
          blogs: blogs.length || 0,
          libros: libros.length || 0,
          revistas: revistas.length || 0,
          documentos: documentos.length || 0,
          miembros: miembros.length || 0
        });

        // Create recent activity from available data
        const recentItems = [
          ...noticias.map((item: ContentItem) => ({
            id: item.id,
            type: "create",
            title: `Nueva noticia: ${item.titulo}`,
            date: item.fecha || item.createdAt || new Date().toISOString(),
            model: "noticias"
          })),
          ...eventos.map((item: ContentItem) => ({
            id: item.id,
            type: "create",
            title: `Evento: ${item.titulo}`,
            date: item.fecha || item.createdAt || new Date().toISOString(),
            model: "eventos"
          })),
          ...blogs.map((item: ContentItem) => ({
            id: item.id,
            type: "create",
            title: `Blog: ${item.titulo}`,
            date: item.fecha || item.createdAt || new Date().toISOString(),
            model: "blogs"
          })),
          ...videos.map((item: ContentItem) => ({
            id: item.id,
            type: "create",
            title: `Video: ${item.titulo}`,
            date: item.fecha || item.createdAt || new Date().toISOString(),
            model: "videos"
          })),
          ...podcasts.map((item: ContentItem) => ({
            id: item.id,
            type: "create",
            title: `Podcast: ${item.titulo}`,
            date: item.fecha || item.createdAt || new Date().toISOString(),
            model: "podcasts"
          }))
        ];

        // Sort by date (newest first) and take the first 5
        const sortedActivity = recentItems
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setRecentActivity(sortedActivity);
      } catch (err) {
        console.error("Error in overall processing:", err);
        setError("Error al cargar los datos. Por favor, intente nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Function to determine icon based on model type
  const getActivityIcon = (model: string) => {
    switch (model) {
      case "relatos":
        return <MessageSquare className="h-4 w-4" />;
      case "propuestas":
        return <FileText className="h-4 w-4" />;
      case "perfiles":
        return <Users2 className="h-4 w-4" />;
      case "participaciones":
        return <Users2 className="h-4 w-4" />;
      case "banners":
        return <FileImage className="h-4 w-4" />;
      case "eventos":
        return <CalendarDays className="h-4 w-4" />;
      case "biografia":
        return <BookOpen className="h-4 w-4" />;
      case "trayectoria":
        return <FileText className="h-4 w-4" />;
      case "noticias":
        return <FileText className="h-4 w-4" />;
      case "podcasts":
        return <Mic className="h-4 w-4" />;
      case "videos":
        return <Film className="h-4 w-4" />;
      case "blogs":
        return <FileText className="h-4 w-4" />;
      case "libros":
        return <BookOpen className="h-4 w-4" />;
      case "revistas":
        return <FileImage className="h-4 w-4" />;
      case "documentos":
        return <FileImage className="h-4 w-4" />;
      case "miembros":
        return <Users2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return "Fecha no disponible";
    }
  };

  // Function to get badge class based on activity type
  const getActivityBadgeClass = (type: string) => {
    switch (type) {
      case "create":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-blue-100 text-blue-800";
      case "delete":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get activity type text in Spanish
  const getActivityTypeText = (type: string) => {
    switch (type) {
      case "create":
        return "Creación";
      case "update":
        return "Actualización";
      case "delete":
        return "Eliminación";
      default:
        return "Actividad";
    }
  };

  // StatCard component for quick stats
  const StatCard = ({ title, value, icon: Icon, href }: { title: string; value: number; icon: React.ElementType; href: string }) => (
    <Link href={href}>
      <Card className="hover:bg-zinc-50 transition-colors cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground pt-1">
            Total registrados
          </p>
        </CardContent>
      </Card>
    </Link>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            <p>{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Relatos y Testimonios"
          value={stats.relatos}
          icon={MessageSquare}
          href="/dashboard/relatos"
        />
        <StatCard
          title="Propuestas"
          value={stats.propuestas}
          icon={FileText}
          href="/dashboard/propuestas"
        />
        <StatCard
          title="Perfiles"
          value={stats.perfiles}
          icon={Users2}
          href="/dashboard/perfiles"
        />
        <StatCard
          title="Participaciones"
          value={stats.participaciones}
          icon={Users2}
          href="/dashboard/participaciones"
        />
        <StatCard
          title="Banners"
          value={stats.banners}
          icon={FileImage}
          href="/dashboard/banners"
        />
        <StatCard
          title="Eventos"
          value={stats.eventos}
          icon={CalendarDays}
          href="/dashboard/eventos"
        />
        <StatCard
          title="Biografía"
          value={stats.biografias}
          icon={BookOpen}
          href="/dashboard/biografia"
        />
        <StatCard
          title="Trayectoria"
          value={stats.trayectorias}
          icon={FileText}
          href="/dashboard/trayectoria"
        />
        <StatCard
          title="Noticias"
          value={stats.noticias}
          icon={FileText}
          href="/dashboard/noticias"
        />
        <StatCard
          title="Podcasts"
          value={stats.podcasts}
          icon={Mic}
          href="/dashboard/podcasts"
        />
        <StatCard
          title="Videos"
          value={stats.videos}
          icon={Film}
          href="/dashboard/videos"
        />
        <StatCard
          title="Blogs"
          value={stats.blogs}
          icon={FileText}
          href="/dashboard/blogs"
        />
        <StatCard
          title="E-Libros"
          value={stats.libros}
          icon={BookOpen}
          href="/dashboard/libros"
        />
        <StatCard
          title="Revistas"
          value={stats.revistas}
          icon={FileImage}
          href="/dashboard/revistas"
        />
        <StatCard
          title="Documentos"
          value={stats.documentos}
          icon={FileImage}
          href="/dashboard/documentos"
        />
        <StatCard
          title="Miembros"
          value={stats.miembros}
          icon={Users2}
          href="/dashboard/miembros"
        />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Las últimas actualizaciones realizadas en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="mr-4 mt-1">
                      {getActivityIcon(activity.model)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${getActivityBadgeClass(activity.type)}`}
                        >
                          {getActivityTypeText(activity.type)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(activity.date)}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <Link
                        href={`/dashboard/${activity.model}`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Ver sección
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay actividad reciente para mostrar.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}