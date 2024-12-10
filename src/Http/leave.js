const Token = localStorage.getItem('Token')

export async function modifyLeave(leaveApplication,method)
{
  try{
    if(Token)
        {
          const response = await fetch('https://localhost:7001/api/LeaveApplication',{
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
    try{
        if(Token)
            {
              const response = await fetch('https://localhost:7001/api/LeaveApplication/GetAll/'+empId,{
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

export async function deletLeave(leaveApplicationId)
{
    try{
        if(Token)
            {
              const response = await fetch('https://localhost:7001/api/LeaveApplication/delete/'+leaveApplicationId,{
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
    try{
        if(Token)
            {
              const response = await fetch('https://localhost:7001/api/LeaveApplication/'+leaveApplicationId,{
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