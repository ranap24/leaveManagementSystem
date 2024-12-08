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

