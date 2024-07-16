import {createBrowserRouter} from "react-router-dom";
import  Register from '../pages/Register.jsx'
const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Doctor appointment system</div>,
    },
    {
        path:"/register",
        element:<Register></Register>

    }
  ]);
  export default router