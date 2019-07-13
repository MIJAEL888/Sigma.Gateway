import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';

type EntityResponseType = HttpResponse<IResultadoEmisiones>;
type EntityArrayResponseType = HttpResponse<IResultadoEmisiones[]>;

@Injectable({ providedIn: 'root' })
export class ResultadoEmisionesService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/resultado-emisiones';

  constructor(protected http: HttpClient) {}

  create(resultadoEmisiones: IResultadoEmisiones): Observable<EntityResponseType> {
    return this.http.post<IResultadoEmisiones>(this.resourceUrl, resultadoEmisiones, { observe: 'response' });
  }

  update(resultadoEmisiones: IResultadoEmisiones): Observable<EntityResponseType> {
    return this.http.put<IResultadoEmisiones>(this.resourceUrl, resultadoEmisiones, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IResultadoEmisiones>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IResultadoEmisiones[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
