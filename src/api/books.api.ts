// @ts-expect-error using alias as import so not an error
import { IBookResponseProps, PaginationParamsProps } from '@/types'

import api from './api';

const URLS = {
  books: 'books',
}
// IBookProps,

export const getAllPaginatedBooks = (params: PaginationParamsProps) => {
  let parameters = `first=${params?.first ?? 10}&page=${params?.page ?? 1}`;

  if (params?.filter) {
    parameters = `${parameters}&${params.filter}`
  }

  if (params?.search) {
    parameters = `${parameters}&${params.search}`
  }

  if (params?.sort) {
    parameters = `${parameters}&${params.sort}`
  }

  return api.get<IBookResponseProps>(`${URLS.books}?${parameters}`)
}