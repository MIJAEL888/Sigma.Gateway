import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  AreaComponent,
  AreaDetailComponent,
  AreaUpdateComponent,
  AreaDeletePopupComponent,
  AreaDeleteDialogComponent,
  areaRoute,
  areaPopupRoute
} from './';

const ENTITY_STATES = [...areaRoute, ...areaPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [AreaComponent, AreaDetailComponent, AreaUpdateComponent, AreaDeleteDialogComponent, AreaDeletePopupComponent],
  entryComponents: [AreaComponent, AreaUpdateComponent, AreaDeleteDialogComponent, AreaDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RrhhAreaModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
