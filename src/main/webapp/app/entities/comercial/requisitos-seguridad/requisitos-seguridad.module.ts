import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  RequisitosSeguridadComponent,
  RequisitosSeguridadDetailComponent,
  RequisitosSeguridadUpdateComponent,
  RequisitosSeguridadDeletePopupComponent,
  RequisitosSeguridadDeleteDialogComponent,
  requisitosSeguridadRoute,
  requisitosSeguridadPopupRoute
} from './';

const ENTITY_STATES = [...requisitosSeguridadRoute, ...requisitosSeguridadPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RequisitosSeguridadComponent,
    RequisitosSeguridadDetailComponent,
    RequisitosSeguridadUpdateComponent,
    RequisitosSeguridadDeleteDialogComponent,
    RequisitosSeguridadDeletePopupComponent
  ],
  entryComponents: [
    RequisitosSeguridadComponent,
    RequisitosSeguridadUpdateComponent,
    RequisitosSeguridadDeleteDialogComponent,
    RequisitosSeguridadDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComercialRequisitosSeguridadModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
