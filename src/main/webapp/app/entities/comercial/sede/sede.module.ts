import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  SedeComponent,
  SedeDetailComponent,
  SedeUpdateComponent,
  SedeDeletePopupComponent,
  SedeDeleteDialogComponent,
  sedeRoute,
  sedePopupRoute
} from './';

const ENTITY_STATES = [...sedeRoute, ...sedePopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [SedeComponent, SedeDetailComponent, SedeUpdateComponent, SedeDeleteDialogComponent, SedeDeletePopupComponent],
  entryComponents: [SedeComponent, SedeUpdateComponent, SedeDeleteDialogComponent, SedeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComercialSedeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
