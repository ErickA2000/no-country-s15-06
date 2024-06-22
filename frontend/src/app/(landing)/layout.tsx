import { Footer, NavBar } from "@/components"

export default async function DashboardLayout({
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
