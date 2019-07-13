import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Paramentro } from 'app/shared/model/monitoreo/paramentro.model';
import { ParamentroService } from './paramentro.service';
import { ParamentroComponent } from './paramentro.component';
import { ParamentroDetailComponent } from './paramentro-detail.component';
import { ParamentroUpdateComponent } from './paramentro-update.component';
import { ParamentroDeletePopupComponent } from './paramentro-delete-dialog.component';
import { IParamentro } from 'app/shared/model/monitoreo/paramentro.model';

@Injectable({ providedIn: 'root' })
export class ParamentroResolve implements Resolve<IParamentro> {
  constructor(private service: ParamentroService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParamentro> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Paramentro>) => response.ok),
        map((paramentro: HttpResponse<Paramentro>) => paramentro.body)
      );
    }
    return of(new Paramentro());
  }
}

export const paramentroRoute: Routes = [
  {
    path: '',
    component: ParamentroComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.monitoreoParamentro.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParamentroDetailComponent,
    resolve: {
      paramentro: ParamentroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoParamentro.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParamentroUpdateComponent,
    resolve: {
      paramentro: ParamentroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoParamentro.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParamentroUpdateComponent,
    resolve: {
      paramentro: ParamentroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoParamentro.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const paramentroPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ParamentroDeletePopupComponent,
    resolve: {
      paramentro: ParamentroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.monitoreoParamentro.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
