import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AddPost from "./Pages/AddPost";
import EditPost from './Pages/EditPost'
import Signup from './Pages/Signup'
// import Login from './Pages/Login'
import Login from './components/Login'
import AllPosts from './Pages/AllPosts'
import  Post  from './Pages/Post'
import Home  from './Pages/Home'
import { RouterProvider , createBrowserRouter } from 'react-router-dom'
import  AuthLayout from './components/AuthLayout'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
        
      },
      {
        path: "/login",
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        ),
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        ),
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication>
            {" "}
            <AllPosts/>
          </AuthLayout>
        ),
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path:"/post/:slug",
        element:<Post/>,
      },
      
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>,
)
