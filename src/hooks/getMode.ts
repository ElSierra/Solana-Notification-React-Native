import { useMode } from "../store/ui";

export const useIsDarkMode = () => {
  const mode = useMode((state) => state.mode);

  return mode === "dark";
};
