import { useNavigate } from "react-router-dom";
import { DeleteUser } from "../../Http/auth";
import toast from "react-hot-toast";

function DeleteUserButton({ empId }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmed = window.confirm("Deleting the User?");
        if (confirmed) {
            try {
                const response = await DeleteUser(empId);
                const {isSuccess,message} = await response.json();
                if(isSuccess)
                {
                    toast.success(message);
                    navigate("/listUsers");
                }
                else
                {
                    toast.error("Error occured:" + message);
                }
            } catch (err) {
                alert("Error occurred: " + err.message); 
        } 
    }
    else {
            
            navigate("/listUsers");
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default DeleteUserButton;


