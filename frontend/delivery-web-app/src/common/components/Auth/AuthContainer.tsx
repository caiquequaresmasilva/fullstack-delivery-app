import { cloneElement, memo, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { roleToPathMap } from "../../utils"

type AuthContainerProps = {
  service: PostUserService
  children: JSX.Element[]
}
export default memo(function AuthContainer({ service, children }: AuthContainerProps) {
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = useCallback<HandleSubmit>(async ({ email, password, name, role }) => {
    const { error, role: respRole } = await service({ email, password, name, role })
    if (error) {
      setErrorMsg(error)
    } else if(respRole) {
      navigate(roleToPathMap[respRole])
    }
  }, [service, navigate])

  const injectChildren = () => {
    const newChildren: JSX.Element[] = []
    newChildren.push(cloneElement(children[0], { handleSubmit, key: 0 }))
    newChildren.push(cloneElement(children[1], { message: errorMsg, key: 1 }))
    return newChildren
  }

  return (
    <div>
      {injectChildren()}
    </div>
  )
})
