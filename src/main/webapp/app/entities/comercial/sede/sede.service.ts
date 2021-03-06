import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISede } from 'app/shared/model/comercial/sede.model';

type EntityResponseType = HttpResponse<ISede>;
type EntityArrayResponseType = HttpResponse<ISede[]>;

@Injectable({ providedIn: 'root' })
export class SedeService {
  public resourceUrl = SERVER_API_URL + 'services/comercial/api/sedes';

  constructor(protected http: HttpClient) {}

  create(sede: ISede): Observable<EntityResponseType> {
    return this.http.post<ISede>(this.resourceUrl, sede, { observe: 'response' });
  }

  update(sede: ISede): Observable<EntityResponseType> {
    return this.http.put<ISede>(this.resourceUrl, sede, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISede>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISede[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
