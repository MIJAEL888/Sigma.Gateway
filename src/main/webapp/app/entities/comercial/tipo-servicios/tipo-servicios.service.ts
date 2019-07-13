import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';

type EntityResponseType = HttpResponse<ITipoServicios>;
type EntityArrayResponseType = HttpResponse<ITipoServicios[]>;

@Injectable({ providedIn: 'root' })
export class TipoServiciosService {
  public resourceUrl = SERVER_API_URL + 'services/comercial/api/tipo-servicios';

  constructor(protected http: HttpClient) {}

  create(tipoServicios: ITipoServicios): Observable<EntityResponseType> {
    return this.http.post<ITipoServicios>(this.resourceUrl, tipoServicios, { observe: 'response' });
  }

  update(tipoServicios: ITipoServicios): Observable<EntityResponseType> {
    return this.http.put<ITipoServicios>(this.resourceUrl, tipoServicios, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoServicios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoServicios[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
