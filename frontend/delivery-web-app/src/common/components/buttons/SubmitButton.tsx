import { memo } from "react"

type SubmitButtonProps = {
  disable?: boolean
  label: string
}
export default memo(function FormSubmitButton({ disable, label }: SubmitButtonProps) {
  return (
    <button type="submit" disabled={disable}>{label}</button>
  )
})
