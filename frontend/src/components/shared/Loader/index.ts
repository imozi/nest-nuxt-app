export const loaderVariants = cva('mx-2 inline-block animate-spin rounded-full border-2', {
  variants: {
    variant: {
      default: 'border-white border-b-transparent',
      primary: 'border-primary border-b-transparent',
    },
    size: {
      default: 'h-4 w-4',
      sm: 'h-6 w-6',
      xl: 'h-8 w-8 border-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type LoaderVariants = VariantProps<typeof loaderVariants>;
