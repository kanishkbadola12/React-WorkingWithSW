import './App.css'
import { useEffect } from 'react';
import UserForm from './UserForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserTable from './UserTable';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserForm />
    },
    {
      path: 'table',
      element: <UserTable />,
    }
  ]);

  const registerSW = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/ServiceWorker.js');
    }
  };

  useEffect(() => {
    registerSW();
  }, []);

  return <RouterProvider router={router} />
}

export default App
