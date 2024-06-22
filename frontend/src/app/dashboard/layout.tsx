import { getUserSessionServer } from "@/actions"
import { Search, Sidebar, TopMenu } from "@/components"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
}

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/')
  }

  return (
    <main>
      <Sidebar />
      <TopMenu />
      <div className="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen p-3">
        <Search />
        {children}
      </div>
    </main>
  )
}
