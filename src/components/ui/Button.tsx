import type { ReactNode, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
}

export function Button({ children, variant = 'primary', ...rest }: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant}`}
      {...rest}
    >
      {children}
    </button>
  )
}