import { useCallback } from "react";
import { useLoginMutation } from "../../../redux/api";

type Return = {
  loginService: PostUserService<Login>;
};
export default function useLoginService(): Return {
  const [login] = useLoginMutation();
  const loginService: PostUserService<Login> = useCallback(
    async ({ email, password }) => {
      try {
        const { role } = await login({ email, password }).unwrap();
        return {
          role,
        };
      } catch (e) {
        return {
          error: (e as ApiError).data.error,
        };
      }
    },
    [login]
  );
  return { loginService };
}
