import {AuthService} from 'aurelia-authentication';
import {Endpoint} from 'aurelia-api';
import {inject, computedFrom} from 'aurelia-framework';
import dfconfig from '../config/dreamfactory-config';
import {log} from '../services/logger';

@inject(AuthService, Endpoint.of('api'))
export class AuthenticationService {
  constructor(authservice, api) {
    this.api = api;
    this.authservice = authservice;
    this.username = null;
  };

  async login() {
    try {
      let response = await this.authservice.login(dfconfig.credentials());
      if (response.session_id) {
        return true;
      }
    } catch (error) {
      let response = await error.json();
      log.error('login failed',response.error)
    //  let response = await error.json();
     // let servererror = response.error;
     // throw new Error(JSON.stringify(servererror))

    }
  }

  // async login() {
  //   return this.authservice.login(dfconfig.credentials())
  //     .then(response => {
  //       console.log("success logged " + response);
  //     })
  //     .catch(err => {
  //       err.json()
  //         .then((json) => console.log(json));
  //     });
  // }
  //
  // throw new Error(JSON.stringify(response))
  //
  // // throw{
  // //   name: "JavaScriptKit Error",
  // //   message: response.error
  // // }}


  // make a getter to get the authentication status.
  // use computedFrom to avoid dirty checking
  @computedFrom('authservice.authenticated')
  get authenticated() {
    return this.authservice.authenticated;
  }

  get sessiontoken() {
    return this.authservice.getAccessToken()
  }

  async logout() {
    let response = await this.authservice.logout();
  }
}
