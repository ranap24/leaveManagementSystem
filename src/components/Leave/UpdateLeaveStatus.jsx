import { useNavigate } from "react-router-dom";
import { UpdateLeaveStatus } from "../../http/leave";
import { approved, rejected } from "../../util/StaticDetails";
import { toast } from "react-hot-toast";

function UpdateStatus({ leaveApplicationId, status, managerId, children }) {
  const navigate = useNavigate();
  let confirmed = false;
  const handleStatus = async () => {
    if (status === approved) {
      confirmed = window.confirm("Are you sure you want to approve?");
    } else if (status === rejected) {
      confirmed = window.confirm("Are you sure you want to reject?");
    }
    if (confirmed) {
      try {
        const response = await UpdateLeaveStatus({
          leaveApplicationId: leaveApplicationId,
          status: status,
          managerId: managerId,
        });
        const { isSuccess, message } = await response.json();
        if (isSuccess) {
          toast.success(message);
          navigate("/managerLeaves");
        } else {
          toast.error("Error occured:" + message);
        }
      } catch (err) {
        toast.error("Error occurred: " + err.message);
      }
    } else {
      navigate("/managerLeaves");
    }
  };

  return (
    <div>
      <button onClick={handleStatus}>{children}</button>
    </div>
  );
}

export default UpdateStatus;
