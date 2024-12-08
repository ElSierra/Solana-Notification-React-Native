import { useAuth, useIsFingerPrintSuccess } from "../store/auth";

export const useIsSignedIn = () => {
  const user = useAuth((state) => state.type);

  if (user === "user") {
    return true;
  }
  if (user === "guest") {
    return true;
  }
  return false;
};

export const useIsNotSignedIn = () => {
  const user = useAuth((state) => state.type);

  if (user === "user") {
    return false;
  }
  if (user === "guest") {
    return false;
  }
  return true;
};

export const useCheckFingerPrint = () => {
  const user = useAuth((state) => state.type);
  const fingerPrintSuccess = useIsFingerPrintSuccess(
    (state) => state.isFingerPrintSuccess
  );
  if (!user) {
    return false;
  }
  if (user && !fingerPrintSuccess) {
    return true;
  }
  return false;
};
