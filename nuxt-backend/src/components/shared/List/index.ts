export const listVariants = cva('', {
  variants: {
    variant: {
      default: '',
      disc: 'my-4 list-disc pl-5',
      decimal: 'my-4 list-decimal pl-5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type ListVariants = VariantProps<typeof listVariants>;
