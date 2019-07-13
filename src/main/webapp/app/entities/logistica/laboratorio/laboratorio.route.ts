import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Laboratorio } from 'app/shared/model/logistica/laboratorio.model';
import { LaboratorioService } from './laboratorio.service';
import { LaboratorioComponent } from './laboratorio.component';
import { LaboratorioDetailComponent } from './laboratorio-detail.component';
import { LaboratorioUpdateComponent } from './laboratorio-update.component';
import { LaboratorioDeletePopupComponent } from './laboratorio-delete-dialog.component';
import { ILaboratorio } from 'app/shared/model/logistica/laboratorio.model';

@Injectable({ providedIn: 'root' })
export class LaboratorioResolve implements Resolve<ILaboratorio> {
  constructor(private service: LaboratorioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILaboratorio> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Laboratorio>) => response.ok),
        map((laboratorio: HttpResponse<Laboratorio>) => laboratorio.body)
      );
    }
    return of(new Laboratorio());
  }
}

export const laboratorioRoute: Routes = [
  {
    path: '',
    component: LaboratorioComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.logisticaLaboratorio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LaboratorioDetailComponent,
    resolve: {
      laboratorio: LaboratorioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaLaboratorio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LaboratorioUpdateComponent,
    resolve: {
      laboratorio: LaboratorioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaLaboratorio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LaboratorioUpdateComponent,
    resolve: {
      laboratorio: LaboratorioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaLaboratorio.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const laboratorioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LaboratorioDeletePopupComponent,
    resolve: {
      laboratorio: LaboratorioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaLaboratorio.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
