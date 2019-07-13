import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ParamentroMonitoreoComponent,
  ParamentroMonitoreoDetailComponent,
  ParamentroMonitoreoUpdateComponent,
  ParamentroMonitoreoDeletePopupComponent,
  ParamentroMonitoreoDeleteDialogComponent,
  paramentroMonitoreoRoute,
  paramentroMonitoreoPopupRoute
} from './';

const ENTITY_STATES = [...paramentroMonitoreoRoute, ...paramentroMonitoreoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ParamentroMonitoreoComponent,
    ParamentroMonitoreoDetailComponent,
    ParamentroMonitoreoUpdateComponent,
    ParamentroMonitoreoDeleteDialogComponent,
    ParamentroMonitoreoDeletePopupComponent
  ],
  entryComponents: [
    ParamentroMonitoreoComponent,
    ParamentroMonitoreoUpdateComponent,
    ParamentroMonitoreoDeleteDialogComponent,
    ParamentroMonitoreoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComercialParamentroMonitoreoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
