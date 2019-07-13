import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILaboratorioMonitoreo } from 'app/shared/model/monitoreo/laboratorio-monitoreo.model';
import { AccountService } from 'app/core';
import { LaboratorioMonitoreoService } from './laboratorio-monitoreo.service';

@Component({
  selector: 'jhi-laboratorio-monitoreo',
  templateUrl: './laboratorio-monitoreo.component.html'
})
export class LaboratorioMonitoreoComponent implements OnInit, OnDestroy {
  laboratorioMonitoreos: ILaboratorioMonitoreo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected laboratorioMonitoreoService: LaboratorioMonitoreoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.laboratorioMonitoreoService
      .query()
      .pipe(
        filter((res: HttpResponse<ILaboratorioMonitoreo[]>) => res.ok),
        map((res: HttpResponse<ILaboratorioMonitoreo[]>) => res.body)
      )
      .subscribe(
        (res: ILaboratorioMonitoreo[]) => {
          this.laboratorioMonitoreos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLaboratorioMonitoreos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILaboratorioMonitoreo) {
    return item.id;
  }

  registerChangeInLaboratorioMonitoreos() {
    this.eventSubscriber = this.eventManager.subscribe('laboratorioMonitoreoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
