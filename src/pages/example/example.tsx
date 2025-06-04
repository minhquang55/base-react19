import { AlertExample } from "@/components/features/example/alert-example"
import { ApiExample } from "@/components/features/example/api-example"
import { ChartExample } from "@/components/features/example/chart-example"
import { DialogExample } from "@/components/features/example/dialog-example"

export const Example = () => {
  return (
    <div>
      <ApiExample />
      <AlertExample />
      <DialogExample />
      <ChartExample />
    </div>
  )
}
