import { forwardRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./style.css";

const CustomInput = forwardRef(({
  rightIcon: IconToBeUsed,
  label,
  required,
  type,
  placeholder,
  id,
  name,
  inputClass,
  borderRadius,
  style,
  labelClass,
  onChange,
  value,
  defaultValue,
  rows,
  cols,
  min,
  max,
  iconColor,
  error
}, ref) => {
  const [typePass, setTypePass] = useState(true);
  
  const togglePassType = () => {
    setTypePass(!typePass);
  };
  
  return (
    <div className="inputWrapper" style={style}>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
          {required ? <span className="text-danger">*</span> : ""}
        </label>
      )}
      {type === "password" ? (
        <div className="position-relative">
          <input
            ref={ref}
            type={typePass ? "password" : "text"}
            placeholder={placeholder}
            required={required}
            id={id}
            name={name}
            className={`mainInput passInput ${inputClass} ${rightIcon ? "morePadding" : ""}`}
            style={{ borderRadius: borderRadius }}
            value={value}
            onChange={onChange}
          />
          <button type="button" className="right-icon" onClick={togglePassType}>
            {typePass ? (
              <FaRegEyeSlash color={inputClass ? "#bbb" : "#707C8B"} />
            ) : (
              <FaRegEye color={inputClass ? "#bbb" : "#707C8B"} />
            )}
          </button>
        </div>
      ) : type === "textarea" ? (
        <textarea
          ref={ref}
          placeholder={placeholder}
          required={required}
          id={id}
          name={name}
          rows={rows}
          cols={cols}
          className={`mainInput ${inputClass}`}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        />
      ) : (
        <div className="position-relative">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            required={required}
            id={id}
            name={name}
            style={{ borderRadius: borderRadius }}
            className={`mainInput ${inputClass} ${rightIcon ? "morePadding" : ""}`}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            min={type === "date" || type === "time" || type === "number" ? min : undefined}
            max={type === "date" || type === "time" || type === "number" ? max : undefined}
          />
          {IconToBeUsed ? (
            <div className="right-icon">
              <IconToBeUsed color={iconColor} />
            </div>
          ) : null}
        </div>
      )}
      {error && <div className="error-message text-danger">{error}</div>}
    </div>
  );
});

export default CustomInput;
