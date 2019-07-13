import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILaboratorioMonitoreo } from 'app/shared/model/monitoreo/laboratorio-monitoreo.model';

type EntityResponseType = HttpResponse<ILaboratorioMonitoreo>;
type EntityArrayResponseType = HttpResponse<ILaboratorioMonitoreo[]>;

@Injectable({ providedIn: 'root' })
export class LaboratorioMonitoreoService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/laboratorio-monitoreos';

  constructor(protected http: HttpClient) {}

  create(laboratorioMonitoreo: ILaboratorioMonitoreo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(laboratorioMonitoreo);
    return this.http
      .post<ILaboratorioMonitoreo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(laboratorioMonitoreo: ILaboratorioMonitoreo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(laboratorioMonitoreo);
    return this.http
      .put<ILaboratorioMonitoreo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILaboratorioMonitoreo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILaboratorioMonitoreo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(laboratorioMonitoreo: ILaboratorioMonitoreo): ILaboratorioMonitoreo {
    const copy: ILaboratorioMonitoreo = Object.assign({}, laboratorioMonitoreo, {
      fechaReseva:
        laboratorioMonitoreo.fechaReseva != null && laboratorioMonitoreo.fechaReseva.isValid()
          ? laboratorioMonitoreo.fechaReseva.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaReseva = res.body.fechaReseva != null ? moment(res.body.fechaReseva) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((laboratorioMonitoreo: ILaboratorioMonitoreo) => {
        laboratorioMonitoreo.fechaReseva = laboratorioMonitoreo.fechaReseva != null ? moment(laboratorioMonitoreo.fechaReseva) : null;
      });
    }
    return res;
  }
}
