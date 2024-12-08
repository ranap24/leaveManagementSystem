import { Form, useActionData, useRouteError } from "react-router-dom";
import { auth } from "../Http/auth";
import { useState } from "react";
import { useEffect } from "react";
import classes from './css/form.module.css';
import Input from "./Input";

function Login() {
    const [formError, setFormError] = useState('');
    const [isAuthenticated,setIsAuthenticated] = use(false);
    const response = useActionData();
    const error = useRouteError();

    useEffect(() => {
        if (response && !response.isSuccess) {
            setFormError(response.message);

        }
        if (error) {
            setFormError(error.message || "Problem occured");
        }

    }, [response, error])

    return (
        <Form method="POST" className={classes.form}>
            <Input
                label="EmployeeId"
                id="userId"
                type="text"
                name="userId"
            />
            <Input
                label="Password"
                id="password"
                type="password"
                name="password"
            />
            <button type="submit">Login</button>
            {formError && <p>{formError}</p>}
        </Form>
    );
}

export async function action({ request, params }) {
    const fd = await request.formData();
    const loginCredentials = {
        UserId: Number(fd.get('userId')),
        Password: String(fd.get('password'))
    }
    try {
        const response = await auth(loginCredentials, "login");
        return response;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

export default Login;