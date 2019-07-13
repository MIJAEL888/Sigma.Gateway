import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ParamentroComponent,
  ParamentroDetailComponent,
  ParamentroUpdateComponent,
  ParamentroDeletePopupComponent,
  ParamentroDeleteDialogComponent,
  paramentroRoute,
  paramentroPopupRoute
} from './';

const ENTITY_STATES = [...paramentroRoute, ...paramentroPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ParamentroComponent,
    ParamentroDetailComponent,
    ParamentroUpdateComponent,
    ParamentroDeleteDialogComponent,
    ParamentroDeletePopupComponent
  ],
  entryComponents: [ParamentroComponent, ParamentroUpdateComponent, ParamentroDeleteDialogComponent, ParamentroDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoreoParamentroModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
