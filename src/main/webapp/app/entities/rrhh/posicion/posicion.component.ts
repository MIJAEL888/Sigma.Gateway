import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPosicion } from 'app/shared/model/rrhh/posicion.model';
import { AccountService } from 'app/core';
import { PosicionService } from './posicion.service';

@Component({
  selector: 'jhi-posicion',
  templateUrl: './posicion.component.html'
})
export class PosicionComponent implements OnInit, OnDestroy {
  posicions: IPosicion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected posicionService: PosicionService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.posicionService
      .query()
      .pipe(
        filter((res: HttpResponse<IPosicion[]>) => res.ok),
        map((res: HttpResponse<IPosicion[]>) => res.body)
      )
      .subscribe(
        (res: IPosicion[]) => {
          this.posicions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPosicions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPosicion) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInPosicions() {
    this.eventSubscriber = this.eventManager.subscribe('posicionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
