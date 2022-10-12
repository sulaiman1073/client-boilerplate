import React from "react";
import CreatableSelect from "react-select/creatable";
import "./Select.css";
import ControlHeader from "./ControlHeader";

export default function Select({
  header,
  disabled,
  loading,
  name,
  value,
  placeholder,
  options,
  onChange,
  isMulti = true,
  isClearable = true,
  isSearchable = true,
  onBlur,
  maxOptions = 3,
  error,
  size = "md",
  className
}) {
  return (
    <div className={className}>
      <ControlHeader header={header} error={error} size={size} />
      <CreatableSelect
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={
          isMulti
            ? isSearchable && (!value || (value && value.length < maxOptions))
            : isSearchable
        }
        name={name}
        value={options[value - 1]}
        onChange={onChange}
        onBlur={onBlur}
        options={
          options
            ? isMulti && value && value.length >= maxOptions
              ? []
              : options
            : undefined
        }
        // noOptionsMessage={() => {
        //   return value && value.length >= maxOptions
        //     ? "You've reached the max options value"
        //     : "No options available";
        // }}
        isDisabled={disabled || loading}
        placeholder={placeholder}
        isLoading={loading}
        isValidNewOption={(inputValue, selectValue, selectOptions) => {
          if (inputValue.length < 2) return false;
          if (inputValue.length > 10) return false;
          if (value) {
            if (value.length >= maxOptions) return false;
          }
          return true;
        }}
        classNamePrefix="Select--select"
        className={className}
      />
    </div>
  );
}
