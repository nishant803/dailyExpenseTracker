export const RegisterDetailsValidation = (values) =>{
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regex2 = /^[A-Za-z0-9 ]+$/;
  if (!values.name) {
    errors.name = "Username is required";
  } else if (!regex2.test(values.name)) {
    errors.name = "Enter a valid name";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Enter a valid email";
  }
if(!values.number){
  errors.number = "Number is required";
}else if(values?.number.length != 10){
  errors.number = "Enter a valid Number";
}
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more the 4 characters";
  }
  return errors;
}

export const LoginDetailsValidation = (values)=>{
  const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Enter a valid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more the 4 characters";
    }
    return errors;
}

export const AddExpenseValidation = (values)=>{
  const errors = {};
    if (!values.date) {
      errors.date  = "Date is required";
    } 
    if (!values.type) {
      errors.type = "Type is required";
    } 
    if (!values.description) {
      errors.description = "Description is required";
    } 
    if (!values.price) {
      errors.price = "Price is required";
    } 
    return errors;
}
