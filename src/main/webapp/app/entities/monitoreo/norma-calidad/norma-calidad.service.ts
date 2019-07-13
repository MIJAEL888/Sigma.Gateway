import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';

type EntityResponseType = HttpResponse<INormaCalidad>;
type EntityArrayResponseType = HttpResponse<INormaCalidad[]>;

@Injectable({ providedIn: 'root' })
export class NormaCalidadService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/norma-calidads';

  constructor(protected http: HttpClient) {}

  create(normaCalidad: INormaCalidad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(normaCalidad);
    return this.http
      .post<INormaCalidad>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(normaCalidad: INormaCalidad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(normaCalidad);
    return this.http
      .put<INormaCalidad>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INormaCalidad>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INormaCalidad[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(normaCalidad: INormaCalidad): INormaCalidad {
    const copy: INormaCalidad = Object.assign({}, normaCalidad, {
      fechaPublicacion:
        normaCalidad.fechaPublicacion != null && normaCalidad.fechaPublicacion.isValid()
          ? normaCalidad.fechaPublicacion.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaPublicacion = res.body.fechaPublicacion != null ? moment(res.body.fechaPublicacion) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((normaCalidad: INormaCalidad) => {
        normaCalidad.fechaPublicacion = normaCalidad.fechaPublicacion != null ? moment(normaCalidad.fechaPublicacion) : null;
      });
    }
    return res;
  }
}
