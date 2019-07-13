import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';
import { NormaCalidadService } from './norma-calidad.service';
import { NormaCalidadComponent } from './norma-calidad.component';
import { NormaCalidadDetailComponent } from './norma-calidad-detail.component';
import { NormaCalidadUpdateComponent } from './norma-calidad-update.component';
import { NormaCalidadDeletePopupComponent } from './norma-calidad-delete-dialog.component';
import { INormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';

@Injectable({ providedIn: 'root' })
export class NormaCalidadResolve implements Resolve<INormaCalidad> {
  constructor(private service: NormaCalidadService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INormaCalidad> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NormaCalidad>) => response.ok),
        map((normaCalidad: HttpResponse<NormaCalidad>) => normaCalidad.body)
      );
    }
    return of(new NormaCalidad());
  }
}

export const normaCalidadRoute: Routes = [
  {
    path: '',
    component: NormaCalidadComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoNormaCalidad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NormaCalidadDetailComponent,
    resolve: {
      normaCalidad: NormaCalidadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoNormaCalidad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NormaCalidadUpdateComponent,
    resolve: {
      normaCalidad: NormaCalidadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoNormaCalidad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NormaCalidadUpdateComponent,
    resolve: {
      normaCalidad: NormaCalidadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoNormaCalidad.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const normaCalidadPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NormaCalidadDeletePopupComponent,
    resolve: {
      normaCalidad: NormaCalidadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoNormaCalidad.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
