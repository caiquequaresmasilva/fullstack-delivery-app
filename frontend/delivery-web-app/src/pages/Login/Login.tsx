import { useCallback } from "react";
import { Auth } from "../../common/components/Auth";
import { useLoginMutation } from "../../redux/api";

export default function Login() {
  const [login] = useLoginMutation()
  const service: PostUserService = useCallback(async ({ email, password }) => {
    try {
      const { role } = await login({ email, password }).unwrap()
      return {
        role
      }
    } catch (e) {
      return {
        error: (e as ApiError).data.error
      }
    }
  }, [login])
  return (
    <main>
      <Auth.Container service={service}>
        <Auth.Form.Container>
          <Auth.Form.TextInput name="email" />
          <Auth.Form.TextInput name="password" />
          <Auth.Form.SubmitButton label="Log in" />
          <Auth.Form.NavigateButton label="Sign up" path="/signup" />
        </Auth.Form.Container>
        <Auth.ErrorMessage />
      </Auth.Container>
    </main>
  )
}
