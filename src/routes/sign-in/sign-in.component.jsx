import { signInWithGooglePopup, createUsers } from "../../includes/firebase";

const SignIn = () => {
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUsers(user);
    console.log(userDocRef);
  };

  return (
    <div>
      <h1>Hello from sign-in</h1>
      <button onClick={signInWithGoogle}>sign with google</button>
    </div>
  );
};

export default SignIn;
