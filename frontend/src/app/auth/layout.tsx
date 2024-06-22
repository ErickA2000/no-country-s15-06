import { getUserSessionServer } from "@/actions"
import { Footer, NavBar } from "@/components"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: 'Registro - Iniciar Sesión',
  description: 'Pagina de registro e inicio de sesión',
}

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen">
      <div>
        <NavBar />
        <div className="bg-custom-gradient">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  )
}
