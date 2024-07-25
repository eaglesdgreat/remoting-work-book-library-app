// @ts-expect-error using alias as import so not an error
import { IAuthResponseProps, Types } from "@/types"
import React, { useState } from 'react';

// @ts-expect-error using alias as import so not an error
import { useGlobalContext } from '@/context/GlobalContext'
// @ts-expect-error using alias as import so not an error
import { useLoginUser } from '@/hooks/api/auth/useLoginUser'
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();
  const initLoginUser = useLoginUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await initLoginUser({ email, password }) as IAuthResponseProps;


      if (response.token) {
        dispatch({
          type: Types.AddUser,
          payload: response.data
        })

        dispatch({
          type: Types.AddToken,
          payload: response.token
        })

        dispatch({
          type: Types.GetToken,
          payload: 'token'
        })

        setEmail('')
        setPassword('')

        return navigate('/');
      }
    } catch(e) {
      // Nothing to catch
    }
  };

  return (
    <div className="flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
          <p className="text-gray-600 text-center mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            {/* <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
              Forgot password?
            </a> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;