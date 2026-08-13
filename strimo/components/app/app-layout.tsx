'use client'

import {
  BellIcon,
  FileVideo,
  Landmark,
  LayoutDashboard,
  Settings,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '../ui/sidebar'

import { FC } from 'react'
import ChildrenInterface from '@/interface/children.interface'
import Logo from '../shared/logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FloatingDock } from '../ui/floating-dock'

const items = [
  { title: 'Dashboard', url: '/app/dashboard', icon: LayoutDashboard },
  { title: 'Library', url: '/app/library', icon: FileVideo },
  { title: 'Payments', url: '/app/payments', icon: Landmark },
  { title: 'Notification', url: '/app/notification', icon: BellIcon },
  { title: 'Settings', url: '/app/settings', icon: Settings },
]

// const dockItems = [
//   {
//     title: 'Dashboard',
//     icon: <LayoutDashboard size={18} />,
//     href: '/app/dashboard',
//   },
//   {
//     title: 'Library',
//     icon: <FileVideo size={18} />,
//     href: '/app/library',
//   },
//   {
//     title: 'Payments',
//     icon: <Landmark size={18} />,
//     href: '/app/payments',
//   },
//   {
//     title: 'Notification',
//     icon: <BellIcon size={18} />,
//     href: '/app/notification',
//   },
//   {
//     title: 'Settings',
//     icon: <Settings size={18} />,
//     href: '/app/settings',
//   },
// ]

const AppLayout: FC<ChildrenInterface> = ({ children }) => {
  const pathname = usePathname()

  return (
    <SidebarProvider>

      {/* SIDEBAR */}
      <Sidebar className="bg-black! border-r border-zinc-900 h-screen overflow-hidden hidden md:flex">

        <SidebarContent className="bg-black! h-screen px-4 py-6 flex flex-col justify-between">

          {/* TOP */}
          <div>

            {/* LOGO */}
            <div className="flex flex-col items-center pb-6 border-b border-zinc-900">

              <Logo />

              <p className="text-xs text-zinc-500 mt-2 tracking-widest uppercase">
                Creator Studio
              </p>

            </div>

            {/* MENU */}
            <SidebarGroup className="mt-8">

              <SidebarGroupLabel className="text-zinc-600 text-xs uppercase tracking-widest mb-4 px-2">
                Navigation
              </SidebarGroupLabel>

              <SidebarGroupContent>

                <SidebarMenu className="space-y-3">

                  {items.map((item) => {
                    const active = pathname === item.url

                    return (
                      <SidebarMenuItem key={item.title}>

                        <SidebarMenuButton asChild className="p-0 h-auto">

                          <Link
                            href={item.url}
                            className={`
                              flex items-center gap-4 px-4 py-3 rounded-2xl border transition-all
                              ${
                                active
                                  ? 'bg-linear-to-r from-fuchsia-500/10 via-indigo-500/10 to-sky-400/10 border-sky-500/20'
                                  : 'bg-zinc-950 border-zinc-900 hover:border-zinc-700'
                              }
                            `}
                          >

                            <div className="p-2 rounded-xl bg-black border border-zinc-800">
                              <item.icon className="h-5 w-5 text-sky-400" />
                            </div>

                            <span className="text-white text-sm font-medium">
                              {item.title}
                            </span>

                          </Link>

                        </SidebarMenuButton>

                      </SidebarMenuItem>
                    )
                  })}

                </SidebarMenu>

              </SidebarGroupContent>

            </SidebarGroup>

          </div>

          {/* BOTTOM CARD */}
          <div>

            <div className="rounded-2xl bg-zinc-950 border border-zinc-900 p-4">

              <p className="text-xs text-zinc-500">
                STRIMO PRO
              </p>

              <p className="text-sm text-white mt-1 font-semibold">
                Creator Workspace
              </p>

              <div className="mt-4 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-400" />
              </div>

            </div>

          </div>

        </SidebarContent>
      </Sidebar>

      {/* MAIN */}
      <main className="flex-1 min-h-screen bg-black pb-28 relative">

        {/* background */}
        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-5" />

          <div className="absolute bottom-10 right-10 w-72 h-72 bg-sky-500 rounded-full blur-3xl opacity-5" />

        </div>

        {/* HEADER */}
        <div className="relative z-10 border-b border-zinc-900 bg-black/70 backdrop-blur-xl px-4 md:px-8 py-5">

          <h1 className="text-xl font-semibold text-pink-500">
            {pathname.split('/').pop()?.split('-').join(" ").toUpperCase()}
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            Manage videos, content and analytics
          </p>

        </div>

        {/* CONTENT */}
        <div className="relative z-10 p-4 md:p-8">

          <div className="w-full rounded-3xl border border-zinc-900 bg-zinc-950/70 backdrop-blur-xl p-4 md:p-6 min-h-175">

            {children}

          </div>

        </div>

        {/* FLOATING DOCK ALL DEVICES */}
        {/* <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">

          <div className="bg-black/80 backdrop-blur-2xl border border-zinc-800 rounded-2xl px-4 py-2 shadow-2xl">

            <FloatingDock items={dockItems} />

          </div>

        </div> */}

      </main>

    </SidebarProvider>
  )
}

export default AppLayout