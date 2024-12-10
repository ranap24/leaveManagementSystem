import { getLeave } from "../Http/leave";
import LeaveApplication from "./LeaveApplication";
import { useLoaderData } from "react-router-dom";

function EditLeave()
{
    const loaderData = useLoaderData();
    return (
        <LeaveApplication method="PUT" loaderData = {loaderData}/>
    );
}

export async function loader({request,params})
{
    const leaveId = params.leaveId;
    const Token = localStorage.getItem('Token')
    if(Token)
    {
        const tokenArray = Token.split('.');
        const tokenPayload = JSON.parse(atob(tokenArray[1]));
        const leaveResult = await getLeave(leaveId);
        const leaveResponse = await leaveResult.json();
        const loaderObject = {
            empId : tokenPayload.sub,
            empName : tokenPayload.name,
            managerId : leaveResponse.data.managerId,
            managerName : leaveResponse.data.managerName,
            phoneNumber : leaveResponse.data.empPhone,
            fromDate : leaveResponse.data.from_Date,
            toDate : leaveResponse.data.to_Date,
            reason : leaveResponse.data.reason,
            totalDays : leaveResponse.data.totalDays
        }
        return loaderObject;
    }
    else
    {
       throw new Error("No token, UnAuthorized") 
    }
}
export default EditLeave;