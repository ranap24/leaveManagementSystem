import { useNavigate } from "react-router-dom";
import { deleteLeave } from "../../http/leave";
import toast from "react-hot-toast";

function DeleteLeave({ leaveId }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm("Canceling the LeaveApplication?");
    if (confirmed) {
      try {
        const response = await deleteLeave(leaveId);
        const { isSuccess, message } = await response.json();
        if (isSuccess) {
          toast.success(message);
          navigate("/leaveList");
        } else {
          toast.error("Error occured:" + message);
        }
      } catch (err) {
        alert("Error occurred: " + err.message);
      }
    } else {
      navigate("/leaveList");
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Cancel</button>
    </div>
  );
}

export default DeleteLeave;
