import { Helmet } from 'react-helmet-async'

import type { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export const PageLayout = ({ title, children }: Props) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  )
}
