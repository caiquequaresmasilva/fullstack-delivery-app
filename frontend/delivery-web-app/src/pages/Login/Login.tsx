import { Auth } from "../../common/components/Auth";

export default function Login() {
  const service: PostUserService = async ({ email, password }) => {
    console.log(email, password)
    return {}
  }
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
