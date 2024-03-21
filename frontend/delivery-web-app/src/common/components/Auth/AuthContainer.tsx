import { cloneElement, memo, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

type AuthContainerProps = {
  service: PostUser
  children: JSX.Element[]
}
export default memo(function AuthContainer({ service, children }: AuthContainerProps) {
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  const handleSubmit = useCallback<HandleSubmit>(async ({ email, password }) => {
    const { error } = await service({ email, password })
    if (error) {
      setErrorMsg(error)
    } else {
      navigate('/home')
    }
  }, [service, navigate])

  const injectChildren = () => {
    const newChildren: JSX.Element[] = []
    newChildren.push(cloneElement(children[0], { handleSubmit,key: 0 }))
    newChildren.push(cloneElement(children[1], { message: errorMsg,key:1 }))
    return newChildren
  }

  return (
    <div>
      {injectChildren()}
    </div>
  )
})
