import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';

type EntityResponseType = HttpResponse<ITipoSeguro>;
type EntityArrayResponseType = HttpResponse<ITipoSeguro[]>;

@Injectable({ providedIn: 'root' })
export class TipoSeguroService {
  public resourceUrl = SERVER_API_URL + 'services/logistica/api/tipo-seguros';

  constructor(protected http: HttpClient) {}

  create(tipoSeguro: ITipoSeguro): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tipoSeguro);
    return this.http
      .post<ITipoSeguro>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tipoSeguro: ITipoSeguro): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tipoSeguro);
    return this.http
      .put<ITipoSeguro>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITipoSeguro>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITipoSeguro[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tipoSeguro: ITipoSeguro): ITipoSeguro {
    const copy: ITipoSeguro = Object.assign({}, tipoSeguro, {
      fechaCaudicidad:
        tipoSeguro.fechaCaudicidad != null && tipoSeguro.fechaCaudicidad.isValid() ? tipoSeguro.fechaCaudicidad.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaCaudicidad = res.body.fechaCaudicidad != null ? moment(res.body.fechaCaudicidad) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tipoSeguro: ITipoSeguro) => {
        tipoSeguro.fechaCaudicidad = tipoSeguro.fechaCaudicidad != null ? moment(tipoSeguro.fechaCaudicidad) : null;
      });
    }
    return res;
  }
}
