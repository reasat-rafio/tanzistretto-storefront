import { tv, type VariantProps } from 'tailwind-variants';
export { default as Badge } from './badge.svelte';

export const badgeVariants = tv({
  base: 'inline-flex select-none items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow ',
  variants: {
    variant: {
      default:
        'border-transparent bg-white text-primary hover:bg-white/80 backdrop-blur-sm',
      secondary:
        'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type Variant = VariantProps<typeof badgeVariants>['variant'];
