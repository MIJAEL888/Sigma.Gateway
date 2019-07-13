import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MonitoreoServicio } from 'app/shared/model/comercial/monitoreo-servicio.model';
import { MonitoreoServicioService } from './monitoreo-servicio.service';
import { MonitoreoServicioComponent } from './monitoreo-servicio.component';
import { MonitoreoServicioDetailComponent } from './monitoreo-servicio-detail.component';
import { MonitoreoServicioUpdateComponent } from './monitoreo-servicio-update.component';
import { MonitoreoServicioDeletePopupComponent } from './monitoreo-servicio-delete-dialog.component';
import { IMonitoreoServicio } from 'app/shared/model/comercial/monitoreo-servicio.model';

@Injectable({ providedIn: 'root' })
export class MonitoreoServicioResolve implements Resolve<IMonitoreoServicio> {
  constructor(private service: MonitoreoServicioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMonitoreoServicio> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MonitoreoServicio>) => response.ok),
        map((monitoreoServicio: HttpResponse<MonitoreoServicio>) => monitoreoServicio.body)
      );
    }
    return of(new MonitoreoServicio());
  }
}

export const monitoreoServicioRoute: Routes = [
  {
    path: '',
    component: MonitoreoServicioComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.comercialMonitoreoServicio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MonitoreoServicioDetailComponent,
    resolve: {
      monitoreoServicio: MonitoreoServicioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialMonitoreoServicio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MonitoreoServicioUpdateComponent,
    resolve: {
      monitoreoServicio: MonitoreoServicioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialMonitoreoServicio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MonitoreoServicioUpdateComponent,
    resolve: {
      monitoreoServicio: MonitoreoServicioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialMonitoreoServicio.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const monitoreoServicioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MonitoreoServicioDeletePopupComponent,
    resolve: {
      monitoreoServicio: MonitoreoServicioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialMonitoreoServicio.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
