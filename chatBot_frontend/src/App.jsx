import {useEffect, useState} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { socket } from './socket.js'
import { Room } from './components/Room'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ErrorPage} from "./components/ErrorPage.jsx";
import {Login} from "./components/Login.jsx";

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const router = createBrowserRouter([
        {
            path:'/',
            element: <Room />
        },
        {
            path:'*',
            element: <ErrorPage />
        },
        {
            path:'/login',
            element:<Login/>
        }
    ]);



  return (
      <>
          <RouterProvider router={router} />
      </>
  )
}

export default App
