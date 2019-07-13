import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ComponenteMonitoreoComponent,
  ComponenteMonitoreoDetailComponent,
  ComponenteMonitoreoUpdateComponent,
  ComponenteMonitoreoDeletePopupComponent,
  ComponenteMonitoreoDeleteDialogComponent,
  componenteMonitoreoRoute,
  componenteMonitoreoPopupRoute
} from './';

const ENTITY_STATES = [...componenteMonitoreoRoute, ...componenteMonitoreoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ComponenteMonitoreoComponent,
    ComponenteMonitoreoDetailComponent,
    ComponenteMonitoreoUpdateComponent,
    ComponenteMonitoreoDeleteDialogComponent,
    ComponenteMonitoreoDeletePopupComponent
  ],
  entryComponents: [
    ComponenteMonitoreoComponent,
    ComponenteMonitoreoUpdateComponent,
    ComponenteMonitoreoDeleteDialogComponent,
    ComponenteMonitoreoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComercialComponenteMonitoreoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
