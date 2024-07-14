// import { useState } from 'react';
// @ts-expect-error using alias as import so not an error
import GlobalContextProvider from '@/context/GlobalContext'; 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// @ts-expect-error using alias as import so not an error
import Login from '@/views/auth/Login'
// @ts-expect-error using alias as import so not an error
import Register from '@/views/auth/Register'
// import Dashboard from 'views/dashboard/Dashboard'

function App() {
  // const [count, setCount] = useState(0);

  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <div className="App mx-auto max-w-6xl text-center my-8">
          <h1 className="font-semibold text-2xl">
            React - The Road To Enterprise
          </h1>
          <nav className="my-8 space-x-4">
            <Link to="/">Dashboard</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
          <div>
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
