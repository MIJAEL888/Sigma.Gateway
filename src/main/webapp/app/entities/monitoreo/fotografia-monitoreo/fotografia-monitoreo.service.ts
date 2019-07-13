import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';

type EntityResponseType = HttpResponse<IFotografiaMonitoreo>;
type EntityArrayResponseType = HttpResponse<IFotografiaMonitoreo[]>;

@Injectable({ providedIn: 'root' })
export class FotografiaMonitoreoService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/fotografia-monitoreos';

  constructor(protected http: HttpClient) {}

  create(fotografiaMonitoreo: IFotografiaMonitoreo): Observable<EntityResponseType> {
    return this.http.post<IFotografiaMonitoreo>(this.resourceUrl, fotografiaMonitoreo, { observe: 'response' });
  }

  update(fotografiaMonitoreo: IFotografiaMonitoreo): Observable<EntityResponseType> {
    return this.http.put<IFotografiaMonitoreo>(this.resourceUrl, fotografiaMonitoreo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFotografiaMonitoreo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFotografiaMonitoreo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
