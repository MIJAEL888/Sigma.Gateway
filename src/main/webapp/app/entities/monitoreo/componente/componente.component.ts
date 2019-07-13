import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IComponente } from 'app/shared/model/monitoreo/componente.model';
import { AccountService } from 'app/core';
import { ComponenteService } from './componente.service';

@Component({
  selector: 'jhi-componente',
  templateUrl: './componente.component.html'
})
export class ComponenteComponent implements OnInit, OnDestroy {
  componentes: IComponente[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected componenteService: ComponenteService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.componenteService
      .query()
      .pipe(
        filter((res: HttpResponse<IComponente[]>) => res.ok),
        map((res: HttpResponse<IComponente[]>) => res.body)
      )
      .subscribe(
        (res: IComponente[]) => {
          this.componentes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInComponentes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IComponente) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInComponentes() {
    this.eventSubscriber = this.eventManager.subscribe('componenteListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
