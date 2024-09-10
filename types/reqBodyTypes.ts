export interface NewUserRequestBody {}

export interface LoginUserRequestBody {
  email: string;
  password: string;
}

export interface MessageRespondBody {
  message: string;
  error: string;
}
