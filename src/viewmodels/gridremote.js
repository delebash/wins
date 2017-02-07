import {inject} from 'aurelia-framework';
import {DreamFactoryAdapter} from '../services/syncfusion-dream-factory-adapter';
import {Endpoint} from 'aurelia-api';
import {AurelaiAuthDreamfactory} from '../services/aurelia-auth-dreamfactory'
import dfconfig from '../config/dreamfactory-config'

@inject(Endpoint.of('api'),AurelaiAuthDreamfactory)

export class GridRemote {
  constructor(api, authservice) {
    this.api = api;
    this.authenticated = authservice.authenticated;
    this.sessiontoken = authservice.sessiontoken;
  }

  attached() {
    if (this.authenticated = false) {
      this.auth.login();
    }
   this.getdata()
  }

  getdata() {
    if (this.authenticated = true) {
      let datamanager = ej.DataManager({
        url: "https://api.ageektech.com/api/v2/northwind/_table/customers",
        adaptor: new DreamFactoryAdapter.syncfusionDreamFactoryAdapter,
        headers: [{"X-DreamFactory-Application-Name": dfconfig.APP_NAME,"X-DreamFactory-API-Key": dfconfig.APP_API_KEY, "X-DreamFactory-Session-Token": this.sessiontoken}]
      });

      $("#Grid").ejGrid({
        dataSource: datamanager,
        allowPaging: true,
        allowSorting: true,
        isResponsive: true,
        columns: [
          {field: "first_name", headerText: "First Name", width: 110},
          {field: "last_name", headerText: "Last Name", width: 110}
        ]
      });
    }
  }
}

