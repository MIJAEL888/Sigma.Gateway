import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFotografiaPunto } from 'app/shared/model/monitoreo/fotografia-punto.model';

type EntityResponseType = HttpResponse<IFotografiaPunto>;
type EntityArrayResponseType = HttpResponse<IFotografiaPunto[]>;

@Injectable({ providedIn: 'root' })
export class FotografiaPuntoService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/fotografia-puntos';

  constructor(protected http: HttpClient) {}

  create(fotografiaPunto: IFotografiaPunto): Observable<EntityResponseType> {
    return this.http.post<IFotografiaPunto>(this.resourceUrl, fotografiaPunto, { observe: 'response' });
  }

  update(fotografiaPunto: IFotografiaPunto): Observable<EntityResponseType> {
    return this.http.put<IFotografiaPunto>(this.resourceUrl, fotografiaPunto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFotografiaPunto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFotografiaPunto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
