import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";
import Alert from "../ui/Alert";
import SocialLogin from "./SocialLogin";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading, error, clearAuthError } = useAuth();
  const [showAlert, setShowAlert] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      const result = await registerUser(userData);
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
    clearAuthError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          {error && showAlert && (
            <Alert
              type="error"
              message={error}
              dismissible
              onDismiss={handleDismissAlert}
              className="mb-4"
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("username")}
              type="text"
              label="Username"
              placeholder="Enter your username"
              error={errors.username?.message}
              required
            />

            <Input
              {...register("email")}
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              error={errors.email?.message}
              required
            />

            <Input
              {...register("password")}
              type="password"
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              showPasswordToggle
              required
            />

            <Input
              {...register("confirmPassword")}
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              showPasswordToggle
              required
            />

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="agree-terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              fullWidth
            >
              Create account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <SocialLogin />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
