import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  LaboratorioComponent,
  LaboratorioDetailComponent,
  LaboratorioUpdateComponent,
  LaboratorioDeletePopupComponent,
  LaboratorioDeleteDialogComponent,
  laboratorioRoute,
  laboratorioPopupRoute
} from './';

const ENTITY_STATES = [...laboratorioRoute, ...laboratorioPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LaboratorioComponent,
    LaboratorioDetailComponent,
    LaboratorioUpdateComponent,
    LaboratorioDeleteDialogComponent,
    LaboratorioDeletePopupComponent
  ],
  entryComponents: [LaboratorioComponent, LaboratorioUpdateComponent, LaboratorioDeleteDialogComponent, LaboratorioDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogisticaLaboratorioModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
