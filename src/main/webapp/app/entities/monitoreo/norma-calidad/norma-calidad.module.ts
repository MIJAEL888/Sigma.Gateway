import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  NormaCalidadComponent,
  NormaCalidadDetailComponent,
  NormaCalidadUpdateComponent,
  NormaCalidadDeletePopupComponent,
  NormaCalidadDeleteDialogComponent,
  normaCalidadRoute,
  normaCalidadPopupRoute
} from './';

const ENTITY_STATES = [...normaCalidadRoute, ...normaCalidadPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NormaCalidadComponent,
    NormaCalidadDetailComponent,
    NormaCalidadUpdateComponent,
    NormaCalidadDeleteDialogComponent,
    NormaCalidadDeletePopupComponent
  ],
  entryComponents: [
    NormaCalidadComponent,
    NormaCalidadUpdateComponent,
    NormaCalidadDeleteDialogComponent,
    NormaCalidadDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoreoNormaCalidadModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
