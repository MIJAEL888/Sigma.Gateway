import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  EquipoComponent,
  EquipoDetailComponent,
  EquipoUpdateComponent,
  EquipoDeletePopupComponent,
  EquipoDeleteDialogComponent,
  equipoRoute,
  equipoPopupRoute
} from './';

const ENTITY_STATES = [...equipoRoute, ...equipoPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [EquipoComponent, EquipoDetailComponent, EquipoUpdateComponent, EquipoDeleteDialogComponent, EquipoDeletePopupComponent],
  entryComponents: [EquipoComponent, EquipoUpdateComponent, EquipoDeleteDialogComponent, EquipoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogisticaEquipoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
