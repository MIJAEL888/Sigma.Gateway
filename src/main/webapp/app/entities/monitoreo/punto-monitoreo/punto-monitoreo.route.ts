import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';
import { PuntoMonitoreoService } from './punto-monitoreo.service';
import { PuntoMonitoreoComponent } from './punto-monitoreo.component';
import { PuntoMonitoreoDetailComponent } from './punto-monitoreo-detail.component';
import { PuntoMonitoreoUpdateComponent } from './punto-monitoreo-update.component';
import { PuntoMonitoreoDeletePopupComponent } from './punto-monitoreo-delete-dialog.component';
import { IPuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';

@Injectable({ providedIn: 'root' })
export class PuntoMonitoreoResolve implements Resolve<IPuntoMonitoreo> {
  constructor(private service: PuntoMonitoreoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPuntoMonitoreo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PuntoMonitoreo>) => response.ok),
        map((puntoMonitoreo: HttpResponse<PuntoMonitoreo>) => puntoMonitoreo.body)
      );
    }
    return of(new PuntoMonitoreo());
  }
}

export const puntoMonitoreoRoute: Routes = [
  {
    path: '',
    component: PuntoMonitoreoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.monitoreoPuntoMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PuntoMonitoreoDetailComponent,
    resolve: {
      puntoMonitoreo: PuntoMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoPuntoMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PuntoMonitoreoUpdateComponent,
    resolve: {
      puntoMonitoreo: PuntoMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoPuntoMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PuntoMonitoreoUpdateComponent,
    resolve: {
      puntoMonitoreo: PuntoMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoPuntoMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const puntoMonitoreoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PuntoMonitoreoDeletePopupComponent,
    resolve: {
      puntoMonitoreo: PuntoMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoPuntoMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
