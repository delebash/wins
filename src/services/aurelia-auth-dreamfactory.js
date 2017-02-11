import {AuthService} from 'aurelia-authentication';
import {Endpoint} from 'aurelia-api';
import {inject, computedFrom} from 'aurelia-framework';
import dfconfig from '../config/dreamfactory-config';

@inject(AuthService,Endpoint.of('api'))
export class AurelaiAuthDreamfactory {
  constructor(authService,api) {
    this.api = api;
    this.authService = authService;
    this.username = null;
    this.gotdata = null;
    this.authService.login(dfconfig.credentials())
      .then(response => {
        this.username = response.name;
        console.log("login success");
      })
      .catch(err => {
        console.log("login failure");
      });
  };


  // make a getter to get the authentication status.
  // use computedFrom to avoid dirty checking
  @computedFrom('authService.authenticated')
  get authenticated() {
    return this.authService.authenticated;
  }

  get sessiontoken() {
    return this.authService.getAccessToken()
  }
  logout() {
    return this.authService.logout();
  }

  activate(){
    return this.api.find('customers')
      .then(customers => this.gotdata = JSON.stringify(customers.resource[0]));
  }
}
