import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';
import { AccountService } from 'app/core';
import { ResultadoMetereologiaService } from './resultado-metereologia.service';

@Component({
  selector: 'jhi-resultado-metereologia',
  templateUrl: './resultado-metereologia.component.html'
})
export class ResultadoMetereologiaComponent implements OnInit, OnDestroy {
  resultadoMetereologias: IResultadoMetereologia[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected resultadoMetereologiaService: ResultadoMetereologiaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.resultadoMetereologiaService
      .query()
      .pipe(
        filter((res: HttpResponse<IResultadoMetereologia[]>) => res.ok),
        map((res: HttpResponse<IResultadoMetereologia[]>) => res.body)
      )
      .subscribe(
        (res: IResultadoMetereologia[]) => {
          this.resultadoMetereologias = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInResultadoMetereologias();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IResultadoMetereologia) {
    return item.id;
  }

  registerChangeInResultadoMetereologias() {
    this.eventSubscriber = this.eventManager.subscribe('resultadoMetereologiaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
