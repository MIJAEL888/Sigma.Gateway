import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IArea } from 'app/shared/model/rrhh/area.model';
import { AccountService } from 'app/core';
import { AreaService } from './area.service';

@Component({
  selector: 'jhi-area',
  templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit, OnDestroy {
  areas: IArea[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected areaService: AreaService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.areaService
      .query()
      .pipe(
        filter((res: HttpResponse<IArea[]>) => res.ok),
        map((res: HttpResponse<IArea[]>) => res.body)
      )
      .subscribe(
        (res: IArea[]) => {
          this.areas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAreas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IArea) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInAreas() {
    this.eventSubscriber = this.eventManager.subscribe('areaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
