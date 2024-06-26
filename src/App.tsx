import { createBrowserRouter, RouterProvider } from "react-router-dom";
import logo from './assets/logo.webp'
import HomePage from '@/pages/home'
import DetailPage from '@/pages/detail'


import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "detail/:pokemonname",
      element: <DetailPage />,
    },
  ]);

  return (
    <div className="w-full">
      <div className="w-full h-24 flex items-center justify-center bg-blue-950 absolute top-0 left-0 right-0 ">      
          <img className="h-16 object-cover" src={logo} alt="logo" />
      </div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
