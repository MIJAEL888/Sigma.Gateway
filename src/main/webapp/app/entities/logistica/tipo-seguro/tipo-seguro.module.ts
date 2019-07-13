import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  TipoSeguroComponent,
  TipoSeguroDetailComponent,
  TipoSeguroUpdateComponent,
  TipoSeguroDeletePopupComponent,
  TipoSeguroDeleteDialogComponent,
  tipoSeguroRoute,
  tipoSeguroPopupRoute
} from './';

const ENTITY_STATES = [...tipoSeguroRoute, ...tipoSeguroPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoSeguroComponent,
    TipoSeguroDetailComponent,
    TipoSeguroUpdateComponent,
    TipoSeguroDeleteDialogComponent,
    TipoSeguroDeletePopupComponent
  ],
  entryComponents: [TipoSeguroComponent, TipoSeguroUpdateComponent, TipoSeguroDeleteDialogComponent, TipoSeguroDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogisticaTipoSeguroModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
