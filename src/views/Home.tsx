// @ts-expect-error using alias as import so not an error
import { Types } from '@/types'
// @ts-expect-error using alias as import so not an error
import { useGetAllBooks } from '@/hooks/api/books/useGetAllBooks'
import { useEffect } from 'react';
// @ts-expect-error using alias as import so not an error
import { useGlobalContext } from '@/context/GlobalContext'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { state : { books }, dispatch } = useGlobalContext();
  const fetchAllBooks = useGetAllBooks();

  useEffect(() => {
    console.log(books);
    // IIFE used
    void (async () => {
      if (books.length == 0) {
        await fetchBooks();
      } else {
        setTimeout(() => navigate('/books'), 3000)
      }
    })();
  }, [books])

  const fetchBooks = async () => {
    const response = await fetchAllBooks({ first: 20, page: 1 });

    if (response.status == 200) {
      dispatch({
        type: Types.AddBooks,
        payload: response.data
      })

      setTimeout(() => navigate('/books'), 3000)
    }
  }

  return (
    <div>Home</div>
  );
}

export default Home;
