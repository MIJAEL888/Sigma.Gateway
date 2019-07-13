import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Equipo } from 'app/shared/model/logistica/equipo.model';
import { EquipoService } from './equipo.service';
import { EquipoComponent } from './equipo.component';
import { EquipoDetailComponent } from './equipo-detail.component';
import { EquipoUpdateComponent } from './equipo-update.component';
import { EquipoDeletePopupComponent } from './equipo-delete-dialog.component';
import { IEquipo } from 'app/shared/model/logistica/equipo.model';

@Injectable({ providedIn: 'root' })
export class EquipoResolve implements Resolve<IEquipo> {
  constructor(private service: EquipoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEquipo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Equipo>) => response.ok),
        map((equipo: HttpResponse<Equipo>) => equipo.body)
      );
    }
    return of(new Equipo());
  }
}

export const equipoRoute: Routes = [
  {
    path: '',
    component: EquipoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.logisticaEquipo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EquipoDetailComponent,
    resolve: {
      equipo: EquipoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaEquipo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EquipoUpdateComponent,
    resolve: {
      equipo: EquipoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaEquipo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EquipoUpdateComponent,
    resolve: {
      equipo: EquipoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaEquipo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const equipoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EquipoDeletePopupComponent,
    resolve: {
      equipo: EquipoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaEquipo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
