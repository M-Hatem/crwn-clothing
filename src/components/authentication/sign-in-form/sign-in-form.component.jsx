import { useState } from "react";

import FormInput from "../../form-input/form-input.component";
import Button from "../../button/button.component";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../../includes/firebase";

import "./sign-in-form.styles.scss";

// Default values for form fields
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // For reseting form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // To handel the form submition
  const handelSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      // To change the value of current user in user context
      // setCurrentUser(user);

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          alert("There's and error occured, Please try again later!");
      }
    }
  };

  // To handel data inputs from user
  const handelForm = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // To sign in with google
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

    // To change the value of current user in user context
    // setCurrentUser(user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handelSubmit}>
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" onClick={signInWithGoogle} type="button">
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;