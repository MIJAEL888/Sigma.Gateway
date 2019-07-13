import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  TipoEquipoComponent,
  TipoEquipoDetailComponent,
  TipoEquipoUpdateComponent,
  TipoEquipoDeletePopupComponent,
  TipoEquipoDeleteDialogComponent,
  tipoEquipoRoute,
  tipoEquipoPopupRoute
} from './';

const ENTITY_STATES = [...tipoEquipoRoute, ...tipoEquipoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoEquipoComponent,
    TipoEquipoDetailComponent,
    TipoEquipoUpdateComponent,
    TipoEquipoDeleteDialogComponent,
    TipoEquipoDeletePopupComponent
  ],
  entryComponents: [TipoEquipoComponent, TipoEquipoUpdateComponent, TipoEquipoDeleteDialogComponent, TipoEquipoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogisticaTipoEquipoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
