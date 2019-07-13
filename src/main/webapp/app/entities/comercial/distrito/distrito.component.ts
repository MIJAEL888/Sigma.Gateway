import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDistrito } from 'app/shared/model/comercial/distrito.model';
import { AccountService } from 'app/core';
import { DistritoService } from './distrito.service';

@Component({
  selector: 'jhi-distrito',
  templateUrl: './distrito.component.html'
})
export class DistritoComponent implements OnInit, OnDestroy {
  distritos: IDistrito[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected distritoService: DistritoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.distritoService
      .query()
      .pipe(
        filter((res: HttpResponse<IDistrito[]>) => res.ok),
        map((res: HttpResponse<IDistrito[]>) => res.body)
      )
      .subscribe(
        (res: IDistrito[]) => {
          this.distritos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDistritos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDistrito) {
    return item.id;
  }

  registerChangeInDistritos() {
    this.eventSubscriber = this.eventManager.subscribe('distritoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
