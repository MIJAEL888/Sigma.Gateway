import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';

type EntityResponseType = HttpResponse<IPuntoMonitoreo>;
type EntityArrayResponseType = HttpResponse<IPuntoMonitoreo[]>;

@Injectable({ providedIn: 'root' })
export class PuntoMonitoreoService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/punto-monitoreos';

  constructor(protected http: HttpClient) {}

  create(puntoMonitoreo: IPuntoMonitoreo): Observable<EntityResponseType> {
    return this.http.post<IPuntoMonitoreo>(this.resourceUrl, puntoMonitoreo, { observe: 'response' });
  }

  update(puntoMonitoreo: IPuntoMonitoreo): Observable<EntityResponseType> {
    return this.http.put<IPuntoMonitoreo>(this.resourceUrl, puntoMonitoreo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPuntoMonitoreo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPuntoMonitoreo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
