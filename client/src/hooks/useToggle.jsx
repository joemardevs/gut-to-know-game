import { useState } from "react";

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const enable = () => setValue(true);

  const disable = () => setValue(false);

  const toggle = () => setValue(!value);

  return [value, enable, disable, toggle];
};

export default useToggle;
