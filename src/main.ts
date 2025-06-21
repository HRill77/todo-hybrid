import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { downgradeInjectable, UpgradeModule } from '@angular/upgrade/static';

import './assets/legacy/js/app/app.module.js';
import './assets/legacy/js/controllers/todo.controller.js';
import './assets/legacy/js/services/notification.service.js';
import './assets/legacy/js/services/storage.service.js';
import './assets/legacy/js/services/todo.service.js';

import { Todo2Service } from './app/service/todo2.service';

declare var angular: any;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((platformRef) => {
    angular
      .module('todoApp')
      .factory('Todo2Service', downgradeInjectable(Todo2Service));
    const upgrade = platformRef.injector.get(UpgradeModule);
    upgrade.bootstrap(document.body, ['todoApp']);
  })
  .catch((err) => console.error(err));