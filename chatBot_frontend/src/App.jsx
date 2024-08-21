import {useEffect, useState} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { socket } from './socket.js'
import { Room } from './components/Room'
import { Toaster } from "react-hot-toast"
import './App.css'
import {ErrorPage} from "./components/ErrorPage.jsx";
import {Login} from "./components/Login.jsx";
import { User } from './components/User.jsx';
import { GroupChat } from './components/GroupChat.jsx'
import { AllGroups } from './components/AllGroups.jsx'
import { QueryClientContext, QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/http.js'
import { DummyChat } from './components/DummyChat.jsx'
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
            element:<Login />
        },
        {
            path:'/user',
            element:<User />
        },
        {
            path:'/group/:groupId',
            element: <GroupChat />
        },
        {
            path:'/groups/all',
            element: <AllGroups />
        },
        {
          path:'/dummy/all/:groupId',
          element: <DummyChat />
        },
    ]);



  return (
      <>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                backgroundColor: "white",
                color: "green",
                border: "1px solid green",
                padding: "15px",
                marginRight: "20px",
              },
              iconTheme: {
                primary: "green",
                secondary: "white",
              },
            },
            error: {
              style: {
                backgroundColor: "white",
                color: "red",
                border: "1px solid red",
                padding: "15px",
                marginRight: "20px",
              },
              iconTheme: {
                primary: "red",
                secondary: "white",
              },
            },
          }}
        />
        </QueryClientProvider>
      </>
  )
}

export default App
