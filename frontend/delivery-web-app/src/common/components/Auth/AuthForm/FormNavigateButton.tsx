import { memo } from "react"
import { useNavigate } from "react-router-dom"

type AuthFormNavigateButtonProps = {
  path: AuthPaths
  label: string
}
export default memo(function FormNavigateButton({ label, path }: AuthFormNavigateButtonProps) {
  const navigate = useNavigate()
  const handleClick = () => navigate(path)

  return (
    <button onClick={handleClick}>{label}</button>
  )
})
