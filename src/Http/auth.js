export async function auth(credentials,authType)
{
    try
   {
     const response = await fetch("https://localhost:7002/api/Auth/"+authType,{
        method : 'POST',
        body : JSON.stringify(credentials),
        headers : {
            "Content-Type" : "application/json"
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
    try
    {
        const response = await fetch('https://localhost:7002/api/Auth/getRoles');
        return response;
    }
    catch(err)
    {
       throw new Error(err.message);
    }
}

export async function getManagers()
{
    try
    {
        const response = await fetch('https://localhost:7002/api/Auth/getEmployees');
        return response;
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

export async function logout()
{
    try
    {
        const result = await fetch('https://localhost:7002/api/Auth/logout')
        const response =  await result.json();
        return response;
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

export async function getManagerForUser(empId)
{
    try
    {
     const result = await fetch('https://localhost:7002/api/Auth/getManager/'+ empId);
     return result;
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

export async function getNameById(id)
{
    try
    {
     const result = await fetch('https://localhost:7002/api/Auth/getName/'+ id);
     return result;
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

