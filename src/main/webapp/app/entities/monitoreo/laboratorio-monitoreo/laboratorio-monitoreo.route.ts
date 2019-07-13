import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LaboratorioMonitoreo } from 'app/shared/model/monitoreo/laboratorio-monitoreo.model';
import { LaboratorioMonitoreoService } from './laboratorio-monitoreo.service';
import { LaboratorioMonitoreoComponent } from './laboratorio-monitoreo.component';
import { LaboratorioMonitoreoDetailComponent } from './laboratorio-monitoreo-detail.component';
import { LaboratorioMonitoreoUpdateComponent } from './laboratorio-monitoreo-update.component';
import { LaboratorioMonitoreoDeletePopupComponent } from './laboratorio-monitoreo-delete-dialog.component';
import { ILaboratorioMonitoreo } from 'app/shared/model/monitoreo/laboratorio-monitoreo.model';

@Injectable({ providedIn: 'root' })
export class LaboratorioMonitoreoResolve implements Resolve<ILaboratorioMonitoreo> {
  constructor(private service: LaboratorioMonitoreoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILaboratorioMonitoreo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LaboratorioMonitoreo>) => response.ok),
        map((laboratorioMonitoreo: HttpResponse<LaboratorioMonitoreo>) => laboratorioMonitoreo.body)
      );
    }
    return of(new LaboratorioMonitoreo());
  }
}

export const laboratorioMonitoreoRoute: Routes = [
  {
    path: '',
    component: LaboratorioMonitoreoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoLaboratorioMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LaboratorioMonitoreoDetailComponent,
    resolve: {
      laboratorioMonitoreo: LaboratorioMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoLaboratorioMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LaboratorioMonitoreoUpdateComponent,
    resolve: {
      laboratorioMonitoreo: LaboratorioMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoLaboratorioMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LaboratorioMonitoreoUpdateComponent,
    resolve: {
      laboratorioMonitoreo: LaboratorioMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoLaboratorioMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const laboratorioMonitoreoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LaboratorioMonitoreoDeletePopupComponent,
    resolve: {
      laboratorioMonitoreo: LaboratorioMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoLaboratorioMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
