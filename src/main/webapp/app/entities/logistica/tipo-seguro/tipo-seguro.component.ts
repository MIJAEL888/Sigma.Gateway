import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ITipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';
import { AccountService } from 'app/core';
import { TipoSeguroService } from './tipo-seguro.service';

@Component({
  selector: 'jhi-tipo-seguro',
  templateUrl: './tipo-seguro.component.html'
})
export class TipoSeguroComponent implements OnInit, OnDestroy {
  tipoSeguros: ITipoSeguro[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoSeguroService: TipoSeguroService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoSeguroService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoSeguro[]>) => res.ok),
        map((res: HttpResponse<ITipoSeguro[]>) => res.body)
      )
      .subscribe(
        (res: ITipoSeguro[]) => {
          this.tipoSeguros = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoSeguros();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoSeguro) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInTipoSeguros() {
    this.eventSubscriber = this.eventManager.subscribe('tipoSeguroListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
