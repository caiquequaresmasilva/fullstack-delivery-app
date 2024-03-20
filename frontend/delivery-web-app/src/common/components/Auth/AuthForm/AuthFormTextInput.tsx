import { memo, useState } from "react"
import { capitalize, debounceOnChange, validateField } from "../../../utils"
type AuthFormTextInputProps = {
  setState: SetState<string>
  name: FieldName
}
export default memo(function AuthFormTextInput({ setState, name }: AuthFormTextInputProps) {
  const [error, setError] = useState('')
  const handleOnChange = ({ target: { value } }: OnChangeType) => {
    const { isValid, message } = validateField(name, value)
    if (isValid) {
      setState(value)
      setError('')
    } else {
      setState('')
      setError(message)
    }
  }
  return (
    <>
      <input
        type="text"
        name={name}
        placeholder={capitalize(name)}
        onChange={debounceOnChange(handleOnChange)}
      />
      <p className="text-red-500 text-sm my-2">{error}</p>
    </>
  )
})
