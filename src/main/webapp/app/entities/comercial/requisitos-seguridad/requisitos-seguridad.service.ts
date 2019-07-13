import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';

type EntityResponseType = HttpResponse<IRequisitosSeguridad>;
type EntityArrayResponseType = HttpResponse<IRequisitosSeguridad[]>;

@Injectable({ providedIn: 'root' })
export class RequisitosSeguridadService {
  public resourceUrl = SERVER_API_URL + 'services/comercial/api/requisitos-seguridads';

  constructor(protected http: HttpClient) {}

  create(requisitosSeguridad: IRequisitosSeguridad): Observable<EntityResponseType> {
    return this.http.post<IRequisitosSeguridad>(this.resourceUrl, requisitosSeguridad, { observe: 'response' });
  }

  update(requisitosSeguridad: IRequisitosSeguridad): Observable<EntityResponseType> {
    return this.http.put<IRequisitosSeguridad>(this.resourceUrl, requisitosSeguridad, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRequisitosSeguridad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRequisitosSeguridad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
