import { cn } from '@/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import type React from 'react'

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-25',
      false: 'hidden'
    }
  },
  defaultVariants: {
    show: true
  }
})

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12'
    }
  },
  defaultVariants: {
    size: 'medium'
  }
})

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string
  children?: React.ReactNode
}

export const Spinner = ({
  size,
  show,
  children,
  className
}: SpinnerContentProps) => {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  )
}
