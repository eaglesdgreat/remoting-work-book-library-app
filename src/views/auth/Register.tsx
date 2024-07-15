// @ts-expect-error using alias as import so not an error
import { useGlobalContextSelector } from '@/context/GlobalContext'
import React, { useState } from 'react';
// @ts-expect-error using alias as import so not an error
import { useRegisterUser } from '@/hooks/api/auth/useRegisterUser'
import { IAuthResponseProps } from "types"
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useGlobalContextSelector((ctx) => ctx[1]);
  const initRegisterUser = useRegisterUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await initRegisterUser({
        email,
        password,
        username,
        name,
        password_confirmation: confirmPassword
      }) as IAuthResponseProps;


      if (response.token) {
        dispatch({
          type: 'ADD_USER',
          payload: response.data
        })

        dispatch({
          type: 'ADD_TOKEN',
          payload: response.token
        })

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

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