import { cva, type VariantProps } from 'class-variance-authority';

export { default as Badge } from './Badge.vue';

export const badgeVariants = cva(
  'py-0.3 inline-flex items-center rounded-md border px-1.5 text-[0.625rem] font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        new: 'border-transparent bg-cyan-500 text-primary-foreground hover:bg-cyan-500/80',
        viewed: 'text-foreground',
        progress: 'border-transparent bg-amber-500 text-primary-foreground hover:bg-amber-400/80',
        technical: 'border-transparent bg-red-600 text-primary-foreground hover:bg-yellow-400/80',
        closed: 'border-transparent bg-green-600 text-primary-foreground hover:bg-green-400/80',
        deferred: 'border-transparent bg-violet-600 text-primary-foreground hover:bg-violet-400/80',
      },
    },
    defaultVariants: {
      variant: 'new',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
