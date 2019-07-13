import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';
import { AccountService } from 'app/core';
import { TipoInduccionService } from './tipo-induccion.service';

@Component({
  selector: 'jhi-tipo-induccion',
  templateUrl: './tipo-induccion.component.html'
})
export class TipoInduccionComponent implements OnInit, OnDestroy {
  tipoInduccions: ITipoInduccion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoInduccionService: TipoInduccionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoInduccionService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoInduccion[]>) => res.ok),
        map((res: HttpResponse<ITipoInduccion[]>) => res.body)
      )
      .subscribe(
        (res: ITipoInduccion[]) => {
          this.tipoInduccions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoInduccions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoInduccion) {
    return item.id;
  }

  registerChangeInTipoInduccions() {
    this.eventSubscriber = this.eventManager.subscribe('tipoInduccionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
