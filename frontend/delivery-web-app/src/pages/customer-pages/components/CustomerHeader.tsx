import { Header } from "../../../common/components/header";

export default function CustomerHeader() {
  return (
    <Header.container>
      <Header.navigation label="PRODUCTS" path="/customer/products" />
      <Header.navigation label="ORDERS" path="/customer/orders" />
    </Header.container>
  )
}
