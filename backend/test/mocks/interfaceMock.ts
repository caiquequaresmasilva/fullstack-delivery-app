import { mock } from "jest-mock-extended";

export default  function interfaceMock<T>(){
  return mock<T>()
}