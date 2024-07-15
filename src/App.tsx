import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import BookListing from './views/books/BookListing'
import AuthLayout from './layout/AuthLayout'
import DashboardLayout from './layout/DashboardLayout'
import { ToastContainer } from 'react-toastify'
// @ts-expect-error using alias as import so not an error
import Spinner from '@/components/LazyLoader';
// @ts-expect-error using alias as import so not an error
import { useGlobalContextSelector } from '@/context/GlobalContext'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const globalItem = useGlobalContextSelector((ctx) => ctx[0]);

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
                <Route path="/books" element={<BookListing />} />
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="/" element={<BookListing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>

      <Spinner show={globalItem.isSpinnerVisible} />
    </>
  );
}

export default App;
