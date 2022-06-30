/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
import { RemoteEntryModule } from './remote-entry/entry.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FeatureModule } from '@microfrontend-demo/feature';
import { StateModule } from '@microfrontend-demo/state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FeatureModule,
    StateModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./remote-entry/entry.module').then(
              (m) => m.RemoteEntryModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [{ provide: 'VOTE_KEY', useValue: 'blue' }],
  bootstrap: [AppComponent],
})
export class AppModule {}