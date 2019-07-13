import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';
import { AccountService } from 'app/core';
import { FotografiaMonitoreoService } from './fotografia-monitoreo.service';

@Component({
  selector: 'jhi-fotografia-monitoreo',
  templateUrl: './fotografia-monitoreo.component.html'
})
export class FotografiaMonitoreoComponent implements OnInit, OnDestroy {
  fotografiaMonitoreos: IFotografiaMonitoreo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected fotografiaMonitoreoService: FotografiaMonitoreoService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.fotografiaMonitoreoService
      .query()
      .pipe(
        filter((res: HttpResponse<IFotografiaMonitoreo[]>) => res.ok),
        map((res: HttpResponse<IFotografiaMonitoreo[]>) => res.body)
      )
      .subscribe(
        (res: IFotografiaMonitoreo[]) => {
          this.fotografiaMonitoreos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFotografiaMonitoreos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFotografiaMonitoreo) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInFotografiaMonitoreos() {
    this.eventSubscriber = this.eventManager.subscribe('fotografiaMonitoreoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
