import { File, Home } from "lucide-react"

import type { MenuGroup } from "@/types/common.type"

export const API_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  ERR_NETWORK: "ERR_NETWORK",
}

export const MENU_ITEMS: MenuGroup[] = [
  {
    group: "General",
    children: [
      {
        title: "ダッシュボード",
        url: "/",
        icon: Home,
      },
    ],
  },
  {
    group: "Example",
    children: [
      {
        title: "Sample component",
        url: "/example",
        icon: File,
      },
      {
        title: "Sample list",
        url: "/sample-list",
        icon: File,
      },
    ],
  },
]

export const LOGOUT_MESSAGE_CODE = []

export const ERROR_FORBIDDEN_MESSAGE = "Forbidden"

export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
}

export const MAX_LENGTH = {
  100: 100,
  255: 255,
  1000: 1000,
}
