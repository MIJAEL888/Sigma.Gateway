import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoEquipo } from 'app/shared/model/logistica/tipo-equipo.model';
import { TipoEquipoService } from './tipo-equipo.service';
import { TipoEquipoComponent } from './tipo-equipo.component';
import { TipoEquipoDetailComponent } from './tipo-equipo-detail.component';
import { TipoEquipoUpdateComponent } from './tipo-equipo-update.component';
import { TipoEquipoDeletePopupComponent } from './tipo-equipo-delete-dialog.component';
import { ITipoEquipo } from 'app/shared/model/logistica/tipo-equipo.model';

@Injectable({ providedIn: 'root' })
export class TipoEquipoResolve implements Resolve<ITipoEquipo> {
  constructor(private service: TipoEquipoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoEquipo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoEquipo>) => response.ok),
        map((tipoEquipo: HttpResponse<TipoEquipo>) => tipoEquipo.body)
      );
    }
    return of(new TipoEquipo());
  }
}

export const tipoEquipoRoute: Routes = [
  {
    path: '',
    component: TipoEquipoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaTipoEquipo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoEquipoDetailComponent,
    resolve: {
      tipoEquipo: TipoEquipoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaTipoEquipo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoEquipoUpdateComponent,
    resolve: {
      tipoEquipo: TipoEquipoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaTipoEquipo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoEquipoUpdateComponent,
    resolve: {
      tipoEquipo: TipoEquipoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaTipoEquipo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoEquipoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoEquipoDeletePopupComponent,
    resolve: {
      tipoEquipo: TipoEquipoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaTipoEquipo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
