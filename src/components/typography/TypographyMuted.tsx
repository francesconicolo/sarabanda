import { cn } from '@/lib/utils';
import { FC, ComponentProps } from 'react';

export const TypographyMuted: FC<ComponentProps<'p'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
};
