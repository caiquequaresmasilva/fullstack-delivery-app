import { memo } from "react"
import { capitalize, debounceOnChange } from "../../utils"
import { useTextInputValidation } from "../../hooks"


export default memo(function FormTextInput({ setState, name }: TextInputProps) {
  const { error, handleOnChange } = useTextInputValidation({ name, setState })
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
