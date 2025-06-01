import { map } from "lodash-es"
import { useLocation, useNavigate } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { MenuGroup } from "@/types/common.type"

export function NavMain({ items }: { readonly items: MenuGroup }) {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{items.group}</SidebarGroupLabel>
      <SidebarMenu>
        {map(items.children, (item) => (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={location.pathname === item.url}
              onClick={() => navigate(item.url)}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
