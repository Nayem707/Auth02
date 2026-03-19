import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// ----- Firebase Config -----
const firebaseConfig = {
  apiKey: "AIzaSyBJwiWQoCg5_DHfONsdLS0jnYVaSfpzqqQ",
  authDomain: "timesync-auth-48008.firebaseapp.com",
  projectId: "timesync-auth-48008",
  storageBucket: "timesync-auth-48008.firebasestorage.app",
  messagingSenderId: "372345851747",
  appId: "1:372345851747:web:bbd7b860097713b8a4cd56",
  measurementId: "G-MJPFQRPRWE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// ----- Auth Context -----
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing user data
    const storedUser = localStorage.getItem("firebaseUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("firebaseUser");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Get Firebase ID token
          const idToken = await currentUser.getIdToken();

          // Store in localStorage
          localStorage.setItem("firebaseIdToken", idToken);
          localStorage.setItem(
            "firebaseUser",
            JSON.stringify({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              emailVerified: currentUser.emailVerified,
              provider: currentUser.providerData?.[0]?.providerId,
              providerData: currentUser.providerData,
            }),
          );

          console.log("👤 User Info Stored:", {
            name: currentUser.displayName,
            email: currentUser.email,
            provider: currentUser.providerData?.[0]?.providerId,
            uid: currentUser.uid,
          });
          console.log("🎫 ID Token stored in localStorage");
        } catch (error) {
          console.error("Error getting ID token:", error);
        }
      } else {
        // Clear localStorage when user logs out
        localStorage.removeItem("firebaseIdToken");
        localStorage.removeItem("firebaseUser");
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ----- Private Route -----
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// ----- Login Page (Facebook & Google only) -----
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      const result = await signInWithPopup(auth, googleProvider);

      console.log("🔥 Google Sign-In Successful!");
      console.log("👤 User:", result.user.displayName || result.user.email);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setError("");
      const result = await signInWithPopup(auth, facebookProvider);

      console.log("🔥 Facebook Sign-In Successful!");
      console.log("👤 User:", result.user.displayName || result.user.email);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Facebook Sign-In Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TimeSync</h1>
          <p className="text-gray-600">Sign in to continue to your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          <button
            onClick={handleFacebookSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="font-medium">Continue with Facebook</span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// ----- Dashboard -----
const Dashboard = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("👋 User logged out successfully");
      console.log("🗑️ localStorage cleared");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome back!
          </h1>

          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100"
              referrerPolicy="no-referrer"
            />
          )}

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {user?.displayName || user?.email}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-medium text-gray-700 mb-4">
            Account Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Provider:</span>
              <span className="font-medium capitalize">
                {user?.providerData?.[0]?.providerId?.replace(".com", "")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Verified:</span>
              <span
                className={`font-medium ${user?.emailVerified ? "text-green-600" : "text-yellow-600"}`}
              >
                {user?.emailVerified ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Sign Out
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            You are securely logged in via{" "}
            <span className="font-medium">
              {user?.providerData?.[0]?.providerId?.replace(".com", "")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// ----- App -----
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
