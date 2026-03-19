// Firebase Integration Test Utility
import { firebaseAuthService } from "../services/firebaseAuthService";

export const testFirebaseIntegration = async () => {
  console.log("🔥 Testing Firebase Integration...");

  try {
    // Test Firebase initialization
    const currentToken = await firebaseAuthService.getCurrentUserToken();
    console.log("✅ Firebase Auth initialized successfully");
    console.log(
      "Current user token:",
      currentToken ? "Available" : "Not available",
    );

    return {
      status: "success",
      message: "Firebase integration is ready",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("❌ Firebase integration test failed:", error);
    return {
      status: "error",
      message: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};

// Test function for development - uncomment to test
// testFirebaseIntegration();
