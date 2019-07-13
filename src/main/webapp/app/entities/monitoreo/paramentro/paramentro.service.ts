import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParamentro } from 'app/shared/model/monitoreo/paramentro.model';

type EntityResponseType = HttpResponse<IParamentro>;
type EntityArrayResponseType = HttpResponse<IParamentro[]>;

@Injectable({ providedIn: 'root' })
export class ParamentroService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/paramentros';

  constructor(protected http: HttpClient) {}

  create(paramentro: IParamentro): Observable<EntityResponseType> {
    return this.http.post<IParamentro>(this.resourceUrl, paramentro, { observe: 'response' });
  }

  update(paramentro: IParamentro): Observable<EntityResponseType> {
    return this.http.put<IParamentro>(this.resourceUrl, paramentro, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParamentro>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParamentro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
