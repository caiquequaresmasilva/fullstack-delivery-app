import { FormContainer } from "../../common/components/form"
import { LoginForm } from "./components"
import { useLoginService } from "./hooks"

export default function Login() {
  const { loginService } = useLoginService()

  return (
    <main>
      <h1>Delivery App</h1>
      <FormContainer<Login> service={loginService} redirect>
        <LoginForm/>
      </FormContainer>
    </main>
  )
}
