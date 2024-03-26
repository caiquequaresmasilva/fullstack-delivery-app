import { useState } from "react";

type Return = [
  {
    email: string;
    password: string;
    name: string;
  },
  {
    setEmail: SetState<string>;
    setPassword: SetState<string>;
    setName: SetState<string>;
  },
  { disableSubmit: () => boolean }
];
export default function useAuthFields(): Return {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const disableSubmit = () => email === "" || password === "" || name === "";
  return [
    { email, password, name },
    { setEmail, setPassword, setName },
    { disableSubmit },
  ];
}
