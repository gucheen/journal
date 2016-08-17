/**
 * Created by gucheng on 1/21/16.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { enableProdMode, NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class JournalModule {
}

platformBrowserDynamic().bootstrapModule(JournalModule);

if (process.env === 'production') {
  enableProdMode();
}