import LeaveApplication from "./LeaveApplication";
import { useLoaderData,Navigate } from "react-router-dom";
import { getManagerForUser } from "../../http/auth";

function ApplyLeave({isLoggedIn}) {
  const loaderData = useLoaderData();

  if(isLoggedIn)
  {

      return <LeaveApplication method="POST" loaderData={loaderData}/>;
  }
  else
  {
    return <Navigate to="/login" replace />;
  }
}

export async function loader() {
  const Token = localStorage.getItem("Token");
  if (Token) {
    const tokenArray = Token.split(".");
    const tokenPayload = JSON.parse(atob(tokenArray[1]));
    const result = await getManagerForUser(Number(tokenPayload.sub));
    const response = await result.json();
    const postloaderObject = {
      empId: response.data.empId,
      empName: response.data.empName,
      managerId: response.data.managerId,
      managerName: response.data.managerName,
    };
    return postloaderObject;
  } else {
    throw new Error("No token exists, User not logged In");
  }
}

export default ApplyLeave;
