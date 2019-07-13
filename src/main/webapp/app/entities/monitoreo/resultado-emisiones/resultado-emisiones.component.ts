import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';
import { AccountService } from 'app/core';
import { ResultadoEmisionesService } from './resultado-emisiones.service';

@Component({
  selector: 'jhi-resultado-emisiones',
  templateUrl: './resultado-emisiones.component.html'
})
export class ResultadoEmisionesComponent implements OnInit, OnDestroy {
  resultadoEmisiones: IResultadoEmisiones[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected resultadoEmisionesService: ResultadoEmisionesService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.resultadoEmisionesService
      .query()
      .pipe(
        filter((res: HttpResponse<IResultadoEmisiones[]>) => res.ok),
        map((res: HttpResponse<IResultadoEmisiones[]>) => res.body)
      )
      .subscribe(
        (res: IResultadoEmisiones[]) => {
          this.resultadoEmisiones = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInResultadoEmisiones();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IResultadoEmisiones) {
    return item.id;
  }

  registerChangeInResultadoEmisiones() {
    this.eventSubscriber = this.eventManager.subscribe('resultadoEmisionesListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
