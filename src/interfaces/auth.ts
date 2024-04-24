export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  gender: string;
  phone: string;
  password: string;
  confirmationPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyData {
  email: string;
  code: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
