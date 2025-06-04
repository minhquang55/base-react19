import { map } from "lodash-es"
import * as React from "react"
import { useNavigate } from "react-router-dom"

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
  useSidebar,
} from "@/components/shared/ui/sidebar"
import { MENU_ITEMS } from "@/constants/side-bar"
import { NavMain } from "@/layouts/components/nav-main"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const navigate = useNavigate()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:!text-[#f7f8f8]">
              <button onClick={() => navigate("/")} className="hover:!bg-[unset]">
                <div className="flex items-center justify-center">
                  <img src={state === "collapsed" ? logo : logoDark} alt="Logo" className="w-full h-auto" />
                </div>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {map(MENU_ITEMS, (item) => (
          <NavMain key={item.group} items={item} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
