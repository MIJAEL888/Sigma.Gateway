import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  TipoInduccionComponent,
  TipoInduccionDetailComponent,
  TipoInduccionUpdateComponent,
  TipoInduccionDeletePopupComponent,
  TipoInduccionDeleteDialogComponent,
  tipoInduccionRoute,
  tipoInduccionPopupRoute
} from './';

const ENTITY_STATES = [...tipoInduccionRoute, ...tipoInduccionPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoInduccionComponent,
    TipoInduccionDetailComponent,
    TipoInduccionUpdateComponent,
    TipoInduccionDeleteDialogComponent,
    TipoInduccionDeletePopupComponent
  ],
  entryComponents: [
    TipoInduccionComponent,
    TipoInduccionUpdateComponent,
    TipoInduccionDeleteDialogComponent,
    TipoInduccionDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComercialTipoInduccionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
