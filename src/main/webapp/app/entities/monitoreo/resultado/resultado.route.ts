import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Resultado } from 'app/shared/model/monitoreo/resultado.model';
import { ResultadoService } from './resultado.service';
import { ResultadoComponent } from './resultado.component';
import { ResultadoDetailComponent } from './resultado-detail.component';
import { ResultadoUpdateComponent } from './resultado-update.component';
import { ResultadoDeletePopupComponent } from './resultado-delete-dialog.component';
import { IResultado } from 'app/shared/model/monitoreo/resultado.model';

@Injectable({ providedIn: 'root' })
export class ResultadoResolve implements Resolve<IResultado> {
  constructor(private service: ResultadoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResultado> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Resultado>) => response.ok),
        map((resultado: HttpResponse<Resultado>) => resultado.body)
      );
    }
    return of(new Resultado());
  }
}

export const resultadoRoute: Routes = [
  {
    path: '',
    component: ResultadoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.monitoreoResultado.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ResultadoDetailComponent,
    resolve: {
      resultado: ResultadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultado.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ResultadoUpdateComponent,
    resolve: {
      resultado: ResultadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultado.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ResultadoUpdateComponent,
    resolve: {
      resultado: ResultadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultado.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const resultadoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ResultadoDeletePopupComponent,
    resolve: {
      resultado: ResultadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoResultado.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
