import { cloneElement, useCallback, useState } from "react"
import { logout, selectAuth } from "../../../redux/authSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { useAuthValidation } from "../../hooks"
import { Outlet } from "react-router-dom"

interface HeaderContainerProps {
  children: JSX.Element | JSX.Element[]
}
export default function HeaderContainer({ children }: HeaderContainerProps) {
  const [toggle, setToggle] = useState(true)
  const auth = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()
  const handleLogout = () => dispatch(logout())
  useAuthValidation(auth)

  const injectChildren = useCallback(() => {
    if (Array.isArray(children)) {
      return [
        cloneElement(children[0], { setToggle, toggle }),
        cloneElement(children[1], { setToggle, toggle: !toggle })
      ]
    }
    return cloneElement(children, { setToggle, toggle })

  }, [toggle, children])

  return (
    <>
      <header>
        <div>
          <div>
            {injectChildren()}
          </div>
          <span>{auth.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <Outlet />
    </>

  )
}
