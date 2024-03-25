import { memo } from "react"
import { useAuthFields } from "../../../common/hooks"
import { TextInput } from "../../../common/components/inputs"
import { NavigateButton, SubmitButton } from "../../../common/components/buttons"

interface LoginFormProps {
  handleFormSubmit?: HandleSubmit<Login>
}
export default memo(function LoginForm({ handleFormSubmit }: LoginFormProps) {
  const [{ email, password }, { setEmail, setPassword }] = useAuthFields()
  const disableSubmit = () => email === '' || password === ''

  const onSubmit = async (e: OnSubmitParam) => {
    e.preventDefault()
    if (handleFormSubmit) {
      await handleFormSubmit({ email, password })
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextInput name="email" setState={setEmail}/>
        <TextInput name="password" setState={setPassword}/>
        <SubmitButton label="Log in" disable={disableSubmit()}/>
      </form>
      <NavigateButton label="Sign up" path="/signup"/>
    </div>
  )
})
