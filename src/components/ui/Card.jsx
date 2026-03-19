import React from "react";

const Card = ({
  children,
  className = "",
  padding = "p-6",
  shadow = "shadow-lg",
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-lg ${shadow} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
