export async function auth(credentials,authType)
{
    let token = "";
    try
   {
    if(authType === "register")
    {
         token = localStorage.getItem("Token");

    }
     const response = await fetch("https://lms-1authap.azurewebsites.net/api/Auth/"+authType,{
        method : 'POST',
        body : JSON.stringify(credentials),
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + token
        }
    });

   return await response.json();
   }
   catch(err)
   {
    throw new Error(err.message);     
   }

    
}

export async function getRoles()
{
    const token = localStorage.getItem("Token");
    try
    {
        if(token)
        {
            const response = await fetch('https://lms-1authap.azurewebsites.net/api/Auth/getRoles',
                {
                    headers : {
                        "Authorization" : "Bearer " + token
                    }
                }
            );
            return response;
        }
        else
        {
            throw new Error ("No Token, Not logged In");
        }
    
    }
    catch(err)
    {
       throw new Error(err.message);
    }
}

export async function getManagers()
{
    const token = localStorage.getItem("Token");

    try
    {
        if(token)
            {
                const response = await fetch('https://lms-1authap.azurewebsites.net/api/Auth/getEmployees',
                    {
                        headers : {
                            "Authorization" : "Bearer " + token
                        }
                    }
                );
                return response;
            }
            else
            {
                throw new Error ("No Token, Not logged In");
            }
     
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

export async function logout()
{
    const token = localStorage.getItem("Token");

    try
    {
        if(token)
            {
                const result = await fetch('https://lms-1authap.azurewebsites.net/api/Auth/logout',
                    {
                        headers : {
                            "Authorization" : "Bearer " + token
                        }
                    }
                );
               const response =  await result.json();
                return response;
            }
            else
            {
                throw new Error ("No Token, Not logged In");
            }
        
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

export async function getManagerForUser(empId)
{
    const token = localStorage.getItem("Token");

    try
    {
        if(token)
            {
                const response = await fetch('https://lms-1authap.azurewebsites.net/api/Auth/getManager/'+ empId,
                    {
                        headers : {
                            "Authorization" : "Bearer " + token
                        }
                    }
                );
                return response;
            }
            else
            {
                throw new Error ("No Token, Not logged In");
            }
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

export async function getEmployeesWithManager()
{
    const token = localStorage.getItem("Token");

    try
    {
        if(token)
            {
                const response = await fetch('https://lms-1authap.azurewebsites.net/api/Auth/getEmployesswithManager/',
                    {
                        headers : {
                            "Authorization" : "Bearer " + token
                        }
                    }
                );
                return response;
            }
            else
            {
                throw new Error ("No Token, Not logged In");
            }
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

export async function getEmployee(empId)
{
    const token = localStorage.getItem("Token");

    try
    {
        if(token)
            {
                const response = await fetch('https://lms-1authap.azurewebsites.net/api/Auth/getEmployee/'+empId,
                    {
                        headers : {
                            "Authorization" : "Bearer " + token
                        }
                    }
                );
                return response;
            }
            else
            {
                throw new Error ("No Token, Not logged In");
            }
    }
    catch(err)
    {
        throw new Error (err.message);
    }
}

export async function updateEmployee(credentials)
{
    const token = localStorage.getItem("Token");

    try
    {
        if(token)
        {
            const result = await fetch('https://lms-1authap.azurewebsites.net/api/Auth',{
                method : "PUT",
                body : JSON.stringify(credentials),
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + token


                }
            });
            return result;
        }
        else
        {
            throw new Error ("No Token, Not Logged In");
        }
      
    }
    catch(err)
    {
        throw new Error (err.message);
    }
}

export async function DeleteUser(userId)
{
    const token = localStorage.getItem("Token");

    try
    {
        const result = await fetch('https://lms-1authap.azurewebsites.net/api/Auth/'+userId,{
            method : "DELETE",
            headers : {
                "Authorization" : "Bearer " + token
            }
        });
        return result;
    }
    catch(err)
    {
        throw new Error (err.message);
    }
}




