import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FotografiaPunto } from 'app/shared/model/monitoreo/fotografia-punto.model';
import { FotografiaPuntoService } from './fotografia-punto.service';
import { FotografiaPuntoComponent } from './fotografia-punto.component';
import { FotografiaPuntoDetailComponent } from './fotografia-punto-detail.component';
import { FotografiaPuntoUpdateComponent } from './fotografia-punto-update.component';
import { FotografiaPuntoDeletePopupComponent } from './fotografia-punto-delete-dialog.component';
import { IFotografiaPunto } from 'app/shared/model/monitoreo/fotografia-punto.model';

@Injectable({ providedIn: 'root' })
export class FotografiaPuntoResolve implements Resolve<IFotografiaPunto> {
  constructor(private service: FotografiaPuntoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFotografiaPunto> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FotografiaPunto>) => response.ok),
        map((fotografiaPunto: HttpResponse<FotografiaPunto>) => fotografiaPunto.body)
      );
    }
    return of(new FotografiaPunto());
  }
}

export const fotografiaPuntoRoute: Routes = [
  {
    path: '',
    component: FotografiaPuntoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoFotografiaPunto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FotografiaPuntoDetailComponent,
    resolve: {
      fotografiaPunto: FotografiaPuntoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoFotografiaPunto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FotografiaPuntoUpdateComponent,
    resolve: {
      fotografiaPunto: FotografiaPuntoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoFotografiaPunto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FotografiaPuntoUpdateComponent,
    resolve: {
      fotografiaPunto: FotografiaPuntoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoFotografiaPunto.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const fotografiaPuntoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FotografiaPuntoDeletePopupComponent,
    resolve: {
      fotografiaPunto: FotografiaPuntoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoFotografiaPunto.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
