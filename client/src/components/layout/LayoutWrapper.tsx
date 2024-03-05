import { type ReactNode } from 'react'

type RootLayoutPropsType = {
  children: ReactNode
}

export const LayoutWrapper = ({ children }: RootLayoutPropsType) => {
  return (
    <>
      <main className="flex-1">{children}</main>
    </>
  )
}
