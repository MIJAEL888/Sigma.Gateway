import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  PuntoMonitoreoObsComponent,
  PuntoMonitoreoObsDetailComponent,
  PuntoMonitoreoObsUpdateComponent,
  PuntoMonitoreoObsDeletePopupComponent,
  PuntoMonitoreoObsDeleteDialogComponent,
  puntoMonitoreoObsRoute,
  puntoMonitoreoObsPopupRoute
} from './';

const ENTITY_STATES = [...puntoMonitoreoObsRoute, ...puntoMonitoreoObsPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PuntoMonitoreoObsComponent,
    PuntoMonitoreoObsDetailComponent,
    PuntoMonitoreoObsUpdateComponent,
    PuntoMonitoreoObsDeleteDialogComponent,
    PuntoMonitoreoObsDeletePopupComponent
  ],
  entryComponents: [
    PuntoMonitoreoObsComponent,
    PuntoMonitoreoObsUpdateComponent,
    PuntoMonitoreoObsDeleteDialogComponent,
    PuntoMonitoreoObsDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoreoPuntoMonitoreoObsModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
