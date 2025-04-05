"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulación de autenticación (en un sistema real, esto se conectaría a un backend)
      if (formData.email === "admin@example.com" && formData.password === "admin123") {
        // Guardar información de sesión en localStorage (simplificado para este ejemplo)
        localStorage.setItem("isAuthenticated", "true"); // Mantener consistencia con el nombre de variable
        localStorage.setItem("user", JSON.stringify({
          name: "Administrador",
          email: formData.email,
          role: "admin"
        }));

        toast.success("Inicio de sesión exitoso");

        // Redirigir al dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.error("Credenciales incorrectas");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      toast.error("Error al iniciar sesión");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Acceso al Panel de Administración</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Button type="button" variant="link" className="px-0 text-xs font-normal h-auto">
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>

            {/* Credenciales de demo */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Para probar, usa:</p>
              <p className="font-semibold">Email: admin@example.com</p>
              <p className="font-semibold">Contraseña: admin123</p>
            </div>
            
            {/* Enlace al sitio principal */}
            <div className="mt-4 text-center">
              <a href="/" className="text-sm text-blue-600 hover:underline">
                Volver al sitio principal
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}