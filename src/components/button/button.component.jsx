import "./button.styles.scss";

const buttonStyles = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`${buttonStyles[buttonType]} button-container`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
