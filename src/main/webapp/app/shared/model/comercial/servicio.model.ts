import { Moment } from 'moment';
import { IMonitoreoServicio } from 'app/shared/model/comercial/monitoreo-servicio.model';
import { ITipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';
import { ITipoSolicitud } from 'app/shared/model/comercial/tipo-solicitud.model';
import { ITipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';
import { IRequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';
import { ISede } from 'app/shared/model/comercial/sede.model';

export const enum EstadoServicio {
  REGISTRADO = 'REGISTRADO',
  COTIZADO = 'COTIZADO',
  APROBADO = 'APROBADO',
  NOAPROBADO = 'NOAPROBADO'
}

export interface IServicio {
  id?: number;
  codigo?: string;
  fechaEntrega?: Moment;
  nombreSolicitante?: string;
  numeroSolicitante?: string;
  observacion?: any;
  descripcion?: any;
  estado?: EstadoServicio;
  codigoCliente?: string;
  codigoSede?: string;
  monitoreoServicios?: IMonitoreoServicio[];
  tipoServicios?: ITipoServicios;
  tipoSolicitud?: ITipoSolicitud;
  tipoInduccion?: ITipoInduccion;
  requisitosSeguridad?: IRequisitosSeguridad;
  sede?: ISede;
}

export class Servicio implements IServicio {
  constructor(
    public id?: number,
    public codigo?: string,
    public fechaEntrega?: Moment,
    public nombreSolicitante?: string,
    public numeroSolicitante?: string,
    public observacion?: any,
    public descripcion?: any,
    public estado?: EstadoServicio,
    public codigoCliente?: string,
    public codigoSede?: string,
    public monitoreoServicios?: IMonitoreoServicio[],
    public tipoServicios?: ITipoServicios,
    public tipoSolicitud?: ITipoSolicitud,
    public tipoInduccion?: ITipoInduccion,
    public requisitosSeguridad?: IRequisitosSeguridad,
    public sede?: ISede
  ) {}
}
