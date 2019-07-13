import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Posicion } from 'app/shared/model/rrhh/posicion.model';
import { PosicionService } from './posicion.service';
import { PosicionComponent } from './posicion.component';
import { PosicionDetailComponent } from './posicion-detail.component';
import { PosicionUpdateComponent } from './posicion-update.component';
import { PosicionDeletePopupComponent } from './posicion-delete-dialog.component';
import { IPosicion } from 'app/shared/model/rrhh/posicion.model';

@Injectable({ providedIn: 'root' })
export class PosicionResolve implements Resolve<IPosicion> {
  constructor(private service: PosicionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPosicion> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Posicion>) => response.ok),
        map((posicion: HttpResponse<Posicion>) => posicion.body)
      );
    }
    return of(new Posicion());
  }
}

export const posicionRoute: Routes = [
  {
    path: '',
    component: PosicionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.rrhhPosicion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PosicionDetailComponent,
    resolve: {
      posicion: PosicionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.rrhhPosicion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PosicionUpdateComponent,
    resolve: {
      posicion: PosicionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.rrhhPosicion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PosicionUpdateComponent,
    resolve: {
      posicion: PosicionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.rrhhPosicion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const posicionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PosicionDeletePopupComponent,
    resolve: {
      posicion: PosicionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.rrhhPosicion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
