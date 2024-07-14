import './App.css';

import reactLogo from './assets/react.svg';
import { useState } from 'react';
import viteLogo from '/vite.svg';
import GlobalContextProvider from 'context/GlobalContext'

function App() {
  const [count, setCount] = useState(0);

  return (
    <GlobalContextProvider>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="text-4xl text-blue-500">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </GlobalContextProvider>
  );
}

export default App;
