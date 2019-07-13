import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ResultadoMetereologiaComponent,
  ResultadoMetereologiaDetailComponent,
  ResultadoMetereologiaUpdateComponent,
  ResultadoMetereologiaDeletePopupComponent,
  ResultadoMetereologiaDeleteDialogComponent,
  resultadoMetereologiaRoute,
  resultadoMetereologiaPopupRoute
} from './';

const ENTITY_STATES = [...resultadoMetereologiaRoute, ...resultadoMetereologiaPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ResultadoMetereologiaComponent,
    ResultadoMetereologiaDetailComponent,
    ResultadoMetereologiaUpdateComponent,
    ResultadoMetereologiaDeleteDialogComponent,
    ResultadoMetereologiaDeletePopupComponent
  ],
  entryComponents: [
    ResultadoMetereologiaComponent,
    ResultadoMetereologiaUpdateComponent,
    ResultadoMetereologiaDeleteDialogComponent,
    ResultadoMetereologiaDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoreoResultadoMetereologiaModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
