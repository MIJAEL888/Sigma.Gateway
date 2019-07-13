import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  DistritoComponent,
  DistritoDetailComponent,
  DistritoUpdateComponent,
  DistritoDeletePopupComponent,
  DistritoDeleteDialogComponent,
  distritoRoute,
  distritoPopupRoute
} from './';

const ENTITY_STATES = [...distritoRoute, ...distritoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DistritoComponent,
    DistritoDetailComponent,
    DistritoUpdateComponent,
    DistritoDeleteDialogComponent,
    DistritoDeletePopupComponent
  ],
  entryComponents: [DistritoComponent, DistritoUpdateComponent, DistritoDeleteDialogComponent, DistritoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComercialDistritoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
