import type { ReactNode } from "react"

export function TypographyH2({ children }: { readonly children: ReactNode }) {
  return (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  )
}
