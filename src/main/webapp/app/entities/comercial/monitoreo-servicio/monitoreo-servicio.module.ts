import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MonitoreoServicioComponent,
  MonitoreoServicioDetailComponent,
  MonitoreoServicioUpdateComponent,
  MonitoreoServicioDeletePopupComponent,
  MonitoreoServicioDeleteDialogComponent,
  monitoreoServicioRoute,
  monitoreoServicioPopupRoute
} from './';

const ENTITY_STATES = [...monitoreoServicioRoute, ...monitoreoServicioPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MonitoreoServicioComponent,
    MonitoreoServicioDetailComponent,
    MonitoreoServicioUpdateComponent,
    MonitoreoServicioDeleteDialogComponent,
    MonitoreoServicioDeletePopupComponent
  ],
  entryComponents: [
    MonitoreoServicioComponent,
    MonitoreoServicioUpdateComponent,
    MonitoreoServicioDeleteDialogComponent,
    MonitoreoServicioDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComercialMonitoreoServicioModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
