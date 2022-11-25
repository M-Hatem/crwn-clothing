import { BaseButton, GoogleButton, InvertedButton } from "./button.styles";

const buttonStyles = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (type = buttonStyles.base) =>
  ({
    [buttonStyles.base]: BaseButton,
    [buttonStyles.google]: GoogleButton,
    [buttonStyles.inverted]: InvertedButton,
  }[type]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export { Button, buttonStyles };
