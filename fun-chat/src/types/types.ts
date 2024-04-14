export interface State {
  id: string;
  login: string;
  password: string;
  authorizedUsers: UserResponse[];
  unauthorizedUsers: UserResponse[];
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

export interface ExternalUser {
  login: string;
  isLogined: boolean;
}

export interface UserExternalRequestFromServer {
  user: ExternalUser;
}

export interface ActivePayloadResponse {
  users: UserResponse[];
}

export interface InactivePayloadResponse {
  users: UserResponse[];
}

interface Response {
  id: string;
  type: MessageType;
}

interface UserLoginResponse extends Response {
  type: MessageType.USER_LOGIN;
  payload: UserLoginPayloadResponse;
}

interface UserLogoutResponse extends Response {
  type: MessageType.USER_LOGOUT;
  payload: UserLogoutPayloadResponse;
}

interface UserExternalLoginResponse extends Response {
  type: MessageType.USER_EXTERNAL_LOGIN;
  payload: UserExternalRequestFromServer;
}

interface UserExternalLogoutResponse extends Response {
  type: MessageType.USER_EXTERNAL_LOGOUT;
  payload: UserExternalRequestFromServer;
}

export interface UserActivePayloadResponse extends Response {
  type: MessageType.USER_ACTIVE;
  payload: ActivePayloadResponse;
}

export interface UserInactivePayloadResponse extends Response {
  type: MessageType.USER_INACTIVE;
  payload: InactivePayloadResponse;
}

export type TResponse =
  | UserLoginResponse
  | UserLogoutResponse
  | UserExternalLoginResponse
  | UserExternalLogoutResponse
  | UserActivePayloadResponse
  | UserInactivePayloadResponse;

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
