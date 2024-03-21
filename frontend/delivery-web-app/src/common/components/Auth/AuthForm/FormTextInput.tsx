import { memo, useState } from "react"
import { capitalize, debounceOnChange, validateField } from "../../../utils"
type AuthFormTextInputProps = {
  setState?: SetState<string>
  name: FieldName
}
export default memo(function FormTextInput({ setState, name }: AuthFormTextInputProps) {
  const [error, setError] = useState('')
  const handleOnChange = ({ target: { value } }: OnChangeType) => {
    const { isValid, message } = validateField(name, value)
    if (isValid && setState) {
      setState(value)
      setError('')
    } else if(setState) {
      setState('')
      setError(message)
    }
  }
  return (
    <>
      <input
        type={name}
        name={name}
        placeholder={capitalize(name)}
        onChange={debounceOnChange(handleOnChange)}
      />
      <p className="text-red-500 text-sm my-2">{error}</p>
    </>
  )
})
