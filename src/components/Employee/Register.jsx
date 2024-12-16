import classes from "../css/form.module.css";
import { auth, getRoles, getManagers, getEmployee, updateEmployee } from "../../Http/auth";
import { useState, useEffect } from "react";
import {
  Form,
  Navigate,
  useActionData,
  useLoaderData,
  useNavigate,
  useRouteError,
  Link
} from "react-router-dom";
import Input from "../Input";
import { RegisterFormValidation } from "../../util/Validation";
import toast from "react-hot-toast";


function Register({ isLoggedIn, isInRole, method }) {
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();
  const { roles, managers, data } = useLoaderData();
  const response = useActionData();
  const error = useRouteError();

  // Handling response and error updates
  useEffect(() => {
    if (response) {
      if (response.isSuccess) {
        alert(response.message);
        navigate("/listUsers");
      } else {
        if (response.errors) {
          setFormError(response.errors);
        } else {
          toast.error(response.message);
        }
      }
    }
    if (error) {
      toast.error(error.message);
    }
  }, [response, error]);

  const handleInputChange = (e) => {
    const { name } = e.target;
    if(formError && formError[name])
        {
            setFormError((prevErrors) => ({
                ...prevErrors,
                [name]: null 
            }));
        }
};

  if (isLoggedIn && isInRole === "ADMIN") {
    return (
      <div className={classes.formContainer}>
        <Form method={method || "POST"} className={classes.form} key = {method || "POST"}>
          <h2 className={classes.formTitle}>
            {method === "PUT" ? "Update User" : "Register New User"}
          </h2>

          {method === "PUT" && (
            <Input
              type="number"
              id="employeeId"
              name="employeeId"
              defaultValue={data?.employeeId}
              hidden
            />
          )}

          <Input
            label="Name:"
            type="text"
            id="name"
            name="name"
            onChange = {handleInputChange}
            className={classes.input}
            defaultValue={data?.name || ""}
          />
          {formError?.name && <p className={classes.error}>{formError.name}</p>}

          <Input
            label="Email:"
            type="email"
            id="email"
            name="email"
            onChange = {handleInputChange}
            className={classes.input}
            defaultValue={data?.email || ""}
          />
          {formError?.email && <p className={classes.error}>{formError.email}</p>}

          <Input
            label="Date-of-Birth:"
            type="date"
            id="birthDate"
            name="birthDate"
            onChange = {handleInputChange}
            className={classes.input}
            defaultValue={data?.birthDate || ""}
          />
          {formError?.birthDate && <p className={classes.error}>{formError.birthDate}</p>}

          <Input
            label="Phone Number:"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            onChange = {handleInputChange}
            className={classes.input}
            defaultValue={data?.phoneNumber || ""}
          />
          {formError?.phoneNumber && <p className={classes.error}>{formError.phoneNumber}</p>}

          <div className={classes.radioContainer}>
            <label>Gender:</label>
            <div className={classes.radioGroup}>
              <label htmlFor="genderMale">
                <Input
                  type="radio"
                  id="genderMale"
                  name="gender"
                  value="male"
                  onChange = {handleInputChange}
                  defaultChecked={data?.gender === "male"}
                />
                Male
              </label>
              <label htmlFor="genderFemale">
                <Input
                  type="radio"
                  id="genderFemale"
                  name="gender"
                  value="female"
                  onChange = {handleInputChange}
                  defaultChecked={data?.gender === "female"}
                />
                Female
              </label>
            </div>
          </div>
          {formError?.gender && <p className={classes.error}>{formError.gender}</p>}

          <Input
            label="Started-From:"
            type="date"
            id="startedFrom"
            name="startedFrom"
            onChange = {handleInputChange}
            className={classes.input}
            defaultValue={data?.started_From || ""}
          />
          {formError?.startedFrom && <p className={classes.error}>{formError.startedFrom}</p>}

          <Input
            label="Designation:"
            type="text"
            id="designation"
            name="designation"
            onChange = {handleInputChange}
            className={classes.input}
            defaultValue={data?.designation || ""}
          />
          {formError?.designation && <p className={classes.error}>{formError.designation}</p>}

          <div className={classes.selectContainer}>
            <label htmlFor="manager" className={classes.label}>
              Manager:
            </label>
            <select
              name="manager"
              onChange = {handleInputChange}
              className={classes.select}
              defaultValue={data?.managerId || ""}
            >
              <option value="">Select Manager</option>
              {managers?.data.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
          {formError?.manager && <p className={classes.error}>{formError.manager}</p>}

          <div className={classes.selectContainer}>
            <label htmlFor="role" className={classes.label}>
              Role:
            </label>
            <select name="role" className={classes.select} defaultValue={data?.role || ""} onChange = {handleInputChange}>
              <option value="">Select Role</option>
              {roles?.data.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          {formError?.role && <p className={classes.error}>{formError.role}</p>}

          {method !== "PUT" && (
            <>
              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                onChange = {handleInputChange}
                className={classes.input}
              />
              {formError?.password && <p className={classes.error}>{formError.password}</p>}

              <Input
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange = {handleInputChange}
                className={classes.input}
              />
              {formError?.confirmPassword && <p className={classes.error}>{formError.confirmPassword}</p>}
            </>
          )}

          <button type="submit" className={classes.submitButton}>
            {method === "PUT" ? "Update" : "Register"}
          </button>
          <button type="button" className={classes.submitButton} onClick={()=>window.history.back()}>
            cancel
          </button>
          

          {formError?.other && <p className={classes.error}>{formError.other}</p>}
        </Form>
      </div>
    );
  }

  if (isLoggedIn && isInRole === "USER") {
    return <h4 className={classes.noAccess}>You don't have access to this Page</h4>;
  }

  return <Navigate to="/login" replace />;
}

export default Register;


export async function action({ request, params }) {
  const fd = await request.formData();
    const credentials = {
      EmployeeName: fd.get("name"),
      EmailAddress: fd.get("email"),
      BirthDate: fd.get("birthDate"),
      PhoneNumber: fd.get("phoneNumber"),
      ManagerId: Number(fd.get("manager")),
      Gender : fd.get("gender"),
      Designation: fd.get("designation"),
      Started_From: fd.get("startedFrom"),
      Role: String(fd.get("role")),
    };

    if(request.method === "POST")
    {
      credentials.Password = String(fd.get("password"));
      credentials.ConfirmPassword = String(fd.get("confirmPassword"));
    }

    if(request.method === "PUT")
    {
      credentials.EmployeeId = fd.get("employeeId");
    }
  
    const errors = RegisterFormValidation(credentials);
    if(Object.keys(errors).length > 0)
    {
      return {isSuccess : false, errors : {...errors}};
    }
  
  if(request.method === "POST")
  {
 
    try {
      const response = await auth(credentials, "register");
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  else
  {
    try {
      const response = await updateEmployee(credentials);
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export async function loader({ request, params }) {
  let loadObject = {
    roles: {},
    managers: {},
  };

  try {
    if (params.empId) {
      try {
        const { data } = await getEmployee(params.empId).then((response) =>
          response.json()
        );
        loadObject.data = { ...data };
      } catch (err) {
        throw new Error(err.message);
      }
    }
    const roles = await getRoles().then((response) => response.json());
    const managers = await getManagers().then((response) => response.json());
    loadObject.roles = { ...roles };
    loadObject.managers = { ...managers };

    return loadObject;
  } catch (err) {
    throw new Error(err.message);
  }
}
