import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';

type EntityResponseType = HttpResponse<IParamentroMonitoreo>;
type EntityArrayResponseType = HttpResponse<IParamentroMonitoreo[]>;

@Injectable({ providedIn: 'root' })
export class ParamentroMonitoreoService {
  public resourceUrl = SERVER_API_URL + 'services/comercial/api/paramentro-monitoreos';

  constructor(protected http: HttpClient) {}

  create(paramentroMonitoreo: IParamentroMonitoreo): Observable<EntityResponseType> {
    return this.http.post<IParamentroMonitoreo>(this.resourceUrl, paramentroMonitoreo, { observe: 'response' });
  }

  update(paramentroMonitoreo: IParamentroMonitoreo): Observable<EntityResponseType> {
    return this.http.put<IParamentroMonitoreo>(this.resourceUrl, paramentroMonitoreo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParamentroMonitoreo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParamentroMonitoreo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
