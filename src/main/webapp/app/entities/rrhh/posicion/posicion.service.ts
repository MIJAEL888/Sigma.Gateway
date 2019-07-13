import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPosicion } from 'app/shared/model/rrhh/posicion.model';

type EntityResponseType = HttpResponse<IPosicion>;
type EntityArrayResponseType = HttpResponse<IPosicion[]>;

@Injectable({ providedIn: 'root' })
export class PosicionService {
  public resourceUrl = SERVER_API_URL + 'services/rrhh/api/posicions';

  constructor(protected http: HttpClient) {}

  create(posicion: IPosicion): Observable<EntityResponseType> {
    return this.http.post<IPosicion>(this.resourceUrl, posicion, { observe: 'response' });
  }

  update(posicion: IPosicion): Observable<EntityResponseType> {
    return this.http.put<IPosicion>(this.resourceUrl, posicion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPosicion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPosicion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
