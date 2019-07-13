import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContactoSede } from 'app/shared/model/comercial/contacto-sede.model';
import { AccountService } from 'app/core';
import { ContactoSedeService } from './contacto-sede.service';

@Component({
  selector: 'jhi-contacto-sede',
  templateUrl: './contacto-sede.component.html'
})
export class ContactoSedeComponent implements OnInit, OnDestroy {
  contactoSedes: IContactoSede[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected contactoSedeService: ContactoSedeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.contactoSedeService
      .query()
      .pipe(
        filter((res: HttpResponse<IContactoSede[]>) => res.ok),
        map((res: HttpResponse<IContactoSede[]>) => res.body)
      )
      .subscribe(
        (res: IContactoSede[]) => {
          this.contactoSedes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInContactoSedes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IContactoSede) {
    return item.id;
  }

  registerChangeInContactoSedes() {
    this.eventSubscriber = this.eventManager.subscribe('contactoSedeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
