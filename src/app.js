export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'viewmodels/gridremote',         name: 'viewmodels/gridremote',        moduleId: 'viewmodels/gridremote',        nav: true, title: 'Grid Remote' },
      { route: 'viewmodels/fonts',         name: 'viewmodels/fonts',        moduleId: 'viewmodels/fonts',        nav: true, title: 'Font Test' },
      { route: 'viewmodels/gridquery',         name: 'viewmodels/gridquery',        moduleId: 'viewmodels/gridquery',        nav: true, title: 'Grid Query' }
      ]);
    this.router = router;
  }
}
