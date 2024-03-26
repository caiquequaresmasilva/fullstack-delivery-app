import { useCallback } from "react";
import { useCreateUserMutation } from "../../../redux/api";

type Return = {
  signupService: PostUserService<User>;
};
export default function useSignupService(): Return {
  const [createUser] = useCreateUserMutation();
  const signupService: PostUserService<User> = useCallback(
    async ({ email, password, role, name }) => {
      try {
        const { role: respRole } = await createUser({
          email,
          password,
          name,
          role,
        }).unwrap();
        return {
          role: respRole,
        };
      } catch (e) {
        return {
          error: (e as ApiError).data.error,
        };
      }
    },
    [createUser]
  );
  return { signupService };
}
