import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';

type EntityResponseType = HttpResponse<ITipoInduccion>;
type EntityArrayResponseType = HttpResponse<ITipoInduccion[]>;

@Injectable({ providedIn: 'root' })
export class TipoInduccionService {
  public resourceUrl = SERVER_API_URL + 'services/comercial/api/tipo-induccions';

  constructor(protected http: HttpClient) {}

  create(tipoInduccion: ITipoInduccion): Observable<EntityResponseType> {
    return this.http.post<ITipoInduccion>(this.resourceUrl, tipoInduccion, { observe: 'response' });
  }

  update(tipoInduccion: ITipoInduccion): Observable<EntityResponseType> {
    return this.http.put<ITipoInduccion>(this.resourceUrl, tipoInduccion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoInduccion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoInduccion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
