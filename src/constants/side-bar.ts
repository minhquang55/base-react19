import { File, Home, Table } from "lucide-react"

import type { MenuGroup } from "@/types/common.type"

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
  {
    group: "Table",
    children: [
      {
        title: "Simple table",
        url: "/simple-table",
        icon: Table,
      },
      {
        title: "Selected table",
        url: "/selected-table",
        icon: Table,
      },
    ],
  },
]
