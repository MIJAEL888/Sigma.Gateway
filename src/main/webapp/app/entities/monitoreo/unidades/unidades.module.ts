import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  UnidadesComponent,
  UnidadesDetailComponent,
  UnidadesUpdateComponent,
  UnidadesDeletePopupComponent,
  UnidadesDeleteDialogComponent,
  unidadesRoute,
  unidadesPopupRoute
} from './';

const ENTITY_STATES = [...unidadesRoute, ...unidadesPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UnidadesComponent,
    UnidadesDetailComponent,
    UnidadesUpdateComponent,
    UnidadesDeleteDialogComponent,
    UnidadesDeletePopupComponent
  ],
  entryComponents: [UnidadesComponent, UnidadesUpdateComponent, UnidadesDeleteDialogComponent, UnidadesDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoreoUnidadesModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
