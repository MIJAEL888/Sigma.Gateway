import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProyecto } from 'app/shared/model/monitoreo/proyecto.model';

type EntityResponseType = HttpResponse<IProyecto>;
type EntityArrayResponseType = HttpResponse<IProyecto[]>;

@Injectable({ providedIn: 'root' })
export class ProyectoService {
  public resourceUrl = SERVER_API_URL + 'services/monitoreo/api/proyectos';

  constructor(protected http: HttpClient) {}

  create(proyecto: IProyecto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proyecto);
    return this.http
      .post<IProyecto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(proyecto: IProyecto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proyecto);
    return this.http
      .put<IProyecto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProyecto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProyecto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(proyecto: IProyecto): IProyecto {
    const copy: IProyecto = Object.assign({}, proyecto, {
      fechaIncio: proyecto.fechaIncio != null && proyecto.fechaIncio.isValid() ? proyecto.fechaIncio.format(DATE_FORMAT) : null,
      fechaFina: proyecto.fechaFina != null && proyecto.fechaFina.isValid() ? proyecto.fechaFina.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaIncio = res.body.fechaIncio != null ? moment(res.body.fechaIncio) : null;
      res.body.fechaFina = res.body.fechaFina != null ? moment(res.body.fechaFina) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((proyecto: IProyecto) => {
        proyecto.fechaIncio = proyecto.fechaIncio != null ? moment(proyecto.fechaIncio) : null;
        proyecto.fechaFina = proyecto.fechaFina != null ? moment(proyecto.fechaFina) : null;
      });
    }
    return res;
  }
}
