import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEquipo } from 'app/shared/model/logistica/equipo.model';

type EntityResponseType = HttpResponse<IEquipo>;
type EntityArrayResponseType = HttpResponse<IEquipo[]>;

@Injectable({ providedIn: 'root' })
export class EquipoService {
  public resourceUrl = SERVER_API_URL + 'services/logistica/api/equipos';

  constructor(protected http: HttpClient) {}

  create(equipo: IEquipo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(equipo);
    return this.http
      .post<IEquipo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(equipo: IEquipo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(equipo);
    return this.http
      .put<IEquipo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEquipo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEquipo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(equipo: IEquipo): IEquipo {
    const copy: IEquipo = Object.assign({}, equipo, {
      calibradoDesde: equipo.calibradoDesde != null && equipo.calibradoDesde.isValid() ? equipo.calibradoDesde.format(DATE_FORMAT) : null,
      calibradoHasta: equipo.calibradoHasta != null && equipo.calibradoHasta.isValid() ? equipo.calibradoHasta.format(DATE_FORMAT) : null,
      fechaCompra: equipo.fechaCompra != null && equipo.fechaCompra.isValid() ? equipo.fechaCompra.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.calibradoDesde = res.body.calibradoDesde != null ? moment(res.body.calibradoDesde) : null;
      res.body.calibradoHasta = res.body.calibradoHasta != null ? moment(res.body.calibradoHasta) : null;
      res.body.fechaCompra = res.body.fechaCompra != null ? moment(res.body.fechaCompra) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((equipo: IEquipo) => {
        equipo.calibradoDesde = equipo.calibradoDesde != null ? moment(equipo.calibradoDesde) : null;
        equipo.calibradoHasta = equipo.calibradoHasta != null ? moment(equipo.calibradoHasta) : null;
        equipo.fechaCompra = equipo.fechaCompra != null ? moment(equipo.fechaCompra) : null;
      });
    }
    return res;
  }
}
