import { IPuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';
import { IResultado } from 'app/shared/model/monitoreo/resultado.model';
import { IFotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';
import { IProyecto } from 'app/shared/model/monitoreo/proyecto.model';

export interface IPuntoMonitoreoObs {
  id?: number;
  codigo?: string;
  descripcion?: any;
  comentario?: any;
  observacion?: any;
  puntoMonitoreo?: IPuntoMonitoreo;
  resultado?: IResultado;
  fotografiaMonitoreos?: IFotografiaMonitoreo[];
  proyecto?: IProyecto;
}

export class PuntoMonitoreoObs implements IPuntoMonitoreoObs {
  constructor(
    public id?: number,
    public codigo?: string,
    public descripcion?: any,
    public comentario?: any,
    public observacion?: any,
    public puntoMonitoreo?: IPuntoMonitoreo,
    public resultado?: IResultado,
    public fotografiaMonitoreos?: IFotografiaMonitoreo[],
    public proyecto?: IProyecto
  ) {}
}
