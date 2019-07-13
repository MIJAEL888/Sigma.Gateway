import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';
import { FotografiaMonitoreoService } from './fotografia-monitoreo.service';
import { FotografiaMonitoreoComponent } from './fotografia-monitoreo.component';
import { FotografiaMonitoreoDetailComponent } from './fotografia-monitoreo-detail.component';
import { FotografiaMonitoreoUpdateComponent } from './fotografia-monitoreo-update.component';
import { FotografiaMonitoreoDeletePopupComponent } from './fotografia-monitoreo-delete-dialog.component';
import { IFotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';

@Injectable({ providedIn: 'root' })
export class FotografiaMonitoreoResolve implements Resolve<IFotografiaMonitoreo> {
  constructor(private service: FotografiaMonitoreoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFotografiaMonitoreo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FotografiaMonitoreo>) => response.ok),
        map((fotografiaMonitoreo: HttpResponse<FotografiaMonitoreo>) => fotografiaMonitoreo.body)
      );
    }
    return of(new FotografiaMonitoreo());
  }
}

export const fotografiaMonitoreoRoute: Routes = [
  {
    path: '',
    component: FotografiaMonitoreoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoFotografiaMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FotografiaMonitoreoDetailComponent,
    resolve: {
      fotografiaMonitoreo: FotografiaMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoFotografiaMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FotografiaMonitoreoUpdateComponent,
    resolve: {
      fotografiaMonitoreo: FotografiaMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoFotografiaMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FotografiaMonitoreoUpdateComponent,
    resolve: {
      fotografiaMonitoreo: FotografiaMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoFotografiaMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const fotografiaMonitoreoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FotografiaMonitoreoDeletePopupComponent,
    resolve: {
      fotografiaMonitoreo: FotografiaMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoFotografiaMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
