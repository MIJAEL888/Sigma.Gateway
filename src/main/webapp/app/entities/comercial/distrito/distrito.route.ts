import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Distrito } from 'app/shared/model/comercial/distrito.model';
import { DistritoService } from './distrito.service';
import { DistritoComponent } from './distrito.component';
import { DistritoDetailComponent } from './distrito-detail.component';
import { DistritoUpdateComponent } from './distrito-update.component';
import { DistritoDeletePopupComponent } from './distrito-delete-dialog.component';
import { IDistrito } from 'app/shared/model/comercial/distrito.model';

@Injectable({ providedIn: 'root' })
export class DistritoResolve implements Resolve<IDistrito> {
  constructor(private service: DistritoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDistrito> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Distrito>) => response.ok),
        map((distrito: HttpResponse<Distrito>) => distrito.body)
      );
    }
    return of(new Distrito());
  }
}

export const distritoRoute: Routes = [
  {
    path: '',
    component: DistritoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialDistrito.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DistritoDetailComponent,
    resolve: {
      distrito: DistritoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialDistrito.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DistritoUpdateComponent,
    resolve: {
      distrito: DistritoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialDistrito.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DistritoUpdateComponent,
    resolve: {
      distrito: DistritoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialDistrito.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const distritoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DistritoDeletePopupComponent,
    resolve: {
      distrito: DistritoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialDistrito.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
