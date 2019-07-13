import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ProvinciaComponent,
  ProvinciaDetailComponent,
  ProvinciaUpdateComponent,
  ProvinciaDeletePopupComponent,
  ProvinciaDeleteDialogComponent,
  provinciaRoute,
  provinciaPopupRoute
} from './';

const ENTITY_STATES = [...provinciaRoute, ...provinciaPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProvinciaComponent,
    ProvinciaDetailComponent,
    ProvinciaUpdateComponent,
    ProvinciaDeleteDialogComponent,
    ProvinciaDeletePopupComponent
  ],
  entryComponents: [ProvinciaComponent, ProvinciaUpdateComponent, ProvinciaDeleteDialogComponent, ProvinciaDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComercialProvinciaModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
