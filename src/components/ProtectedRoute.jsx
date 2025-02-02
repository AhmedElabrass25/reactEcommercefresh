import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
  if (localStorage.getItem("token")) {
    return children
  }
  else{
    //use  <Navigate/> beacause ProtectedRoute should return component.
    return <Navigate to={"/login"}/> 
  }
};

export default ProtectedRoute;
