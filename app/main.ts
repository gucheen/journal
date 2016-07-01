/**
 * Created by gucheng on 1/21/16.
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app.component';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms()
]);

if (process.env === 'production') {
  enableProdMode();
}