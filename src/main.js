import environment from './environment';
import dfconfig from './config/dreamfactory-config'
import authconfig from '../src/config/auth-config';

import ejGrid from 'ej.grid';

//Configure Bluebird Promises.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-api', config => {
      config.registerEndpoint('auth',dfconfig.loginurl() );
      config.registerEndpoint('api',dfconfig.baseurl(),{headers: {"X-DreamFactory-API-Key": dfconfig.APP_API_KEY, "X-DreamFactory-Application-Name": dfconfig.APP_NAME}});
    })
.plugin('aurelia-authentication', baseConfig => {
    baseConfig.configure(authconfig);
  });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
