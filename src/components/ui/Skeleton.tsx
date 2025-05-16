import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const skeletonVariants = cva(
  'animate-pulse bg-gray-100 rounded',
  {
    variants: {
      variant: {
        default: 'bg-gray-100',
        circular: 'rounded-full',
        text: 'bg-gray-100',
      },
      size: {
        sm: 'h-4',
        default: 'h-6',
        lg: 'h-8',
        xl: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  count?: number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, count = 1, ...props }, ref) => {
    if (count > 1) {
      return (
        <div className="space-y-2">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={cn(skeletonVariants({ variant, size, className }))}
              {...props}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

export { Skeleton, skeletonVariants };
