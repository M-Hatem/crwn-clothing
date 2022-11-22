import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUsers,
} from "../../includes/firebase";

import FormInput from "../form-input/form-input.component";

// Default values for form fields
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // For reseting form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // To handel the form submition
  const handelSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }

    try {
      const result = await createAuthUserWithEmailAndPassword(email, password);
      // To add display name as it's null by default form firebase
      const editedUser = { ...result.user, displayName };
      await createUsers(editedUser);

      resetFormFields();
    } catch (err) {
      console.log(err);
    }
  };

  // To handel data inputs from user
  const handelForm = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with email and password</h1>
      <form onSubmit={handelSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          value={displayName}
          onChange={handelForm}
          name="displayName"
        />

        <FormInput
          label="Email"
          type="email"
          required
          value={email}
          onChange={handelForm}
          name="email"
        />

        <FormInput
          label="Password"
          type="password"
          required
          value={password}
          onChange={handelForm}
          name="password"
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={handelForm}
          name="confirmPassword"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
