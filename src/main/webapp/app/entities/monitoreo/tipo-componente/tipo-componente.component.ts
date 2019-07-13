import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoComponente } from 'app/shared/model/monitoreo/tipo-componente.model';
import { AccountService } from 'app/core';
import { TipoComponenteService } from './tipo-componente.service';

@Component({
  selector: 'jhi-tipo-componente',
  templateUrl: './tipo-componente.component.html'
})
export class TipoComponenteComponent implements OnInit, OnDestroy {
  tipoComponentes: ITipoComponente[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoComponenteService: TipoComponenteService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoComponenteService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoComponente[]>) => res.ok),
        map((res: HttpResponse<ITipoComponente[]>) => res.body)
      )
      .subscribe(
        (res: ITipoComponente[]) => {
          this.tipoComponentes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoComponentes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoComponente) {
    return item.id;
  }

  registerChangeInTipoComponentes() {
    this.eventSubscriber = this.eventManager.subscribe('tipoComponenteListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
