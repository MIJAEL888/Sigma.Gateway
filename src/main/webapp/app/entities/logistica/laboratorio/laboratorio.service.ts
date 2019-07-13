import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILaboratorio } from 'app/shared/model/logistica/laboratorio.model';

type EntityResponseType = HttpResponse<ILaboratorio>;
type EntityArrayResponseType = HttpResponse<ILaboratorio[]>;

@Injectable({ providedIn: 'root' })
export class LaboratorioService {
  public resourceUrl = SERVER_API_URL + 'services/logistica/api/laboratorios';

  constructor(protected http: HttpClient) {}

  create(laboratorio: ILaboratorio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(laboratorio);
    return this.http
      .post<ILaboratorio>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(laboratorio: ILaboratorio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(laboratorio);
    return this.http
      .put<ILaboratorio>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILaboratorio>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILaboratorio[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(laboratorio: ILaboratorio): ILaboratorio {
    const copy: ILaboratorio = Object.assign({}, laboratorio, {
      vigenciaDesde:
        laboratorio.vigenciaDesde != null && laboratorio.vigenciaDesde.isValid() ? laboratorio.vigenciaDesde.format(DATE_FORMAT) : null,
      vigenciaHasta:
        laboratorio.vigenciaHasta != null && laboratorio.vigenciaHasta.isValid() ? laboratorio.vigenciaHasta.format(DATE_FORMAT) : null,
      fechaCreacion:
        laboratorio.fechaCreacion != null && laboratorio.fechaCreacion.isValid() ? laboratorio.fechaCreacion.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.vigenciaDesde = res.body.vigenciaDesde != null ? moment(res.body.vigenciaDesde) : null;
      res.body.vigenciaHasta = res.body.vigenciaHasta != null ? moment(res.body.vigenciaHasta) : null;
      res.body.fechaCreacion = res.body.fechaCreacion != null ? moment(res.body.fechaCreacion) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((laboratorio: ILaboratorio) => {
        laboratorio.vigenciaDesde = laboratorio.vigenciaDesde != null ? moment(laboratorio.vigenciaDesde) : null;
        laboratorio.vigenciaHasta = laboratorio.vigenciaHasta != null ? moment(laboratorio.vigenciaHasta) : null;
        laboratorio.fechaCreacion = laboratorio.fechaCreacion != null ? moment(laboratorio.fechaCreacion) : null;
      });
    }
    return res;
  }
}
