

Bundle everything is slower then bundling certain libraries.  Also by using http2 bundling is supposed to no longer be needed and will be slower, however [http2 compression is not optimized](http://engineering.khanacademy.org/posts/js-packaging-http2.htm) in the current implementation which actually results in slower performance in some cases.  I have chosen to bundle certain libraries.

**One main motivation** is large libraries such as including all of syncfusion tracing during build takes to long so by removing this as a build dependency and moving it as a normal javascript resource build times greatly increas 

Note:
We are using the vendor folder for custom builds and/or libraries we do not want to pull from node_modules. In our case we have a custom build of syncfusion generated with [syncfusion's custom generator](http://csg.syncfusion.com/) with only the grid control.


# Manual bootstrap aurelia if you want to #

requirejs is aurelia's module loader
    
    <!--###Manual aurelia bootstrap method###-->
    <script src="vendor/bluebird.core.js"></script>
    <script src="vendor/fetch.js"></script>
    <!--Paste no module scripts above requirejs-->
    <script src="vendor/require.js"></script>
    <script src="scripts/aurelia-bundle.js"></script>
    
    <script>
      require(['aurelia-bootstrapper']);
    </script>
    <!--### End Manual aurelia bootstrap method###-->
    
    <!--###Auto aurlia bootstrap method###-->
    <!--<script src="scripts/aurelia-bundle.js" data-main="aurelia-bootstrapper"></script>-->
    

# Currently using a Hybrid Bundle approach: #
Not bundling syncfusion, jquery,jsrender,jquery.easing

**index.html**
 uncomment/add

    <script src="vendor/jquery.min.js"></script>
    <script src="vendor/jquery.easing.min.js"></script>
    <script src="vendor/jsrender.min.js"></script>
    <script src="vendor/syncfusion/scripts/ej.widget.all.min.js"></script>

	<script src="vendor/jquery.min.js"></script>
    <script src="vendor/jquery.easing.min.js"></script>
    <script src="vendor/jsrender.min.js"></script>
    <script src="vendor/syncfusion/scripts/ej.widget.all.min.js"></script>

**src/startup/_startup.js**
comment/remove

    import ej from 'ej'

**src/app.html**
comment/remove

      <require from="ej/themes/ej.widgets.core.bootstrap.min.css"></require>
      <require from="ej/themes/bootstrap-theme/ej.theme.min.css"></require>
      <require from="ej/themes/responsive-css/ej.responsive.css"></require>
      <require from="ej/themes/responsive-css/ejgrid.responsive.css"></require>

**aurelia_project/aurelia.json**

    {
      "name": "Syncfusion-Dreamfactory-Aurelia-CLI",
      "type": "project:application",
      "platform": {
    "id": "web",
    "displayName": "Web",
    "output": "scripts",
    "index": "index.html"
      },
      "transpiler": {
    "id": "babel",
    "displayName": "Babel",
    "fileExtension": ".js",
    "options": {
      "plugins": [
    "transform-es2015-modules-amd"
      ]
    },
    "source": "src/**/*.js"
      },
      "markupProcessor": {
    "id": "maximum",
    "displayName": "Maximum Minification",
    "fileExtension": ".html",
    "source": "src/**/*.html"
      },
      "sassProcessor": {
    "id": "sass",
    "displayName": "Sass",
    "fileExtension": ".scss",
    "source": "src/sass/index.scss",
    "watch": "src/sass/**/*.scss"
      },
      "cssProcessor": {
    "id": "none",
    "displayName": "None",
    "fileExtension": ".css",
    "source": "src/css/**/*.css"
      },
      "editor": {
    "id": "webstorm",
    "displayName": "WebStorm"
      },
      "unitTestRunner": {
    "id": "karma",
    "displayName": "Karma",
    "source": "test/unit/**/*.js"
      },
      "dist": {
    "output": "dist",
    "sources": [
      "./scripts/**/*",
      "./index.html"
    ]
      },
      "paths": {
    "root": "src",
    "resources": "src/resources",
    "elements": "src/resources/elements",
    "attributes ": "src/resources/attributes",
    "valueConverters": "src/resources/value-converters",
    "bindingBehaviors": "src/resources/binding-behaviors"
      },
      "run": {
    "basePath": "dist"
      },
      "testFramework": {
    "id": "jasmine",
    "displayName": "Jasmine"
      },
      "build": {
    "targets": [
      {
    "id": "web",
    "displayName": "Web",
    "output": "scripts",
    "index": "index.html"
      }
    ],
    "loader": {
      "type": "require",
      "configTarget": "aurelia-bundle.js",
      "includeBundleMetadataInConfig": "auto",
      "plugins": [
    {
      "name": "text",
      "extensions": [
    ".html",
    ".css"
      ],
      "stub": true
    }
      ]
    },
    "options": {
      "minify": "stage & prod",
      "sourcemaps": "dev & stage"
    },
    "bundles": [
      {
    "name": "app-bundle.js",
    "source": [
      "[**/*.js]",
      "**/*.{css,html}"
    ]
      },
      {
    "name": "aurelia-bundle.js",
    "prepend": [
      "node_modules/bluebird/js/browser/bluebird.core.js",
      "node_modules/whatwg-fetch/fetch.js",
      "node_modules/requirejs/require.js"
    ],
    "dependencies": [
      "aurelia-binding",
      "aurelia-bootstrapper",
      "aurelia-dependency-injection",
      "aurelia-event-aggregator",
      "aurelia-framework",
      "aurelia-history",
      "aurelia-history-browser",
      "aurelia-loader",
      "aurelia-loader-default",
      "aurelia-logging",
      "aurelia-logging-console",
      "aurelia-metadata",
      "aurelia-pal",
      "aurelia-pal-browser",
      "aurelia-path",
      "aurelia-polyfills",
      "aurelia-route-recognizer",
      "aurelia-router",
      "aurelia-task-queue",
      "aurelia-templating",
      "aurelia-templating-binding",
      "text",
      "aurelia-fetch-client",
      "aurelia-api",
      "extend",
      {
    "name": "aurelia-authentication",
    "path": "../node_modules/aurelia-authentication/dist/amd",
    "main": "aurelia-authentication"
      },
      {
    "name": "jwt-decode",
    "path": "../node_modules/jwt-decode/lib",
    "main": "index"
      },
      {
    "name": "font-awesome",
    "path": "../node_modules/font-awesome/css",
    "resources": [
      "font-awesome.css"
    ]
      },
      {
    "name": "bootstrap",
    "path": "../node_modules/bootstrap/dist",
    "main": "js/bootstrap.min",
    "exports": "$"
      },
      {
    "name": "aurelia-templating-resources",
    "path": "../node_modules/aurelia-templating-resources/dist/amd",
    "main": "aurelia-templating-resources"
      },
      {
    "name": "aurelia-templating-router",
    "path": "../node_modules/aurelia-templating-router/dist/amd",
    "main": "aurelia-templating-router"
      },
      {
    "name": "aurelia-testing",
    "path": "../node_modules/aurelia-testing/dist/amd",
    "main": "aurelia-testing",
    "env": "dev"
      }
    ]
      }
    ],
    "copyFiles": {
      "../node_modules/font-awesome/fonts/**/*": "../dist/fonts",
      "../node_modules/bootstrap/dist/fonts/**/*": "../dist/fonts",
      "./assets/**/*": "../dist",
      "../node_modules/jquery/dist/jquery.min.js": "../dist/vendor",
      "../node_modules/jquery.easing/jquery.easing.min.js": "../dist/vendor",
      "../node_modules/jsrender/jsrender.min.js": "../dist/vendor",
      "../vendor/**/*": "../dist/vendor"
    }
      }
    }


# To change project to bundle all #

Change:
 
**index.html**
comment out

      <link href="vendor/syncfusion/themes/ej.widgets.core.bootstrap.min.css" rel="stylesheet"/>
      <link href="vendor/syncfusion/themes/bootstrap-theme/ej.theme.min.css" rel="stylesheet"/>
      <link href="vendor/syncfusion/themes/responsive-css/ej.responsive.css" rel="stylesheet"/>
      <link href="vendor/syncfusion/themes/responsive-css/ejgrid.responsive.css" rel="stylesheet"/>


    <script src="vendor/syncfusion/scripts/jquery.js"></script>
    <script src="vendor/syncfusion/scripts/jquery.easing.1.3.js"></script>
    <script src="vendor/syncfusion/scripts/jsrender.min.js"></script>
    <script src="vendor/syncfusion/scripts/ej.widget.all.min.js"></script>

**src/startup/_startup.js**
add/uncomment

    import ej from 'ej'

**src/app.html**
add/uncomment

      <require from="ej/themes/ej.widgets.core.bootstrap.min.css"></require>
      <require from="ej/themes/bootstrap-theme/ej.theme.min.css"></require>
      <require from="ej/themes/responsive-css/ej.responsive.css"></require>
      <require from="ej/themes/responsive-css/ejgrid.responsive.css"></require>


**aurelia_project/aurelia.json**

Basically we are adding jquery,jsrender,jquery.easing, and syncfusion back into the aurelia-bundle.js

Also modifying `copyFiles:` adding/replacing related lines

     "../vendor/syncfusion/themes/common-images/**/*": "../dist/common-images",
      "../vendor/syncfusion/themes/bootstrap-theme/images/**/*": "../dist/images"

replace contents with:``

    {
      "name": "Syncfusion-Dreamfactory-Aurelia-CLI",
      "type": "project:application",
      "platform": {
    "id": "web",
    "displayName": "Web",
    "output": "scripts",
    "index": "index.html"
      },
      "transpiler": {
    "id": "babel",
    "displayName": "Babel",
    "fileExtension": ".js",
    "options": {
      "plugins": [
    "transform-es2015-modules-amd"
      ]
    },
    "source": "src/**/*.js"
      },
      "markupProcessor": {
    "id": "maximum",
    "displayName": "Maximum Minification",
    "fileExtension": ".html",
    "source": "src/**/*.html"
      },
      "sassProcessor": {
    "id": "sass",
    "displayName": "Sass",
    "fileExtension": ".scss",
    "source": "src/sass/index.scss",
    "watch": "src/sass/**/*.scss"
      },
      "cssProcessor": {
    "id": "none",
    "displayName": "None",
    "fileExtension": ".css",
    "source": "src/css/**/*.css"
      },
      "editor": {
    "id": "webstorm",
    "displayName": "WebStorm"
      },
      "unitTestRunner": {
    "id": "karma",
    "displayName": "Karma",
    "source": "test/unit/**/*.js"
      },
      "dist": {
    "output": "dist",
    "sources": [
      "./scripts/**/*",
      "./index.html"
    ]
      },
      "paths": {
    "root": "src",
    "resources": "src/resources",
    "elements": "src/resources/elements",
    "attributes ": "src/resources/attributes",
    "valueConverters": "src/resources/value-converters",
    "bindingBehaviors": "src/resources/binding-behaviors"
      },
      "run": {
    "basePath": "dist"
      },
      "testFramework": {
    "id": "jasmine",
    "displayName": "Jasmine"
      },
      "build": {
    "targets": [
      {
    "id": "web",
    "displayName": "Web",
    "output": "scripts",
    "index": "index.html"
      }
    ],
    "loader": {
      "type": "require",
      "configTarget": "aurelia-bundle.js",
      "includeBundleMetadataInConfig": "auto",
      "plugins": [
    {
      "name": "text",
      "extensions": [
    ".html",
    ".css"
      ],
      "stub": true
    }
      ]
    },
    "options": {
      "minify": "stage & prod",
      "sourcemaps": "dev & stage"
    },
    "bundles": [
      {
    "name": "app-bundle.js",
    "source": [
      "[**/*.js]",
      "**/*.{css,html}"
    ]
      },
      {
    "name": "aurelia-bundle.js",
    "prepend": [
      "node_modules/bluebird/js/browser/bluebird.core.js",
      "node_modules/whatwg-fetch/fetch.js",
      "node_modules/requirejs/require.js"
    ],
    "dependencies": [
      "aurelia-binding",
      "aurelia-bootstrapper",
      "aurelia-dependency-injection",
      "aurelia-event-aggregator",
      "aurelia-framework",
      "aurelia-history",
      "aurelia-history-browser",
      "aurelia-loader",
      "aurelia-loader-default",
      "aurelia-logging",
      "aurelia-logging-console",
      "aurelia-metadata",
      "aurelia-pal",
      "aurelia-pal-browser",
      "aurelia-path",
      "aurelia-polyfills",
      "aurelia-route-recognizer",
      "aurelia-router",
      "aurelia-task-queue",
      "aurelia-templating",
      "aurelia-templating-binding",
      "text",
      "aurelia-fetch-client",
      "aurelia-api",
      "extend",
      "jquery",
      {
    "name": "jquery.easing",
    "path": "../node_modules/jquery.easing",
    "main": "jquery.easing",
    "deps": [
      "jquery"
    ]
      },
      {
    "name": "jsrender",
    "path": "../node_modules/jsrender",
    "main": "jsrender.min"
      },
      {
    "name": "aurelia-authentication",
    "path": "../node_modules/aurelia-authentication/dist/amd",
    "main": "aurelia-authentication"
      },
      {
    "name": "jwt-decode",
    "path": "../node_modules/jwt-decode/lib",
    "main": "index"
      },
      {
    "name": "font-awesome",
    "path": "../node_modules/font-awesome/css",
    "resources": [
      "font-awesome.css"
    ]
      },
      {
    "name": "bootstrap",
    "path": "../node_modules/bootstrap/dist",
    "main": "js/bootstrap.min",
    "deps": [
      "jquery"
    ],
    "exports": "$"
      },
      {
    "name": "ej",
    "path": "../vendor/syncfusion",
    "main": "scripts/ej.widget.all.min",
    "deps": [
      "jquery",
      "jquery.easing",
      "jsrender"
    ],
    "resources": [
      "themes/ej.widgets.core.bootstrap.min.css",
      "themes/bootstrap-theme/ej.theme.min.css",
      "themes/responsive-css/ej.responsive.css",
      "themes/responsive-css/ejgrid.responsive.css"
    ],
    "exports": "ej"
      },
      {
    "name": "aurelia-templating-resources",
    "path": "../node_modules/aurelia-templating-resources/dist/amd",
    "main": "aurelia-templating-resources"
      },
      {
    "name": "aurelia-templating-router",
    "path": "../node_modules/aurelia-templating-router/dist/amd",
    "main": "aurelia-templating-router"
      },
      {
    "name": "aurelia-testing",
    "path": "../node_modules/aurelia-testing/dist/amd",
    "main": "aurelia-testing",
    "env": "dev"
      }
    ]
      }
    ],
    "copyFiles": {
      "../node_modules/font-awesome/fonts/**/*": "../dist/fonts",
      "../node_modules/bootstrap/dist/fonts/**/*": "../dist/fonts",
      "./assets/**/*": "../dist/",
      "../vendor/syncfusion/themes/common-images/**/*": "../dist/common-images",
      "../vendor/syncfusion/themes/bootstrap-theme/images/**/*": "../dist/images"
    }
      }
    }
    