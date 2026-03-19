import React from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { User, Mail, Calendar, LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user?.username || "User"}
              </span>
              <Button
                variant="outline"
                onClick={handleLogout}
                loading={loading}
                className="inline-flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Profile Card */}
            <Card className="col-span-full lg:col-span-2">
              <Card.Header>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </h2>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">
                        {user?.email || "Not available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Username
                      </p>
                      <p className="text-gray-900">
                        {user?.username || "Not available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Member since
                      </p>
                      <p className="text-gray-900">
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Content>
              <Card.Footer>
                <Button variant="outline">Edit Profile</Button>
              </Card.Footer>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card>
                <Card.Header>
                  <h3 className="text-lg font-medium text-gray-900">
                    Account Status
                  </h3>
                </Card.Header>
                <Card.Content>
                  <div className="text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </div>
                  </div>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <h3 className="text-lg font-medium text-gray-900">
                    Security
                  </h3>
                </Card.Header>
                <Card.Content className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Two-factor auth
                    </span>
                    <span className="text-sm text-red-600">Disabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Last login</span>
                    <span className="text-sm text-gray-900">Today</span>
                  </div>
                </Card.Content>
                <Card.Footer>
                  <Button size="sm" fullWidth>
                    Security Settings
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
