import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { Suspense } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/layouts/components/app-sidebar"
import authStore from "@/stores/auth.store"
import { PATHS } from "@/utils/constants"

export default function AppLayout() {
  const auth = authStore.use.auth()
  const clearAuth = authStore.use.clearAuth()
  const notifications = [
    { id: 1, message: "Bạn có 1 thông báo mới" },
    { id: 2, message: "Đơn hàng #1234 đã được xác nhận" },
    { id: 3, message: "Có 2 bình luận mới" },
    { id: 4, message: "Tài khoản của bạn đã được cập nhật" },
    { id: 5, message: "Chào mừng bạn đến với dashboard!" },
    { id: 6, message: "Bạn có 1 thông báo mới" },
    { id: 7, message: "Đơn hàng #1234 đã được xác nhận" },
    { id: 8, message: "Có 2 bình luận mới" },
    { id: 9, message: "Tài khoản của bạn đã được cập nhật" },
    { id: 10, message: "Chào mừng bạn đến với dashboard!" },
  ]
  const notificationCount = notifications.length

  if (!auth) {
    return <Navigate to={PATHS.LOGIN} replace />
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center px-4 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-border bg-background">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="ml-auto flex items-center space-x-5">
            {/* Notification */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative w-fit cursor-pointer">
                  <Bell className="size-6" />
                  {notificationCount > 0 && (
                    <Badge
                      className="absolute -end-2.5 -top-2.5 h-5 min-w-5 rounded-full px-1 tabular-nums"
                      variant="destructive"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <ScrollArea className="h-72 w-full">
                  <ul className="divide-y">
                    {notifications.map((n) => (
                      <li key={n.id} className="px-4 py-3 text-sm hover:bg-muted/50 cursor-pointer">
                        {n.message}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </PopoverContent>
            </Popover>
            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2">
                  <span className="text-sm truncate max-w-[300px]">{auth?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    <span>プロフィール</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    <span>パスワード変更</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearAuth}>
                  <LogOut />
                  <span>ログオフ</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {/* Content */}
        <Suspense
          fallback={
            <div className="flex flex-1 flex-col gap-4 p-4 animate-pulse">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          }
        >
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  )
}
