export interface State {
  id: string;
  login: string;
  password: string;
  authorizedUsers: UserResponse[];
  unauthorizedUsers: UserResponse[];
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

export interface UserExternalPayloadResponse {
  user: ExternalUser;
}

export interface ActivePayloadResponse {
  users: UserResponse[];
}

export interface InactivePayloadResponse {
  users: UserResponse[];
}

export interface Status {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
}

export interface SendMessagePayloadResponse {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: Status;
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
  payload: UserExternalPayloadResponse;
}

interface UserExternalLogoutResponse extends Response {
  type: MessageType.USER_EXTERNAL_LOGOUT;
  payload: UserExternalPayloadResponse;
}

export interface UserActiveResponse extends Response {
  type: MessageType.USER_ACTIVE;
  payload: ActivePayloadResponse;
}

export interface UserInactiveResponse extends Response {
  type: MessageType.USER_INACTIVE;
  payload: InactivePayloadResponse;
}

export interface UserSendMessageResponse extends Response {
  type: MessageType.MSG_SEND;
  payload: SendMessagePayloadResponse;
}

export type TResponse =
  | UserLoginResponse
  | UserLogoutResponse
  | UserExternalLoginResponse
  | UserExternalLogoutResponse
  | UserActiveResponse
  | UserInactiveResponse
  | UserSendMessageResponse;

export interface Message {
  to: string;
  text: string;
}
