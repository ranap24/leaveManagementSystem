import classes from "./css/form.module.css";
import { auth, getRoles, getManagers } from "../Http/auth";
import { useState, useEffect } from "react";
import { Form, Navigate, useActionData, useLoaderData, useNavigate, useRouteError } from "react-router-dom";
import Input from "./Input";

function Register({ isLoggedIn, isInRole }) {
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const { roles, managers } = useLoaderData();
  const response = useActionData();
  const error = useRouteError();

  useEffect(() => {
    if (response ) {
      if(!response.isSuccess)
      {
        navigate('/Home');
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

  if (isLoggedIn && isInRole === "ADMIN") {
    return (
      <div className={classes.formContainer}>
        <Form method="POST" className={classes.form}>
          <h2 className={classes.formTitle}>Register a New User</h2>

          <Input label="Name:" type="text" id="name" name="name" className={classes.input} />
          <Input label="Email:" type="email" id="email" name="email" className={classes.input} />
          <Input label="Date-of-Birth:" type="date" id="birthDate" name="birthDate" className={classes.input} />
          <Input label="Phone Number:" type="tel" id="phoneNumber" name="phoneNumber" className={classes.input} />
          <Input label="Started-From:" type="date" id="startedFrom" name="startedFrom" className={classes.input} />
          <Input label="Designation:" type="text" id="designation" name="designation" className={classes.input} />

          <div className={classes.selectContainer}>
            <label htmlFor="manager" className={classes.label}>Manager:</label>
            <select name="manager" className={classes.select} >
              <option value="">Select Manager</option>
              {managers && managers.data.map((manager) => (
                <option key={manager.id} value={manager.id}>{manager.name}</option>
              ))}
            </select>
          </div>

          <div className={classes.selectContainer}>
            <label htmlFor="role" className={classes.label}>Role:</label>
            <select name="role" className={classes.select}>
              <option value="">Select Role</option>
              {roles && roles.data.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <Input label="Password" type="password" id="password" name="password" className={classes.input} />
          <Input label="Confirm Password" type="password" id="confirmPassword" name="confirmPassword" className={classes.input} />

          <button type="submit" className={classes.submitButton}>Register</button>

          {formError && <p className={classes.error}>{formError}</p>}
        </Form>
      </div>
    );
  }

  if (isLoggedIn && isInRole === "USER") {
    return <h4 className={classes.noAccess}>You don't have access to this Page</h4>;
  }

  return <Navigate to="/login" replace />;
}

export async function action({ request, params }) {
  const fd = await request.formData();
  const registerCredentials = {
    EmployeeName:fd.get("name"),
    EmailAddress: fd.get("email"),
    BirthDate: fd.get("birthDate"),
    PhoneNumber: String(fd.get("phoneNumber")),
    ManagerId : Number(fd.get('manager')),
    Designation: fd.get("designation"),
    Started_From: fd.get("startedFrom"),
    Role: String(fd.get("role")),
    Password: String(fd.get("password")),
    ConfirmPassword: String(fd.get("confirmPassword")),
  };

  try {
    const response = await auth(registerCredentials, "register");
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function loader({ request, params }) {
  let loadObject = {
    roles: {},
    managers: {}
  };

  try {
    const roles = await getRoles().then((response) => response.json());
    const managers = await getManagers().then((response) => response.json());
    loadObject.roles = { ...roles };
    loadObject.managers = { ...managers };

    return loadObject;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default Register;
