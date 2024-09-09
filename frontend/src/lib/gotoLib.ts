import {router} from "../router";

export const gotoLib = {
  async home() {
    await router.navigate("/")
  },
  async login() {
    await router.navigate("/login")
  },
  async register() {
    await router.navigate("/register")
  },
  async nodeList() {
    await router.navigate("/nodeList")
  }
}
