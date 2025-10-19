import { UseMutationResult, useMutation } from '@tanstack/react-query';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const loginApi = async (data: LoginData): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === 'yeap@mail.com' && data.password === '123') return resolve({ success: true });
      if (data.email === 'yeap@mail.com' && data.password !== '123')
        return reject(new ApiError(401, 'Wrong password'));
      if (data.email === 'blocked@mail.com') return reject(new ApiError(403, 'Account blocked'));
      if (data.email === 'servererror@mail.com') return reject(new ApiError(500, 'Server error'));
      return reject(new ApiError(401, 'Wrong credentials'));
    }, 1000);
  });
};

export const useLogin = (): UseMutationResult<
  LoginResponse,
  ApiError,
  LoginData
> => {
  return useMutation({
    mutationFn: loginApi,
  });
};
