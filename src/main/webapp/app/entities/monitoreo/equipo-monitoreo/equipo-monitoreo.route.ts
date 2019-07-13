import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';
import { EquipoMonitoreoService } from './equipo-monitoreo.service';
import { EquipoMonitoreoComponent } from './equipo-monitoreo.component';
import { EquipoMonitoreoDetailComponent } from './equipo-monitoreo-detail.component';
import { EquipoMonitoreoUpdateComponent } from './equipo-monitoreo-update.component';
import { EquipoMonitoreoDeletePopupComponent } from './equipo-monitoreo-delete-dialog.component';
import { IEquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';

@Injectable({ providedIn: 'root' })
export class EquipoMonitoreoResolve implements Resolve<IEquipoMonitoreo> {
  constructor(private service: EquipoMonitoreoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEquipoMonitoreo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EquipoMonitoreo>) => response.ok),
        map((equipoMonitoreo: HttpResponse<EquipoMonitoreo>) => equipoMonitoreo.body)
      );
    }
    return of(new EquipoMonitoreo());
  }
}

export const equipoMonitoreoRoute: Routes = [
  {
    path: '',
    component: EquipoMonitoreoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoEquipoMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EquipoMonitoreoDetailComponent,
    resolve: {
      equipoMonitoreo: EquipoMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoEquipoMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EquipoMonitoreoUpdateComponent,
    resolve: {
      equipoMonitoreo: EquipoMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoEquipoMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EquipoMonitoreoUpdateComponent,
    resolve: {
      equipoMonitoreo: EquipoMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoEquipoMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const equipoMonitoreoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EquipoMonitoreoDeletePopupComponent,
    resolve: {
      equipoMonitoreo: EquipoMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoEquipoMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
