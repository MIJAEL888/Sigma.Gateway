import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';
import { AccountService } from 'app/core';
import { TipoServiciosService } from './tipo-servicios.service';

@Component({
  selector: 'jhi-tipo-servicios',
  templateUrl: './tipo-servicios.component.html'
})
export class TipoServiciosComponent implements OnInit, OnDestroy {
  tipoServicios: ITipoServicios[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoServiciosService: TipoServiciosService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoServiciosService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoServicios[]>) => res.ok),
        map((res: HttpResponse<ITipoServicios[]>) => res.body)
      )
      .subscribe(
        (res: ITipoServicios[]) => {
          this.tipoServicios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoServicios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoServicios) {
    return item.id;
  }

  registerChangeInTipoServicios() {
    this.eventSubscriber = this.eventManager.subscribe('tipoServiciosListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
