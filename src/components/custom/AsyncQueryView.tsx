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
  // Treat fetching/loading as loading state so caller sees consistent UI
  if (props.query.isLoading || props.query.isFetching) {
    return props.loading ?? null;
  }

  if (props.query.isError) {
    return props.error ? props.error(props.query.error) : null;
  }

  if (props.query.isSuccess) {
    return props.data(props.query.data as T);
  }

  return props.loading ?? null;
};
