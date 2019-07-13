import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';

type EntityResponseType = HttpResponse<IPuntoMonitoreoObs>;
type EntityArrayResponseType = HttpResponse<IPuntoMonitoreoObs[]>;

@Injectable({ providedIn: 'root' })
export class PuntoMonitoreoObsService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/punto-monitoreo-obs';

  constructor(protected http: HttpClient) {}

  create(puntoMonitoreoObs: IPuntoMonitoreoObs): Observable<EntityResponseType> {
    return this.http.post<IPuntoMonitoreoObs>(this.resourceUrl, puntoMonitoreoObs, { observe: 'response' });
  }

  update(puntoMonitoreoObs: IPuntoMonitoreoObs): Observable<EntityResponseType> {
    return this.http.put<IPuntoMonitoreoObs>(this.resourceUrl, puntoMonitoreoObs, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPuntoMonitoreoObs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPuntoMonitoreoObs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
