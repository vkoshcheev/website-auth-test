import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { ApiError } from "./useLogin";

interface GetNewCodeResponse {
  success: boolean;
  expiresIn: number;
  resendAvailableIn: number;
}

const getNewCodeApi = async (): Promise<GetNewCodeResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, expiresIn: 10, resendAvailableIn: 0 });
    }, 1000);
  });
};

export const useGetNewCode = (): UseMutationResult<
  GetNewCodeResponse,
  ApiError,
  void
> => {
  return useMutation({
    mutationFn: getNewCodeApi,
  });
};
