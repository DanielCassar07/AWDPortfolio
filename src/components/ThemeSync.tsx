import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function ThemeSync() {
  const mode = useSelector((s: RootState) => s.theme.mode); // "dark" | "light"

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return null;
}
