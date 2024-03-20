import { memo } from "react"

type AuthErrorMessageProps = {
  message: string
}
export default memo(function AuthErrorMessage({ message }: AuthErrorMessageProps) {
  return (
    <p>{message}</p>
  )
})
