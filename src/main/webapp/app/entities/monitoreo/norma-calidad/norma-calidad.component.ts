import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { INormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';
import { AccountService } from 'app/core';
import { NormaCalidadService } from './norma-calidad.service';

@Component({
  selector: 'jhi-norma-calidad',
  templateUrl: './norma-calidad.component.html'
})
export class NormaCalidadComponent implements OnInit, OnDestroy {
  normaCalidads: INormaCalidad[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected normaCalidadService: NormaCalidadService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.normaCalidadService
      .query()
      .pipe(
        filter((res: HttpResponse<INormaCalidad[]>) => res.ok),
        map((res: HttpResponse<INormaCalidad[]>) => res.body)
      )
      .subscribe(
        (res: INormaCalidad[]) => {
          this.normaCalidads = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInNormaCalidads();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INormaCalidad) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInNormaCalidads() {
    this.eventSubscriber = this.eventManager.subscribe('normaCalidadListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
