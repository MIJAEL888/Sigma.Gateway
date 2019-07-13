import { Moment } from 'moment';
import { IPuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';
import { IEquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';
import { IObservacion } from 'app/shared/model/monitoreo/observacion.model';
import { ILaboratorioMonitoreo } from 'app/shared/model/monitoreo/laboratorio-monitoreo.model';

export const enum EstadoProyecto {
  REGISTRADO = 'REGISTRADO',
  PLANIFICADO = 'PLANIFICADO',
  MONITOREADO = 'MONITOREADO',
  FINALIZADO = 'FINALIZADO'
}

export interface IProyecto {
  id?: number;
  codigo?: string;
  codigoSolicitud?: string;
  codigoResponsable?: string;
  estado?: EstadoProyecto;
  fechaIncio?: Moment;
  fechaFina?: Moment;
  descripcion?: any;
  comentario?: any;
  puntoMonitoreos?: IPuntoMonitoreoObs[];
  equipos?: IEquipoMonitoreo[];
  observacions?: IObservacion[];
  laboratorios?: ILaboratorioMonitoreo[];
}

export class Proyecto implements IProyecto {
  constructor(
    public id?: number,
    public codigo?: string,
    public codigoSolicitud?: string,
    public codigoResponsable?: string,
    public estado?: EstadoProyecto,
    public fechaIncio?: Moment,
    public fechaFina?: Moment,
    public descripcion?: any,
    public comentario?: any,
    public puntoMonitoreos?: IPuntoMonitoreoObs[],
    public equipos?: IEquipoMonitoreo[],
    public observacions?: IObservacion[],
    public laboratorios?: ILaboratorioMonitoreo[]
  ) {}
}
