import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';
import { RequisitosSeguridadService } from './requisitos-seguridad.service';
import { RequisitosSeguridadComponent } from './requisitos-seguridad.component';
import { RequisitosSeguridadDetailComponent } from './requisitos-seguridad-detail.component';
import { RequisitosSeguridadUpdateComponent } from './requisitos-seguridad-update.component';
import { RequisitosSeguridadDeletePopupComponent } from './requisitos-seguridad-delete-dialog.component';
import { IRequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';

@Injectable({ providedIn: 'root' })
export class RequisitosSeguridadResolve implements Resolve<IRequisitosSeguridad> {
  constructor(private service: RequisitosSeguridadService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequisitosSeguridad> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RequisitosSeguridad>) => response.ok),
        map((requisitosSeguridad: HttpResponse<RequisitosSeguridad>) => requisitosSeguridad.body)
      );
    }
    return of(new RequisitosSeguridad());
  }
}

export const requisitosSeguridadRoute: Routes = [
  {
    path: '',
    component: RequisitosSeguridadComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialRequisitosSeguridad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RequisitosSeguridadDetailComponent,
    resolve: {
      requisitosSeguridad: RequisitosSeguridadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialRequisitosSeguridad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RequisitosSeguridadUpdateComponent,
    resolve: {
      requisitosSeguridad: RequisitosSeguridadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialRequisitosSeguridad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RequisitosSeguridadUpdateComponent,
    resolve: {
      requisitosSeguridad: RequisitosSeguridadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialRequisitosSeguridad.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const requisitosSeguridadPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RequisitosSeguridadDeletePopupComponent,
    resolve: {
      requisitosSeguridad: RequisitosSeguridadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialRequisitosSeguridad.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
