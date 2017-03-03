import {inject,bindable} from 'aurelia-framework';
import {AuthenticationService} from '../services/auth-service'

@inject(AuthenticationService)
export class NavBar {
  @bindable router = null;
  constructor(authservice) {

    this.authservice = authservice
  }

  async logout() {
    let loggedout = await this.authservice.logout();
    console.log('logged out')
  }
  async login() {
    try {
      if (this.authservice.authenticated === false) {
        let loggedin = await this.authservice.login();
        if (loggedin = true) {
          console.log('logged in')
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
