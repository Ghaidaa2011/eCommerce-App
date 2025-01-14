import { Button } from "react-bootstrap";
import { Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { toggleTheme } from "@store/theme/themeSlice";
import styles from "./styles.module.css";

const { darkModeToggle, iconContainer } = styles;

const DarkModeToggle = () => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <Button
      onClick={() => dispatch(toggleTheme())}
      variant={isDark ? "dark" : "light"}
      className={`mx-2 ${darkModeToggle} d-flex align-items-center justify-content-center shadow-sm`}
      aria-label="Toggle dark mode"
    >
      <div className={iconContainer}>
        {isDark ? (
          <Sun size={24} className="text-warning" />
        ) : (
          <Moon size={24} className="text-primary" />
        )}
      </div>
    </Button>
  );
};

export default DarkModeToggle;
