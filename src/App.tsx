import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthLayout from './layout/AuthLayout'
import BookListing from './views/books/BookListing'
import DashboardLayout from './layout/DashboardLayout'
import Home from './views/Home'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
// @ts-expect-error using alias as import so not an error
import Spinner from '@/components/LazyLoader';
import { ToastContainer } from 'react-toastify'
// @ts-expect-error using alias as import so not an error
import { useGlobalContext } from '@/context/GlobalContext'

function App() {
  const { state: { isSpinnerVisible } } = useGlobalContext();

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
        // transition: Bounce
      />

      <BrowserRouter>
        <div className="App mx-auto max-w-6xl text-center my-8">
          <div>
              <Routes>
                <Route element={<DashboardLayout />}>
                {/* <Route path="/books" element={<BookListing />} /> */}
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookListing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>

      <Spinner show={isSpinnerVisible} />
    </>
  );
}

export default App;
