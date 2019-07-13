import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  LaboratorioMonitoreoComponent,
  LaboratorioMonitoreoDetailComponent,
  LaboratorioMonitoreoUpdateComponent,
  LaboratorioMonitoreoDeletePopupComponent,
  LaboratorioMonitoreoDeleteDialogComponent,
  laboratorioMonitoreoRoute,
  laboratorioMonitoreoPopupRoute
} from './';

const ENTITY_STATES = [...laboratorioMonitoreoRoute, ...laboratorioMonitoreoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LaboratorioMonitoreoComponent,
    LaboratorioMonitoreoDetailComponent,
    LaboratorioMonitoreoUpdateComponent,
    LaboratorioMonitoreoDeleteDialogComponent,
    LaboratorioMonitoreoDeletePopupComponent
  ],
  entryComponents: [
    LaboratorioMonitoreoComponent,
    LaboratorioMonitoreoUpdateComponent,
    LaboratorioMonitoreoDeleteDialogComponent,
    LaboratorioMonitoreoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoreoLaboratorioMonitoreoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
