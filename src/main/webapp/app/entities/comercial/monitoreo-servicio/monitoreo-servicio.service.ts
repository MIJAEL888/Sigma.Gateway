import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMonitoreoServicio } from 'app/shared/model/comercial/monitoreo-servicio.model';

type EntityResponseType = HttpResponse<IMonitoreoServicio>;
type EntityArrayResponseType = HttpResponse<IMonitoreoServicio[]>;

@Injectable({ providedIn: 'root' })
export class MonitoreoServicioService {
  public resourceUrl = SERVER_API_URL + 'services/comercial/api/monitoreo-servicios';

  constructor(protected http: HttpClient) {}

  create(monitoreoServicio: IMonitoreoServicio): Observable<EntityResponseType> {
    return this.http.post<IMonitoreoServicio>(this.resourceUrl, monitoreoServicio, { observe: 'response' });
  }

  update(monitoreoServicio: IMonitoreoServicio): Observable<EntityResponseType> {
    return this.http.put<IMonitoreoServicio>(this.resourceUrl, monitoreoServicio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMonitoreoServicio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMonitoreoServicio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
