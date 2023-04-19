import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxsModule, NgxsModuleOptions } from '@ngxs/store';
import { ZooState } from './store/zoo.state';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';

const ngxsConfig: NgxsModuleOptions = {
  // Checks for mutations in dev environment!
  developmentMode: true,
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgxsModule.forRoot([ZooState], ngxsConfig),
    NgxsResetPluginModule.forRoot(),
    ReactiveFormsModule,
  ],
  declarations: [AppComponent, EditAnimalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
