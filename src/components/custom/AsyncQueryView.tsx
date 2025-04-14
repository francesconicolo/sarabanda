import type { UseQueryResult } from '@tanstack/react-query';
import type { ReactNode } from 'react';

export type AsyncQuery<T> = UseQueryResult<T, unknown>;

export interface AsyncQueryViewProps<T> {
  query: UseQueryResult<T, unknown>;
  loading?: ReactNode;
  error?: (error: unknown) => ReactNode;
  data: (data: T) => ReactNode;
}

export const AsyncQueryView = <T,>(props: AsyncQueryViewProps<T>) => {
  if (props.query.isLoading) {
    return props.loading ?? props.loading;
  }

  if (props.query.isError) {
    return props.error && props.error(props.query.error);
  }

  if (props.query.data) {
    return props.data(props.query.data);
  }
};
