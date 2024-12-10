import { useNavigate } from "react-router-dom";
import { deletLeave } from "../Http/leave";

function DeleteLeave({ leaveId }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to cancel this request?");
        if (confirmed) {
            try {
                const response = await deletLeave(leaveId);
                const {isSuccess} = await response.json();
                if(isSuccess)
                {
                    navigate("/leaveList");
                }
                else
                {
                    alert("Error occured:" + data.message);
                }
            } catch (err) {
                alert("Error occurred: " + err.message); 
        } 
    }
    else {
            
            navigate("/leaveList");
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Leave</button>
        </div>
    );
}

export default DeleteLeave;


