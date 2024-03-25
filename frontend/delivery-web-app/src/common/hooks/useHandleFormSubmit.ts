import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { roleToPathMap } from "../utils";

type Return<T> = {
  handleFormSubmit: HandleSubmit<T>;
  errorMsg: string;
};

export default function useHandleFormSubmit<T>(
  service: PostUserService<T>,
  redirect?: boolean
): Return<T> {

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate()

  const handleFormSubmit = useCallback<HandleSubmit<T>>(
    async (data) => {
      const { error, role } = await service(data);
      if (error) {
        setErrorMsg(error);
      } else if (role) {
         redirect && navigate(roleToPathMap[role]);
      }
    },
    [service, navigate,redirect]
  );
  return {
    handleFormSubmit,
    errorMsg,
  };
}
