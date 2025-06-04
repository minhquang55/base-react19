import { toast } from "sonner"

import { Button } from "../../shared/ui/button"

export const AlertExample = () => {
  return (
    <div className="mb-4">
      <h1>Alert Example</h1>
      <div style={{ display: "flex", gap: 12 }}>
        <Button variant="secondary" onClick={() => toast.info("Đây là toast info!")}>
          Toast Info
        </Button>
        <Button variant="default" onClick={() => toast.success("Thành công!")}>
          Toast Success
        </Button>
        <Button variant="destructive" onClick={() => toast.error("Có lỗi xảy ra!")}>
          Toast Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Toast có action", {
              action: {
                label: "Undo",
                onClick: () => toast.info("Đã undo!"),
              },
            })
          }
        >
          Toast Action
        </Button>
      </div>
    </div>
  )
}
