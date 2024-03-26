import { FormContainer } from "../../common/components/form";
import { SignupForm } from "./components";
import { useSignupService } from "./hooks";

export default function Signup() {
  const { signupService } = useSignupService()
  return (
    <main>
      <FormContainer<User> service={signupService} redirect>
        <SignupForm />
      </FormContainer>
    </main>
  )
}
