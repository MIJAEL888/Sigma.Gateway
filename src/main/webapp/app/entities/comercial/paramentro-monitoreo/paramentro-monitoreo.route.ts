import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';
import { ParamentroMonitoreoService } from './paramentro-monitoreo.service';
import { ParamentroMonitoreoComponent } from './paramentro-monitoreo.component';
import { ParamentroMonitoreoDetailComponent } from './paramentro-monitoreo-detail.component';
import { ParamentroMonitoreoUpdateComponent } from './paramentro-monitoreo-update.component';
import { ParamentroMonitoreoDeletePopupComponent } from './paramentro-monitoreo-delete-dialog.component';
import { IParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';

@Injectable({ providedIn: 'root' })
export class ParamentroMonitoreoResolve implements Resolve<IParamentroMonitoreo> {
  constructor(private service: ParamentroMonitoreoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParamentroMonitoreo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ParamentroMonitoreo>) => response.ok),
        map((paramentroMonitoreo: HttpResponse<ParamentroMonitoreo>) => paramentroMonitoreo.body)
      );
    }
    return of(new ParamentroMonitoreo());
  }
}

export const paramentroMonitoreoRoute: Routes = [
  {
    path: '',
    component: ParamentroMonitoreoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.comercialParamentroMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParamentroMonitoreoDetailComponent,
    resolve: {
      paramentroMonitoreo: ParamentroMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialParamentroMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParamentroMonitoreoUpdateComponent,
    resolve: {
      paramentroMonitoreo: ParamentroMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialParamentroMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParamentroMonitoreoUpdateComponent,
    resolve: {
      paramentroMonitoreo: ParamentroMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialParamentroMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const paramentroMonitoreoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ParamentroMonitoreoDeletePopupComponent,
    resolve: {
      paramentroMonitoreo: ParamentroMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialParamentroMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
