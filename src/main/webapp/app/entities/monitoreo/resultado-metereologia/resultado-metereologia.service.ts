import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';

type EntityResponseType = HttpResponse<IResultadoMetereologia>;
type EntityArrayResponseType = HttpResponse<IResultadoMetereologia[]>;

@Injectable({ providedIn: 'root' })
export class ResultadoMetereologiaService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/resultado-metereologias';

  constructor(protected http: HttpClient) {}

  create(resultadoMetereologia: IResultadoMetereologia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resultadoMetereologia);
    return this.http
      .post<IResultadoMetereologia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(resultadoMetereologia: IResultadoMetereologia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resultadoMetereologia);
    return this.http
      .put<IResultadoMetereologia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IResultadoMetereologia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IResultadoMetereologia[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(resultadoMetereologia: IResultadoMetereologia): IResultadoMetereologia {
    const copy: IResultadoMetereologia = Object.assign({}, resultadoMetereologia, {
      fecha: resultadoMetereologia.fecha != null && resultadoMetereologia.fecha.isValid() ? resultadoMetereologia.fecha.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((resultadoMetereologia: IResultadoMetereologia) => {
        resultadoMetereologia.fecha = resultadoMetereologia.fecha != null ? moment(resultadoMetereologia.fecha) : null;
      });
    }
    return res;
  }
}
