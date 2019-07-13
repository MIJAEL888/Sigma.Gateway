import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';
import { AccountService } from 'app/core';
import { ComponenteMonitoreoService } from './componente-monitoreo.service';

@Component({
  selector: 'jhi-componente-monitoreo',
  templateUrl: './componente-monitoreo.component.html'
})
export class ComponenteMonitoreoComponent implements OnInit, OnDestroy {
  componenteMonitoreos: IComponenteMonitoreo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected componenteMonitoreoService: ComponenteMonitoreoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.componenteMonitoreoService
      .query()
      .pipe(
        filter((res: HttpResponse<IComponenteMonitoreo[]>) => res.ok),
        map((res: HttpResponse<IComponenteMonitoreo[]>) => res.body)
      )
      .subscribe(
        (res: IComponenteMonitoreo[]) => {
          this.componenteMonitoreos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInComponenteMonitoreos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IComponenteMonitoreo) {
    return item.id;
  }

  registerChangeInComponenteMonitoreos() {
    this.eventSubscriber = this.eventManager.subscribe('componenteMonitoreoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
