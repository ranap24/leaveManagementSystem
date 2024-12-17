
export async function modifyLeave(leaveApplication,method)
{
const Token = localStorage.getItem('Token')

  try{
    if(Token)
        {
          const response = await fetch('https://lms-1leavemanagementapi20241217153708.azurewebsites.net/api/LeaveApplication',{
              method : method,
              body : JSON.stringify(leaveApplication),
              headers : {
                  "Authorization" : "Bearer "+Token,
                  "Content-Type" : "application/json"
              }
          });
          return response;
        }
        else
        {
            throw new Error('No token Not Logged In');
        }
  }
  catch(err)
  {
    throw new Error(err.message);
  }
    
}

export async function getAllLeaves(empId)
{
const Token = localStorage.getItem('Token')

    try{
        if(Token)
            {
              const response = await fetch('https://lms-1leavemanagementapi20241217153708.azurewebsites.net/api/LeaveApplication/GetAll/'+empId,{
                  headers : {
                      "Authorization" : "Bearer "+Token
                  }
              });
              return response;
            }
            else
            {
                throw new Error('No token Not Logged In');
            }
      }
      catch(err)
      {
        throw new Error(err.message);
      }
}

export async function getAllManagerLeaves(managerId)
{
const Token = localStorage.getItem('Token')

    try{
        if(Token)
            {
              const response = await fetch('https://lms-1leavemanagementapi20241217153708.azurewebsites.net/api/LeaveApplication/GetAllManagerLeaves/'+managerId,{
                  headers : {
                      "Authorization" : "Bearer "+Token
                  }
              });
              return response;
            }
            else
            {
                throw new Error('No token Not Logged In');
            }
      }
      catch(err)
      {
        throw new Error(err.message);
      }
}

export async function deleteLeave(leaveApplicationId)
{
const Token = localStorage.getItem('Token')

    try{
        if(Token)
            {
              const response = await fetch('https://lms-1leavemanagementapi20241217153708.azurewebsites.net/api/LeaveApplication/delete/'+leaveApplicationId,{
                  method : "DELETE",
                  headers : {
                      "Authorization" : "Bearer "+Token
                  }
              });
              return response;
            }
            else
            {
                throw new Error('No token Not Logged In');
            }
      }
      catch(err)
      {
        throw new Error(err.message);
      }
}

export async function getLeave(leaveApplicationId)
{
const Token = localStorage.getItem('Token')

    try{
        if(Token)
            {
              const response = await fetch('https://lms-1leavemanagementapi20241217153708.azurewebsites.net/api/LeaveApplication/'+leaveApplicationId,{
                  headers : {
                      "Authorization" : "Bearer "+Token,
                      "Content-Type" : "application/json"
                  }
              });
              return response;
            }
            else
            {
                throw new Error('No token Not Logged In');
            }
      }
      catch(err)
      {
        throw new Error(err.message);
      }
}

export async function UpdateLeaveStatus (obj)
{
const Token = localStorage.getItem('Token')

  try{
    if(Token)
        {
          const response = await fetch('https://lms-1leavemanagementapi20241217153708.azurewebsites.net/api/LeaveApplication/updateLeaveStatus',{
              method : "PUT",
              body : JSON.stringify(obj),
              headers : {
                  "Authorization" : "Bearer "+Token,
                  "Content-Type" : "application/json"
              }
          });
          return response;
        }
        else
        {
            throw new Error('No token Not Logged In');
        }
  }
  catch(err)
  {
    throw new Error(err.message);
  }
}