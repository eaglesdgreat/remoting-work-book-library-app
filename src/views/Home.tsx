// @ts-expect-error using alias as import so not an error
import { Types } from '@/types'
import { useNavigate } from "react-router-dom";
// @ts-expect-error using alias as import so not an error
import { useAllBooks } from '@/hooks/api/bookkkks/useAllBooks'
import { useEffect } from 'react';
// @ts-expect-error using alias as import so not an error
import { useGlobalContextSelector } from '@/context/GlobalContext'

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useGlobalContextSelector((ctx) => ctx[1]);
  const fetchAllBooks = useAllBooks();

  useEffect(() => {
    const response = fetchAllBooks({ first: 20, page: 1 })

    if (response.status == 200) {
      dispatch({
        type: Types.AddBooks,
        payload: response.data
      })
      navigate('/books')
    }
  })

  return (
    <div>Home</div>
  );
}

export default Home;
