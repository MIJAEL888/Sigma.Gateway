import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  ObservacionComponent,
  ObservacionDetailComponent,
  ObservacionUpdateComponent,
  ObservacionDeletePopupComponent,
  ObservacionDeleteDialogComponent,
  observacionRoute,
  observacionPopupRoute
} from './';

const ENTITY_STATES = [...observacionRoute, ...observacionPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ObservacionComponent,
    ObservacionDetailComponent,
    ObservacionUpdateComponent,
    ObservacionDeleteDialogComponent,
    ObservacionDeletePopupComponent
  ],
  entryComponents: [ObservacionComponent, ObservacionUpdateComponent, ObservacionDeleteDialogComponent, ObservacionDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoreoObservacionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
