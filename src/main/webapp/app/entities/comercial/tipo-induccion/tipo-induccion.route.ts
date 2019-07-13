import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';
import { TipoInduccionService } from './tipo-induccion.service';
import { TipoInduccionComponent } from './tipo-induccion.component';
import { TipoInduccionDetailComponent } from './tipo-induccion-detail.component';
import { TipoInduccionUpdateComponent } from './tipo-induccion-update.component';
import { TipoInduccionDeletePopupComponent } from './tipo-induccion-delete-dialog.component';
import { ITipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';

@Injectable({ providedIn: 'root' })
export class TipoInduccionResolve implements Resolve<ITipoInduccion> {
  constructor(private service: TipoInduccionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoInduccion> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoInduccion>) => response.ok),
        map((tipoInduccion: HttpResponse<TipoInduccion>) => tipoInduccion.body)
      );
    }
    return of(new TipoInduccion());
  }
}

export const tipoInduccionRoute: Routes = [
  {
    path: '',
    component: TipoInduccionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialTipoInduccion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoInduccionDetailComponent,
    resolve: {
      tipoInduccion: TipoInduccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialTipoInduccion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoInduccionUpdateComponent,
    resolve: {
      tipoInduccion: TipoInduccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialTipoInduccion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoInduccionUpdateComponent,
    resolve: {
      tipoInduccion: TipoInduccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialTipoInduccion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoInduccionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoInduccionDeletePopupComponent,
    resolve: {
      tipoInduccion: TipoInduccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialTipoInduccion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
