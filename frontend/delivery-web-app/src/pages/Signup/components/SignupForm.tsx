import { NavigateButton, SubmitButton } from "../../../common/components/buttons"
import { TextInput } from "../../../common/components/inputs"
import { useSignupFields } from "../hooks"

interface SignupFormProps {
  handleFormSubmit?: HandleSubmit<User>
}
export default function SignupForm({ handleFormSubmit }: SignupFormProps) {
  const [
    { email, name, password },
    { setEmail, setName, setPassword },
    { disableSubmit }
  ] = useSignupFields()

  const onSubmit = async (e: OnSubmitParam) => {
    e.preventDefault()
    if (handleFormSubmit) {
      await handleFormSubmit({ email, password, name, role: 'customer' })
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextInput name="name" setState={setName} />
        <TextInput name="email" setState={setEmail} />
        <TextInput name="password" setState={setPassword} />
        <SubmitButton label="Sign up" disable={disableSubmit()} />
      </form>
      <NavigateButton label="Log in" path="/login" />
    </div>
  )
}
