import { useCallback, useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
const useTogglePassword = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(false);

  const ToggleHandler = useCallback(() => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  });

  return {
    type,
    icon,
    PiEyeLight,
    PiEyeSlashLight,
    ToggleHandler,
  };
};

export default useTogglePassword;
