import { useState, useContext } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUsers,
} from "../../../includes/firebase";

import FormInput from "../../form-input/form-input.component";
import { Button, buttonStyles } from "../../button/button.component";
import { UserContext } from "../../../context/user.context";

import { SignInContainer } from "./sign-up-form.styles";

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

  // To access user context
  const { setCurrentUser } = useContext(UserContext);

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
      // To pass user to user context
      setCurrentUser(editedUser);

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
    <SignInContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
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

        <Button buttonType={buttonStyles.base} type="submit">
          Sign up
        </Button>
      </form>
    </SignInContainer>
  );
};

export default SignUpForm;
