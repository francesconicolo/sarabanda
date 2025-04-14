import { cn } from '@/lib/utils';
import { FC, ComponentProps } from 'react';

export const TypographyBlockquote: FC<ComponentProps<'blockquote'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    >
      {children}
    </blockquote>
  );
};
