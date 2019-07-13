import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';
import { TipoServiciosService } from './tipo-servicios.service';
import { TipoServiciosComponent } from './tipo-servicios.component';
import { TipoServiciosDetailComponent } from './tipo-servicios-detail.component';
import { TipoServiciosUpdateComponent } from './tipo-servicios-update.component';
import { TipoServiciosDeletePopupComponent } from './tipo-servicios-delete-dialog.component';
import { ITipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';

@Injectable({ providedIn: 'root' })
export class TipoServiciosResolve implements Resolve<ITipoServicios> {
  constructor(private service: TipoServiciosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoServicios> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoServicios>) => response.ok),
        map((tipoServicios: HttpResponse<TipoServicios>) => tipoServicios.body)
      );
    }
    return of(new TipoServicios());
  }
}

export const tipoServiciosRoute: Routes = [
  {
    path: '',
    component: TipoServiciosComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialTipoServicios.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoServiciosDetailComponent,
    resolve: {
      tipoServicios: TipoServiciosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialTipoServicios.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoServiciosUpdateComponent,
    resolve: {
      tipoServicios: TipoServiciosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialTipoServicios.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoServiciosUpdateComponent,
    resolve: {
      tipoServicios: TipoServiciosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialTipoServicios.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoServiciosPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoServiciosDeletePopupComponent,
    resolve: {
      tipoServicios: TipoServiciosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialTipoServicios.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
