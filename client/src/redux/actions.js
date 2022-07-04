import { REGISTRATION, LOGIN } from "./types";

export function registration() {
  return {
    type: REGISTRATION,
  }
}

export function login() {
  return {
    type: LOGIN
  }
}