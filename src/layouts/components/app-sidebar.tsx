"use client"

import {
  BookOpen,
  File,
  Frame,
  Home,
  Map,
  PieChart,
  Settings2
} from "lucide-react"
import * as React from "react"

import logoDark from "@/assets/logo-dark.svg"
import logo from "@/assets/logo.svg"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar"
import { NavMain } from "@/layouts/components/nav-main"
import { useNavigate } from "react-router-dom"

// This is sample data.
const data = {
  navMain: [
    {
      title: "ダッシュボード",
      url: "/",
      icon: Home,
    },
    {
      title: "プロジェクト",
      url: "/project",
      icon: File,
    },
    {
      title: "ドキュメント",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "設定",
      url: "#",
      icon: Settings2,
    },
  ],
  projects: [
    {
      title: "デザインエンジニアリング",
      url: "#",
      icon: Frame,
    },
    {
      title: "セールス&マーケティング",
      url: "#",
      icon: PieChart,
    },
    {
      title: "旅行",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const navigate = useNavigate()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:!text-[#f7f8f8]">
              <a onClick={() => navigate('/')} className="hover:!bg-[unset]">
                <div className="flex items-center justify-center">
                  <img
                    src={state === "collapsed" ? logo : logoDark}
                    alt="Logo"
                    className="w-full h-auto"
                  />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMain items={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
