OLAMILEKAN HUB — ANDROID APK BUILD

This project is configured for Expo EAS Build.

For a directly installable Android APK:
1. Install Termux on Android (or use a computer terminal).
2. Install Node.js in Termux.
3. Extract this project and cd into the project folder.
4. Run: npm install
5. Run: npx eas-cli@latest login
6. Run: npx eas-cli@latest build --platform android --profile preview
7. When the build finishes, open the APK link shown by EAS on your phone and install it.

For Google Play Store, use the production profile instead:
  npx eas-cli@latest build --platform android --profile production
This creates an AAB for Google Play.
