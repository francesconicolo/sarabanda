import { cn } from '@/lib/utils';
import { FC, ComponentProps } from 'react';

export const TypographyInlineCode: FC<ComponentProps<'code'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
};
