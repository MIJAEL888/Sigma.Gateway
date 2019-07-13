import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GatewaySharedModule } from 'app/shared';
import {
  MonitoristaComponent,
  MonitoristaDetailComponent,
  MonitoristaUpdateComponent,
  MonitoristaDeletePopupComponent,
  MonitoristaDeleteDialogComponent,
  monitoristaRoute,
  monitoristaPopupRoute
} from './';

const ENTITY_STATES = [...monitoristaRoute, ...monitoristaPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MonitoristaComponent,
    MonitoristaDetailComponent,
    MonitoristaUpdateComponent,
    MonitoristaDeleteDialogComponent,
    MonitoristaDeletePopupComponent
  ],
  entryComponents: [MonitoristaComponent, MonitoristaUpdateComponent, MonitoristaDeleteDialogComponent, MonitoristaDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogisticaMonitoristaModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
