import React from "react";
import classnames from "classnames";
import "./ToggleCheckbox.css";

export default function ToggleCheck({
  checked,
  defaultChecked,
  disabled,
  name,
  required,
  type,
  value,
  onChange,
  className
}) {
  const containerClasses = classnames({
    "ToggleCheck--container": true,
    [className]: className
  });
  return (
    <label className={containerClasses}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        disabled={disabled}
        name={name}
        required={required}
        onChange={onChange}
      />
      <span />
    </label>
  );
}
