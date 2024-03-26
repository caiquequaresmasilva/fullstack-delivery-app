import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { CustomerProducts } from "./pages/customer-pages"
import { SellerOrders } from "./pages/seller-pages"
import { AdminManage } from "./pages/admin-pages"
import { Signup } from "./pages/Signup"


function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/customer/products' element={<CustomerProducts />} />
      <Route path='/seller/orders' element={<SellerOrders />} />
      <Route path='/admin/manage' element={<AdminManage />} />
    </Routes>
  )
}
export default App
