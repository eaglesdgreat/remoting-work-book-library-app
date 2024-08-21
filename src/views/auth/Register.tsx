// @ts-expect-error using alias as import so not an error
import { IAuthResponseProps, IRegisterProps, Types } from "@/types"
import React, { useState } from 'react';

// @ts-expect-error using alias as import so not an error
import AuthForm from '@/components/AuthForm';
import styles from './register.module.css'
// @ts-expect-error using alias as import so not an error
import { useGlobalContext } from '@/context/GlobalContext'
import { useNavigate } from 'react-router-dom';
// @ts-expect-error using alias as import so not an error
import { useRegisterUser } from '@/hooks/api/auth/useRegisterUser'

const initialForm = {
  name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const RegistrationForm = () => {
  const [form, setForm] = useState<IRegisterProps>(initialForm);

  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();
  const initRegisterUser = useRegisterUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: IRegisterProps) => {
    e.preventDefault();

    try {
      const response = await initRegisterUser({ ...formData }) as IAuthResponseProps;

      if (response.token) {
        dispatch({
          type: Types.AddUser,
          payload: response.data
        })

        dispatch({
          type: Types.AddToken,
          payload: response.token
        })

        setForm(initialForm)

        return navigate('/');
      }
    } catch(e) {
      // Nothing to catch
    }
  };

  return (
    <div className={styles.container}>
      <AuthForm<IRegisterProps>
        content={form}
        setFormData={setForm}
        handleSubmit={handleSubmit}
      />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center">Create Your Account</h1>
          <p className="text-gray-600 text-center mt-2">Sign up for a new account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="text-sm font-medium text-gray-700 text-left">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="text-sm font-medium text-gray-700 text-left">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 text-left">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 text-left">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 text-left">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
