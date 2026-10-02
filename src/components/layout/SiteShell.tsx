import { Header } from './Header'
import { Footer } from './Footer'
import type { ReactNode } from 'react'

interface SiteShellProps {
  cinematic: ReactNode
  children: ReactNode
  onBookTable?: () => void
  onOpenMenuPage?: () => void
}

/**
 * Wraps the whole site: header, cinematic stage, main content, footer.
 * The `cinematic` slot is the only place a 3D scene may mount — swap it
 * for a 2D/2.5D or reduced-motion component without touching the shell.
 */
export function SiteShell({ cinematic, children, onBookTable, onOpenMenuPage }: SiteShellProps) {
  return (
    <div className="site-shell">
      <Header onBookTable={onBookTable} onOpenMenuPage={onOpenMenuPage} />
      {cinematic}
      {children}
      <Footer onBookTable={onBookTable} onOpenMenuPage={onOpenMenuPage} />
    </div>
  )
}