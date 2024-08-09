import { useEffect, useRef } from 'react';

// @ts-expect-error using alias as import so not an error
import { Types } from '@/types'
// @ts-expect-error using alias as import so not an error
import { useGetAllBooks } from '@/hooks/api/books/useGetAllBooks'
// @ts-expect-error using alias as import so not an error
import { useGlobalContext } from '@/context/GlobalContext'
import { useNavigate } from 'react-router-dom';
import homeLogo from '@/assets/home_logo.png'
import styles from './home.module.css'

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

      dispatch({
        type: Types.Pagination,
        payload: response.paginatorInfo
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
    <div className={styles.home}>
      <div className={`${styles.container} animate-pulse`}>
        <img  src={homeLogo} alt="home"/>
      </div>
    </div>
  );
}

export default Home;
