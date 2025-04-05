'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type AuthCheckProps = {
  children: React.ReactNode
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true'
      setIsAuthenticated(authStatus)
      setIsLoading(false)
      
      if (!authStatus) {
        router.push('/dashboard/login')
      }
    }
    
    checkAuth()
  }, [router])

  // Muestra un indicador de carga mientras verifica autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si está autenticado, muestra el contenido
  return isAuthenticated ? <>{children}</> : null
}