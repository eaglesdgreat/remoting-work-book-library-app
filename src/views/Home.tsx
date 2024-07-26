import { useEffect, useRef } from 'react';

// @ts-expect-error using alias as import so not an error
import { Types } from '@/types'
// @ts-expect-error using alias as import so not an error
import { useGetAllBooks } from '@/hooks/api/books/useGetAllBooks'
// @ts-expect-error using alias as import so not an error
import { useGlobalContext } from '@/context/GlobalContext'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { state : { books }, dispatch } = useGlobalContext();
  const fetchAllBooks = useGetAllBooks();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const fetchBooks = async () => {
    const response = await fetchAllBooks({ first: 10, page: 1 });

    if (response.status == 200) {
      dispatch({
        type: Types.AddBooks,
        payload: response.data
      })

      setTimeout(() => navigate('/books'), 2000)
    }
  }

  useEffect(() => {
    if (!timeout.current || books.length === 0) {
      timeout.current = setTimeout(() => fetchBooks(), 1000)
    } else {
      setTimeout(() => navigate('/books'), 2000)
    }
  
    return () => {
      clearTimeout(timeout.current)
    }
  }, [books])

  return (
    <div className="w-100 flex">
      <div>
        <h3>My <span>Book</span> shelf</h3>
      </div>
    </div>
  );
}

export default Home;
