import { signInWithGooglePopup } from "../../includes/firebase";

const SignIn = () => {
  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();

    console.log(response);
  };

  return (
    <div>
      <h1>Hello from sign-in</h1>
      <button onClick={signInWithGoogle}>sign with google</button>
    </div>
  );
};

export default SignIn;
