import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  FotografiaPuntoComponent,
  FotografiaPuntoDetailComponent,
  FotografiaPuntoUpdateComponent,
  FotografiaPuntoDeletePopupComponent,
  FotografiaPuntoDeleteDialogComponent,
  fotografiaPuntoRoute,
  fotografiaPuntoPopupRoute
} from './';

const ENTITY_STATES = [...fotografiaPuntoRoute, ...fotografiaPuntoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FotografiaPuntoComponent,
    FotografiaPuntoDetailComponent,
    FotografiaPuntoUpdateComponent,
    FotografiaPuntoDeleteDialogComponent,
    FotografiaPuntoDeletePopupComponent
  ],
  entryComponents: [
    FotografiaPuntoComponent,
    FotografiaPuntoUpdateComponent,
    FotografiaPuntoDeleteDialogComponent,
    FotografiaPuntoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoreoFotografiaPuntoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
