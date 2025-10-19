import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { ApiError } from "./useLogin";

interface ConfirmCodeResponse {
  success: boolean;
}

const confirmCodeApi = async (code: string): Promise<ConfirmCodeResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === '000000') return reject({ status: 401, message: 'Invalid code' });
      if (code === '111111') return reject({ status: 429, message: 'Too many attempts' });
      if (code === '222222') return reject({ status: 500, message: 'Server error' });
      resolve({ success: true });
    }, 1000);
  });
};

export const useConfirmCode = (): UseMutationResult<
  ConfirmCodeResponse,
  ApiError,
  string
> => {
  return useMutation({
    mutationFn: confirmCodeApi,
  });
};
