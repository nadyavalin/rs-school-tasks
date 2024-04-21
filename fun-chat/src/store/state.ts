import { State } from "../types/types";

export const state: State = {
  id: "",
  login: "",
  password: "",
  authorizedUsers: [],
  unauthorizedUsers: [],
  selectedUser: null,

  // TODO
  messages: [],
  selectedMessage: null,
};

export default state;
