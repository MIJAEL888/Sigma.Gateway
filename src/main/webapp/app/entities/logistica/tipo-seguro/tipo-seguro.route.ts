import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';
import { TipoSeguroService } from './tipo-seguro.service';
import { TipoSeguroComponent } from './tipo-seguro.component';
import { TipoSeguroDetailComponent } from './tipo-seguro-detail.component';
import { TipoSeguroUpdateComponent } from './tipo-seguro-update.component';
import { TipoSeguroDeletePopupComponent } from './tipo-seguro-delete-dialog.component';
import { ITipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';

@Injectable({ providedIn: 'root' })
export class TipoSeguroResolve implements Resolve<ITipoSeguro> {
  constructor(private service: TipoSeguroService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoSeguro> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoSeguro>) => response.ok),
        map((tipoSeguro: HttpResponse<TipoSeguro>) => tipoSeguro.body)
      );
    }
    return of(new TipoSeguro());
  }
}

export const tipoSeguroRoute: Routes = [
  {
    path: '',
    component: TipoSeguroComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaTipoSeguro.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoSeguroDetailComponent,
    resolve: {
      tipoSeguro: TipoSeguroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaTipoSeguro.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoSeguroUpdateComponent,
    resolve: {
      tipoSeguro: TipoSeguroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaTipoSeguro.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoSeguroUpdateComponent,
    resolve: {
      tipoSeguro: TipoSeguroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaTipoSeguro.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoSeguroPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoSeguroDeletePopupComponent,
    resolve: {
      tipoSeguro: TipoSeguroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaTipoSeguro.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
