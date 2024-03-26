import { useCallback, useState } from "react";
import { validateField } from "../utils";

export default function useTextInputValidation({
  name,
  setState,
}: TextInputProps) {
  const [error, setError] = useState("");

  const handleOnChange = useCallback(
    ({ target: { value } }: OnChangeType) => {
      const { isValid, message } = validateField(name, value);
      if (isValid) {
        setState(value);
        setError("");
      } else {
        setState("");
        setError(message);
      }
    },
    [name, setState]
  );
  return { handleOnChange, error };
}
