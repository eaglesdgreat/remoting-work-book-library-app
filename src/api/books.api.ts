// @ts-expect-error using alias as import so not an error
import { IBookResponseProps, PaginationParamsProps } from '@/types'

import api from './api';

const URLS = {
  books: 'books',
}
// IBookProps,

export const getAllPaginatedBooks = (params: PaginationParamsProps) => {
  let parameters = `first=${params?.first ?? 10}&page=${params?.page ?? 1}`;
  const config = {
    filter: null,
    sort: null,
  };

  if (params?.search) {
    parameters = `${parameters}&search=${params.search}`;
  }
  
  if (params?.filter) {
    config.filter = params.filter;
  }

  if (params?.sort) {
    config.sort = params.sort;
  }

  return api.get<IBookResponseProps>(`${URLS.books}?${parameters}`, {
    params: config,
    paramsSerializer: {
      indexes: true, // use brackets with indexes
    }
  })
}