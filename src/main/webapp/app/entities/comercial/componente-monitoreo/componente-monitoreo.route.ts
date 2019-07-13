import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';
import { ComponenteMonitoreoService } from './componente-monitoreo.service';
import { ComponenteMonitoreoComponent } from './componente-monitoreo.component';
import { ComponenteMonitoreoDetailComponent } from './componente-monitoreo-detail.component';
import { ComponenteMonitoreoUpdateComponent } from './componente-monitoreo-update.component';
import { ComponenteMonitoreoDeletePopupComponent } from './componente-monitoreo-delete-dialog.component';
import { IComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';

@Injectable({ providedIn: 'root' })
export class ComponenteMonitoreoResolve implements Resolve<IComponenteMonitoreo> {
  constructor(private service: ComponenteMonitoreoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IComponenteMonitoreo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ComponenteMonitoreo>) => response.ok),
        map((componenteMonitoreo: HttpResponse<ComponenteMonitoreo>) => componenteMonitoreo.body)
      );
    }
    return of(new ComponenteMonitoreo());
  }
}

export const componenteMonitoreoRoute: Routes = [
  {
    path: '',
    component: ComponenteMonitoreoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialComponenteMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ComponenteMonitoreoDetailComponent,
    resolve: {
      componenteMonitoreo: ComponenteMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialComponenteMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ComponenteMonitoreoUpdateComponent,
    resolve: {
      componenteMonitoreo: ComponenteMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialComponenteMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ComponenteMonitoreoUpdateComponent,
    resolve: {
      componenteMonitoreo: ComponenteMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialComponenteMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const componenteMonitoreoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ComponenteMonitoreoDeletePopupComponent,
    resolve: {
      componenteMonitoreo: ComponenteMonitoreoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.comercialComponenteMonitoreo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
