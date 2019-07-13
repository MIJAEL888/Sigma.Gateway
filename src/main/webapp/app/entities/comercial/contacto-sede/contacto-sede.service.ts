import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContactoSede } from 'app/shared/model/comercial/contacto-sede.model';

type EntityResponseType = HttpResponse<IContactoSede>;
type EntityArrayResponseType = HttpResponse<IContactoSede[]>;

@Injectable({ providedIn: 'root' })
export class ContactoSedeService {
  public resourceUrl = SERVER_API_URL + 'services/comercial/api/contacto-sedes';

  constructor(protected http: HttpClient) {}

  create(contactoSede: IContactoSede): Observable<EntityResponseType> {
    return this.http.post<IContactoSede>(this.resourceUrl, contactoSede, { observe: 'response' });
  }

  update(contactoSede: IContactoSede): Observable<EntityResponseType> {
    return this.http.put<IContactoSede>(this.resourceUrl, contactoSede, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContactoSede>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactoSede[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
