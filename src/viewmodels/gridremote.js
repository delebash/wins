import {inject} from 'aurelia-framework';
import {DreamFactoryAdaptor} from '../services/syncfusion-dreamfactory-adaptor';
import {AuthenticationService} from '../services/auth-service'
import dfconfig from '../config/dreamfactory-config'

@inject(AuthenticationService,DreamFactoryAdaptor)
export class GridQuery {
  constructor(authservice,adaptor) {
    this.authservice = authservice
    this.adaptor = adaptor
  }

  attached() {
    if (this.authservice.authenticated === false) {
      alert('please login')
    } else {
      this.getdata();
    }
  }

  getdata() {
    //requestType = "get" -- request uses query string params via get, "json" -- request uses post to send an object
    let adaptorOptions = {requestType: "json"}; //defaults to "get" if not specified or not passed in

    let dataManager = ej.DataManager({
      url: "https://api.ageektech.com/api/v2/northwind/_table/customers",
      adaptor: new this.adaptor.syncfusionDreamFactoryAdaptor(adaptorOptions),
      headers: [{
        "X-DreamFactory-Application-Name": dfconfig.APP_NAME,
        "X-DreamFactory-API-Key": dfconfig.APP_API_KEY,
        "X-DreamFactory-Session-Token": this.authservice.sessiontoken
      }]
    });

    $("#Grid").ejGrid({
      dataSource: dataManager,
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

