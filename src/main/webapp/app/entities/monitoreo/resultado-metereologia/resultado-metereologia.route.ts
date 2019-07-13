import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';
import { ResultadoMetereologiaService } from './resultado-metereologia.service';
import { ResultadoMetereologiaComponent } from './resultado-metereologia.component';
import { ResultadoMetereologiaDetailComponent } from './resultado-metereologia-detail.component';
import { ResultadoMetereologiaUpdateComponent } from './resultado-metereologia-update.component';
import { ResultadoMetereologiaDeletePopupComponent } from './resultado-metereologia-delete-dialog.component';
import { IResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';

@Injectable({ providedIn: 'root' })
export class ResultadoMetereologiaResolve implements Resolve<IResultadoMetereologia> {
  constructor(private service: ResultadoMetereologiaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResultadoMetereologia> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ResultadoMetereologia>) => response.ok),
        map((resultadoMetereologia: HttpResponse<ResultadoMetereologia>) => resultadoMetereologia.body)
      );
    }
    return of(new ResultadoMetereologia());
  }
}

export const resultadoMetereologiaRoute: Routes = [
  {
    path: '',
    component: ResultadoMetereologiaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultadoMetereologia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ResultadoMetereologiaDetailComponent,
    resolve: {
      resultadoMetereologia: ResultadoMetereologiaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultadoMetereologia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ResultadoMetereologiaUpdateComponent,
    resolve: {
      resultadoMetereologia: ResultadoMetereologiaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultadoMetereologia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ResultadoMetereologiaUpdateComponent,
    resolve: {
      resultadoMetereologia: ResultadoMetereologiaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultadoMetereologia.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const resultadoMetereologiaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ResultadoMetereologiaDeletePopupComponent,
    resolve: {
      resultadoMetereologia: ResultadoMetereologiaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultadoMetereologia.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
