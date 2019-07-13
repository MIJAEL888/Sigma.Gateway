import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDistrito } from 'app/shared/model/comercial/distrito.model';

type EntityResponseType = HttpResponse<IDistrito>;
type EntityArrayResponseType = HttpResponse<IDistrito[]>;

@Injectable({ providedIn: 'root' })
export class DistritoService {
  public resourceUrl = SERVER_API_URL + 'services/comercial/api/distritos';

  constructor(protected http: HttpClient) {}

  create(distrito: IDistrito): Observable<EntityResponseType> {
    return this.http.post<IDistrito>(this.resourceUrl, distrito, { observe: 'response' });
  }

  update(distrito: IDistrito): Observable<EntityResponseType> {
    return this.http.put<IDistrito>(this.resourceUrl, distrito, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDistrito>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDistrito[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
