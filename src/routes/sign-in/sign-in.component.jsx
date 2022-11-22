import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import { signInWithGooglePopup, createUsers } from "../../includes/firebase";

const SignIn = () => {
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUsers(user);
  };

  return (
    <div>
      <h1>Hello from sign-in</h1>
      <button onClick={signInWithGoogle}>sign with google popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
