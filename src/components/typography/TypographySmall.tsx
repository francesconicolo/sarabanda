import { cn } from '@/lib/utils';
import { FC, ComponentProps } from 'react';

export const TypographySmall: FC<ComponentProps<'small'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <small
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    >
      {children}
    </small>
  );
};
