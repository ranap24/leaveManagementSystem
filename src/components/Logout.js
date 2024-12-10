import { useNavigate } from "react-router-dom";
import { logout } from "../Http/auth";
import { useEffect } from "react";

export default function Logout({isLoggedIn,handleLogout})
{
  const navigate = useNavigate();
  useEffect(
    () =>
    {
       const logOut = async() =>{ 
       
        if(isLoggedIn)
        {
            const response = await logout();
            if(response.isSuccess)
            {
               handleLogout();
            }
        }
        else{
            navigate('/login');
        }
        }
        logOut();
        
    },[isLoggedIn]
  ) 
}