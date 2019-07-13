import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';

type EntityResponseType = HttpResponse<IEquipoMonitoreo>;
type EntityArrayResponseType = HttpResponse<IEquipoMonitoreo[]>;

@Injectable({ providedIn: 'root' })
export class EquipoMonitoreoService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/equipo-monitoreos';

  constructor(protected http: HttpClient) {}

  create(equipoMonitoreo: IEquipoMonitoreo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(equipoMonitoreo);
    return this.http
      .post<IEquipoMonitoreo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(equipoMonitoreo: IEquipoMonitoreo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(equipoMonitoreo);
    return this.http
      .put<IEquipoMonitoreo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEquipoMonitoreo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEquipoMonitoreo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(equipoMonitoreo: IEquipoMonitoreo): IEquipoMonitoreo {
    const copy: IEquipoMonitoreo = Object.assign({}, equipoMonitoreo, {
      reservadoDesde:
        equipoMonitoreo.reservadoDesde != null && equipoMonitoreo.reservadoDesde.isValid()
          ? equipoMonitoreo.reservadoDesde.format(DATE_FORMAT)
          : null,
      reservadoHasta:
        equipoMonitoreo.reservadoHasta != null && equipoMonitoreo.reservadoHasta.isValid()
          ? equipoMonitoreo.reservadoHasta.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.reservadoDesde = res.body.reservadoDesde != null ? moment(res.body.reservadoDesde) : null;
      res.body.reservadoHasta = res.body.reservadoHasta != null ? moment(res.body.reservadoHasta) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((equipoMonitoreo: IEquipoMonitoreo) => {
        equipoMonitoreo.reservadoDesde = equipoMonitoreo.reservadoDesde != null ? moment(equipoMonitoreo.reservadoDesde) : null;
        equipoMonitoreo.reservadoHasta = equipoMonitoreo.reservadoHasta != null ? moment(equipoMonitoreo.reservadoHasta) : null;
      });
    }
    return res;
  }
}
