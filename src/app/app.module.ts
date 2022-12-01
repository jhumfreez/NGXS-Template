import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { ZooState } from './store/zoo.state';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgxsModule.forRoot([ZooState]),
    NgxsResetPluginModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
