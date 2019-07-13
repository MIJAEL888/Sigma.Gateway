import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmpleado } from 'app/shared/model/rrhh/empleado.model';

type EntityResponseType = HttpResponse<IEmpleado>;
type EntityArrayResponseType = HttpResponse<IEmpleado[]>;

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  public resourceUrl = SERVER_API_URL + 'services/rrhh/api/empleados';

  constructor(protected http: HttpClient) {}

  create(empleado: IEmpleado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(empleado);
    return this.http
      .post<IEmpleado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(empleado: IEmpleado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(empleado);
    return this.http
      .put<IEmpleado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEmpleado>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmpleado[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(empleado: IEmpleado): IEmpleado {
    const copy: IEmpleado = Object.assign({}, empleado, {
      fechaNacimiento:
        empleado.fechaNacimiento != null && empleado.fechaNacimiento.isValid() ? empleado.fechaNacimiento.format(DATE_FORMAT) : null,
      fechaIngreso: empleado.fechaIngreso != null && empleado.fechaIngreso.isValid() ? empleado.fechaIngreso.format(DATE_FORMAT) : null,
      fechaCreacion: empleado.fechaCreacion != null && empleado.fechaCreacion.isValid() ? empleado.fechaCreacion.format(DATE_FORMAT) : null,
      fechaActualizacion:
        empleado.fechaActualizacion != null && empleado.fechaActualizacion.isValid()
          ? empleado.fechaActualizacion.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaNacimiento = res.body.fechaNacimiento != null ? moment(res.body.fechaNacimiento) : null;
      res.body.fechaIngreso = res.body.fechaIngreso != null ? moment(res.body.fechaIngreso) : null;
      res.body.fechaCreacion = res.body.fechaCreacion != null ? moment(res.body.fechaCreacion) : null;
      res.body.fechaActualizacion = res.body.fechaActualizacion != null ? moment(res.body.fechaActualizacion) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((empleado: IEmpleado) => {
        empleado.fechaNacimiento = empleado.fechaNacimiento != null ? moment(empleado.fechaNacimiento) : null;
        empleado.fechaIngreso = empleado.fechaIngreso != null ? moment(empleado.fechaIngreso) : null;
        empleado.fechaCreacion = empleado.fechaCreacion != null ? moment(empleado.fechaCreacion) : null;
        empleado.fechaActualizacion = empleado.fechaActualizacion != null ? moment(empleado.fechaActualizacion) : null;
      });
    }
    return res;
  }
}
