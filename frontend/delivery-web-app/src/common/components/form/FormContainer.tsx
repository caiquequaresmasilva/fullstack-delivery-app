import { cloneElement } from "react"
import { useHandleFormSubmit } from "../../hooks"

interface FormContainerProps<T> {
  children: JSX.Element
  service: PostUserService<T>
  redirect?: boolean
}
export default function FormContainer<T>({ service, redirect, children }: FormContainerProps<T>) {
  const { errorMsg, handleFormSubmit } = useHandleFormSubmit(service, redirect)
  const injectChildren = () => cloneElement(children, { handleFormSubmit })
  return (
    <div>
      {injectChildren()}
      <p>{errorMsg}</p>
    </div>
  )
}
