import {
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../config/firebase";

export const firebaseAuthService = {
  // Google Sign In with Redirect
  signInWithGoogle: async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
      // The redirect will happen automatically
      // Result will be handled by getRedirectResult when user returns
    } catch (error) {
      throw new Error(`Google sign-in failed: ${error.message}`);
    }
  },

  // Facebook Sign In with Redirect
  signInWithFacebook: async () => {
    try {
      await signInWithRedirect(auth, facebookProvider);
      // The redirect will happen automatically
      // Result will be handled by getRedirectResult when user returns
    } catch (error) {
      throw new Error(`Facebook sign-in failed: ${error.message}`);
    }
  },

  // Handle redirect result (call this when app loads)
  handleRedirectResult: async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        const user = result.user;
        const idToken = await user.getIdToken();

        // Determine provider from result
        const providerData = result.user.providerData[0];
        let provider = "unknown";
        if (providerData) {
          if (providerData.providerId === "google.com") {
            provider = "google";
          } else if (providerData.providerId === "facebook.com") {
            provider = "facebook";
          }
        }

        return {
          idToken,
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            provider: provider,
          },
        };
      }
      return null;
    } catch (error) {
      throw new Error(`Redirect result handling failed: ${error.message}`);
    }
  },

  // Email/Password Sign In
  signInWithEmail: async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const idToken = await user.getIdToken();

      return {
        idToken,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: "email",
        },
      };
    } catch (error) {
      throw new Error(`Email sign-in failed: ${error.message}`);
    }
  },

  // Email/Password Sign Up
  signUpWithEmail: async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = result.user;
      const idToken = await user.getIdToken();

      return {
        idToken,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: "email",
        },
      };
    } catch (error) {
      throw new Error(`Email sign-up failed: ${error.message}`);
    }
  },

  // Sign Out
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(`Sign out failed: ${error.message}`);
    }
  },

  // Get Current User Token
  getCurrentUserToken: async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken();
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to get user token: ${error.message}`);
    }
  },
};
