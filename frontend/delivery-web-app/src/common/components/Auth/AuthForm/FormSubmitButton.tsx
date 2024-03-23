import { memo } from "react"

type AuthFormSubmitButtonProps = {
  disable?: boolean
  label: string
}
export default memo(function FormSubmitButton({ disable, label }: AuthFormSubmitButtonProps) {
  return (
    <button type="submit" disabled={disable}>{label}</button>
  )
})
