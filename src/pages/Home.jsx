import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">Auth System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A modern, secure authentication system built with React, Redux,
              and Tailwind CSS
            </p>
          </div>

          <Card className="max-w-2xl mx-auto mb-8">
            <Card.Header>
              <h2 className="text-2xl font-semibold text-gray-900">Features</h2>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    🔐 Secure Authentication
                  </h3>
                  <p className="text-gray-600">
                    JWT-based authentication with refresh tokens
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    🌐 Social Login
                  </h3>
                  <p className="text-gray-600">
                    Login with Google and Facebook
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    📱 Responsive Design
                  </h3>
                  <p className="text-gray-600">
                    Works perfectly on all devices
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    🔄 Redux State Management
                  </h3>
                  <p className="text-gray-600">Centralized state management</p>
                </div>
              </div>
            </Card.Content>
          </Card>

          <div className="space-x-4">
            <Link to="/login">
              <Button size="lg">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>

          <div className="mt-12">
            <p className="text-gray-500">
              Built with ❤️ using React, Redux Toolkit, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
