export interface State {
  id: string;
  login: string;
  password: string;
  authorizedUsers: UserResponse[];
}

export interface UserRequest {
  login: string;
  password: string;
}

export interface UserResponse {
  login: string;
  isLogined: boolean;
}

export interface UserLoginPayloadRequest {
  user: UserRequest;
}

export interface UserLoginPayloadResponse {
  user: UserResponse;
}

export interface UserLogoutPayloadRequest {
  user: UserRequest;
}

export interface UserLogoutPayloadResponse {
  user: UserResponse;
}

export interface ActivePayloadRequest {
  id: string;
  payload: ActivePayloadResponse | null;
}

export interface ActivePayloadResponse {
  users: UserResponse[];
}

export enum MessageType {
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT",
  USER_EXTERNAL_LOGIN = "USER_EXTERNAL_LOGIN",
  USER_EXTERNAL_LOGOUT = "USER_EXTERNAL_LOGOUT",
  USER_ACTIVE = "USER_ACTIVE",
  USER_INACTIVE = "USER_INACTIVE",
  MSG_SEND = "MSG_SEND",
  MSG_FROM_USER = "MSG_FROM_USER",
  MSG_DELIVER = "MSG_DELIVER",
  MSG_READ = "MSG_READ",
  MSG_DELETE = "MSG_DELETE",
  MSG_EDIT = "MSG_EDIT",
  ERROR = "ERROR",
}
