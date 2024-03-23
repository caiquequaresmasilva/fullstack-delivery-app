import { ReactNode, cloneElement, memo } from "react"
import { useAuthFields } from "../../../hooks"

type AuthFormProps = {
  handleSubmit?: HandleSubmit
  children: JSX.Element[]
}
export default memo(function Form({ handleSubmit, children }: AuthFormProps) {
  const [{ email, password }, { setEmail, setPassword }] = useAuthFields()

  const onSubmit = async (e: OnSubmitParam) => {
    e.preventDefault()
    if (handleSubmit) {
      await handleSubmit({ email, password })
    }

  }

  const disableSubmit = () => email === '' || password === ''

  const injectChildren = () => {
    const newChildren: ReactNode[] = []
    newChildren.push(cloneElement(children[0], { setState: setEmail, key: 0 }))
    newChildren.push(cloneElement(children[1], { setState: setPassword, key: 1 }))
    newChildren.push(cloneElement(children[2], { disable: disableSubmit(), key: 2 }))
    newChildren.push(children[3])
    return newChildren
  }
  return (
    <form onSubmit={onSubmit}>
      {injectChildren()}
    </form>
  )
})
