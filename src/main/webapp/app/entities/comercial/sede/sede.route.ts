import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Sede } from 'app/shared/model/comercial/sede.model';
import { SedeService } from './sede.service';
import { SedeComponent } from './sede.component';
import { SedeDetailComponent } from './sede-detail.component';
import { SedeUpdateComponent } from './sede-update.component';
import { SedeDeletePopupComponent } from './sede-delete-dialog.component';
import { ISede } from 'app/shared/model/comercial/sede.model';

@Injectable({ providedIn: 'root' })
export class SedeResolve implements Resolve<ISede> {
  constructor(private service: SedeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISede> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Sede>) => response.ok),
        map((sede: HttpResponse<Sede>) => sede.body)
      );
    }
    return of(new Sede());
  }
}

export const sedeRoute: Routes = [
  {
    path: '',
    component: SedeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.comercialSede.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SedeDetailComponent,
    resolve: {
      sede: SedeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialSede.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SedeUpdateComponent,
    resolve: {
      sede: SedeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialSede.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SedeUpdateComponent,
    resolve: {
      sede: SedeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialSede.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sedePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SedeDeletePopupComponent,
    resolve: {
      sede: SedeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialSede.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
