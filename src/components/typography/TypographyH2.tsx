import { cn } from '@/lib/utils';
import { FC, ComponentProps } from 'react';

export const TypographyH2: FC<ComponentProps<'h2'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 first-letter:uppercase',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};
