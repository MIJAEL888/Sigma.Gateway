import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';
import { ResultadoEmisionesService } from './resultado-emisiones.service';
import { ResultadoEmisionesComponent } from './resultado-emisiones.component';
import { ResultadoEmisionesDetailComponent } from './resultado-emisiones-detail.component';
import { ResultadoEmisionesUpdateComponent } from './resultado-emisiones-update.component';
import { ResultadoEmisionesDeletePopupComponent } from './resultado-emisiones-delete-dialog.component';
import { IResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';

@Injectable({ providedIn: 'root' })
export class ResultadoEmisionesResolve implements Resolve<IResultadoEmisiones> {
  constructor(private service: ResultadoEmisionesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResultadoEmisiones> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ResultadoEmisiones>) => response.ok),
        map((resultadoEmisiones: HttpResponse<ResultadoEmisiones>) => resultadoEmisiones.body)
      );
    }
    return of(new ResultadoEmisiones());
  }
}

export const resultadoEmisionesRoute: Routes = [
  {
    path: '',
    component: ResultadoEmisionesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultadoEmisiones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ResultadoEmisionesDetailComponent,
    resolve: {
      resultadoEmisiones: ResultadoEmisionesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultadoEmisiones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ResultadoEmisionesUpdateComponent,
    resolve: {
      resultadoEmisiones: ResultadoEmisionesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultadoEmisiones.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ResultadoEmisionesUpdateComponent,
    resolve: {
      resultadoEmisiones: ResultadoEmisionesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultadoEmisiones.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const resultadoEmisionesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ResultadoEmisionesDeletePopupComponent,
    resolve: {
      resultadoEmisiones: ResultadoEmisionesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultadoEmisiones.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
