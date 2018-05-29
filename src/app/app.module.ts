import { FormioAppConfig } from 'angular-formio';
import { FormioAuthService, FormioAuthConfig } from 'angular-formio/auth';
import { AuthConfig, AppConfig } from '../config';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent} from "./app.component";
import { EventModule } from './event/event.module';
import { FormioResources } from 'angular-formio/resource';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'event',
        loadChildren: () => EventModule
      }
    ])
  ],
  providers: [
    FormioResources,
    FormioAuthService,
    {provide: FormioAuthConfig, useValue: AuthConfig},
    {provide: FormioAppConfig, useValue: AppConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }