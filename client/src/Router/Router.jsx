import {createBrowserRouter} from "react-router-dom";
import  Register from '../pages/Register.jsx';
import Home from "../pages/Home.jsx";
import Login from '../pages/Login.jsx'
const router = createBrowserRouter([
  
    {
      path: "/",
      element: <Home></Home>,
    },
    {
        path:"/register",
        element:<Register></Register>

    },{
      path:'/login',
      element:<Login></Login>
    }
  ]);
  export default router