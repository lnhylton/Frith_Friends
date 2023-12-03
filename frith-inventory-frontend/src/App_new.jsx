import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Link,
} from "react-router-dom";

const Dashboard = () =>{
  return <div>
    <NavBar/>
    <hr/>
    <Outlet/>
    <Footer/>
  </div>
}

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Dashboard/>, 
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/posters",
        element: <Posters/>
      },
  ] 
  },
  { path: "/register", element: <Register/>},
  { path: "*", element: <ErrorPage/>}
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  )
}

export default App
