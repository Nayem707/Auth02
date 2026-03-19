import React, { forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(
  (
    {
      type = "text",
      label,
      error,
      helperText,
      placeholder,
      disabled = false,
      required = false,
      fullWidth = true,
      showPasswordToggle = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const inputType = type === "password" && showPassword ? "text" : type;

    const baseStyles = `
    block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
    focus:outline-none focus:ring-blue-500 focus:border-blue-500
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
    ${!fullWidth ? "w-auto" : ""}
  `;

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={baseStyles}
            {...props}
          />
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
