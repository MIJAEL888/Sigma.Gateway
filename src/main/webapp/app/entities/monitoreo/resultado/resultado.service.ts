import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IResultado } from 'app/shared/model/monitoreo/resultado.model';

type EntityResponseType = HttpResponse<IResultado>;
type EntityArrayResponseType = HttpResponse<IResultado[]>;

@Injectable({ providedIn: 'root' })
export class ResultadoService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/resultados';

  constructor(protected http: HttpClient) {}

  create(resultado: IResultado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resultado);
    return this.http
      .post<IResultado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(resultado: IResultado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resultado);
    return this.http
      .put<IResultado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IResultado>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IResultado[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(resultado: IResultado): IResultado {
    const copy: IResultado = Object.assign({}, resultado, {
      fechaInicio: resultado.fechaInicio != null && resultado.fechaInicio.isValid() ? resultado.fechaInicio.toJSON() : null,
      fehcaFin: resultado.fehcaFin != null && resultado.fehcaFin.isValid() ? resultado.fehcaFin.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicio = res.body.fechaInicio != null ? moment(res.body.fechaInicio) : null;
      res.body.fehcaFin = res.body.fehcaFin != null ? moment(res.body.fehcaFin) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((resultado: IResultado) => {
        resultado.fechaInicio = resultado.fechaInicio != null ? moment(resultado.fechaInicio) : null;
        resultado.fehcaFin = resultado.fehcaFin != null ? moment(resultado.fehcaFin) : null;
      });
    }
    return res;
  }
}
