import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';
import { AccountService } from 'app/core';
import { EquipoMonitoreoService } from './equipo-monitoreo.service';

@Component({
  selector: 'jhi-equipo-monitoreo',
  templateUrl: './equipo-monitoreo.component.html'
})
export class EquipoMonitoreoComponent implements OnInit, OnDestroy {
  equipoMonitoreos: IEquipoMonitoreo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected equipoMonitoreoService: EquipoMonitoreoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.equipoMonitoreoService
      .query()
      .pipe(
        filter((res: HttpResponse<IEquipoMonitoreo[]>) => res.ok),
        map((res: HttpResponse<IEquipoMonitoreo[]>) => res.body)
      )
      .subscribe(
        (res: IEquipoMonitoreo[]) => {
          this.equipoMonitoreos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEquipoMonitoreos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEquipoMonitoreo) {
    return item.id;
  }

  registerChangeInEquipoMonitoreos() {
    this.eventSubscriber = this.eventManager.subscribe('equipoMonitoreoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
