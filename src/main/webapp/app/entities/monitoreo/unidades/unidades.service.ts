import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUnidades } from 'app/shared/model/monitoreo/unidades.model';

type EntityResponseType = HttpResponse<IUnidades>;
type EntityArrayResponseType = HttpResponse<IUnidades[]>;

@Injectable({ providedIn: 'root' })
export class UnidadesService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/unidades';

  constructor(protected http: HttpClient) {}

  create(unidades: IUnidades): Observable<EntityResponseType> {
    return this.http.post<IUnidades>(this.resourceUrl, unidades, { observe: 'response' });
  }

  update(unidades: IUnidades): Observable<EntityResponseType> {
    return this.http.put<IUnidades>(this.resourceUrl, unidades, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUnidades>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUnidades[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
