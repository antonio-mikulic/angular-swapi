import { ElementRef, Injector } from '@angular/core';

import { NotifyService } from './messaging/notify.service';

export abstract class AppComponentBase {
  notify: NotifyService;

  constructor(injector: Injector) {
    this.notify = injector.get(NotifyService);
  }
}
