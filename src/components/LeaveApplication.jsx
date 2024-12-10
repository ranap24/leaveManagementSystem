import { Form, useActionData,useNavigate,useRouteError } from 'react-router-dom'; 
import Input from "./Input";  
import classes from './css/form.module.css';  
import { useState,useRef,useEffect } from 'react';
import { modifyLeave } from '../Http/leave';

function LeaveApplication({method,loaderData}) {
    const [TotalDays,setTotalDays] = useState(loaderData.totalDays||0);
    const [formError, setFormError] = useState("");
    const error = useRouteError();
    const response = useActionData();
    const fromRef = useRef(0);
    const toRef= useRef(0);
    const navigate = useNavigate();

    useEffect(() => {
      if (response ) {
        if(response.isSuccess)
        {
            alert(response.message)
            navigate('/leaveList')
        }
        else
        {
            setFormError(response.message);
        }
      }
      if (error) {
        setFormError(error.message || "Problem occurred");
      }
    }, [response, error]);

    const calculateTotalDays = () => {
        const fromDate = new Date(fromRef.current.value);
        const toDate = new Date(toRef.current.value);

        if (fromDate && toDate && !isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
            const diffInMs = toDate.getTime() - fromDate.getTime();
            const diffInDays = Math.round((diffInMs / (1000 * 3600 * 24)*10))/10; 
            setTotalDays(diffInDays ); 
        }
    };



    return (
        <div className={classes.formContainer}> 
            <Form method = {method} className={classes.form}>  
                <h3 className={classes.formTitle}>Leave Application</h3>  
                <Input 
                    label="EmployeeId"
                    type="number"
                    id="employeeId"
                    name="employeeId" 
                    className={classes.input} 
                    value = {loaderData && loaderData.empId} 
                    readOnly
                />
                
                <Input 
                    label="EmployeeName"
                    type="text"
                    id="employeeName"
                    name="employeeName"  
                    value = {loaderData && loaderData.empName}
                    className={classes.input}  
                    readOnly
                />
                <Input 
                    label="Phone Number"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"  
                    className={classes.input} 
                    defaultValue = {(loaderData && loaderData.phoneNumber)&& loaderData.phoneNumber} 
                />
                
                <Input 
                    label="Manager"
                    type="text"
                    id="manager"
                    name="manager"  
                    className={classes.input}  
                    value = {loaderData && loaderData.managerName}
                    readOnly
                />
                    <Input 
                    type="number"
                    id="managerId"
                    name="managerId"  
                    className={classes.input}  
                    value = {loaderData && loaderData.managerId}
                    hidden
                    readOnly
                />
                
                <Input 
                    label="From"
                    type="datetime-local"
                    id="from-date"
                    name="fromDate"  
                    className={classes.input} 
                    ref = {fromRef} 
                    onChange = {calculateTotalDays}
                    defaultValue = {(loaderData && loaderData.fromDate) && loaderData.fromDate}
                />
                
                <Input 
                    label="To"
                    type="datetime-local"
                    id="to-date"
                    name="toDate" 
                    className={classes.input}
                    ref = {toRef}
                    onChange = {calculateTotalDays}
                    defaultValue = {(loaderData && loaderData.toDate) && loaderData.toDate}

                />
                
                <Input 
                    label="TotalDays"
                    type="number"
                    id="totalDays"
                    name="totalDays"  
                    className={classes.input} 
                    readOnly
                    value = {TotalDays}
                    
                />
                
                <Input
                    label="Reason"
                    type="text"
                    id="reason"
                    name="reason"  
                    textarea
                    className={classes.input}  
                    defaultValue = {(loaderData && loaderData.reason) && loaderData.reason}

                />
                
                <button type="submit" className={classes.submitButton}>{method === "PUT" ? "Update" : "Apply"}</button> 
                <button type = "button">Cancel</button>
              {formError && <p className={classes.error}>{formError}</p>}
            </Form>
        </div>
    );
}

export default LeaveApplication;


export async function action({request,params})
{
    const fd = await request.formData();
    const leaveApplication = {
        LeaveApplicationId : params.leaveId,
        EmpId : fd.get('employeeId'),
        EmpPhone : fd.get('phoneNumber'),
        ManagerId : fd.get('managerId'),
        ManagerName : fd.get('manager'),
        From_Date : fd.get('fromDate'),
        To_Date : fd.get('toDate'),
        TotalDays : fd.get('totalDays'),
        Reason : fd.get('reason')
    }

    try
    {
        const response = await modifyLeave(leaveApplication,request.method);
        return response;
    }
    catch(err)
    {
        throw new Error(err.message)
    }
}
