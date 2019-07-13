import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMonitorista } from 'app/shared/model/logistica/monitorista.model';

type EntityResponseType = HttpResponse<IMonitorista>;
type EntityArrayResponseType = HttpResponse<IMonitorista[]>;

@Injectable({ providedIn: 'root' })
export class MonitoristaService {
  public resourceUrl = SERVER_API_URL + 'services/logistica/api/monitoristas';

  constructor(protected http: HttpClient) {}

  create(monitorista: IMonitorista): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(monitorista);
    return this.http
      .post<IMonitorista>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(monitorista: IMonitorista): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(monitorista);
    return this.http
      .put<IMonitorista>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMonitorista>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMonitorista[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(monitorista: IMonitorista): IMonitorista {
    const copy: IMonitorista = Object.assign({}, monitorista, {
      fechaNacimiento:
        monitorista.fechaNacimiento != null && monitorista.fechaNacimiento.isValid()
          ? monitorista.fechaNacimiento.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaNacimiento = res.body.fechaNacimiento != null ? moment(res.body.fechaNacimiento) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((monitorista: IMonitorista) => {
        monitorista.fechaNacimiento = monitorista.fechaNacimiento != null ? moment(monitorista.fechaNacimiento) : null;
      });
    }
    return res;
  }
}
