# Firebase CORS Fix - Setup Guide

## Issue: Cross-Origin-Opener-Policy Error

The "Cross-Origin-Opener-Policy policy would block the window.close call" error occurs when Firebase popup authentication is blocked by browser security policies.

## Solution: Redirect-Based Authentication

I've implemented redirect-based authentication instead of popup-based to avoid CORS issues:

### Changes Made:
1. **firebaseAuthService.js** - Uses `signInWithRedirect` instead of `signInWithPopup`
2. **SocialLogin.jsx** - Stores redirect intent in localStorage before redirecting
3. **FirebaseRedirectHandler.jsx** - New component to handle OAuth returns
4. **App.jsx** - Includes FirebaseRedirectHandler to process redirects

### Firebase Console Configuration Required:

1. **Go to Firebase Console** → Your Project → Authentication → Settings

2. **Authorized Domains:**
   - Add `localhost` (for development)
   - Add your production domain when you deploy
   - Ensure `timesync-auth-48008.firebaseapp.com` is in the list

3. **OAuth Redirect URIs:**
   - For Google: `http://localhost:5175/__/auth/handler`
   - For production: `https://yourdomain.com/__/auth/handler`

4. **Google Cloud Console** (if using Google Sign-In):
   - Go to Google Cloud Console → Credentials
   - Edit your OAuth 2.0 Client ID
   - Add authorized origins: `http://localhost:5175`
   - Add redirect URIs: `http://localhost:5175/__/auth/handler`

5. **Facebook Developer Console** (if using Facebook Login):
   - Go to Facebook Developers → Your App → Facebook Login → Settings
   - Add `http://localhost:5175/` to Valid OAuth Redirect URIs

### How It Works Now:

1. User clicks Google/Facebook button
2. App stores redirect intent in localStorage
3. Firebase redirects to OAuth provider
4. After authorization, Firebase redirects back to your app
5. `FirebaseRedirectHandler` detects the return and processes the authentication
6. User is logged in and redirected to dashboard

### Testing:

1. Navigate to http://localhost:5175
2. Go to Login page
3. Click Google or Facebook button
4. You should be redirected to the OAuth provider
5. After authorization, you'll be redirected back and logged in

### Benefits of Redirect Flow:
- ✅ No CORS popup issues
- ✅ Better mobile experience
- ✅ More reliable across browsers
- ✅ Works with strict security policies

### Troubleshooting:

If you still encounter issues:
1. Check browser console for Firebase errors
2. Verify authorized domains in Firebase Console
3. Ensure OAuth client configurations are correct
4. Check that your Firebase project is properly configured