// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  offlineAccess: true,
});

// Somewhere in your code
export const SignInWithGoogleAsync = async () => {
  try {
    const check = await GoogleSignin.hasPlayServices();
    console.log(check);
    const response = await GoogleSignin.signIn();
    console.log(response);
    if (isSuccessResponse(response)) {
      return response;
    } else {
      throw new Error("Failed to sign in with google");
      // sign in was cancelled by user
    }
  } catch (error) {
    throw error;
  }
};
