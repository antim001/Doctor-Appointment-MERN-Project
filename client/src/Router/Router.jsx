import {createBrowserRouter} from "react-router-dom";
import  Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx'
const router = createBrowserRouter([
  
    {
      path: "/",
      element: <div>Doctor appointment system</div>,
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