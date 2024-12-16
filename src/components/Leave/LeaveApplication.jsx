import { Form, useActionData,useNavigate,useRouteError } from 'react-router-dom'; 
import Input from "../Input";  
import classes from '../css/form.module.css';  
import { useState,useRef,useEffect } from 'react';
import { modifyLeave } from '../../Http/leave';
import { leaveApplicationValidation } from '../../util/Validation';
import toast from 'react-hot-toast';

function LeaveApplication({method,loaderData}) {
    const [TotalDays,setTotalDays] = useState(loaderData.totalDays||0);
    const [formError, setFormError] = useState({});
    const error = useRouteError();
    const response = useActionData();
    const fromRef = useRef(0);
    const toRef= useRef(0);
    const navigate = useNavigate();

    useEffect(() => {
      if (response ) {
        if(response.isSuccess)
        {
            toast.success(response.message);
            navigate('/leaveList')
        }
        else
        {
            if(response.errors)
                {
                  setFormError(response.errors)
                }
                else
                {
                  toast.error(response.message)
                }
        }
      }
      if (error) {
        toast.error(error.message);
      }
    }, [response, error]);

    const calculateTotalDays = () => {
        const fromDate = new Date(fromRef.current.value);
        const toDate = new Date(toRef.current.value);

        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(0, 0, 0, 0);

        if (fromDate && toDate && !isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
            const diffInMs = toDate.getTime() - fromDate.getTime();
            const diffInDays = Math.round((diffInMs / (1000 * 3600 * 24)*10))/10 + 1; 
            setTotalDays(diffInDays ); 
        }

        if(formError && formError.fromDate || formError.toDate)
        {
            setFormError((prevErrors) => ({
                ...prevErrors,
                fromDate: null ,
                toDate: null 
            }));
        }
       
    };

    const handleInputChange = (e) => {
        const { name } = e.target;
        if(formError && formError[name])
        {
            setFormError((prevErrors) => ({
                ...prevErrors,
                [name]: null 
            }));
        }
       
    };

  



    return (
        <div className={classes.formContainer}> 
            <Form method = {method} className={classes.form}>  
                <h3 className={classes.formTitle}>Leave Application</h3>  
                <Input 
                    type="number"
                    id="employeeId"
                    name="employeeId" 
                    className={classes.input} 
                    value = {loaderData && loaderData.empId} 
                    readOnly
                    hidden
                />
                
                <Input 
                    type="text"
                    id="employeeName"
                    name="employeeName"  
                    value = {loaderData && loaderData.empName}
                    className={classes.input}  
                    readOnly
                    hidden
                />
                <Input 
                    label="Phone Number"
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"  
                    className={classes.input} 
                    onChange = {handleInputChange}
                    defaultValue = {(loaderData && loaderData.phoneNumber)&& loaderData.phoneNumber} 
                />
                {formError && formError.phoneNumber && <p className={classes.error}>{formError.phoneNumber}</p>}
                
                <Input 
                    type="text"
                    id="manager"
                    name="manager"  
                    className={classes.input}  
                    onChange = {handleInputChange}
                    value = {loaderData && loaderData.managerName}
                    readOnly
                    hidden
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
                    type="date"
                    id="from-date"
                    name="fromDate"  
                    className={classes.input} 
                    ref = {fromRef} 
                    onChange = {calculateTotalDays}
                    defaultValue = {(loaderData && loaderData.fromDate) && loaderData.fromDate}
                />
                {formError && formError.fromDate && <p className={classes.error}>{formError.fromDate}</p>}

                
                <Input 
                    label="To"
                    type="date"
                    id="to-date"
                    name="toDate" 
                    className={classes.input}
                    ref = {toRef}
                    onChange = {calculateTotalDays}
                    defaultValue = {(loaderData && loaderData.toDate) && loaderData.toDate}

                />
                {formError && formError.toDate && <p className={classes.error}>{formError.toDate}</p>}

                
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
                    onChange = {handleInputChange} 
                    textarea
                    className={classes.input}  
                    defaultValue = {(loaderData && loaderData.reason) && loaderData.reason}

                />
                {formError && formError.reason && <p className={classes.error}>{formError.reason}</p>}

                
                <button type="submit" className={classes.submitButton}>{method === "PUT" ? "Update" : "Apply"}</button> 
                <button type = "button" className={classes.submitButton} onClick={() => window.history.back()} >Cancel</button>
              {formError && formError.other&&<p className={classes.error}>{formError.other}</p>}
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

    const errors = leaveApplicationValidation(leaveApplication);
    if(Object.keys(errors).length > 0)
        {
          return {isSuccess : false, errors : {...errors}};
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
