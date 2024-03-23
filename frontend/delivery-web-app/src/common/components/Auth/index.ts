import AuthContainer from "./AuthContainer";
import AuthErrorMessage from "./AuthErrorMessage";
import { AuthForm } from "./AuthForm";

export const Auth = Object.freeze({
  Container: AuthContainer,
  Form: AuthForm,
  ErrorMessage: AuthErrorMessage,
});
