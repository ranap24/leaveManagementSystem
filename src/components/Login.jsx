import { Form, useNavigate, useActionData, useRouteError } from "react-router-dom";
import { auth } from "../Http/auth";
import { useState, useEffect } from "react";
import classes from './css/form.module.css';
import Input from "./Input";

function Login({ isLoggedIn, handleLogIn }) {
    const navigate = useNavigate();
    const [formError, setFormError] = useState('');
    const response = useActionData();
    const error = useRouteError();

    useEffect(() => {
        if (response) {
            if (response.isSuccess) {
                handleLogIn(response.data.token);
            } else {
                setFormError(response.message);
            }
        }
        if (error) {
            setFormError(error.message || "Problem occurred");
        }
    }, [response, error]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return (
            <div className={classes.formContainer}>
                <h2 className={classes.formTitle}>Login</h2>
                <Form method="POST" className={classes.form}>
                    <Input
                        label="Employee ID"
                        id="userId"
                        type="text"
                        name="userId"
                        className={classes.input}
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        className={classes.input}
                    />
                    <button type="submit" className={classes.submitButton}>Login</button>
                    {formError && <p className={classes.error}>{formError}</p>}
                </Form>
            </div>
        );
    }

    return null; 
}

export async function action({ request, params }) {
    const fd = await request.formData();
    const loginCredentials = {
        UserId: Number(fd.get('userId')),
        Password: String(fd.get('password'))
    };

    try {
        const response = await auth(loginCredentials, "login");
        return response;
    } catch (err) {
        throw new Error(err.message);
    }
}

export default Login;
