export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'viewmodels/gridremote',         name: 'viewmodels/gridremote',        moduleId: 'viewmodels/gridremote',        nav: true, title: 'Grid Remote' },
      { route: 'viewmodels/fonts',         name: 'viewmodels/fonts',        moduleId: 'viewmodels/fonts',        nav: true, title: 'Font Test' },
      ]);
    this.router = router;
  }
}
