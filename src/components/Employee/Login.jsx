import {
  Form,
  useNavigate,
  useActionData,
  useRouteError,
} from "react-router-dom";
import { auth } from "../../http/auth";
import { useState, useEffect } from "react";
import classes from "../css/form.module.css";
import Input from "../Input";
import { loginValidation } from "../../util/Validation";
import toast from "react-hot-toast";

function Login({ isLoggedIn, handleLogIn }) {
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const response = useActionData();
  const error = useRouteError();

  useEffect(() => {
    if (response) {
      if (response.isSuccess) {
        handleLogIn(response.data.token);
        toast.success(response.message);
      } else {
        if (response.errors) {
          setFormError(response.errors);
        } else {
          toast.error(response.message);
        }
      }
    }
    if (error) {
      toast.error(error.message || "Error Occured");
    }
  }, [response, error]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name } = e.target;
    if (formError && formError[name]) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className={classes.formContainer}>
        <Form method="POST" className={classes.form}>
          <h2 className={classes.formTitle}>Login</h2>
          <Input
            label="Employee ID"
            id="userId"
            type="text"
            name="userId"
            className={classes.input}
            onChange={handleInputChange}
          />
          {formError && formError.userId && (
            <p className={classes.error}>{formError.userId}</p>
          )}

          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            className={classes.input}
            onChange={handleInputChange}
          />
          {formError && formError.password && (
            <p className={classes.error}>{formError.password}</p>
          )}

          <button type="submit" className={classes.submitButton}>
            Login
          </button>
        </Form>
      </div>
    );
  }

  return null;
}

export async function action({ request }) {
  const fd = await request.formData();
  const loginCredentials = {
    UserId: fd.get("userId"),
    Password: String(fd.get("password")),
  };

  const errors = loginValidation(loginCredentials);
  if (Object.keys(errors).length > 0) {
    return { isSuccess: false, errors: { ...errors } };
  }

  try {
    const response = await auth(loginCredentials, "login");
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default Login;
