import { cn } from '@/lib/utils';
import { FC, ComponentProps } from 'react';

export const TypographyH1: FC<ComponentProps<'h1'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl first-letter:uppercase',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
