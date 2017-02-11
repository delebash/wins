import {inject} from 'aurelia-framework';
import {DreamFactoryAdapter} from '../services/syncfusion-dreamfactory-adapter';
import {Endpoint} from 'aurelia-api';
import {AurelaiAuthDreamfactory} from '../services/aurelia-auth-dreamfactory'
import dfconfig from '../config/dreamfactory-config'

@inject(Endpoint.of('api'), AurelaiAuthDreamfactory)

export class GridQuery {
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
      //requestType = "get" -- request uses query string params via get, "json" -- request uses post to send an object
      var adapterOptions = {requestType: "get"}; //defaults to "get" if not specified

      let adapter = new DreamFactoryAdapter;
      let dataManager = ej.DataManager({
        url: "https://api.ageektech.com/api/v2/northwind/_table/",
        adaptor: new adapter.syncfusionDreamFactoryAdapter(adapterOptions),
        headers: [{
          "X-DreamFactory-Application-Name": dfconfig.APP_NAME,
          "X-DreamFactory-API-Key": dfconfig.APP_API_KEY,
          "X-DreamFactory-Session-Token": this.sessiontoken
        }]
      });
      let queryCustomers = ej.Query()
        .from('customers')
        .select("id, last_name", "first_name")
        //.where("last_name","equal","axen")
        //  .where("id",ej.FilterOperators.lessThan,5)
        // .sortBy("last_name", "DESC")
        // .where("last_name", "contains" , "axen");
        .where("last_name", "like", "a%");
      //.where("last_name", "in" , "Yuan,Huang");
      // .where(ej.Predicate("last_name", "in", "'Yuan','Yan'").and("first_name","equal","Christine"));
      // .where(ej.Predicate("last_name", "startswith", "a").and("first_name","startswith","t"));


      $("#Grid").ejGrid({
        dataSource: dataManager,
        query: queryCustomers,
        toolbarSettings: {
          showToolbar: true,
          toolbarItems: ["add", "edit", "delete"]
        },
        editSettings: {
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          editMode: "dialog"
        },
        allowPaging: true,
        allowSorting: true,
        allowFiltering: true,
        // filterSettings: { filterType: "excel" },
        filterSettings: {showPredicate: true, filterType: "menu", enableCaseSensitivity: true},
        searchSettings: {ignoreCase: false},
        isResponsive: true,
        columns: [
          {field: "id", isPrimaryKey: true, isIdentity: true, width: 10},
          {field: "first_name", headerText: "First Name", width: 110},
          {field: "last_name", headerText: "Last Name", width: 110}
        ]
      });
    }
  }
}

