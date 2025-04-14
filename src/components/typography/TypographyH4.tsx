import { cn } from '@/lib/utils';
import { FC, ComponentProps } from 'react';

export const TypographyH4: FC<ComponentProps<'h3'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight first-letter:uppercase',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};
