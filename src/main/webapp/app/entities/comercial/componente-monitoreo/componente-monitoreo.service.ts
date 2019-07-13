import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';

type EntityResponseType = HttpResponse<IComponenteMonitoreo>;
type EntityArrayResponseType = HttpResponse<IComponenteMonitoreo[]>;

@Injectable({ providedIn: 'root' })
export class ComponenteMonitoreoService {
  public resourceUrl = SERVER_API_URL + 'services/comercial/api/componente-monitoreos';

  constructor(protected http: HttpClient) {}

  create(componenteMonitoreo: IComponenteMonitoreo): Observable<EntityResponseType> {
    return this.http.post<IComponenteMonitoreo>(this.resourceUrl, componenteMonitoreo, { observe: 'response' });
  }

  update(componenteMonitoreo: IComponenteMonitoreo): Observable<EntityResponseType> {
    return this.http.put<IComponenteMonitoreo>(this.resourceUrl, componenteMonitoreo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComponenteMonitoreo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComponenteMonitoreo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
