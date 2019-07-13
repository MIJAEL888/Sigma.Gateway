import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Observacion } from 'app/shared/model/monitoreo/observacion.model';
import { ObservacionService } from './observacion.service';
import { ObservacionComponent } from './observacion.component';
import { ObservacionDetailComponent } from './observacion-detail.component';
import { ObservacionUpdateComponent } from './observacion-update.component';
import { ObservacionDeletePopupComponent } from './observacion-delete-dialog.component';
import { IObservacion } from 'app/shared/model/monitoreo/observacion.model';

@Injectable({ providedIn: 'root' })
export class ObservacionResolve implements Resolve<IObservacion> {
  constructor(private service: ObservacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IObservacion> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Observacion>) => response.ok),
        map((observacion: HttpResponse<Observacion>) => observacion.body)
      );
    }
    return of(new Observacion());
  }
}

export const observacionRoute: Routes = [
  {
    path: '',
    component: ObservacionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoObservacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ObservacionDetailComponent,
    resolve: {
      observacion: ObservacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoObservacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ObservacionUpdateComponent,
    resolve: {
      observacion: ObservacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoObservacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ObservacionUpdateComponent,
    resolve: {
      observacion: ObservacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoObservacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const observacionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ObservacionDeletePopupComponent,
    resolve: {
      observacion: ObservacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoObservacion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
