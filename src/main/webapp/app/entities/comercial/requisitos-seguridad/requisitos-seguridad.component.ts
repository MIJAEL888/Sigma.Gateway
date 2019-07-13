import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';
import { AccountService } from 'app/core';
import { RequisitosSeguridadService } from './requisitos-seguridad.service';

@Component({
  selector: 'jhi-requisitos-seguridad',
  templateUrl: './requisitos-seguridad.component.html'
})
export class RequisitosSeguridadComponent implements OnInit, OnDestroy {
  requisitosSeguridads: IRequisitosSeguridad[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected requisitosSeguridadService: RequisitosSeguridadService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.requisitosSeguridadService
      .query()
      .pipe(
        filter((res: HttpResponse<IRequisitosSeguridad[]>) => res.ok),
        map((res: HttpResponse<IRequisitosSeguridad[]>) => res.body)
      )
      .subscribe(
        (res: IRequisitosSeguridad[]) => {
          this.requisitosSeguridads = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRequisitosSeguridads();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRequisitosSeguridad) {
    return item.id;
  }

  registerChangeInRequisitosSeguridads() {
    this.eventSubscriber = this.eventManager.subscribe('requisitosSeguridadListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
