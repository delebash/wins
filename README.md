## Aurelia Skeleton using a syncfusion grid connected to a dreamfactory api instance. ##

**This project uses:**

- [aurelia javascript framework](http://aurelia.io/)
- [aurelia-cli](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/the-aurelia-cli) as the package manager, bundler
- [aurelia-api](https://aurelia-api.spoonx.org/) plugin
- [aurelia-authentication ](https://aurelia-authentication.spoonx.org/)plugin
- [syncfusion](https://www.syncfusion.com/products/javascript) grid
- [syncfusion-dreamfactory-adaptor](https://github.com/delebash/syncfusion-dreamfactory-adaptor)
- [bootswatch.paper](https://bootswatch.com/paper/)

**Installation:**

    npm install aurelia-cli -g

Download the release or master branch, unzip and run the following in project folder.

    npm install    

**Edit:**
    
     config/dreamfactory-config.js
 
Update with your dreamfactory settings.

**Run/Build using one of the aurelia-cli commands:**

    au run
    au run --watch
    au build

Build scripts and aurelia.config have been added/modified from what is produced in a new aurelia-cli project.