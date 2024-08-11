import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import DashboardLayout from './layout/DashboardLayout'
// @ts-expect-error using alias as import so not an error
import Spinner from '@/components/LazyLoader';
import { ToastContainer } from 'react-toastify'
// @ts-expect-error using alias as import so not an error
import { useGlobalContext } from '@/context/GlobalContext'
import { Suspense, lazy, useState, useEffect } from 'react';

const Home = lazy(() => import('./views/Home'));
const Login = lazy(() => import('./views/auth/Login'))
const Register = lazy(() => import('./views/auth/Register'))
const BookListing = lazy(() => import('./views/books/BookListing'))

function App() {
  const { state: { isSpinnerVisible } } = useGlobalContext();
  const [showSpinner, setShowSpinner] = useState<boolean>(isSpinnerVisible);

  useEffect(() => {
    setShowSpinner(isSpinnerVisible)
  }, [isSpinnerVisible])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="App mx-auto size-full">
        <Suspense
          fallback={
            <div className="flex justify-center">
              {/* <Spinner show={isSpinnerVisible} /> */}
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<DashboardLayout />}>
              {/* <Route path="/books" element={<BookListing />} /> */}
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/books" element={<BookListing />} />
            </Route>
          </Routes>
        </Suspense>
      </div>

      <Spinner show={showSpinner} delay={500} />
    </>
  );
}

export default App;
