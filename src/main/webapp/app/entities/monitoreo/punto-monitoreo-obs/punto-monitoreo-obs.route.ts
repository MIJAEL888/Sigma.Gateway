import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';
import { PuntoMonitoreoObsService } from './punto-monitoreo-obs.service';
import { PuntoMonitoreoObsComponent } from './punto-monitoreo-obs.component';
import { PuntoMonitoreoObsDetailComponent } from './punto-monitoreo-obs-detail.component';
import { PuntoMonitoreoObsUpdateComponent } from './punto-monitoreo-obs-update.component';
import { PuntoMonitoreoObsDeletePopupComponent } from './punto-monitoreo-obs-delete-dialog.component';
import { IPuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';

@Injectable({ providedIn: 'root' })
export class PuntoMonitoreoObsResolve implements Resolve<IPuntoMonitoreoObs> {
  constructor(private service: PuntoMonitoreoObsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPuntoMonitoreoObs> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PuntoMonitoreoObs>) => response.ok),
        map((puntoMonitoreoObs: HttpResponse<PuntoMonitoreoObs>) => puntoMonitoreoObs.body)
      );
    }
    return of(new PuntoMonitoreoObs());
  }
}

export const puntoMonitoreoObsRoute: Routes = [
  {
    path: '',
    component: PuntoMonitoreoObsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.monitoreoPuntoMonitoreoObs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PuntoMonitoreoObsDetailComponent,
    resolve: {
      puntoMonitoreoObs: PuntoMonitoreoObsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoPuntoMonitoreoObs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PuntoMonitoreoObsUpdateComponent,
    resolve: {
      puntoMonitoreoObs: PuntoMonitoreoObsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoPuntoMonitoreoObs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PuntoMonitoreoObsUpdateComponent,
    resolve: {
      puntoMonitoreoObs: PuntoMonitoreoObsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoPuntoMonitoreoObs.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const puntoMonitoreoObsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PuntoMonitoreoObsDeletePopupComponent,
    resolve: {
      puntoMonitoreoObs: PuntoMonitoreoObsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoPuntoMonitoreoObs.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
