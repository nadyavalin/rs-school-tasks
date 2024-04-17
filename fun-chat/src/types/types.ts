export interface State {
  id: string;
  login: string;
  password: string;
  authorizedUsers: UserResponse[];
  unauthorizedUsers: UserResponse[];
  selectedUser?: ExternalUserResponse | null;
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

export interface ExternalUserResponse {
  login: string;
  isLogined: boolean;
}

export interface UserExternalPayloadResponse {
  user: ExternalUserResponse;
}

export interface ActivePayloadResponse {
  users: UserResponse[];
}

export interface InactivePayloadResponse {
  users: UserResponse[];
}

export interface MessageRequest {
  to: string;
  text: string;
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
  datetime: string;
  status: Status;
}

export interface MessageFromUserRequest {
  user: {
    login: string;
  };
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

export interface MessageFromUserResponse extends Response {
  type: MessageType.MSG_FROM_USER;
  payload: {
    messages: [];
  };
}

export interface ErrorResponse extends Response {
  type: MessageType.ERROR;
  payload: {
    error: string;
  };
}

export type TResponse =
  | UserLoginResponse
  | UserLogoutResponse
  | UserExternalLoginResponse
  | UserExternalLogoutResponse
  | UserActiveResponse
  | UserInactiveResponse
  | UserSendMessageResponse
  | MessageFromUserResponse
  | ErrorResponse;
