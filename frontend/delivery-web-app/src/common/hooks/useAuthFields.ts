import { useState } from "react";

type Return = [
  {
    email: string;
    password: string;
  },
  {
    setEmail: SetState<string>;
    setPassword: SetState<string>;
  }
];
export default function useAuthFields(): Return {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return [
    { email, password },
    { setEmail, setPassword },
  ];
}
