import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  TipoComponenteComponent,
  TipoComponenteDetailComponent,
  TipoComponenteUpdateComponent,
  TipoComponenteDeletePopupComponent,
  TipoComponenteDeleteDialogComponent,
  tipoComponenteRoute,
  tipoComponentePopupRoute
} from './';

const ENTITY_STATES = [...tipoComponenteRoute, ...tipoComponentePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoComponenteComponent,
    TipoComponenteDetailComponent,
    TipoComponenteUpdateComponent,
    TipoComponenteDeleteDialogComponent,
    TipoComponenteDeletePopupComponent
  ],
  entryComponents: [
    TipoComponenteComponent,
    TipoComponenteUpdateComponent,
    TipoComponenteDeleteDialogComponent,
    TipoComponenteDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoreoTipoComponenteModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
