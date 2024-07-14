export interface IUserDataProps {
  id: number
  name: string
  email: string
  username: string
  created_at: string
  updated_at: string
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
}

export interface GlobalContextProviderProps {
  children: React.ReactNode
}
