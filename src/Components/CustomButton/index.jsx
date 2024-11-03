import "./style.css";

const CustomButton = ({
  style,
  type,
  variant,
  className,
  disabled,
  onClick,
  text,
  children
}) => {
  return (
    <div style={{ ...style }}>
      <button
        type={type}
        className={`customButton ${variant} ${className} ${disabled ? "disabled" : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
