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
    </div>
  );
};

export default RegistrationForm;
