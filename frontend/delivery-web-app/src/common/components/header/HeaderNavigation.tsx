import { useNavigate } from "react-router-dom"

interface HeaderNavigationProps {
  label: string
  path?: string
  setToggle?: SetState<boolean>
  toggle?: boolean
}
export default function HeaderNavigation({ label, path, setToggle, toggle }: HeaderNavigationProps) {
  const navigate = useNavigate()
  const handleButton = () => {
    if (setToggle) {
      setToggle(prev => !prev)
      navigate(path || "")
    }

  }
  return (
    <button
      disabled={!setToggle || toggle}
      onClick={handleButton}>
      {label}
    </button>
  )
}
