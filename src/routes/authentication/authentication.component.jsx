import SignUpForm from "../../components/authentication/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/authentication/sign-in-form/sign-in-form.component";

import { AuthenticationContainer } from "./authentication.styles";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
