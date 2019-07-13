import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  PosicionComponent,
  PosicionDetailComponent,
  PosicionUpdateComponent,
  PosicionDeletePopupComponent,
  PosicionDeleteDialogComponent,
  posicionRoute,
  posicionPopupRoute
} from './';

const ENTITY_STATES = [...posicionRoute, ...posicionPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PosicionComponent,
    PosicionDetailComponent,
    PosicionUpdateComponent,
    PosicionDeleteDialogComponent,
    PosicionDeletePopupComponent
  ],
  entryComponents: [PosicionComponent, PosicionUpdateComponent, PosicionDeleteDialogComponent, PosicionDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RrhhPosicionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
