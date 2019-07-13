import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Monitorista } from 'app/shared/model/logistica/monitorista.model';
import { MonitoristaService } from './monitorista.service';
import { MonitoristaComponent } from './monitorista.component';
import { MonitoristaDetailComponent } from './monitorista-detail.component';
import { MonitoristaUpdateComponent } from './monitorista-update.component';
import { MonitoristaDeletePopupComponent } from './monitorista-delete-dialog.component';
import { IMonitorista } from 'app/shared/model/logistica/monitorista.model';

@Injectable({ providedIn: 'root' })
export class MonitoristaResolve implements Resolve<IMonitorista> {
  constructor(private service: MonitoristaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMonitorista> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Monitorista>) => response.ok),
        map((monitorista: HttpResponse<Monitorista>) => monitorista.body)
      );
    }
    return of(new Monitorista());
  }
}

export const monitoristaRoute: Routes = [
  {
    path: '',
    component: MonitoristaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.logisticaMonitorista.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MonitoristaDetailComponent,
    resolve: {
      monitorista: MonitoristaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaMonitorista.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MonitoristaUpdateComponent,
    resolve: {
      monitorista: MonitoristaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaMonitorista.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MonitoristaUpdateComponent,
    resolve: {
      monitorista: MonitoristaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaMonitorista.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const monitoristaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MonitoristaDeletePopupComponent,
    resolve: {
      monitorista: MonitoristaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.logisticaMonitorista.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
