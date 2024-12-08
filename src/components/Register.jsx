import classes from "./css/form.module.css";
import { auth } from "../Http/auth";
import { useState } from "react";
import { useEffect } from "react";
import { Form, useActionData, useNavigate, useRouteError } from "react-router-dom";
import Input from "./Input";

function Register() {
  const [formError, setFormError] = useState("");
  const response = useActionData();
  const error = useRouteError();
  const navigate = useNavigate();
   if(response && response.isSuccess)
    {
        navigate('/login');
    }

  useEffect(() => {
    if (response && !response.isSuccess) {
      setFormError(response.message);
    }
    if (error) {
      setFormError(error.message || "Problem occured");
    }
  }, [response, error]);

  return (
    <Form method="POST" className={classes.form}>
      <Input label="Name" type="text" id="name" name="name" />
      <Input label="Email" type="email" id="email" name="email" />
      <Input
        label="Date-of-Birth"
        type="date"
        id="birthDate"
        name="birthDate"
      />
      <Input
        label="Phone Number"
        type="text"
        id="phoneNumber"
        name="phoneNumber"
      />
      <Input
        label="Started-From"
        type="date"
        id="startedFrom"
        name="startedFrom"
      />
      <Input
        label="Designation"
        type="text"
        id="designation"
        name="designation"
      />
      <div>
        <label htmlFor="role">Roles:</label>
        <select name="role">
          <option value="OTHER">other</option>
          <option value="ADMIN">admin</option>
        </select>
      </div>
      <Input label="Password" type="password" id="password" name="password" />
      <Input
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
      />
      <button type="Submit">Register</button>
      {formError && <p>{formError}</p>}
    </Form>
  );
}

export async function action({ request, params }) {
  const fd = await request.formData();
  const registerCredentials = {
    EmployeeName: String(fd.get("name")),
    EmailAddress: String(fd.get("email")),
    BirthDate: String(fd.get("birthDate")),
    PhoneNumber: String(fd.get("phoneNumber")),
    Designation: String(fd.get("designation")),
    Started_From: String(fd.get("startedFrom")),
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

export default Register;
