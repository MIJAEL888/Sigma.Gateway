import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ContactoSedeComponent,
  ContactoSedeDetailComponent,
  ContactoSedeUpdateComponent,
  ContactoSedeDeletePopupComponent,
  ContactoSedeDeleteDialogComponent,
  contactoSedeRoute,
  contactoSedePopupRoute
} from './';

const ENTITY_STATES = [...contactoSedeRoute, ...contactoSedePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContactoSedeComponent,
    ContactoSedeDetailComponent,
    ContactoSedeUpdateComponent,
    ContactoSedeDeleteDialogComponent,
    ContactoSedeDeletePopupComponent
  ],
  entryComponents: [
    ContactoSedeComponent,
    ContactoSedeUpdateComponent,
    ContactoSedeDeleteDialogComponent,
    ContactoSedeDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComercialContactoSedeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
