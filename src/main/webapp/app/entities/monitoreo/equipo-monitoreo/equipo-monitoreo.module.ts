import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  EquipoMonitoreoComponent,
  EquipoMonitoreoDetailComponent,
  EquipoMonitoreoUpdateComponent,
  EquipoMonitoreoDeletePopupComponent,
  EquipoMonitoreoDeleteDialogComponent,
  equipoMonitoreoRoute,
  equipoMonitoreoPopupRoute
} from './';

const ENTITY_STATES = [...equipoMonitoreoRoute, ...equipoMonitoreoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EquipoMonitoreoComponent,
    EquipoMonitoreoDetailComponent,
    EquipoMonitoreoUpdateComponent,
    EquipoMonitoreoDeleteDialogComponent,
    EquipoMonitoreoDeletePopupComponent
  ],
  entryComponents: [
    EquipoMonitoreoComponent,
    EquipoMonitoreoUpdateComponent,
    EquipoMonitoreoDeleteDialogComponent,
    EquipoMonitoreoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoreoEquipoMonitoreoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
