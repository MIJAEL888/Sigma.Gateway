import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IObservacion } from 'app/shared/model/monitoreo/observacion.model';

type EntityResponseType = HttpResponse<IObservacion>;
type EntityArrayResponseType = HttpResponse<IObservacion[]>;

@Injectable({ providedIn: 'root' })
export class ObservacionService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/observacions';

  constructor(protected http: HttpClient) {}

  create(observacion: IObservacion): Observable<EntityResponseType> {
    return this.http.post<IObservacion>(this.resourceUrl, observacion, { observe: 'response' });
  }

  update(observacion: IObservacion): Observable<EntityResponseType> {
    return this.http.put<IObservacion>(this.resourceUrl, observacion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IObservacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IObservacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
