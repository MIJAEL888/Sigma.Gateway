import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContactoSede } from 'app/shared/model/comercial/contacto-sede.model';
import { ContactoSedeService } from './contacto-sede.service';
import { ContactoSedeComponent } from './contacto-sede.component';
import { ContactoSedeDetailComponent } from './contacto-sede-detail.component';
import { ContactoSedeUpdateComponent } from './contacto-sede-update.component';
import { ContactoSedeDeletePopupComponent } from './contacto-sede-delete-dialog.component';
import { IContactoSede } from 'app/shared/model/comercial/contacto-sede.model';

@Injectable({ providedIn: 'root' })
export class ContactoSedeResolve implements Resolve<IContactoSede> {
  constructor(private service: ContactoSedeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContactoSede> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ContactoSede>) => response.ok),
        map((contactoSede: HttpResponse<ContactoSede>) => contactoSede.body)
      );
    }
    return of(new ContactoSede());
  }
}

export const contactoSedeRoute: Routes = [
  {
    path: '',
    component: ContactoSedeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialContactoSede.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContactoSedeDetailComponent,
    resolve: {
      contactoSede: ContactoSedeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialContactoSede.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContactoSedeUpdateComponent,
    resolve: {
      contactoSede: ContactoSedeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialContactoSede.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContactoSedeUpdateComponent,
    resolve: {
      contactoSede: ContactoSedeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialContactoSede.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const contactoSedePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ContactoSedeDeletePopupComponent,
    resolve: {
      contactoSede: ContactoSedeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialContactoSede.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
