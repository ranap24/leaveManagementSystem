import LeaveApplication from "./LeaveApplication";
import { useLoaderData } from "react-router-dom";
import { getManagerForUser } from "../../Http/auth";


function ApplyLeave()
{
    const loaderData = useLoaderData();

  return (
    <LeaveApplication method = 'POST' loaderData = {loaderData}/>
  )
}

export async function  loader({request,params}) {

    const Token = localStorage.getItem('Token')
    if(Token)
    {
        const tokenArray = Token.split('.');
        const tokenPayload = JSON.parse(atob(tokenArray[1]));
        const result = await getManagerForUser(Number(tokenPayload.sub))  
        const response = await result.json();
        const postloaderObject = {
            empId : response.data.empId,
            empName : response.data.empName,
            managerId : response.data.managerId,
            managerName : response.data.managerName
        }
        // const putLoaderObject = 
        return postloaderObject;
    }
    else
    {
        throw new Error("No token exists, User not logged In");
    }
}

export default ApplyLeave;