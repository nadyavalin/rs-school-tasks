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
  message: {
    to: string;
    text: string;
  };
}

export interface Status {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
}

export interface SendMessagePayloadResponse {
  message: {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: string;
    status: Status;
  };
}

export interface MessageHistoryWithUsersRequest {
  user: {
    login: string;
  };
}

export interface MessageDeliveredStatusPayloadResponse {
  id: string;
  status: {
    isDelivered: boolean;
  };
}

export interface MessageReadRequest {
  message: {
    id: string;
  };
}

export interface MessageReadStatusPayloadResponse {
  id: string;
  status: {
    isReaded: boolean;
  };
}

export interface MessageDeleteRequest {
  message: {
    id: string;
  };
}

export interface MessageDeletePayloadResponse {
  id: string;
  status: {
    isDeleted: boolean;
  };
}

export interface MessageEditRequest {
  message: {
    id: string;
    text: string;
  };
}

export interface MessageEditPayloadResponse {
  id: string;
  text: string;
  status: {
    isEdited: boolean;
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

export interface MessagesFromUserResponse extends Response {
  type: MessageType.MSG_FROM_USER;
  payload: {
    messages: [];
  };
}

export interface MessageDeliveredStatusResponse extends Response {
  type: MessageType.MSG_DELIVER;
  payload: {
    message: MessageDeliveredStatusPayloadResponse;
  };
}

export interface MessageReadStatusResponse extends Response {
  type: MessageType.MSG_READ;
  payload: {
    message: MessageReadStatusPayloadResponse;
  };
}

export interface MessageDeletedResponse extends Response {
  type: MessageType.MSG_DELETE;
  payload: {
    message: MessageDeletePayloadResponse;
  };
}

export interface MessageEditResponse extends Response {
  type: MessageType.MSG_EDIT;
  payload: {
    message: MessageEditPayloadResponse;
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
  | MessagesFromUserResponse
  | MessageDeliveredStatusResponse
  | MessageReadStatusResponse
  | MessageDeletedResponse
  | MessageEditResponse
  | ErrorResponse;
