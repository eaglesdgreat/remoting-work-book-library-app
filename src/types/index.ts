export interface IUserDataProps {
  id: number
  name: string
  email: string
  username: string
  created_at: string
  updated_at: string
}

export interface IRating {
  rating: number;
  user_id: number;
}

export interface IAuthor {
  id: number
  name: string
  about: string
}

export interface IAuthResponseProps {
  data: IUserDataProps;
  token: string;
}

export interface IRegisterProps {
  name: string
  username: string
  email: string
  password: string
  password_confirmation: string
}

export type ILoginProps = Pick<IRegisterProps, 'email' | 'password'>;

export interface GlobalContextValue {
  isSpinnerVisible: boolean;
  user: IUserDataProps;
  books: IBookResponseProps[]
  token: string | null
  paginationInfo: IPaginationProps 
}

export interface GlobalContextProviderProps {
  children: React.ReactNode
}

export interface IBookResponseProps {
  id: number
  title: string
  author_ids?: number[]
  description: string
  image: File
  publisher: string
  published_date: string | Date
  book: File
  subtitle: string | null
  number_of_pages: number | null
  language: string | null
  created_at: string
  updated_at: string
  rating: number | null
  ratings: IRating[] | []
  authors: IAuthor[]
}

export type IBookProps = Pick<
  IBookResponseProps,
  'title' | 'author_ids' | 'description' | 'image' | 'publisher' | 'published_date' | 'book'
> & {subtitle?: string; number_of_pages?: number; language?: string}

export interface IFilter {
  column: string
  operator: string
  value: NonNullable<unknown>
}

export interface ISort {column: string; order: string}

export interface PaginationParamsProps {
  first?: number;
  page?: number;
  filter?: IFilter[]
  search?: string
  sort?: ISort[]
}

export interface IPaginationProps {
  count: number
  currentPage: number
  hasMorePages: boolean
  lastPage: number
  perPage: number
  total: number
//   firstItem: firstItem()
//   lastItem: lastItem()
}

export enum Types {
  AddUser = 'ADD_USER',
  Spinner = 'TOGGLE_SPINNER',
  AddToken = 'ADD_TOKEN',
  RemoveToken = 'REMOVE_TOKEN',
  GetToken = 'GET_TOKEN',
  AddBooks = 'ADD_BOOKS',
  Pagination = 'PAGINATION'
}
