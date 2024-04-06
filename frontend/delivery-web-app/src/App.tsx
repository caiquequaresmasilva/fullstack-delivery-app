import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import {
  CustomerCheckout,
  CustomerHeader,
  CustomerOrderDetails,
  CustomerOrders,
  CustomerProducts
} from "./pages/customer-pages"
import { Signup } from "./pages/Signup"
import { AdminHeader, AdminManage } from "./pages/admin-pages"
import { SellerHeader, SellerOrderDetails, SellerOrders } from "./pages/seller-pages"


function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/customer' element={<CustomerHeader />}>
        <Route index element={<Navigate replace to="/customer/products" />} />
        <Route path="products" element={<CustomerProducts />} />
        <Route path="checkout" element={<CustomerCheckout />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="orders/:id" element={<CustomerOrderDetails />} />
      </Route>
      <Route path='/admin' element={<AdminHeader />}>
        <Route index element={<Navigate replace to="/admin/manage" />} />
        <Route path="manage" element={<AdminManage />} />
      </Route>
      <Route path='/seller' element={<SellerHeader />}>
        <Route index element={<Navigate replace to="/seller/orders" />} />
        <Route path="orders" element={<SellerOrders />} />
        <Route path="orders/:id" element={<SellerOrderDetails />} />
      </Route>
    </Routes>
  )
}
export default App
