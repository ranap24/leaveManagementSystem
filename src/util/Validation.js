function isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
  
  function isEmpty(value) {
    if (value == null || value === "") {
      return true; // Handles null, undefined, and empty strings
    }
  
    if (typeof value === "string") {
      return value.trim() === ""; // For string values, trim and check if empty
    }
  
    if (Array.isArray(value)) {
      return value.length === 0; // For arrays, check if they are empty
    }
  
    if (typeof value === "object") {
      return Object.keys(value).length === 0; // For objects, check if they have no properties
    }
  
    return false; // For other types, assume they're not empty
  }
  
  
  function isPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }
  
  
  function isValidDesignation(designation) {
    const designationRegex = /^[a-zA-Z\s.-]{3,50}$/;
    return designationRegex.test(designation);
  }
  
  function atLeastOf18(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
  
    if (age < 18) {
      return false;
    }
    return true;
  }
  
  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.{6,})/;
    return passwordRegex.test(password);
  }
  
  function confirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }
  
  export function RegisterFormValidation(registerCredentials) {
    let errors = {};
  
    if (isEmpty(registerCredentials.EmployeeName)) {
      errors.name = "Name is required";
    }
  
    if (isEmpty(registerCredentials.EmailAddress)) {
      errors.email = "Email is required";
    } else {
      if (!isValidEmail(registerCredentials.EmailAddress)) {
        errors.email = "Enter a valid email";
      }
    }
  
    if (isEmpty(registerCredentials.PhoneNumber)) {
      errors.phoneNumber = "Phone Number is required";
    } else {
      if (!isPhoneNumber(registerCredentials.PhoneNumber)) {
        errors.phoneNumber = "Enter a valid 10-digit phone Number";
      }
    }

    if(isEmpty(registerCredentials.Gender))
    {
        errors.gender = "Gender is Required";
    }
  
    if (isEmpty(registerCredentials.ManagerId)) {
      errors.manager = "Please select a Manager";
    }
  
    if (isEmpty(registerCredentials.Role)) {
      errors.role = "Please select a role";
    }
  
    if (registerCredentials.Password && isEmpty(registerCredentials.Password)) {
      errors.password = "Password is Required";
    } else if (registerCredentials.Password && !isValidPassword(registerCredentials.Password)) {
      errors.password =
        "Password must be at least 6 characters long, contain at least one uppercase letter, and one special character.";
    }
  
    if (registerCredentials.ConfirmPassword && isEmpty(registerCredentials.ConfirmPassword)) {
      errors.confirmPassword = "Confirm Password is Required";
    } else if (registerCredentials.confirmPassword && 
      !confirmPassword(
        registerCredentials.Password,
        registerCredentials.ConfirmPassword
      )
    ) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    if (isEmpty(registerCredentials.BirthDate)) {
      errors.birthDate = "Date-of-Birth is Required";
    } else if (!atLeastOf18(registerCredentials.BirthDate)) {
      errors.birthDate = "Age should be at least 18";
    }
  
    if (isEmpty(registerCredentials.Started_From)) {
      errors.startedFrom = "Start date is required";
    } else {
      const startDate = new Date(registerCredentials.Started_From);
      const birthDateObj = new Date(registerCredentials.BirthDate);
  
      const minStartDate = new Date(
        birthDateObj.setFullYear(birthDateObj.getFullYear() + 18)
      );
      const today = new Date();
  
      if (startDate < minStartDate) {
        errors.startedFrom =
          "Start date must be at least 18 years after the birth date";
      } else if (startDate > today) {
        errors.startedFrom = "Start date cannot be in the future";
      }
    }
  
    if (isEmpty(registerCredentials.Designation)) {
      errors.designation = "Designation is required";
    } else if (!isValidDesignation(registerCredentials.Designation)) {
      errors.designation = "Enter a valid Designation";
    }
  
    return errors;
  }

  export function loginValidation(credentials)
  {
    let errors = {};
    if (!credentials.UserId) {
        errors.userId = "Employee ID is required";
    } else if (isNaN(credentials.UserId) || credentials.UserId <= 0) {
        errors.userId = "Enter a valid Employee ID";
    }

    if (isEmpty(credentials.Password)) {
        errors.password = "Password is Required";
      } else if (!isValidPassword(credentials.Password)) {
        errors.password =
          "Password must be at least 6 characters long, contain at least one uppercase letter, and one special character.";
      }
     return errors;
     
  }

  export function leaveApplicationValidation(applicationDetails)
  {
    let errors = {};
    if (isEmpty(applicationDetails.EmpPhone)) {
        errors.phoneNumber = "Phone Number is required";
      } else {
        if (!isPhoneNumber(applicationDetails.EmpPhone)) {
          errors.phoneNumber = "Enter a valid 10-digit phone Number";
        }
      }
      const fromDate = new Date(applicationDetails.From_Date);
      const toDate = new Date(applicationDetails.To_Date);
      const today = new Date();
      const fifteenDaysAgo = new Date(today);
      fifteenDaysAgo.setDate(today.getDate() - 15); 
  
      if (isEmpty(applicationDetails.From_Date)) {
          errors.fromDate = "From date is required";
      } 
      else if (fromDate < fifteenDaysAgo) {
          errors.fromDate = "From date cannot be more than 15 days in the past";
      }
  
 
      if (isEmpty(applicationDetails.To_Date)) {
          errors.toDate = "To date is required";
      } else if (toDate < fromDate) {
          errors.toDate = "To date must be later than From date";
      }


    if (isEmpty(applicationDetails.Reason)) {
        errors.reason = "Reason for leave is required";
    }

    return errors
  }


  