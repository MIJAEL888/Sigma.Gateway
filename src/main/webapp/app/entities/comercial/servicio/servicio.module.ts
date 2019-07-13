import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ServicioComponent,
  ServicioDetailComponent,
  ServicioUpdateComponent,
  ServicioDeletePopupComponent,
  ServicioDeleteDialogComponent,
  servicioRoute,
  servicioPopupRoute
} from './';

const ENTITY_STATES = [...servicioRoute, ...servicioPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ServicioComponent,
    ServicioDetailComponent,
    ServicioUpdateComponent,
    ServicioDeleteDialogComponent,
    ServicioDeletePopupComponent
  ],
  entryComponents: [ServicioComponent, ServicioUpdateComponent, ServicioDeleteDialogComponent, ServicioDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComercialServicioModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
