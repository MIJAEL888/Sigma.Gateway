import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IObservacion } from 'app/shared/model/monitoreo/observacion.model';
import { AccountService } from 'app/core';
import { ObservacionService } from './observacion.service';

@Component({
  selector: 'jhi-observacion',
  templateUrl: './observacion.component.html'
})
export class ObservacionComponent implements OnInit, OnDestroy {
  observacions: IObservacion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected observacionService: ObservacionService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.observacionService
      .query()
      .pipe(
        filter((res: HttpResponse<IObservacion[]>) => res.ok),
        map((res: HttpResponse<IObservacion[]>) => res.body)
      )
      .subscribe(
        (res: IObservacion[]) => {
          this.observacions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInObservacions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IObservacion) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInObservacions() {
    this.eventSubscriber = this.eventManager.subscribe('observacionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
