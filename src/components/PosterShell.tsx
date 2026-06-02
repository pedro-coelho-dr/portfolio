import type { ReactNode } from 'react'

type PosterShellProps = {
  children: ReactNode
}

function PosterShell({ children }: PosterShellProps) {
  return (
    <div className="poster-shell">
      <div aria-hidden="true" className="poster-atmosphere" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default PosterShell
