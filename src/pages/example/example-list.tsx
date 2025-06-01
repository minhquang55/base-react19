import { useQuery } from "@tanstack/react-query"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Giả lập API fetch, bạn thay bằng API thật của bạn
const fetchData = async (search: string) => {
  // Dữ liệu mẫu
  const allData = [
    { id: 1, name: "Alice", email: "alice@email.com" },
    { id: 2, name: "Bob", email: "bob@email.com" },
    { id: 3, name: "Charlie", email: "charlie@email.com" },
    { id: 4, name: "David", email: "david@email.com" },
    { id: 5, name: "Eve", email: "eve@email.com" },
    { id: 6, name: "Frank", email: "frank@email.com" },
    { id: 7, name: "Grace", email: "grace@email.com" },
    { id: 8, name: "Heidi", email: "heidi@email.com" },
    { id: 9, name: "Ivan", email: "ivan@email.com" },
    { id: 10, name: "Judy", email: "judy@email.com" },
  ]

  // Lọc theo search nếu có
  if (search) {
    return allData.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    )
  }
  return allData
}

type RowData = {
  id: number
  name: string
  email: string
}

export const ExampleList = () => {
  const [search, setSearch] = useState("")
  const [globalFilter, setGlobalFilter] = useState("")
  const [rowSelection, setRowSelection] = useState({})

  // Query data từ API, refetch khi search thay đổi
  const { data = [], isLoading } = useQuery({
    queryKey: ["table-data", globalFilter],
    queryFn: () => fetchData(globalFilter),
  })

  // Định nghĩa column cho table
  const columns: ColumnDef<RowData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={value => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: info => info.getValue(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button size="sm" variant="outline" onClick={() => alert(`Edit ${row.original.id}`)}>
          Edit
        </Button>
      ),
    },
  ]

  // Khởi tạo table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: search,
      rowSelection,
    },
    onGlobalFilterChange: setSearch,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    manualSorting: false,
    enableRowSelection: true,
  })

  // Xử lý search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalFilter(search)
  }

  const handleClear = () => {
    setSearch("")
    setGlobalFilter("")
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button type="submit">Search</Button>
        <Button type="button" variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </form>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: " ▲",
                      desc: " ▼",
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className={row.getIsSelected() ? "bg-blue-50" : ""}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="ml-2"
          >
            Next
          </Button>
        </div>
        <div>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
      </div>
    </div>
  )
}
