import { AlertExample } from "@/components/example/alert-example"
import { ApiExample } from "@/components/example/api-example"
import { ChartExample } from "@/components/example/chart-example"
import { DialogExample } from "@/components/example/dialog-example"

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
