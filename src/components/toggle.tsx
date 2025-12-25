import React from "react";
import { Switch } from "antd";

interface ToggleTheme {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Toggle: React.FC<ToggleTheme> = ({ darkMode, setDarkMode }) => {
  return (
    <Switch
      checked={darkMode}
      onChange={(checked) => setDarkMode(checked)}
      checkedChildren="Dark"
      unCheckedChildren="Light"
      className="toggle-btn"
    />
  );
};

export default Toggle;
