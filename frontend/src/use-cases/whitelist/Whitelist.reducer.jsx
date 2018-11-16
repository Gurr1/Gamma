import {
  WHITELIST_LOAD,
  WHITELIST_LOADING,
  WHITELIST_LOAD_SUCCESSFULLY,
  WHITELIST_LOAD_FAILED,
  WHITELIST_ADD,
  WHITELIST_ADD_SUCCESSFULLY,
  WHITELIST_ADD_FAILED,
  WHITELIST_REMOVE,
  WHITELIST_DELETE_SUCCESSFULLY,
  WHITELIST_DELETE_FAILED,
  WHITELIST_CHANGE,
  WHITELIST_CHANGE_SUCCESSFULLY,
  WHITELIST_CHANGE_FAILED
} from "./Whitelist.actions";

import { USER_LOGOUT_SUCCESSFULLY } from "../../app/elements/user-information/UserInformation.element.actions";

export function whitelist(state = [], action) {
  switch (action.type) {
    case WHITELIST_LOAD_SUCCESSFULLY:
      return [...action.payload.data];
    case USER_LOGOUT_SUCCESSFULLY:
      return [];
    default:
      return state;
  }
}