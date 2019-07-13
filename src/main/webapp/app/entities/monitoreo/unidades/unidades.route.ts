import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Unidades } from 'app/shared/model/monitoreo/unidades.model';
import { UnidadesService } from './unidades.service';
import { UnidadesComponent } from './unidades.component';
import { UnidadesDetailComponent } from './unidades-detail.component';
import { UnidadesUpdateComponent } from './unidades-update.component';
import { UnidadesDeletePopupComponent } from './unidades-delete-dialog.component';
import { IUnidades } from 'app/shared/model/monitoreo/unidades.model';

@Injectable({ providedIn: 'root' })
export class UnidadesResolve implements Resolve<IUnidades> {
  constructor(private service: UnidadesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUnidades> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Unidades>) => response.ok),
        map((unidades: HttpResponse<Unidades>) => unidades.body)
      );
    }
    return of(new Unidades());
  }
}

export const unidadesRoute: Routes = [
  {
    path: '',
    component: UnidadesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoUnidades.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UnidadesDetailComponent,
    resolve: {
      unidades: UnidadesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoUnidades.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UnidadesUpdateComponent,
    resolve: {
      unidades: UnidadesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoUnidades.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UnidadesUpdateComponent,
    resolve: {
      unidades: UnidadesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoUnidades.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const unidadesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: UnidadesDeletePopupComponent,
    resolve: {
      unidades: UnidadesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoUnidades.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
