import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MarcaComponent,
  MarcaDetailComponent,
  MarcaUpdateComponent,
  MarcaDeletePopupComponent,
  MarcaDeleteDialogComponent,
  marcaRoute,
  marcaPopupRoute
} from './';

const ENTITY_STATES = [...marcaRoute, ...marcaPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MarcaComponent, MarcaDetailComponent, MarcaUpdateComponent, MarcaDeleteDialogComponent, MarcaDeletePopupComponent],
  entryComponents: [MarcaComponent, MarcaUpdateComponent, MarcaDeleteDialogComponent, MarcaDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogisticaMarcaModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
