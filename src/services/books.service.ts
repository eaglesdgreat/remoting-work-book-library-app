// @ts-expect-error using alias as import so not an error
import { PaginationParamsProps } from '@/types';
// @ts-expect-error using alias as import so not an error
import { getAllPaginatedBooks } from '@/api/books.api';
// @ts-expect-error using alias as import so not an error
import { withAsync } from '@/helpers/withAsync';

export async function getAllBooksService(params: PaginationParamsProps) {
  const { response, error } = await withAsync(() => getAllPaginatedBooks(params));

  return {
    response,
    error
  }
}
