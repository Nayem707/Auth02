import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { firebaseAuthService } from "../services/firebaseAuthService";

const FirebaseRedirectHandler = () => {
  const navigate = useNavigate();
  const { firebaseAuth } = useAuth();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await firebaseAuthService.handleRedirectResult();

        if (result) {
          console.log("🔥 Firebase redirect successful:");
          console.log("👤 User Info:", {
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
            provider: result.user.provider,
            uid: result.user.uid,
          });

          // Store idToken in localStorage
          localStorage.setItem("firebaseIdToken", result.idToken);
          localStorage.setItem("firebaseUser", JSON.stringify(result.user));

          // Send the Firebase ID token to your backend
          const authResult = await firebaseAuth(
            result.idToken,
            result.user.provider,
            result.user,
          );

          if (authResult.meta.requestStatus === "fulfilled") {
            console.log("✅ Backend authentication successful!");
            console.log(
              "🎯 User authenticated:",
              result.user.displayName || result.user.email,
            );

            // Clear any redirect intent
            localStorage.removeItem("authRedirectIntent");
            navigate("/dashboard");
          } else {
            console.error("❌ Backend authentication failed");
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Firebase redirect error:", error);
        // Clear redirect intent on error
        localStorage.removeItem("authRedirectIntent");
        navigate("/login");
      }
    };

    // Only handle redirect if there's an intent stored
    const intent = localStorage.getItem("authRedirectIntent");
    if (intent) {
      handleRedirectResult();
    }
  }, [navigate, firebaseAuth]);

  return null; // This component doesn't render anything
};

export default FirebaseRedirectHandler;
