import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoEquipo } from 'app/shared/model/logistica/tipo-equipo.model';

type EntityResponseType = HttpResponse<ITipoEquipo>;
type EntityArrayResponseType = HttpResponse<ITipoEquipo[]>;

@Injectable({ providedIn: 'root' })
export class TipoEquipoService {
  public resourceUrl = SERVER_API_URL + 'services/logistica/api/tipo-equipos';

  constructor(protected http: HttpClient) {}

  create(tipoEquipo: ITipoEquipo): Observable<EntityResponseType> {
    return this.http.post<ITipoEquipo>(this.resourceUrl, tipoEquipo, { observe: 'response' });
  }

  update(tipoEquipo: ITipoEquipo): Observable<EntityResponseType> {
    return this.http.put<ITipoEquipo>(this.resourceUrl, tipoEquipo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoEquipo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoEquipo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
