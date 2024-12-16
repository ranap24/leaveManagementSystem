import { useNavigate } from "react-router-dom";
import { logout } from "../../Http/auth";
import toast from "react-hot-toast";

export default function LogoutButton({handleLogout,...props}){

    const navigate = useNavigate();

    const onLogout = async () => {
        const confirmed = window.confirm("Logging Out");
        if (confirmed) {
            try {
                const response = await logout();
                const {isSuccess,message} =  response;
              if(isSuccess)
              {
                 handleLogout();
                 toast.success(message);
                 navigate('/login');
              }
                else
                {
                    toast.error("Error occured:" + message);
                }
            } catch (err) {
                alert("Error occurred: " + err.message); 
        } 
    }
}
    return (
            <button onClick={onLogout} {...props}>Logout</button>
    );

  
}
